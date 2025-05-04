"use client";

import React from "react";

export default function CategoryTabs({ selectedCategory, onSelectCategory }) {
  const categories = [
    { id: "Pratos principais", name: "Pratos Principais", icon: "🍽️" },
    { id: "Bebidas", name: "Bebidas", icon: "🥤" },
    { id: "Sobremesas", name: "Sobremesas", icon: "🍰" },
    { id: "Pratos especiais", name: "Especiais", icon: "✨" },
  ];

  return (
    <div className="w-full bg-orange-100 p-4 sticky top-0 z-10 shadow-sm">
      <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm md:text-base transition-colors ${
              selectedCategory === category.id
                ? "bg-orange-500 text-white font-bold"
                : "bg-white text-orange-700 hover:bg-orange-200"
            }`}
          >
            <span className="mr-1">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
