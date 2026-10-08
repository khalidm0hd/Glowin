"use client";

interface ValuePropsProps {
  language: "EN" | "AR";
}

export default function ValueProps({ language }: ValuePropsProps) {
  const isArabic = language === "AR";

  const features = [
    {
      icon: (
        <svg className="w-5 h-5 text-stone-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 .999.999 0 00-.987 1.106v7.635m12 0A2.25 2.25 0 0114.25 12H3.75" />
        </svg>
      ),
      titleEn: "Fast international shipping",
      titleAr: "شحن دولي سريع",
      descEn: "Express delivery from Thailand to every city in Saudi Arabia, with tracking from checkout to your door.",
      descAr: "توصيل سريع من تايلاند إلى جميع مدن المملكة العربية السعودية، مع تتبع من إتمام الطلب حتى باب منزلكم.",
    },
    {
      icon: (
        <svg className="w-5 h-5 text-stone-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.959 11.959 0 0012 2.714z" />
        </svg>
      ),
      titleEn: "100% authentic local products",
      titleAr: "منتجات محلية أصلية 100%",
      descEn: "Every item is sourced directly from trusted Thai spas and makers — genuine botanicals, never counterfeits.",
      descAr: "جميع المنتجات مجلوبة مباشرة من منتجعات ومصانع تايلاندية موثوقة — أعشاب أصلية، ولا توجد منتجات مقلدة أبداً.",
    },
    {
      icon: (
        <svg className="w-5 h-5 text-stone-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
        </svg>
      ),
      titleEn: "Direct customer support",
      titleAr: "دعم مباشر للعملاء",
      descEn: "Chat with a real person on WhatsApp in Arabic or English for orders, advice and after-care help.",
      descAr: "تحدث مع شخص حقيقي عبر الواتساب باللغة العربية أو الإنجليزية للاستفسارات، النصائح، ومتابعة ما بعد البيع.",
    },
  ];

  return (
    <section className="bg-[#181615] text-stone-200 py-10 sm:py-14 md:py-16 px-4 sm:px-6" dir={isArabic ? "rtl" : "ltr"}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {features.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center md:items-start text-center md:text-start space-y-2.5 sm:space-y-3">
            {/* Icon Container */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#272422] flex items-center justify-center mb-1 border border-stone-800 shrink-0">
              {item.icon}
            </div>

            {/* Title */}
            <h3 className="font-serif text-base sm:text-lg font-medium text-stone-100 tracking-wide">
              {isArabic ? item.titleAr : item.titleEn}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              {isArabic ? item.descAr : item.descEn}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}