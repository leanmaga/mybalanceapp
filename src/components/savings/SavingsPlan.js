"use client";

import { useTransactions } from "@/context/TransactionContext";
import SavingsChart from "../charts/SavingsChart";
import {
  calculateSavingsRate,
  calculateSavingsProjection,
} from "@/utils/calculations";

const SavingsPlan = () => {
  const { totals } = useTransactions();
  const { income, expenses, balance } = totals;

  // Calcular tasa de ahorro
  const savingsRate = calculateSavingsRate(balance, income);

  // Calcular proyección de ahorro
  const projectionData = calculateSavingsProjection(balance);

  // Calcular ahorro anual proyectado
  const yearlySavings = balance * 12;

  const recommendations = [
    {
      icon: "piggy-bank",
      color: "blue",
      title: "Tasa de ahorro",
      content: `Actualmente ahorras el ${savingsRate}% de tus ingresos.`,
    },
    {
      icon: "lightbulb",
      color: "yellow",
      title: "Consejo de ahorro",
      content: "Intenta ahorrar al menos el 20% de tus ingresos cada mes.",
    },
    {
      icon: "chart-line",
      color: "green",
      title: "Proyección anual",
      content: `Si mantienes este ritmo, podrías ahorrar $${yearlySavings.toFixed(
        2
      )} este año.`,
    },
  ];

  // Si no hay balance positivo, mostrar alerta
  if (balance <= 0) {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 animate-fadeIn">
        <div className="p-6 border-b bg-gradient-to-r from-blue-500 to-blue-700 text-white">
          <h2 className="text-xl font-semibold">
            Plan de Ahorro Personalizado
          </h2>
        </div>
        <div className="p-6">
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0 text-red-600">
                <i className="fas fa-exclamation-circle"></i>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  Estás gastando más de lo que ganas. Considera reducir gastos o
                  aumentar ingresos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 animate-fadeIn">
      <div className="p-6 border-b bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <h2 className="text-xl font-semibold">Plan de Ahorro Personalizado</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-3">Recomendaciones</h3>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div
                  key={index}
                  className={`bg-${rec.color}-50 border-l-4 border-${rec.color}-500 p-4`}
                >
                  <div className="flex">
                    <div className={`flex-shrink-0 text-${rec.color}-600`}>
                      <i className={`fas fa-${rec.icon}`}></i>
                    </div>
                    <div className="ml-3">
                      <h4
                        className={`text-sm font-medium text-${rec.color}-800`}
                      >
                        {rec.title}
                      </h4>
                      <p className={`text-sm text-${rec.color}-700`}>
                        {rec.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-800 mb-2">
                  Consejos para ahorrar más:
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  <li>
                    Revisa tus gastos en Entretenimiento y Compras para posibles
                    reducciones
                  </li>
                  <li>
                    Considera automatizar tus ahorros al recibir tu salario
                  </li>
                  <li>
                    Establece metas de ahorro específicas (ej: vacaciones,
                    emergencias)
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-3">Proyección de Ahorro</h3>
            <div className="h-64">
              <SavingsChart projectionData={projectionData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsPlan;
