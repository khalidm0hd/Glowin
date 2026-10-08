"use client";

import React from "react";

const WHATSAPP_NUMBER = "+66908955177";

interface WhatsAppButtonProps {
  language?: "EN" | "AR";
}

export default function WhatsAppButton({ language = "EN" }: WhatsAppButtonProps) {
  const isRtl = language === "AR";

  const messageText = isRtl
    ? "مرحباً جلوين، لدي استفسار!"
    : "Hi Glowin, I have a question!";

  const tooltipText = isRtl ? "تحدث معنا" : "Chat with us";

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(messageText)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 group"
    >
      <svg
        className="w-6 h-6 sm:w-8 sm:h-8 fill-current"
        viewBox="0 0 24 24"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
      </svg>
      
      {/* Tooltip on Desktop Hover */}
      <span className="hidden md:group-hover:inline-block absolute right-16 bg-stone-900 text-white text-xs px-2.5 py-1 rounded-md shadow-md whitespace-nowrap transition-opacity duration-200">
        {tooltipText}
      </span>
    </a>
  );
}