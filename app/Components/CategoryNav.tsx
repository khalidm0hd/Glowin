"use client";

import React from "react";

interface Category {
  id: string;
  name: string;
  nameAr: string;
}

interface CategoryNavProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  language: "EN" | "AR";
}

export function CategoryNav({
  categories,
  selectedCategory,
  onSelectCategory,
  language,
}: CategoryNavProps) {
  const isArabic = language === "AR";

  return (
    <div
      className="w-full flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-2 mb-4 sm:mb-6 no-scrollbar scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {categories.map((cat) => {
        const isActive = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-all duration-200 select-none ${
              isActive
                ? "bg-stone-900 text-white shadow-sm scale-105"
                : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200 hover:border-stone-300"
            }`}
          >
            {isArabic ? cat.nameAr : cat.name}
          </button>
        );
      })}
    </div>
  );
}