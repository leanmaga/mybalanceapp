"use client";

import { getCurrentMonthYear } from "@/utils/formatters";

const Header = () => {
  const currentMonth = getCurrentMonthYear();

  return (
    <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl p-6 mb-8 shadow-lg">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Balance Financiero</h1>
          <p className="opacity-90">Controla tus ingresos y gastos mensuales</p>
        </div>
        <div className="bg-white text-blue-800 px-4 py-2 rounded-lg font-semibold">
          <span className="text-xl">{currentMonth}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
