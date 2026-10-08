"use client";

import React from "react";

interface FooterProps {
  language?: "EN" | "AR";
  onSelectCategory?: (category: string) => void;
}

export default function Footer({ language = "EN", onSelectCategory }: FooterProps) {
  const isArabic = language === "AR";

  const handleCategoryClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    category: string,
    href: string
  ) => {
    e.preventDefault();

    // 1. Trigger parent category filter (e.g. "Skincare" active tab as in Pic 2)
    if (onSelectCategory) {
      onSelectCategory(category);
    }

    // 2. Smoothly scroll directly to products / catalog section
    const targetElement = document.querySelector(href) || document.querySelector("#catalog");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // 3. Update browser history cleanly
    if (window.history.pushState) {
      window.history.pushState(null, "", href);
    } else {
      window.location.hash = href;
    }
  };

  return (
    <footer 
      className="bg-[#F8F5EF] text-[#2C2623] pt-12 sm:pt-16 pb-8 border-t border-[#EAE3D2]"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-[#EAE3D2]">
          
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-4 space-y-3 sm:space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#2C2623]">
              Glowin<span className="text-[#A39281]">.</span>
            </h2>
            <p className="text-sm text-[#6E655F] leading-relaxed max-w-sm">
              {isArabic
                ? "أسرار العناية الأعشاب التايلاندية وأرقى مستحضرات التجميل، نأتي بها من بانكوك إلى باب بيتك."
                : "Authentic Thai herbal secrets and luxury skincare formulas, brought from Bangkok to your doorstep."}
            </p>
          </div>

          {/* Column 2: Catalog Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#A39281]">
              {isArabic ? "الكتالوج" : "CATALOG"}
            </h3>
            <ul className="space-y-2 text-sm text-[#4A423D]">
              <li>
                <a 
                  href="#all-products" 
                  onClick={(e) => handleCategoryClick(e, "All Products", "#all-products")}
                  className="hover:text-[#A39281] transition-colors inline-block py-0.5"
                >
                  {isArabic ? "جميع المنتجات" : "All Products"}
                </a>
              </li>
              <li>
                <a 
                  href="#skincare" 
                  onClick={(e) => handleCategoryClick(e, "Skincare", "#skincare")}
                  className="hover:text-[#A39281] transition-colors inline-block py-0.5"
                >
                  {isArabic ? "العناية بالبشرة" : "Skincare"}
                </a>
              </li>
              <li>
                <a 
                  href="#makeup" 
                  onClick={(e) => handleCategoryClick(e, "Makeup", "#makeup")}
                  className="hover:text-[#A39281] transition-colors inline-block py-0.5"
                >
                  {isArabic ? "المكياج" : "Makeup"}
                </a>
              </li>
              <li>
                <a 
                  href="#haircare" 
                  onClick={(e) => handleCategoryClick(e, "Haircare", "#haircare")}
                  className="hover:text-[#A39281] transition-colors inline-block py-0.5"
                >
                  {isArabic ? "العناية بالشعر" : "Haircare"}
                </a>
              </li>
              <li>
                <a 
                  href="#bodycare" 
                  onClick={(e) => handleCategoryClick(e, "Body Care", "#bodycare")}
                  className="hover:text-[#A39281] transition-colors inline-block py-0.5"
                >
                  {isArabic ? "العناية بالجسم" : "Body Care"}
                </a>
              </li>
              <li>
                <a 
                  href="#tools-brushes" 
                  onClick={(e) => handleCategoryClick(e, "Tools & Brushes", "#tools-brushes")}
                  className="hover:text-[#A39281] transition-colors inline-block py-0.5"
                >
                  {isArabic ? "الأدوات والفرش" : "Tools & Brushes"}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#A39281]">
              {isArabic ? "خدمة العملاء" : "CUSTOMER SERVICE"}
            </h3>
            <ul className="space-y-2 text-sm text-[#4A423D]">
              <li>
                <a href="#tracking" className="hover:text-[#A39281] transition-colors inline-block py-0.5">
                  {isArabic ? "تتبع الطلب" : "Order tracking"}
                </a>
              </li>
              <li>
                <a href="#shipping" className="hover:text-[#A39281] transition-colors inline-block py-0.5">
                  {isArabic ? "الشحن والإرجاع" : "Shipping & returns"}
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-[#A39281] transition-colors inline-block py-0.5">
                  {isArabic ? "الأسئلة الشائعة" : "FAQs"}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Client Care */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#A39281]">
              {isArabic ? "الدعم والتواصل" : "CLIENT CARE"}
            </h3>
            <ul className="space-y-2 text-sm text-[#4A423D]">
              <li>
                <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="hover:text-[#A39281] transition-colors inline-block py-0.5">
                  {isArabic ? "واتساب" : "WhatsApp"}
                </a>
              </li>
              <li>
                <a href="mailto:khalidmohdd7@gmail.com" className="hover:text-[#A39281] transition-colors font-medium text-[#2C2623] inline-block py-0.5 break-all">
                  khalidmohdd7@gmail.com
                </a>
              </li>
              <li className="text-[#6E655F] py-0.5">
                {isArabic ? "بانكوك، تايلاند" : "Bangkok, Thailand"}
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-[#8C827A] gap-4 text-center sm:text-left">
          <p>© 2026 Glowin. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a href="#privacy" className="hover:text-[#2C2623] transition-colors">
              {isArabic ? "سياسة الخصوصية" : "Privacy Policy"}
            </a>
            <a href="#terms" className="hover:text-[#2C2623] transition-colors">
              {isArabic ? "الشروط والأحكام" : "Terms of Service"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}