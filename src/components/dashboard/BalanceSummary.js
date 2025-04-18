"use client";

import { useTransactions } from "@/context/TransactionContext";
import { formatCurrency } from "@/utils/formatters";
import MonthlyChart from "../charts/MonthlyChart";

const BalanceSummary = () => {
  const { totals } = useTransactions();
  const { income, expenses, balance } = totals;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md col-span-1 lg:col-span-2">
      <h2 className="text-xl font-semibold mb-4">Resumen Mensual</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
          <p className="text-sm text-gray-600">Ingresos</p>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(income)}
          </p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
          <p className="text-sm text-gray-600">Gastos</p>
          <p className="text-2xl font-bold text-red-600">
            {formatCurrency(expenses)}
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <p className="text-sm text-gray-600">Balance</p>
          <p
            className={`text-2xl font-bold ${
              balance < 0 ? "text-red-600" : "text-blue-600"
            }`}
          >
            {formatCurrency(balance)}
          </p>
        </div>
      </div>
      <div className="h-64 mt-6">
        <MonthlyChart income={income} expenses={expenses} balance={balance} />
      </div>
    </div>
  );
};

export default BalanceSummary;
