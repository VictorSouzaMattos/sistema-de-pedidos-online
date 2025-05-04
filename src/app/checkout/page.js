"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    nome: "",
    telefone: "",
    endereco: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // Carregar itens do carrinho do localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.preco * item.quantity,
    0
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      setMessage("Seu carrinho está vazio!");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      // Formatar items para o backend
      const items = cartItems.map((item) => ({
        itemId: item._id,
        nome: item.nome,
        quantidade: item.quantity,
        preco: item.preco,
      }));

      // Enviar pedido para o backend
      await axios.post("http://localhost:3000/api/orders", {
        cliente: customerInfo,
        items: items,
        total: total,
      });

      // Limpar carrinho após pedido bem sucedido
      localStorage.removeItem("cartItems");

      setMessage("Pedido realizado com sucesso!");
      setTimeout(() => {
        router.push("/confirmation");
      }, 2000);
    } catch (error) {
      console.error("Erro ao enviar pedido:", error);
      setMessage("Erro ao processar seu pedido. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-center mb-8">
          Finalizar Pedido
        </h1>

        {message && (
          <div
            className={`p-4 mb-6 rounded-lg ${
              message.includes("sucesso")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-xl">Seu carrinho está vazio!</p>
            <button
              onClick={() => router.push("/")}
              className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
            >
              Voltar para o Menu
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Resumo do Pedido */}
            <div>
              <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left">Item</th>
                      <th className="px-4 py-2 text-center">Qtd</th>
                      <th className="px-4 py-2 text-right">Preço</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item._id} className="border-t">
                        <td className="px-4 py-3">{item.nome}</td>
                        <td className="px-4 py-3 text-center">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-3 text-right">
                          R$ {(item.preco * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t bg-gray-50">
                      <td className="px-4 py-3 font-bold" colSpan="2">
                        Total
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-orange-600">
                        R$ {total.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Formulário de Cliente */}
            <div>
              <h2 className="text-xl font-bold mb-4">Dados para Entrega</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">Nome</label>
                  <input
                    type="text"
                    name="nome"
                    value={customerInfo.nome}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Telefone</label>
                  <input
                    type="tel"
                    name="telefone"
                    value={customerInfo.telefone}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">
                    Endereço de Entrega
                  </label>
                  <textarea
                    name="endereco"
                    value={customerInfo.endereco}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
                  ></textarea>
                </div>
                <div className="pt-4 flex gap-4">
                  <button
                    type="button"
                    onClick={() => router.push("/")}
                    className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                  >
                    Voltar ao Menu
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-70"
                  >
                    {isSubmitting ? "Processando..." : "Confirmar Pedido"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
