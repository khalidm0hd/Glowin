import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get('orderId');
  const paymentId = searchParams.get('id');

  if (!orderId || !paymentId) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  // 1. Verify payment status with Moyasar
  const gatewayVerify = await fetch(`https://api.moyasar.com/v1/payments/${paymentId}`, {
    headers: {
      'Authorization': `Basic ${Buffer.from(process.env.PAYMENT_SECRET_KEY + ':').toString('base64')}`,
    },
  });

  const paymentRecord = await gatewayVerify.json();

  if (gatewayVerify.ok && paymentRecord.status === 'paid') {
    // 2. Update order status in Supabase
    const { data: order } = await supabase
      .from('orders')
      .update({
        payment_status: 'successful',
        fulfillment_status: 'processing',
        provider_payment_id: paymentId,
      })
      .eq('id', orderId)
      .select()
      .single();

    // 3. Fetch order items for the receipt
    const { data: orderItems } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', orderId);

    // 4. Send Order Confirmation Email via Resend
    const recipientEmail = order?.email || 'khalidmohdd7@gmail.com';

    if (recipientEmail) {
      const itemsListHtml = (orderItems || [])
        .map(
          (item: any) =>
            `<li>${item.product_name} (${item.quantity}x) - ${item.unit_price_sar} SAR</li>`
        )
        .join('');

      await resend.emails.send({
        from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
        to: recipientEmail,
        subject: `Glowin Order Confirmation #${order?.id || orderId}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #2C2623;">
            <h2>Thank you for your order!</h2>
            <p>We've received your payment and are processing your order.</p>
            <hr />
            <h3>Order Details</h3>
            <ul>${itemsListHtml}</ul>
            <p><strong>Total Paid:</strong> ${order?.total_sar || 0} SAR</p>
          </div>
        `,
      });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    return NextResponse.redirect(`${baseUrl}/checkout/confirmation?orderId=${orderId}&status=successful`);
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  return NextResponse.redirect(`${baseUrl}/checkout/confirmation?orderId=${orderId}&status=failed`);
}