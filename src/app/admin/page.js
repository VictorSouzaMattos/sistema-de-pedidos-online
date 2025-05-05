"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function AdminPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [menuItems, setMenuItems] = useState([]);
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
    categoria: "",
    imagem: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchMenuItems = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/menu`);
      setMenuItems(response.data);
    } catch (error) {
      console.error("Erro ao buscar itens do menu:", error);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchMenuItems();
  }, [fetchMenuItems]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/api/admin/menu/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post(`${API_URL}/api/admin/menu`, formData);
      }
      setFormData({
        nome: "",
        descricao: "",
        preco: "",
        categoria: "",
        imagem: "",
      });
      fetchMenuItems();
    } catch (error) {
      console.error("Erro ao salvar prato:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/admin/menu/${id}`);
      fetchMenuItems();
    } catch (error) {
      console.error("Erro ao excluir prato:", error);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item._id);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Área Administrativa</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Nome"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          className="block mb-2 p-2 border rounded w-full"
          required
        />
        <textarea
          placeholder="Descrição"
          value={formData.descricao}
          onChange={(e) =>
            setFormData({ ...formData, descricao: e.target.value })
          }
          className="block mb-2 p-2 border rounded w-full"
          required
        />
        <input
          type="number"
          placeholder="Preço"
          value={formData.preco}
          onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
          className="block mb-2 p-2 border rounded w-full"
          required
        />
        <input
          type="text"
          placeholder="Categoria"
          value={formData.categoria}
          onChange={(e) =>
            setFormData({ ...formData, categoria: e.target.value })
          }
          className="block mb-2 p-2 border rounded w-full"
          required
        />
        <input
          type="text"
          placeholder="URL da imagem"
          value={formData.imagem}
          onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
          className="block mb-2 p-2 border rounded w-full"
        />
        <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
          {editingId ? "Atualizar Prato" : "Adicionar Prato"}
        </button>
      </form>
      <ul>
        {menuItems.map((item) => (
          <li key={item._id} className="border p-4 mb-2 rounded shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold">{item.nome}</p>
                <p>{item.descricao}</p>
                <p className="text-orange-600">
                  R$ {Number(item.preco).toFixed(2)}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Excluir
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
