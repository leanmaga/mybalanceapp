"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const MONTHS = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

const SavingsChart = ({ projectionData = [] }) => {
  console.log(projectionData);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // No hacer nada si chartRef no está disponible o projectionData no es un array
    if (!chartRef.current || !Array.isArray(projectionData)) {
      return;
    }

    // Asegurar que los datos son números
    const validData = projectionData.map((value) =>
      typeof value === "number" ? value : 0
    );

    // Destruir el gráfico anterior si existe
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Crear nuevo gráfico
    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: MONTHS,
        datasets: [
          {
            label: "Ahorro Acumulado",
            data: validData,
            fill: true,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      // Limpieza al desmontar
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [projectionData]);

  // Agregar un mensaje si no hay canvas o datos
  if (!Array.isArray(projectionData) || projectionData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center">
        <p className="text-gray-500">No hay datos de proyección disponibles</p>
      </div>
    );
  }

  return <canvas ref={chartRef} />;
};

export default SavingsChart;
