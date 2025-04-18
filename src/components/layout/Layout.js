"use client";

import Header from "./Header";
import { TransactionProvider } from "@/context/TransactionContext";

const Layout = ({ children }) => {
  return (
    <TransactionProvider>
      <div className="container mx-auto px-4 py-8">
        <Header />
        {children}
      </div>
    </TransactionProvider>
  );
};

export default Layout;
