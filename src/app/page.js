"use client";

import React, { useState, useEffect } from "react";
import MenuList from "./components/MenuList";
import Cart from "./components/Cart";

const categories = [
  "Pratos principais",
  "Sobremesas",
  "Bebidas",
  "Pratos especiais",
];

export default function Home() {
  // Controle para renderizar o Cart só no cliente
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Persistência do carrinho
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cartItems");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const found = prev.find((i) => i._id === item._id);
      if (found) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // Nova função para remover itens do carrinho
  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== itemId));
  };

  // Nova função para limpar o carrinho inteiro
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-orange-500 text-white py-6 shadow-md">
        <h1 className="text-center text-3xl md:text-4xl font-bold font-montserrat">
          Restaurante Menu
        </h1>
      </header>
      <nav className="flex gap-2 p-4 justify-center flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-lg font-semibold whitespace-nowrap transition 
              ${
                selectedCategory === category
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-orange-100"
              }`}
          >
            {category}
          </button>
        ))}
      </nav>
      <main>
        <MenuList addToCart={addToCart} selectedCategory={selectedCategory} />
        {isClient && (
          <Cart
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
          />
        )}
      </main>
    </div>
  );
}
