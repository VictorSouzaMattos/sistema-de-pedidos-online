"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Cart({ cartItems, removeFromCart, clearCart }) {
  const router = useRouter();

  const total = cartItems.reduce(
    (sum, item) => sum + item.preco * item.quantity,
    0
  );

  if (!cartItems || cartItems.length === 0) {
    return null;
  }

  return (
    <aside className="fixed bottom-6 right-6 bg-white rounded-xl shadow-lg p-6 w-full max-w-sm z-50 border border-orange-100">
      <h3 className="text-xl font-semibold font-montserrat mb-4 text-gray-900">
        Sacola
      </h3>
      <ul className="mb-4">
        {cartItems.map((item) => (
          <li key={item._id} className="flex justify-between items-center mb-2">
            <span className="font-nunito font-semibold text-lg text-gray-800">
              {item.nome} x{item.quantity}
            </span>
            <div className="flex items-center gap-2">
              <span className="font-inter text-orange-600 text-lg">
                R$ {(item.preco * item.quantity).toFixed(2)}
              </span>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 hover:text-red-700 text-lg font-bold"
              >
                ×
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mb-4">
        <span className="font-nunito text-gray-700 text-lg">Total:</span>
        <span className="font-inter font-semibold text-orange-600 text-lg">
          R$ {total.toFixed(2)}
        </span>
      </div>
      <button
        onClick={clearCart}
        className="w-full mb-2 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition"
      >
        Limpar Carrinho
      </button>
      <button
        onClick={() => router.push("/checkout")}
        className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-600 transition text-lg"
      >
        Finalizar Pedido
      </button>
    </aside>
  );
}
