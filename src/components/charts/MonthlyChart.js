"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const MonthlyChart = ({ income, expenses, balance }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Destruir el gráfico anterior si existe
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Crear nuevo gráfico
    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Ingresos", "Gastos", "Balance"],
        datasets: [
          {
            label: "Monto",
            data: [income, expenses, balance],
            backgroundColor: [
              "rgba(75, 192, 192, 0.6)",
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
            ],
            borderColor: [
              "rgba(75, 192, 192, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
            ],
            borderWidth: 1,
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
        plugins: {
          legend: {
            display: false,
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
  }, [income, expenses, balance]);

  return <canvas ref={chartRef} />;
};

export default MonthlyChart;
