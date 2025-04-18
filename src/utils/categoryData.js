// Categorías para ingresos y gastos
export const categories = [
  { id: "salary", name: "Salario", type: "income" },
  { id: "freelance", name: "Freelance", type: "income" },
  { id: "investment", name: "Inversiones", type: "income" },
  { id: "other-income", name: "Otros ingresos", type: "income" },
  { id: "food", name: "Comida", type: "expense" },
  { id: "transport", name: "Transporte", type: "expense" },
  { id: "housing", name: "Vivienda", type: "expense" },
  { id: "entertainment", name: "Entretenimiento", type: "expense" },
  { id: "health", name: "Salud", type: "expense" },
  { id: "education", name: "Educación", type: "expense" },
  { id: "shopping", name: "Compras", type: "expense" },
  { id: "other-expense", name: "Otros gastos", type: "expense" },
];

// Colores para las categorías
export const getCategoryColor = (categoryName) => {
  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#8AC24A",
    "#607D8B",
    "#E91E63",
    "#9C27B0",
    "#3F51B5",
    "#009688",
  ];

  const index = categories.findIndex((c) => c.name === categoryName);
  return colors[index % colors.length];
};
