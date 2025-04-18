"use client";

import { useState } from "react";
import { useTransactions } from "@/context/TransactionContext";
import { categories } from "@/utils/categoryData";
import { getTodayFormatted } from "@/utils/formatters";

const TransactionModal = ({ type, isOpen, onClose }) => {
  const { addTransaction } = useTransactions();

  const [transactionData, setTransactionData] = useState({
    amount: "",
    description: "",
    category: "",
    date: getTodayFormatted(),
  });

  // Filtrar categorías según el tipo (ingreso o gasto)
  const filteredCategories = categories.filter((cat) => cat.type === type);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactionData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) || "" : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addTransaction({
      ...transactionData,
      type,
    });

    // Cerrar modal y resetear formulario
    onClose();
    setTransactionData({
      amount: "",
      description: "",
      category: "",
      date: getTodayFormatted(),
    });
  };

  if (!isOpen) return null;

  const modalTitle = type === "income" ? "Agregar Ingreso" : "Agregar Gasto";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{modalTitle}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Monto
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={transactionData.amount}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="0.00"
              step="0.01"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Descripción
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={transactionData.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ej: Salario, Comida, etc."
              required
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Categoría
            </label>
            <select
              id="category"
              name="category"
              value={transactionData.category}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Seleccionar categoría</option>
              {filteredCategories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Fecha
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={transactionData.date}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
