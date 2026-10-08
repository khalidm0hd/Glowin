"use client";

interface ConciergeBannerProps {
  language: "EN" | "AR";
}

export default function ConciergeBanner({ language }: ConciergeBannerProps) {
  const isArabic = language === "AR";
  const whatsappNumber = "66908955177";
  const defaultMessage = encodeURIComponent(
    isArabic
      ? "مرحباً، أود الاستفسار عن توفير منتجات من تايلاند."
      : "Hello! I would like to inquire about sourcing products from Thailand."
  );

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 my-8 sm:my-12" dir={isArabic ? "rtl" : "ltr"}>
      <div className="bg-[#F2EFE9] border border-[#EAE3D2] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6 shadow-sm">
        
        {/* Text Content */}
        <div className="space-y-1.5 sm:space-y-2 max-w-xl">
          <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#A39281] uppercase block">
            {isArabic ? "خدمة التنسيق والطلب الخاص من بانكوك" : "BANGKOK SOURCING CONCIERGE"}
          </span>
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-[#2C2623] leading-snug font-normal">
            {isArabic ? "تبحث عن منتج تايلاندي معين غير موجود؟" : "Looking for a specific Thai product?"}
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6155] leading-relaxed">
            {isArabic 
              ? "أخبرنا بما تبحث عنه في بانكوك، وسنقوم بتوفيره وشحنه خصيصاً لك من المصادر الموثوقة." 
              : "Tell us what you're looking for, and we'll track down and source the authentic items directly from Bangkok for you."}
          </p>
        </div>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=${defaultMessage}`} 
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto bg-[#2C2623] hover:bg-[#3D3531] text-white px-6 sm:px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all shadow-sm flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
        >
          <span>
            {isArabic ? "واتساب ←" : "WHATSAPP →"}
          </span>
        </a>

      </div>
    </section>
  );
}