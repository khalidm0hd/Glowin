export interface Product {
  id: string;
  nameEn: string;
  nameAr: string;
  subCatEn: string;
  subCatAr: string;
  category: "skincare" | "makeup" | "haircare" | "body" | "tools";
  priceSAR: number;
  priceUSD: number;
  priceTHB: number;
  descriptionEn: string;
  descriptionAr: string;
  benefitsEn: string;
  benefitsAr: string;
  howToApplyEn: string;
  howToApplyAr: string;
  images: string[];
}