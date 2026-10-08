"use client";

import { useState, useEffect } from "react";
import Header, { CurrencyType } from "./Components/Header";
import Hero from "./Components/Hero";
import ProductList from "./Components/ProductList";
import ConciergeBanner from "./Components/ConciergeBanner";
import ValueProps from "./Components/ValueProps";
import ShippingLogistics from "./Components/ShippingLogistics";
import Footer from "./Components/Footer";
import WhatsAppButton from "./Components/WhatsAppButton";
import CartDrawer, { CartItem } from "./Components/CartDrawer";
import { getProductsFromSupabase, Product } from "./data/products";
import SplashScreen from "./Components/SplashScreen";


export default function Home() {
  const [language, setLanguage] = useState<"EN" | "AR">("EN");
  const [currency, setCurrency] = useState<CurrencyType>("SAR");

  // Active Category State
  const [selectedCategory, setSelectedCategory] = useState<string>("All Products");

  // Products State from Supabase
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(true);

  // Cart State (Initialized directly from localStorage if present)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("glowin_cart");
      if (savedCart) {
        try {
          return JSON.parse(savedCart);
        } catch (e) {
          console.error("Failed to parse cart from localStorage", e);
        }
      }
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState("");

  // Helper to map category ID from Header to display name in ProductList
  const handleCategorySelect = (categoryId: string) => {
    const categoryMap: Record<string, string> = {
      all: "All Products",
      skincare: "Skincare",
      makeup: "Makeup",
      haircare: "Haircare",
      bodycare: "Body Care",
      tools: "Tools & Brushes",
    };

    const targetCategory = categoryMap[categoryId.toLowerCase()] || categoryId;
    setSelectedCategory(targetCategory);
  };

  // Fetch Supabase Products on initial mount
  useEffect(() => {
    async function loadProducts() {
      setIsLoadingProducts(true);
      const data = await getProductsFromSupabase();
      setProducts(data);
      setIsLoadingProducts(false);
    }
    loadProducts();
  }, []);

  // Sync state if user opens direct URL hash (e.g. #skincare)
  useEffect(() => {
    const hash = window.location.hash.replace("#", "").toLowerCase();
    if (hash) {
      handleCategorySelect(hash);
    }
  }, []);

  // Mark hydration mount complete
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Save cart to LocalStorage ONLY after mount has completed
  useEffect(() => {
    if (isMounted && typeof window !== "undefined") {
      localStorage.setItem("glowin_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isMounted]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Handle Add to Cart using real Supabase product data
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    if (!product) return;

    const imageUrl =
      Array.isArray(product.images) && product.images.length > 0
        ? product.images[0]
        : (product as any).image || "";

    const newItem: CartItem = {
      id: product.id,
      name: (product as any).name || (product as any).name_en || "Product",
      price: product.price,
      image: imageUrl,
      quantity: quantity,
    };

    setCartItems((prev) => {
      const existing = prev.find((item) => String(item.id) === String(newItem.id));
      if (existing) {
        return prev.map((item) =>
          String(item.id) === String(newItem.id)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, newItem];
    });
  };

  const handleUpdateQuantity = (id: string | number, delta: number) => {
    setCartItems((prev) =>
      prev.reduce<CartItem[]>((acc, item) => {
        if (String(item.id) === String(id)) {
          const newQty = item.quantity + delta;
          if (newQty > 0) {
            acc.push({ ...item, quantity: newQty });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, [])
    );
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7]">

      <SplashScreen />  

      <Header
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        language={language}
        onLanguageChange={setLanguage}
        currency={currency}
        onCurrencyChange={setCurrency}
        onSelectCategory={handleCategorySelect}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Banner */}
      <Hero language={language} />

      {/* Product Section */}
      {isLoadingProducts ? (
        <div className="py-20 text-center text-gray-500">
          <p>Loading products...</p>
        </div>
      ) : (
        <ProductList
          products={products}
          searchQuery={searchQuery}
          language={language}
          currency={currency}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Concierge Banner */}
      <ConciergeBanner language={language} />

      {/* Value Props Section */}
      <ValueProps language={language} />

      {/* Shipping & Logistics Section */}
     <div id="shipping">
  <ShippingLogistics language={language} />
</div>

      {/* Footer */}
      <Footer 
        language={language} 
        onSelectCategory={handleCategorySelect} 
      />

      {/* Cart Slide-Over */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        language={language}
        currency={currency}
      />

      <WhatsAppButton language={language} />
    </main>
  );
}