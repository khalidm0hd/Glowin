"use client";

import React, { useState, useEffect } from "react";

export type CurrencyType = "SAR" | "USD" | "THB";

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  language: "EN" | "AR";
  onLanguageChange: (lang: "EN" | "AR") => void;
  currency: CurrencyType;
  onCurrencyChange: (curr: CurrencyType) => void;
  onSelectCategory?: (categoryId: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

const shopCategories = [
  { id: "all", name: "All Products", nameAr: "جميع المنتجات" },
  { id: "skincare", name: "Skincare", nameAr: "العناية بالبشرة" },
  { id: "makeup", name: "Makeup", nameAr: "المكياج" },
  { id: "haircare", name: "Haircare", nameAr: "العناية بالشعر" },
  { id: "bodycare", name: "Body Care", nameAr: "العناية بالجسم" },
  { id: "tools", name: "Tools & Brushes", nameAr: "الأدوات والفرش" },
];

export default function Header({
  cartCount,
  onOpenCart,
  language,
  onLanguageChange,
  currency,
  onCurrencyChange,
  onSelectCategory,
  searchQuery = "",
  onSearchChange,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopExpanded, setIsShopExpanded] = useState(true);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isRtl = language === "AR";

  const handleCategoryClick = (id: string) => {
    if (onSelectCategory) {
      onSelectCategory(id);
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#EAE3D2]"
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
          
          {/* Main Top Header Bar */}
          <div className="relative flex items-center md:items-start justify-between gap-4">
            
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-[#2C2623] hover:bg-[#F2EFE9] rounded-full transition-colors md:hidden z-10"
              aria-label="Open navigation menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>

            {/* Left Side (Desktop): Logo & Search Bar */}
            <div className="flex flex-col items-center md:items-start gap-3 w-full max-w-md lg:max-w-lg">
              <a
                href="#"
                className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-[#2C2623] absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
              >
                Glowin
              </a>

              {/* Search Bar Under Glowin (Desktop) */}
              <div className="hidden md:block w-full">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#A39281]">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) =>
                      onSearchChange && onSearchChange(e.target.value)
                    }
                    placeholder={
                      isRtl ? "البحث عن منتج..." : "Search product..."
                    }
                    className="w-full bg-white border border-[#DCD3C1] rounded-full pl-11 pr-5 py-2.5 sm:py-3 text-sm text-[#2C2623] placeholder-[#A39281] focus:outline-none focus:border-[#C5A880] transition-colors shadow-xs"
                  />
                </div>
              </div>
            </div>

            {/* Right Icons: Globe Icon + Cart Badge */}
            <div className="flex items-center gap-1.5 sm:gap-3 z-10">
              
              {/* Globe Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="p-2 text-[#2C2623] hover:bg-[#F2EFE9] rounded-full transition-colors flex items-center justify-center"
                  aria-label="Language and Currency Settings"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21a9 9 0 100-18 9 9 0 000 18zM2.25 12h19.5m-16.5-5.25h13.5m-13.5 10.5h13.5"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu for Language & Currency */}
                {isLangMenuOpen && (
                  <div
                    className={`absolute ${
                      isRtl ? "left-0" : "right-0"
                    } mt-2 w-52 bg-white border border-[#EAE3D2] rounded-2xl shadow-xl p-3 z-50 space-y-3`}
                  >
                    <div>
                      <span className="text-[10px] font-bold text-[#A39281] uppercase block mb-1">
                        {isRtl ? "اللغة" : "Language"}
                      </span>
                      <div className="flex bg-[#F5F2EC] p-1 rounded-xl gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            onLanguageChange("EN");
                            setIsLangMenuOpen(false);
                          }}
                          className={`flex-1 py-1 text-xs font-semibold rounded-lg transition-all ${
                            language === "EN"
                              ? "bg-stone-900 text-white"
                              : "text-stone-600"
                          }`}
                        >
                          EN
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            onLanguageChange("AR");
                            setIsLangMenuOpen(false);
                          }}
                          className={`flex-1 py-1 text-xs font-semibold rounded-lg transition-all ${
                            language === "AR"
                              ? "bg-stone-900 text-white"
                              : "text-stone-600"
                          }`}
                        >
                          العربية
                        </button>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-[#A39281] uppercase block mb-1">
                        {isRtl ? "العملة" : "Currency"}
                      </span>
                      <div className="grid grid-cols-3 gap-1 bg-[#F5F2EC] p-1 rounded-xl">
                        {(["SAR", "USD", "THB"] as CurrencyType[]).map((curr) => (
                          <button
                            key={curr}
                            type="button"
                            onClick={() => {
                              onCurrencyChange(curr);
                              setIsLangMenuOpen(false);
                            }}
                            className={`py-1 text-[11px] font-semibold rounded-lg transition-all ${
                              currency === curr
                                ? "bg-stone-900 text-white"
                                : "text-stone-600"
                            }`}
                          >
                            {curr}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Shopping Cart Button */}
              <button
                onClick={onOpenCart}
                className="p-2 text-[#2C2623] hover:bg-[#F2EFE9] rounded-full transition-colors relative"
                aria-label="Shopping Cart"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.993z"
                  />
                </svg>
                {mounted && cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-stone-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

            </div>
          </div>

          {/* Search Bar Input (Mobile Only) */}
          <div className="relative w-full mt-3 md:hidden">
            <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-[#A39281]">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) =>
                onSearchChange && onSearchChange(e.target.value)
              }
              placeholder={isRtl ? "البحث عن منتج..." : "Search product..."}
              className="w-full bg-white border border-[#EAE3D2] rounded-full pl-10 pr-4 py-2 text-xs sm:text-sm text-[#2C2623] placeholder-[#A39281] focus:outline-none focus:border-[#C5A880] transition-colors shadow-xs"
            />
          </div>

        </div>
      </header>

      {/* Mobile Drawer Navigation (☰) */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 overflow-hidden md:hidden"
          dir={isRtl ? "rtl" : "ltr"}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          />

          <div
            className={`fixed inset-y-0 ${
              isRtl ? "right-0" : "left-0"
            } max-w-full flex`}
          >
            <div className="w-screen max-w-xs sm:max-w-sm bg-[#FDFBF7] shadow-2xl flex flex-col justify-between">
              
              {/* Drawer Top Header */}
              <div className="p-5 border-b border-[#EAE3D2] flex items-center justify-between">
                <span className="font-serif text-xl font-semibold text-[#2C2623]">
                  Glowin
                </span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-[#8C827A] hover:text-[#2C2623] rounded-full hover:bg-[#F3EEE3]"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Mobile Drawer Navigation Links */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <nav className="space-y-4 text-sm font-medium text-[#2C2623]">
                  <button
                    type="button"
                    onClick={() => handleCategoryClick("all")}
                    className="block hover:text-[#A39281] transition-colors font-semibold text-left w-full cursor-pointer"
                  >
                    {isRtl ? "الرئيسية" : "HOME"}
                  </button>

                  {/* SHOP Accordion */}
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setIsShopExpanded(!isShopExpanded)}
                      className="w-full flex items-center justify-between hover:text-[#A39281] transition-colors font-semibold cursor-pointer"
                    >
                      <span>{isRtl ? "المتجر" : "SHOP"}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isShopExpanded ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </button>

                    {isShopExpanded && (
                      <div className="pl-4 pr-4 space-y-2.5 pt-1 border-l-2 border-[#EAE3D2] my-1">
                        {shopCategories.map((cat) => (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => handleCategoryClick(cat.id)}
                            className={`block text-xs transition-colors w-full cursor-pointer ${
                              isRtl ? "text-right" : "text-left"
                            } text-[#6B6155] hover:text-[#2C2623]`}
                          >
                            {isRtl ? cat.nameAr : cat.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <a
                    href="#shipping"
                    onClick={() => setIsMenuOpen(false)}
                    className="block hover:text-[#A39281] transition-colors"
                  >
                    {isRtl ? "الشحن والتوصيل" : "SHIPPING"}
                  </a>

                  <a
                    href="https://wa.me/66908955177"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMenuOpen(false)}
                    className="block hover:text-[#A39281] transition-colors"
                  >
                    {isRtl ? "تواصل معنا / واتساب" : "CONTACT / WHATSAPP"}
                  </a>
                </nav>
              </div>

              {/* Bottom Integrated Language & Currency Controls inside Drawer */}
              <div className="p-6 border-t border-[#EAE3D2] bg-[#F8F5EE] space-y-3">
                <span className="text-[10px] font-bold tracking-widest text-[#A39281] uppercase block">
                  {isRtl ? "إعدادات اللغة والعملة" : "Language & Currency"}
                </span>

                <div className="flex items-center justify-between gap-2">
                  {/* Language Controls */}
                  <div className="flex bg-white p-1 rounded-xl border border-[#EAE3D2]">
                    <button
                      type="button"
                      onClick={() => onLanguageChange("EN")}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                        language === "EN"
                          ? "bg-stone-900 text-white"
                          : "text-stone-600"
                      }`}
                    >
                      EN
                    </button>
                    <button
                      type="button"
                      onClick={() => onLanguageChange("AR")}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                        language === "AR"
                          ? "bg-stone-900 text-white"
                          : "text-stone-600"
                      }`}
                    >
                      العربية
                    </button>
                  </div>

                  {/* Currency Controls */}
                  <div className="flex bg-white p-1 rounded-xl border border-[#EAE3D2]">
                    {(["SAR", "USD", "THB"] as CurrencyType[]).map((curr) => (
                      <button
                        key={curr}
                        type="button"
                        onClick={() => onCurrencyChange(curr)}
                        className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${
                          currency === curr
                            ? "bg-stone-900 text-white"
                            : "text-stone-600"
                        }`}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}