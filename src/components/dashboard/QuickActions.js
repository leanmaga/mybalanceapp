"use client";

import { useState } from "react";
import { useTransactions } from "@/context/TransactionContext";
import { categories } from "@/utils/categoryData";
import CategoriesBreakdown from "./CategoriesBreakdown";
import TransactionModal from "../modals/TransactionModal";
import SavingsPlan from "../savings/SavingsPlan";

const QuickActions = () => {
  const [modalType, setModalType] = useState(null);
  const [showSavingsPlan, setShowSavingsPlan] = useState(false);

  // Movido al nivel superior del componente para cumplir con las reglas de Hooks
  const { transactions, totals } = useTransactions();

  const openModal = (type) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  const toggleSavingsPlan = () => {
    setShowSavingsPlan(!showSavingsPlan);
  };

  const exportData = () => {
    // Ahora usamos totals y transactions del ámbito superior
    const { income, expenses, balance } = totals;

    const data = {
      transactions,
      categories,
      summary: {
        totalIncome: income,
        totalExpenses: expenses,
        balance: balance,
      },
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportName =
      "finanzas_" + new Date().toISOString().slice(0, 10) + ".json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportName);
    linkElement.click();
  };

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Acciones Rápidas</h2>
        <div className="space-y-4">
          <button
            onClick={() => openModal("income")}
            className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg transition"
          >
            <i className="fas fa-plus-circle"></i> Agregar Ingreso
          </button>
          <button
            onClick={() => openModal("expense")}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg transition"
          >
            <i className="fas fa-minus-circle"></i> Agregar Gasto
          </button>
          <button
            onClick={toggleSavingsPlan}
            className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition"
          >
            <i className="fas fa-piggy-bank"></i> Plan de Ahorro
          </button>
          <button
            onClick={exportData}
            className="w-full flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-lg transition"
          >
            <i className="fas fa-file-export"></i> Exportar Datos
          </button>
        </div>

        <CategoriesBreakdown />
      </div>

      {modalType && (
        <TransactionModal
          type={modalType}
          isOpen={Boolean(modalType)}
          onClose={closeModal}
        />
      )}

      {showSavingsPlan && <SavingsPlan />}
    </>
  );
};

export default QuickActions;
