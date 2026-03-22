"use client";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { useEffect, useState } from "react";
import { Wallet, TrendingUp, CreditCard, Plus, Loader2 } from "lucide-react";
import Link from "next/link";
import { MetricCard } from "@/components/ui/MetricCard";

interface ExpenseStat {
  _id: string;
  total: number;
}

interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

const COLORS = ["#10b981", "#22c55e", "#34d399", "#6ee7b7", "#a7f3d0"];

const TOOLTIP_STYLE = {
  backgroundColor: "#18181b",
  border: "1px solid #3f3f46",
  borderRadius: "8px",
  color: "#fff",
};

const CHART_FIXED_WIDTH = 560;

export default function Dashboard() {
  const [stats, setStats] = useState<ExpenseStat[]>([]);
  const [recentExpenses, setRecentExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDate(
      new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
    );

    const fetchDashboardData = async () => {
      try {
        const [statsRes, expensesRes] = await Promise.all([
          fetch("/api/expenses/stats", { credentials: "include" }),
          fetch("/api/expenses", { credentials: "include" }),
        ]);

        if (!statsRes.ok || !expensesRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const statsData = await statsRes.json();
        const expensesData = await expensesRes.json();

        setStats(
          Array.isArray(statsData)
            ? statsData.sort((a, b) => b.total - a.total)
            : [],
        );
        setRecentExpenses(
          Array.isArray(expensesData)
            ? expensesData
                .sort(
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime(),
                )
                .slice(0, 5)
            : [],
        );
      } catch {
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const totalSpent = stats.reduce((acc, curr) => acc + curr.total, 0);
  const chartData = stats.map((item) => ({
    name: item._id,
    value: item.total,
  }));

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-emerald-500" size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[80vh] flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 py-10 text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Financial Overview
          </h1>
          <p className="text-zinc-500 text-sm mt-1">{date}</p>
        </div>
        <Link
          href="/expenses"
          className="bg-emerald-600 hover:bg-emerald-500 text-black px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2"
        >
          <Plus size={18} /> Add Expense
        </Link>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <MetricCard
          title="Total Spent"
          value={`₹${totalSpent.toLocaleString()}`}
          icon={<Wallet size={20} />}
          color="emerald"
        />
        <MetricCard
          title="Top Category"
          value={stats[0]?._id || "No Data"}
          icon={<TrendingUp size={20} />}
          color="zinc"
        />
        <MetricCard
          title="Transactions"
          value={recentExpenses.length}
          icon={<CreditCard size={20} />}
          color="zinc"
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Recent Activity */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <Link
              href="/expenses"
              className="text-xs text-emerald-500 hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {recentExpenses.length > 0 ? (
              recentExpenses.map((exp) => (
                <div
                  key={exp._id}
                  className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-xl flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-sm">{exp.title}</p>
                    <p className="text-xs text-zinc-500">{exp.category}</p>
                  </div>
                  <p className="font-bold text-emerald-500">
                    ₹{exp.amount.toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-zinc-500 text-sm">No expenses yet.</p>
            )}
          </div>
        </section>

        {/* Charts */}
        <section>
          <h2 className="text-lg font-semibold mb-6">Spending Insights</h2>

          <div className="bg-zinc-900/20 border border-zinc-800 rounded-2xl overflow-x-auto">
            {stats.length > 0 && mounted ? (
              <div
                className="p-6 space-y-8"
                style={{ minWidth: `${CHART_FIXED_WIDTH + 48}px` }}
              >
                {/* Pie Chart */}
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest mb-3">
                    By Category
                  </p>
                  <PieChart width={CHART_FIXED_WIDTH} height={260}>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={90}
                      innerRadius={40}
                      paddingAngle={3}
                      labelLine={false}
                      label={(props) => {
                        const { name, percent, midAngle, cx, cy } = props;
                        if (
                          midAngle === undefined ||
                          cx === undefined ||
                          cy === undefined
                        )
                          return null;
                        const RADIAN = Math.PI / 180;
                        const radius = 115;
                        const lx = cx + radius * Math.cos(-midAngle * RADIAN);
                        const ly = cy + radius * Math.sin(-midAngle * RADIAN);
                        return (
                          <text
                            x={lx}
                            y={ly}
                            fill="#a1a1aa"
                            textAnchor={lx > cx ? "start" : "end"}
                            dominantBaseline="central"
                            fontSize={11}
                          >
                            {`${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                          </text>
                        );
                      }}
                    >
                      {chartData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={TOOLTIP_STYLE}
                      itemStyle={{ color: "#10b981" }}
                      labelStyle={{ color: "#ffffff" }}
                      formatter={(value) => [
                        `₹${Number(value).toLocaleString()}`,
                        "Amount",
                      ]}
                    />
                  </PieChart>
                </div>

                {/* Divider */}
                <div className="border-t border-zinc-800" />

                {/* Bar Chart */}
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest mb-3">
                    Spending Breakdown
                  </p>
                  <BarChart
                    width={CHART_FIXED_WIDTH}
                    height={260}
                    data={chartData}
                    margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                  >
                    <XAxis
                      dataKey="name"
                      stroke="#888"
                      tick={{ fontSize: 11 }}
                    />
                    <YAxis stroke="#888" width={40} tick={{ fontSize: 11 }} />
                    <Tooltip
                      contentStyle={TOOLTIP_STYLE}
                      itemStyle={{ color: "#10b981" }}
                      labelStyle={{ color: "#ffffff" }}
                      formatter={(value) => [
                        `₹${Number(value).toLocaleString()}`,
                        "Amount",
                      ]}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {chartData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <p className="text-zinc-500 text-sm text-center">
                  Add expenses to see charts
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
