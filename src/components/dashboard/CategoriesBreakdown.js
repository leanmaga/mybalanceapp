"use client";

import { useTransactions } from "@/context/TransactionContext";
import { calculateCategoryTotals } from "@/utils/calculations";
import { getCategoryColor } from "@/utils/categoryData";
import { formatCurrency } from "@/utils/formatters";

const CategoriesBreakdown = () => {
  const { transactions, totals } = useTransactions();
  const { expenses } = totals;

  // Obtener transacciones de gastos
  const expenseTransactions = transactions.filter((t) => t.type === "expense");

  // Calcular totales por categoría
  const categoryTotals = calculateCategoryTotals(transactions);

  // Ordenar por monto (mayor a menor)
  const sortedCategories = Object.entries(categoryTotals)
    .filter(([_, amount]) => amount > 0)
    .sort((a, b) => b[1] - a[1]);

  if (expenseTransactions.length === 0) {
    return (
      <div className="mt-8">
        <h3 className="font-medium mb-3">Gastos por Categoría</h3>
        <p className="text-gray-500 text-sm">No hay gastos registrados</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="font-medium mb-3">Gastos por Categoría</h3>
      <div className="space-y-2">
        {sortedCategories.map(([name, amount]) => {
          const percentage =
            expenses > 0 ? ((amount / expenses) * 100).toFixed(1) : 0;

          return (
            <div key={name} className="flex justify-between items-center">
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: getCategoryColor(name) }}
                ></div>
                <span className="text-sm">{name}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium">
                  {formatCurrency(amount)}
                </span>
                <span className="text-xs text-gray-500 ml-1">
                  {percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesBreakdown;
