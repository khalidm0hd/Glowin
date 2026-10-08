import { NextResponse } from 'next/server';
import { supabase } from '../../lib/supabaseClient';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerName, email, whatsapp, shippingAddress, items } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // 1. Fetch DB products & recalculate prices server-side
    const productIds = items.map((item: any) => item.productId);
    const { data: dbProducts, error: prodError } = await supabase
      .from('products')
      .select('id, name, price_sar, size_value, unit')
      .in('id', productIds);

    if (prodError || !dbProducts) {
      return NextResponse.json({ error: 'Failed to verify product prices' }, { status: 500 });
    }

    let calculatedSubtotal = 0;
    const verifiedOrderItems = items.map((item: any) => {
      const dbProduct = dbProducts.find((p) => p.id === item.productId);
      if (!dbProduct) throw new Error(`Product not found: ${item.productId}`);

      const unitPrice = Number(dbProduct.price_sar);
      calculatedSubtotal += unitPrice * item.quantity;

      return {
        product_id: dbProduct.id,
        product_name: dbProduct.name,
        product_size: dbProduct.size_value && dbProduct.unit ? `${dbProduct.size_value} ${dbProduct.unit}` : '',
        quantity: item.quantity,
        unit_price_sar: unitPrice,
      };
    });

    const FIXED_SHIPPING_FEE = 25.00; // SAR
    const calculatedTotal = calculatedSubtotal + FIXED_SHIPPING_FEE;

    // 2. Create initial order in Supabase (status: pending)
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_name: customerName,
        email: email,
        whatsapp: whatsapp,
        shipping_address: shippingAddress,
        subtotal_sar: calculatedSubtotal,
        shipping_fee_sar: FIXED_SHIPPING_FEE,
        total_sar: calculatedTotal,
        currency: 'SAR',
        payment_status: 'pending',
        fulfillment_status: 'pending_payment',
        payment_provider: 'moyasar', // or 'tap' / 'stripe'
      })
      .select()
      .single();

    if (orderError) throw new Error('Failed to create order');

    // 3. Link Order Items
const orderItemsToInsert = verifiedOrderItems.map((item: any) => ({
      ...item,
      order_id: order.id,
    }));
    await supabase.from('order_items').insert(orderItemsToInsert);

    // 4. Create Payment Invoice with Gateway API (e.g. Moyasar/Tap)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    // Example Moyasar/Tap API Request
    const gatewayResponse = await fetch('https://api.moyasar.com/v1/invoices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(process.env.PAYMENT_SECRET_KEY + ':').toString('base64')}`,
      },
      body: JSON.stringify({
        amount: Math.round(calculatedTotal * 100), // convert to halalas / smallest currency unit
        currency: 'SAR',
        description: `Order #${order.id} - Glowin`,
        callback_url: `${baseUrl}/api/payment/callback?orderId=${order.id}`,
        metadata: {
          order_id: order.id,
          customer_email: email,
        },
      }),
    });

    const paymentData = await gatewayResponse.json();

    if (!gatewayResponse.ok) {
      console.error('Payment Gateway Error:', paymentData);
      return NextResponse.json({ error: 'Failed to initiate payment session' }, { status: 500 });
    }

    // 5. Store Payment Provider ID in Supabase
    await supabase
      .from('orders')
      .update({ provider_payment_id: paymentData.id })
      .eq('id', order.id);

    // 6. Return invoice URL to client for redirection
    return NextResponse.json({
      success: true,
      orderId: order.id,
      paymentUrl: paymentData.url, // Browser redirects customer to complete payment securely
    });

  } catch (err: any) {
    console.error('Checkout Error:', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}