"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Erro ao buscar pedidos:", err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pedidos Recebidos</h1>
      <ul>
        {orders.map((order) => (
          <li key={order._id} className="mb-4 p-4 border rounded">
            <p>
              <strong>Cliente:</strong> {order.cliente.nome}
            </p>
            <p>
              <strong>Telefone:</strong> {order.cliente.telefone}
            </p>
            <p>
              <strong>Endereço:</strong> {order.cliente.endereco}
            </p>
            <p>
              <strong>Itens:</strong>
            </p>
            <ul className="ml-4">
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.nome} (Qtd: {item.quantidade}) - R${" "}
                  {item.preco.toFixed(2)}
                </li>
              ))}
            </ul>
            <p>
              <strong>Total:</strong> R$ {order.total.toFixed(2)}
            </p>
            <p>
              <strong>Data:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
