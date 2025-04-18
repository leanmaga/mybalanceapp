"use client";

import Layout from "@/components/layout/Layout";
import BalanceSummary from "@/components/dashboard/BalanceSummary";
import QuickActions from "@/components/dashboard/QuickActions";
import TransactionsList from "@/components/dashboard/TransactionsList";

export default function Home() {
  return (
    <Layout>
      {/* Main Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <BalanceSummary />
        <QuickActions />
      </div>

      {/* Transactions List */}
      <TransactionsList />
    </Layout>
  );
}
