"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function MenuList({ addToCart, selectedCategory }) {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/menu`)
      .then((response) => setMenuItems(response.data))
      .catch((error) => console.error("Erro ao buscar itens:", error));
  }, []);

  const filteredItems = menuItems.filter(
    (item) => item.categoria === selectedCategory
  );

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 max-w-4xl mx-auto">
      {filteredItems.map((item) => (
        <div
          key={item._id}
          className="flex flex-col md:flex-row items-start justify-between p-6 bg-white rounded-xl shadow-md gap-6 md:gap-8"
        >
          {/* Imagem do prato */}
          {item.imagem && (
            <img
              src={item.imagem}
              alt={item.nome}
              className="w-40 h-28 object-cover rounded-lg mb-2 self-center"
              style={{ maxWidth: "160px", maxHeight: "112px" }}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/160x112?text=Sem+Imagem";
              }}
            />
          )}

          <div className="flex-1 flex flex-col justify-center text-left">
            <h2 className="text-2xl md:text-3xl font-bold font-nunito text-gray-900">
              {item.nome}
            </h2>
            <p className="font-nunito text-lg md:text-xl text-gray-700 mt-2">
              {item.descricao}
            </p>
            <p className="text-xl md:text-2xl font-inter font-bold text-orange-600 mt-2">
              R$ {item.preco?.toFixed(2)}
            </p>
            <button
              onClick={() => addToCart(item)}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-bold transition self-start"
            >
              Adicionar
            </button>
          </div>
        </div>
      ))}
      {filteredItems.length === 0 && (
        <div className="text-center text-gray-500 text-lg">
          Nenhum prato nesta categoria.
        </div>
      )}
    </div>
  );
}
