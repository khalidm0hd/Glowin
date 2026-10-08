"use client";

import { useState, useEffect } from "react";

// Update this with your official Glowin WhatsApp phone number (with country code, no + or spaces)
const GLOWIN_WHATSAPP_NUMBER = "66908955177"; 
const FIXED_SHIPPING_FEE = 200;

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string | number, delta: number) => void;
  setCartItems?: React.Dispatch<React.SetStateAction<CartItem[]>>;
  language?: "EN" | "AR";
  currency?: string;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  setCartItems,
  language = "EN",
  currency = "SAR",
}: CartDrawerProps) {
  const [step, setStep] = useState<"cart" | "delivery">("cart");

  // Customer Delivery Details Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Sync state with local storage if optional setCartItems is passed
  useEffect(() => {
    if (typeof window !== "undefined" && setCartItems) {
      const savedCart = localStorage.getItem("glowin_cart");
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (e) {
          console.error("Failed to parse cart from localStorage", e);
        }
      }
    }
  }, [setCartItems]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("glowin_cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  if (!isOpen) return null;

  // Calculation logic
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + FIXED_SHIPPING_FEE;

  // Helper for quantity adjustments (uses onUpdateQuantity prop or falls back to setCartItems)
  const handleUpdateQuantity = (id: string | number, delta: number) => {
    if (onUpdateQuantity) {
      onUpdateQuantity(id, delta);
    } else if (setCartItems) {
      setCartItems((prev) =>
        prev
          .map((item) => {
            if (item.id === id) {
              const newQty = item.quantity + delta;
              return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
          })
          .filter(Boolean) as CartItem[]
      );
    }
  };

  // WhatsApp Order Handler
  const handleCompleteOrderWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !phone || !address) {
      alert("Please fill in your name, phone number, and delivery address.");
      return;
    }

    // Build item lines for WhatsApp text
    const productLines = cartItems
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} × ${item.quantity} — ${
            item.price * item.quantity
          } ${currency}`
      )
      .join("\n");

    // Pre-formatted WhatsApp Message
    const message = `Hi Glowin 👋
I'd like to place an order.

ORDER SUMMARY
${productLines}

Subtotal: ${subtotal} ${currency}
Shipping: ${FIXED_SHIPPING_FEE} ${currency}
Total: ${total} ${currency}

CUSTOMER DETAILS
Name: ${fullName}
Email: ${email || "N/A"}
Phone number: ${phone}
Saudi delivery address:
${address}

Please confirm my order and send me the payment instructions.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${GLOWIN_WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Open WhatsApp in new tab/app
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-md bg-[#FAF8F5] h-full flex flex-col justify-between p-6 sm:p-8 shadow-2xl overflow-y-auto relative text-[#2C2623]">
        
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[11px] font-bold tracking-widest text-[#A39281] uppercase">
                {step === "cart"
                  ? language === "AR"
                    ? "حقيبة التسوق"
                    : "YOUR BASKET"
                  : language === "AR"
                  ? "تفاصيل التوصيل"
                  : "DELIVERY DETAILS"}
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#2C2623]">
                {step === "cart"
                  ? language === "AR"
                    ? "لمسة من الفخامة."
                    : "A little luxury."
                  : language === "AR"
                  ? "على بعد خطوات منك."
                  : "Almost yours."}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-700 p-2 text-xl"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* STEP 1: CART VIEW */}
          {step === "cart" && (
            <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-1">
              {cartItems.length === 0 ? (
                <p className="text-sm text-stone-500 py-8 text-center">
                  {language === "AR"
                    ? "حقيبة التسوق فارغة حالياً."
                    : "Your basket is currently empty."}
                </p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-white/70 p-3 rounded-2xl border border-[#EAE3D2]"
                  >
                    <div className="flex items-center gap-3">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 object-cover rounded-xl border border-[#EAE3D2]"
                        />
                      )}
                      <div>
                        <h4 className="text-xs font-semibold text-[#2C2623] line-clamp-1 max-w-[170px]">
                          {item.name}
                        </h4>
                        <p className="text-xs font-bold text-[#2C2623] mt-1">
                          {item.price} {currency}
                        </p>
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#DCD5C5] rounded-full px-2 py-1 bg-white">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, -1)}
                        className="text-xs font-bold px-1 hover:text-[#C5A880]"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold px-2">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, 1)}
                        className="text-xs font-bold px-1 hover:text-[#C5A880]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* STEP 2: DELIVERY DETAILS VIEW */}
          {step === "delivery" && (
            <form id="delivery-form" onSubmit={handleCompleteOrderWhatsApp} className="space-y-3">
              <div>
                <input
                  type="text"
                  placeholder={language === "AR" ? "الاسم الكامل" : "Full name"}
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white border border-[#EAE3D2] rounded-2xl px-4 py-3 text-xs outline-none focus:border-[#2C2623] transition-colors"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder={language === "AR" ? "البريد الإلكتروني" : "Email address"}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-[#EAE3D2] rounded-2xl px-4 py-3 text-xs outline-none focus:border-[#2C2623] transition-colors"
                />
              </div>

              <div>
                <input
                  type="tel"
                  placeholder={language === "AR" ? "رقم الهاتف" : "Number"}
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white border border-[#EAE3D2] rounded-2xl px-4 py-3 text-xs outline-none focus:border-[#2C2623] transition-colors"
                />
              </div>

              <div>
                <textarea
                  rows={3}
                  placeholder={language === "AR" ? "عنوان التوصيل في السعودية" : "Shipping address in Saudi Arabia"}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-white border border-[#EAE3D2] rounded-2xl px-4 py-3 text-xs outline-none focus:border-[#2C2623] transition-colors resize-none"
                />
              </div>
            </form>
          )}
        </div>

        {/* Bottom Order Summary & Actions */}
        <div className="border-t border-[#EAE3D2] pt-4 mt-6">
          <div className="space-y-1.5 text-xs text-[#6B6155] mb-4">
            <div className="flex justify-between">
              <span>{language === "AR" ? "المجموع الفرعي" : "Subtotal"}</span>
              <span className="font-semibold text-[#2C2623]">{subtotal} {currency}</span>
            </div>
            <div className="flex justify-between">
              <span>{language === "AR" ? "الشحن (ثابت)" : "Shipping (Fixed)"}</span>
              <span className="font-semibold text-[#2C2623]">
                {FIXED_SHIPPING_FEE} {currency}
              </span>
            </div>
            <div className="flex justify-between text-sm font-bold text-[#2C2623] pt-2 border-t border-[#EAE3D2]">
              <span>{language === "AR" ? "الإجمالي" : "Total"}</span>
              <span>{total} {currency}</span>
            </div>
          </div>

          {/* Action Buttons */}
          {step === "cart" ? (
            <button
              onClick={() => setStep("delivery")}
              disabled={cartItems.length === 0}
              className="w-full bg-[#2C2623] text-white py-3.5 rounded-full text-xs font-semibold hover:bg-[#3D3531] transition-colors uppercase tracking-wider disabled:opacity-50"
            >
              {language === "AR" ? "المتابعة للتوصيل ←" : "PROCEED TO DELIVERY →"}
            </button>
          ) : (
            <div className="space-y-3">
              {/* WhatsApp Explanatory Card */}
              <div className="bg-[#F2ECE1] p-3.5 rounded-2xl text-[11px] text-[#6B6155] space-y-1">
                <p className="font-bold text-[#2C2623] uppercase tracking-wider text-[10px]">
                  {language === "AR"
                    ? "إكمال الطلب عبر واتساب"
                    : "Complete your order via WhatsApp"}
                </p>
                <p className="leading-relaxed">
                  {language === "AR"
                    ? "سيتم تجهيز تفاصيل طلبك تلقائياً وإرسالها إلى واتساب للمراجعة. لا يتطلب الدفع في هذه الصفحة. بعد إرسال الطلب، سيقوم فريق Glowin بتأكيد طلبك وتزويدك بتعليمات الدفع عبر واتساب."
                    : "Your order details will be prepared automatically and sent to WhatsApp for review. No payment is required on this page. After you submit your order, our Glowin team will confirm your order and provide payment instructions through WhatsApp."}
                </p>
              </div>

              {/* Complete Order Button */}
              <button
                type="submit"
                form="delivery-form"
                className="w-full bg-[#2C2623] text-white py-3.5 rounded-full text-xs font-semibold hover:bg-[#3D3531] transition-colors uppercase tracking-wider"
              >
                {language === "AR"
                  ? "إتمام الطلب عبر واتساب ←"
                  : "COMPLETE ORDER ON WHATSAPP →"}
              </button>

              <p className="text-[10px] text-center text-[#A39281] font-medium">
                {language === "AR"
                  ? "ستتمكن من مراجعة طلبك قبل الإرسال."
                  : "You'll review your order before sending it."}
              </p>

              <button
                type="button"
                onClick={() => setStep("cart")}
                className="w-full text-center text-xs text-[#2C2623] underline hover:text-[#C5A880] transition-colors pt-1 block"
              >
                {language === "AR" ? "العودة لمراجعة السلة" : "Back to review cart"}
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}