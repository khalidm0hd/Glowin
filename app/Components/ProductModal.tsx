"use client";

import { useState, useEffect } from "react";

interface ProductModalProps {
  product: any;
  onClose: () => void;
  onAddToCart: (quantity: number) => void;
  language?: "EN" | "AR";
}

export default function ProductModal({
  product,
  onClose,
  onAddToCart,
  language = "EN",
}: ProductModalProps) {
  const [modalImageIndex, setModalImageIndex] = useState<number>(0);
  const [modalQuantity, setModalQuantity] = useState<number>(1);

  // Lock background page scroll when modal is active
  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [product]);

  useEffect(() => {
    if (product) {
      setModalImageIndex(0);
      setModalQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  const isArabic = language === "AR";

  const handleAddToCartSubmit = () => {
    onAddToCart(modalQuantity);
    onClose();
  };

  // Translated Product Title
  const productName =
    (isArabic ? product.name_ar : product.name_en) ||
    (isArabic
      ? "كريم ناكيز لايفلي نوز بريميوم لإزالة الرؤوس السوداء"
      : product.name || "Nakiz Lively Nose Premium Blackhead Removal Cream");

  // Description
  const descriptionText =
    (isArabic ? product.description_ar : product.description_en) ||
    product.description ||
    (isArabic
      ? "كريم إزالة الرؤوس السوداء الفعال لمنطقة الأنف والوجه. يساعد على تنظيف المسام بعمق والتخلص من الشوائب والدهون الزائدة بفعالية مع ترك البشرة ناعمة ونظيفة."
      : "An effective blackhead removal cream for the nose and T-zone. Helps deep clean pores, remove impurities, and control excess oil leaving skin smooth and clear.");

  // How to Apply Text ("Leave it..." placed right after "...gently." on the same line)
  const howToApplyText =
    (isArabic ? product.how_to_apply_ar || product.how_to_use_ar : product.how_to_apply_en || product.how_to_use_en) ||
    (isArabic
      ? "ضعي طبقة متساوية على الأنف أو المنطقة المرادة. ضعي الورقة المرفقة فوق الكريم واضغطي بلطف. انتظري 10 إلى 15 دقيقة حتى يجف تماماً.\nانزعي الورقة ببطء من الأسفل إلى الأعلى واغسلي المنطقة بالماء."
      : "Apply an even layer onto clean skin on the nose or target areas. Place the paper strip provided over the cream and press down gently. Leave it on for 10-15 minutes until completely dry.\nSlowly peel off the strip from bottom to top and rinse with water.");

  // Exactly 2 Key Benefits
  const defaultBenefits = isArabic
    ? [
        "يسحب الرؤوس السوداء والبيضاء والزيوت المتراكمة من أعماق المسام.",
        "يزيل الرؤوس السوداء والبيضاء بفعالية.",
      ]
    : [
        "Pulls out stubborn blackheads, whiteheads, and clogged oils from deep within the pores.",
        "Removes blackheads & whiteheads effectively.",
      ];

  const rawBenefits = (isArabic ? product.key_benefits_ar : product.key_benefits_en) || product.key_benefits;
  
  let benefitsList: string[] = defaultBenefits;

  if (rawBenefits) {
    if (Array.isArray(rawBenefits)) {
      benefitsList = rawBenefits;
    } else if (typeof rawBenefits === "string") {
      const parsed = rawBenefits
        .replace(/[\[\]]/g, "")
        .split(/[\bullet\•\n\r,]/g)
        .map((b) => b.replace(/"/g, "").trim())
        .filter(Boolean);

      if (parsed.length > 0) {
        benefitsList = parsed;
      }
    }
  }

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image || ""];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-[#FAF8F5] rounded-2xl sm:rounded-3xl max-w-3xl w-[95vw] sm:w-full h-[92vh] sm:h-auto sm:max-h-[90vh] overflow-y-auto p-4 sm:p-6 md:p-8 relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 text-stone-500 hover:text-black p-2 rounded-full hover:bg-stone-200/50 transition-colors z-10"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pt-6 sm:pt-0" dir={isArabic ? "rtl" : "ltr"}>
          {/* Gallery Section */}
          <div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-white mb-3 sm:mb-4 border border-[#EAE3D2]">
              <img
                src={images[modalImageIndex]}
                alt={productName}
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setModalImageIndex(idx)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      modalImageIndex === idx
                        ? "border-[#2C2623]"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Body Text Section */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Title */}
              <h2 className={`font-serif text-xl sm:text-2xl text-[#2C2623] mb-2 ${isArabic ? "text-right" : "text-left"}`}>
                {productName}
              </h2>

              {/* Price & Size */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-base font-semibold text-[#2C2623]">
                  {product.price || product.price_sar || 34} SAR
                </p>
                <span className="text-[11px] font-bold text-[#A39281] uppercase tracking-widest">
                  {product.size || "15G"}
                </span>
              </div>

              {/* Description Section */}
              <div className="mb-6">
                <h4 className={`text-xs font-bold text-[#2C2623] uppercase tracking-wider mb-1 ${isArabic ? "text-right" : "text-left"}`}>
                  {isArabic ? "الوصف" : "DESCRIPTION"}
                </h4>
                <p className={`text-xs text-[#6B6155] leading-relaxed whitespace-pre-line ${isArabic ? "text-right" : "text-left"}`}>
                  {descriptionText}
                </p>
              </div>

              {/* Quantity Selector & Add to Cart */}
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="flex items-center border border-[#DCD5C5] rounded-full px-3 py-1.5 bg-white shadow-sm">
                  <button
                    onClick={() => setModalQuantity((q) => Math.max(1, q - 1))}
                    className="text-base font-bold text-[#2C2623] hover:text-[#C5A880] px-2 leading-none transition-colors"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold text-[#2C2623] px-3">
                    {modalQuantity}
                  </span>
                  <button
                    onClick={() => setModalQuantity((q) => q + 1)}
                    className="text-base font-bold text-[#2C2623] hover:text-[#C5A880] px-2 leading-none transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCartSubmit}
                  className="flex-1 bg-[#2C2623] text-white py-2.5 rounded-full text-xs font-semibold hover:bg-[#3D3531] transition-colors uppercase tracking-wider text-center"
                >
                  {isArabic ? "أضف للسلة" : "ADD TO CART"}
                </button>
              </div>

              {/* Key Benefits & How to Apply Sections */}
              <div className="border-t border-[#EAE3D2] pt-4 space-y-4">
                {/* Key Benefits */}
                <div>
                  <h4 className={`text-xs font-bold text-[#2C2623] uppercase tracking-wider mb-2 ${isArabic ? "text-right" : "text-left"}`}>
                    {isArabic ? "الفوائد الرئيسية" : "KEY BENEFITS"}
                  </h4>
                  <ul className={`space-y-1.5 text-xs text-[#6B6155] leading-relaxed ${isArabic ? "pr-4 list-disc" : "pl-4 list-disc"}`}>
                    {benefitsList.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>

                {/* How to Apply */}
                <div className="border-t border-[#EAE3D2] pt-3">
                  <h4 className={`text-xs font-bold text-[#2C2623] uppercase tracking-wider mb-1 ${isArabic ? "text-right" : "text-left"}`}>
                    {isArabic ? "طريقة الاستخدام" : "HOW TO APPLY"}
                  </h4>
                  <p className={`text-xs text-[#6B6155] leading-relaxed whitespace-pre-line ${isArabic ? "text-right" : "text-left"}`}>
                    {howToApplyText}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}