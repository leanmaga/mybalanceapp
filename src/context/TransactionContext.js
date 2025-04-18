"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
  calculateTotalIncome,
  calculateTotalExpenses,
  calculateBalance,
} from "@/utils/calculations";

// Crear el contexto
const TransactionContext = createContext();

// Hook personalizado para usar el contexto
export const useTransactions = () => {
  return useContext(TransactionContext);
};

// Proveedor del contexto
export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar las transacciones de localStorage al iniciar
  useEffect(() => {
    const loadTransactions = () => {
      try {
        const savedTransactions = localStorage.getItem("transactions");
        if (savedTransactions) {
          setTransactions(JSON.parse(savedTransactions));
        }
      } catch (error) {
        console.error("Error al cargar transacciones:", error);
        // En caso de error, inicializar con array vacío
        setTransactions([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Solo ejecutar en el cliente
    if (typeof window !== "undefined") {
      loadTransactions();
    } else {
      setIsLoading(false);
    }
  }, []);

  // Guardar las transacciones en localStorage cuando cambian
  useEffect(() => {
    if (!isLoading && typeof window !== "undefined") {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  }, [transactions, isLoading]);

  // Función para agregar una nueva transacción
  const addTransaction = (transaction) => {
    setTransactions((prev) => [
      ...prev,
      {
        ...transaction,
        id: Date.now().toString(), // Generar ID único
      },
    ]);
  };

  // Función para eliminar una transacción
  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // Calcular totales
  const totals = {
    income: calculateTotalIncome(transactions),
    expenses: calculateTotalExpenses(transactions),
    balance: calculateBalance(transactions),
  };

  // Valores que proveerá el contexto
  const value = {
    transactions,
    isLoading,
    totals,
    addTransaction,
    deleteTransaction,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};
