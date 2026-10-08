"use client";

import { useState, useEffect } from "react";
import ProductModal from "./ProductModal";
import { Product } from "../data/products";

interface ProductListProps {
  language?: "EN" | "AR";
  currency?: string;
  onAddToCart?: (product: any, quantity: number) => void;
  searchQuery?: string;
  products?: Product[];
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

const CATEGORIES = [
  { id: "all", labelEn: "All Products", labelAr: "جميع المنتجات" },
  { id: "Skincare", labelEn: "Skincare", labelAr: "العناية بالبشرة" },
  { id: "Makeup", labelEn: "Makeup", labelAr: "المكياج" },
  { id: "Haircare", labelEn: "Haircare", labelAr: "العناية بالشعر" },
  { id: "Body Care", labelEn: "Body Care", labelAr: "العناية بالجسم" },
  { id: "Tools & Brushes", labelEn: "Tools & Brushes", labelAr: "الأدوات والفرش" },
];

const EXCHANGE_RATES: Record<string, { rate: number; symbol: string }> = {
  SAR: { rate: 1, symbol: "SAR" },
  USD: { rate: 0.27, symbol: "$" },
  THB: { rate: 9.25, symbol: "฿" },
};

const WHATSAPP_NUMBER = "+66908955177";

export default function ProductList({
  language = "EN",
  currency = "SAR",
  onAddToCart,
  searchQuery = "",
  products = [],
  selectedCategory: externalCategory,
  onSelectCategory,
}: ProductListProps) {
  const [internalCategory, setInternalCategory] = useState<string>("all");
  const [imageIndices, setImageIndices] = useState<Record<string, number>>({});
  const [selectedModalProduct, setSelectedModalProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [visibleCount, setVisibleCount] = useState<number>(6);

  // Sync active category between parent control and local fallback
  const activeCategory = externalCategory ?? internalCategory;

  const handleCategoryChange = (catId: string) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    } else {
      setInternalCategory(catId);
    }
    setVisibleCount(6);
  };

  const isArabic = language === "AR";

  // Filter products by category and search query
  const filteredProducts = products.filter((product: any) => {
    const productCat = (product.category || "").toLowerCase();
    const selectedCat = activeCategory.toLowerCase();

    let matchesCategory = false;

    if (selectedCat === "all" || selectedCat === "all products") {
      matchesCategory = true;
    } else if (selectedCat === "skincare") {
      matchesCategory =
        productCat.includes("skincare") ||
        productCat.includes("face") ||
        productCat.includes("serum") ||
        productCat.includes("sun");
    } else if (selectedCat === "tools & brushes") {
      matchesCategory =
        productCat.includes("tools") ||
        productCat.includes("brushes") ||
        productCat.includes("spa");
    } else {
      matchesCategory = productCat === selectedCat;
    }

    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesCategory;

    const nameMatch =
      (product.name_en || product.name || "").toLowerCase().includes(query) ||
      (product.name_ar || "").toLowerCase().includes(query);
    const categoryMatch = productCat.includes(query);
    const descriptionMatch =
      (product.description_en || product.description || "").toLowerCase().includes(query) ||
      (product.description_ar || "").toLowerCase().includes(query);

    const benefitsArray = Array.isArray(product.key_benefits_en) ? product.key_benefits_en : [];
    const benefitsString = benefitsArray.join(" ");
    const benefitsMatch = benefitsString.toLowerCase().includes(query);

    return (
      matchesCategory &&
      (Boolean(nameMatch) ||
        Boolean(categoryMatch) ||
        Boolean(descriptionMatch) ||
        Boolean(benefitsMatch))
    );
  });

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const handlePrevImage = (e: React.MouseEvent, id: string, total: number) => {
    e.stopPropagation();
    setImageIndices((prev) => ({
      ...prev,
      [id]: (prev[id] ?? 0) > 0 ? (prev[id] ?? 0) - 1 : total - 1,
    }));
  };

  const handleNextImage = (e: React.MouseEvent, id: string, total: number) => {
    e.stopPropagation();
    setImageIndices((prev) => ({
      ...prev,
      [id]: (prev[id] ?? 0) < total - 1 ? (prev[id] ?? 0) + 1 : 0,
    }));
  };

  const toggleWishlist = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setWishlist((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const formatPrice = (basePriceSar: number) => {
    const config = EXCHANGE_RATES[currency] ?? EXCHANGE_RATES.SAR;
    const converted = (basePriceSar * config.rate).toFixed(
      currency === "USD" ? 2 : 0
    );

    return currency === "USD"
      ? `${config.symbol}${converted}`
      : `${converted} ${config.symbol}`;
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Glowin, I'm looking for ${searchQuery}. Is it available?`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}?text=${whatsappMessage}`;

  return (
    <section className="py-6 md:py-10 px-4 md:px-6 max-w-6xl mx-auto" dir={isArabic ? "rtl" : "ltr"}>
      {/* Category Tabs */}
      <div className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
        {CATEGORIES.map((cat) => {
          const isActive =
            activeCategory.toLowerCase() === cat.id.toLowerCase() ||
            (cat.id === "all" && activeCategory.toLowerCase() === "all products");

          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                isActive
                  ? "bg-[#2C2623] text-white shadow-sm"
                  : "bg-white border border-[#EAE3D2] text-[#6B6155] hover:border-[#C5A880]"
              }`}
            >
              {isArabic ? cat.labelAr : cat.labelEn}
            </button>
          );
        })}
      </div>

      <div className="w-full border-b border-[#EAE3D2] my-4 md:my-6" />

      {/* Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="py-12 md:py-20 flex flex-col items-center justify-center text-center px-4">
          <p className="font-serif text-base md:text-lg text-[#8C827A] mb-8 md:mb-12">
            {isArabic ? ".لم نجد نتائج" : "No treasures found."}
          </p>

          <h3 className="font-serif text-xl md:text-3xl text-[#2C2623] mb-2">
            {isArabic ? "لم تجد ما تبحث عنه؟" : "Can't find what you're looking for?"}
          </h3>
          <p className="text-xs md:text-sm text-[#8C827A] mb-6">
            {isArabic
              ? ".تواصل معنا وسنتحقق من التوفر لك"
              : "Message us and we'll check availability for you."}
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#2C2623] hover:bg-[#3D3734] text-white px-6 md:px-7 py-3 rounded-full text-xs font-semibold"
          >
            {isArabic ? "تواصل عبر واتساب ←" : "WHATSAPP US →"}
          </a>
        </div>
      ) : (
        /* Product Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {visibleProducts.map((product: any) => {
            const productImages = product.images && product.images.length > 0 ? product.images : [product.image || ""];
            const totalImages = productImages.length;
            const currentImageIdx = imageIndices[product.id] ?? 0;
            const currentImage = totalImages > 0 ? productImages[currentImageIdx] : "";
            const isLiked = wishlist[product.id] ?? false;

            const productName = isArabic
              ? product.name_ar || "كريم ناكيز لايفلي نوز بريميوم لإزالة الرؤوس السوداء"
              : product.name_en || product.name || "Nakiz Lively Nose Premium Blackhead Removal Cream";

            const categoryName = isArabic ? "العناية بالبشرة" : "SKINCARE";

            return (
              <div
                key={product.id}
                className="flex flex-col justify-between group cursor-pointer bg-white md:bg-transparent rounded-2xl md:rounded-none p-3 md:p-0 border border-[#EAE3D2] md:border-none shadow-sm md:shadow-none"
                onClick={() => setSelectedModalProduct(product)}
              >
                <div>
                  <div className="relative aspect-[4/3] rounded-xl md:rounded-2xl bg-[#F5F2EC] overflow-hidden mb-3 group/img">
                    {currentImage && (
                      <img
                        src={currentImage}
                        alt={productName}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    )}

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => toggleWishlist(e, product.id)}
                      className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
                      aria-label="Add to wishlist"
                    >
                      <svg
                        className={`w-4 h-4 transition-colors ${
                          isLiked ? "fill-red-500 text-red-500" : "fill-none text-stone-600"
                        }`}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                    </button>

                    {/* Image Navigation Controls */}
                    {totalImages > 1 && (
                      <>
                        <button
                          onClick={(e) => handlePrevImage(e, product.id, totalImages)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-100 md:opacity-0 group-hover/img:opacity-100 transition-opacity"
                        >
                          <svg
                            className={`w-3.5 h-3.5 ${isArabic ? "rotate-180" : ""}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => handleNextImage(e, product.id, totalImages)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-100 md:opacity-0 group-hover/img:opacity-100 transition-opacity"
                        >
                          <svg
                            className={`w-3.5 h-3.5 ${isArabic ? "rotate-180" : ""}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>

                  {/* Card Details */}
                  <div className="flex items-center justify-between text-[11px] text-[#A39281] font-bold uppercase tracking-wider mb-1">
                    <span>{product.size || "15G"}</span>
                  </div>

                  <h3 className="font-serif text-base md:text-lg text-[#2C2623] mb-3 leading-snug">
                    {productName}
                  </h3>
                </div>

                {/* Price and Add to Cart Button */}
                <div className="flex items-center justify-between pt-2 border-t border-[#EAE3D2]">
                  <span className="text-sm font-semibold text-[#2C2623]">
                    {formatPrice(product.price || product.price_sar || 34)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart?.(product, 1);
                    }}
                    className="border border-[#2C2623] text-[#2C2623] hover:bg-[#2C2623] hover:text-white px-3 md:px-4 py-1.5 rounded-full text-[11px] md:text-xs font-semibold transition-colors"
                  >
                    {isArabic ? "أضف للسلة" : "ADD TO CART"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Load More Button */}
      {visibleCount < filteredProducts.length && (
        <div className="mt-8 md:mt-12 flex justify-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="w-full sm:w-auto px-8 py-3 rounded-full border border-[#DCD5C5] text-xs font-semibold text-[#2C2623] hover:bg-[#2C2623] hover:text-white transition-colors text-center"
          >
            {isArabic ? "تحميل المزيد من المنتجات ←" : "LOAD MORE PRODUCTS →"}
          </button>
        </div>
      )}

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedModalProduct}
        onClose={() => setSelectedModalProduct(null)}
        onAddToCart={(qty) => {
          if (selectedModalProduct) {
            onAddToCart?.(selectedModalProduct, qty);
          }
        }}
        language={language}
      />
    </section>
  );
}