"use client";

interface HeroProps {
  language?: "EN" | "AR" | "TH";
}

export default function Hero({ language = "EN" }: HeroProps) {
  const isArabic = language === "AR";
  const isThai = language === "TH";

  // Badge Text
  const badgeText = isArabic
    ? "من بانكوك إلى الرياض · شحن مباشر إلى باب بيتك"
    : isThai
    ? "ส่งตรงจากกรุงเทพฯ ถึงหน้าบ้านคุณในซาอุดีอาระเบีย"
    : "Bangkok to Saudi Arabia · Shipped straight to your door";

  // Title Text
  const renderTitle = () => {
    if (isArabic) {
      return (
        <>
          إحضار أحدث مستحضرات العناية بالبشرة والتجميل من{" "}
          <span className="italic text-[#8C6239]">بانكوك</span> مباشرة إلى باب بيتك.
        </>
      );
    }
    if (isThai) {
      return (
        <>
          ส่งตรงผลิตภัณฑ์สกินแคร์และความงามชั้นนำจาก{" "}
          <span className="italic text-[#8C6239]">กรุงเทพฯ</span> ถึงมือคุณ
        </>
      );
    }
    return (
      <>
        Bringing Bangkok's finest skincare & cosmetics{" "}
        <span className="italic text-[#8C6239]">straight to your door.</span>
      </>
    );
  };

  // Subtitle Text
  const subtitleText = isArabic
    ? "اكتشفي أفضل مستحضرات العناية بالبشرة والتجميل، تصلك مباشرة من بانكوك إلى عتبة دارك في السعودية."
    : isThai
    ? "ค้นพบสกินแคร์และเครื่องสำอางที่ดีที่สุด ส่งตรงจากกรุงเทพฯ ถึงหน้าบ้านคุณในซาอุดีอาระเบีย"
    : "Discover top-tier skincare and cosmetics, delivered straight from Bangkok to your doorstep in Saudi Arabia.";

  return (
    <section
      className="py-8 sm:py-12 md:py-16 text-start px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-stone-900 text-white text-[11px] sm:text-xs font-medium mb-4 sm:mb-6 leading-snug">
        <span>{badgeText}</span>
      </div>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-slate-900 leading-tight sm:leading-tight max-w-2xl font-normal">
        {renderTitle()}
      </h1>

      {/* Subtitle */}
      <p className="text-xs sm:text-sm md:text-base text-stone-600 mt-3 sm:mt-4 max-w-xl leading-relaxed">
        {subtitleText}
      </p>
    </section>
  );
}