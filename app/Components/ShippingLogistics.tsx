"use client";

import React from "react";

interface ShippingLogisticsProps {
  language?: "EN" | "AR";
}

// Crisp inline SVGs matching your exact reference images
const CarrierLogos = {
  DHL: () => (
    <svg className="h-7 sm:h-9 md:h-10 w-auto" viewBox="0 0 220 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="220" height="70" fill="#FFCC00" rx="4" />
      <path d="M12 28H32M8 33H30M4 38H28" stroke="#D40511" strokeWidth="3" strokeLinecap="square" />
      <path d="M192 28H212M190 33H212M188 38H208" stroke="#D40511" strokeWidth="3" strokeLinecap="square" />
      <path d="M35 18H80L72 40H27L35 18Z" fill="#D40511" />
      <path d="M85 18H130L122 40H77L85 18Z" fill="#D40511" />
      <path d="M135 18H180L172 40H127L135 18Z" fill="#D40511" />
      <path d="M48 24H68L63 34H43L48 24Z" fill="#FFCC00" />
      <path d="M98 24H103L98 34H93L98 24Z" fill="#FFCC00" />
      <path d="M148 24H168L148 34H143L148 24Z" fill="#FFCC00" />
      <text x="110" y="58" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="18" fill="#D40511">
        Express
      </text>
    </svg>
  ),
  SMSA: () => (
    <svg className="h-6 sm:h-8 md:h-9 w-auto" viewBox="0 0 200 55" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="42" fontFamily="Impact, Arial Black, sans-serif" fontWeight="900" fontSize="48" fill="#4C0099" letterSpacing="-2">
        sm
      </text>
      <text x="95" y="42" fontFamily="Impact, Arial Black, sans-serif" fontWeight="900" fontSize="48" fill="#FF6600" letterSpacing="-2">
        sa
      </text>
    </svg>
  ),
  Aramex: () => (
    <svg className="h-6 sm:h-8 md:h-9 w-auto" viewBox="0 0 220 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="40" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="46" fill="#FF0000" letterSpacing="-1.5">
        aramex
      </text>
    </svg>
  ),
  ThaiPost: () => (
    <svg className="h-6 sm:h-8 md:h-9 w-auto" viewBox="0 0 240 55" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 10H105L75 48H5V10Z" fill="#ED1C24" />
      <path d="M70 10L120 10L100 48L50 48L70 10Z" fill="#002060" />
      <text x="130" y="30" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="18" fill="#002060">
        THAILAND
      </text>
      <text x="130" y="46" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="15" fill="#ED1C24">
        POST
      </text>
    </svg>
  ),
};

const CARRIERS = [
  { name: "Thai Post", Component: CarrierLogos.ThaiPost },
  { name: "DHL Express", Component: CarrierLogos.DHL },
  { name: "SMSA Express", Component: CarrierLogos.SMSA },
  { name: "Aramex", Component: CarrierLogos.Aramex },
];

export default function ShippingLogistics({ language = "EN" }: ShippingLogisticsProps) {
  const isArabic = language === "AR";
  const WHATSAPP_NUMBER = "66908955177";
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    isArabic
      ? "مرحباً، لدي استفسار حول الشحن والتوصيل."
      : "Hi Glowin, I have a question about shipping and delivery."
  )}`;

  return (
    <section 
      id="shipping" 
      className="bg-[#FAF8F5] py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 border-y border-[#EAE3D2] overflow-hidden text-[#2C2623]"
    >
      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-ticker {
          display: flex;
          width: max-content;
          animation: ticker 18s linear infinite;
        }
        @media (min-width: 768px) {
          .animate-ticker {
            animation-duration: 22s;
          }
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Main Content Area: Centered and mobile-optimized */}
      <div className="max-w-xl mx-auto w-[90%] text-center space-y-8 mb-12 sm:mb-16">
        
        {/* Header Badge & Title */}
        <div className="space-y-2">
          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#A39281] uppercase block">
            {isArabic ? "الشحن إلى المملكة العربية السعودية" : "SHIPPING TO SAUDI ARABIA"}
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#2C2623] font-normal leading-tight">
            {isArabic ? "شحن ثابت وبسيط." : "Simple, flat-rate shipping."}
          </h2>
        </div>

        {/* 200 SAR Fee Highlight */}
        <div className="bg-white/80 border border-[#EAE3D2] rounded-3xl p-6 shadow-xs space-y-2">
          <div className="text-3xl sm:text-4xl font-serif font-bold text-[#2C2623]">
            200 {isArabic ? "ر.س" : "SAR"}
          </div>
          <p className="text-xs sm:text-sm text-[#6B6155] leading-relaxed">
            {isArabic
              ? "رسوم شحن ثابتة بقيمة 200 ريال سعودي تطبق على جميع الطلبات المشحونة إلى المملكة العربية السعودية."
              : "A fixed shipping fee of 200 SAR applies to all orders shipped to Saudi Arabia."}
          </p>
        </div>

        {/* Section 1: Direct Sourcing from Thailand */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold tracking-widest text-[#A39281] uppercase">
            {isArabic ? "من تايلاند إلى باب بيتك" : "FROM THAILAND TO YOUR DOOR"}
          </h3>
          <p className="text-xs sm:text-sm text-[#6B6155] leading-relaxed">
            {isArabic
              ? "يتم توفير منتجاتك الأصلية من تايلاند فور إتمام طلبك وتجهيزها للشحن الجوي المباشر إلى السعودية."
              : "Your products are sourced in Thailand after your order is placed and prepared for shipment directly to Saudi Arabia."}
          </p>
        </div>

        {/* Section 2: Order & Delivery Timeline */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold tracking-widest text-[#A39281] uppercase">
            {isArabic ? "الطلب والشحن" : "ORDER & SHIPPING"}
          </h3>
          <p className="text-xs sm:text-sm text-[#6B6155] leading-relaxed">
            {isArabic
              ? "بعد إتمام الطلب عبر واتساب، سيقوم فريقنا بتأكيد الطلب وتزويدك بتعليمات الدفع. فور تأكيد الدفع يتم شحن طلبك مع إنهاء كافة الإجراءات والرسوم الجمركية."
              : "After you complete your order through WhatsApp, our team will confirm your order and provide payment instructions. Once payment is confirmed, your order is dispatched with custom duties handled."}
          </p>
        </div>

        {/* Feature Tags */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 pt-2">
          <span className="bg-[#EAE3D2]/50 text-[#2C2623] text-[11px] sm:text-xs font-medium px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#DCD5C5]">
            {isArabic ? "شحن جوي سريع (4-7 أيام)" : "Express Air Shipping (4-7 Days)"}
          </span>
          <span className="bg-[#EAE3D2]/50 text-[#2C2623] text-[11px] sm:text-xs font-medium px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#DCD5C5]">
            {isArabic ? "إنهاء الجمارك والرسوم" : "Customs & Import Duties Handled"}
          </span>
        </div>

      </div>

      {/* Full-Color Carrier Marquee Ticker */}
      <div className="relative overflow-hidden w-full max-w-6xl mx-auto py-2 sm:py-4 border-t border-[#EAE3D2]/60 pt-8">
        <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-[#FAF8F5] to-transparent z-10 pointer-events-none" />

        <div className="animate-ticker flex items-center gap-8 sm:gap-16 md:gap-24">
          {[...CARRIERS, ...CARRIERS, ...CARRIERS, ...CARRIERS].map((carrier, index) => {
            const LogoComponent = carrier.Component;
            return (
              <div
                key={index}
                className="flex items-center justify-center min-w-[100px] sm:min-w-[140px] h-12 sm:h-16 transition-transform duration-300 hover:scale-105 shrink-0"
              >
                <LogoComponent />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}