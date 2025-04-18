// Formatea un número como moneda
export const formatCurrency = (amount) => {
  return `$${amount.toFixed(2)}`;
};

// Formatea una fecha a formato local español
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("es-ES");
};

// Obtiene el mes y año actual en formato español
export const getCurrentMonthYear = () => {
  const now = new Date();
  return new Intl.DateTimeFormat("es-ES", {
    month: "long",
    year: "numeric",
  }).format(now);
};

// Obtiene la fecha de hoy en formato YYYY-MM-DD para inputs de tipo date
export const getTodayFormatted = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
