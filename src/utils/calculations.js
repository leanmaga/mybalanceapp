// Calcula el total de ingresos de la lista de transacciones
export const calculateTotalIncome = (transactions) => {
  return transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
};

// Calcula el total de gastos de la lista de transacciones
export const calculateTotalExpenses = (transactions) => {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
};

// Calcula el balance (ingresos - gastos)
export const calculateBalance = (transactions) => {
  return (
    calculateTotalIncome(transactions) - calculateTotalExpenses(transactions)
  );
};

// Calcula el total por categoría
export const calculateCategoryTotals = (transactions) => {
  const categoryTotals = {};

  transactions.forEach((transaction) => {
    const { category, amount, type } = transaction;
    if (!categoryTotals[category]) {
      categoryTotals[category] = 0;
    }
    if (type === "expense") {
      categoryTotals[category] += amount;
    }
  });

  return categoryTotals;
};

// Calcula datos para proyección de ahorro
// En utils/calculations.js
export const calculateSavingsProjection = (monthlySavings) => {
  // Asegúrate de que monthlySavings sea un número
  const savings = typeof monthlySavings === "number" ? monthlySavings : 0;

  const projectionData = [];
  let accumulated = 0;

  for (let i = 0; i < 12; i++) {
    accumulated += savings;
    projectionData.push(accumulated > 0 ? accumulated : 0);
  }

  return projectionData;
};

// Calcula la tasa de ahorro (porcentaje del ingreso)
export const calculateSavingsRate = (balance, income) => {
  if (income === 0) return 0;
  return ((balance / income) * 100).toFixed(1);
};
