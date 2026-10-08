"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2200);

    const removeTimer = setTimeout(() => {
      setShouldRender(false);
    }, 2800);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] w-screen h-screen overflow-hidden bg-[#F8E3DD] flex items-center justify-center p-6 transition-opacity duration-700 ease-in-out ${
        isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <img
        src="/logo.jpg"
        alt="Glowin"
        className="w-full h-full object-contain object-center max-w-4xl max-h-[85vh]"
      />
    </div>
  );
}