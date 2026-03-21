"use client";

import { useEffect, useState } from "react";
import { Trash2, Plus, Loader2 } from "lucide-react";
import Link from "next/link";
import AddExpenseModal from "@/components/ui/AddExpenseModal";

interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await fetch("/api/expenses", {
        credentials: "include",
      });

      const data = await res.json();

      const sorted = Array.isArray(data)
        ? data.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          )
        : [];

      setExpenses(sorted);
    } catch (err) {
      console.error("Failed to fetch expenses");
    } finally {
      setLoading(false);
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      await fetch(`/api/expenses/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      setExpenses((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-emerald-500" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-6 py-10 text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold">Your Expenses</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-black px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"
        >
          <Plus size={16} /> Add
        </button>
      </div>

      {/* List */}
      {expenses.length > 0 ? (
        <div className="space-y-3">
          {expenses.map((exp) => (
            <div
              key={exp._id}
              className="flex justify-between items-center p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/60 transition"
            >
              <div className="min-w-0">
                <p className="font-medium truncate">{exp.title}</p>
                <p className="text-xs text-zinc-500">
                  {exp.category} • {new Date(exp.date).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <p className="text-emerald-500 font-bold">
                  ₹{exp.amount.toLocaleString()}
                </p>

                <button
                  onClick={() => deleteExpense(exp._id)}
                  className="text-red-400 hover:text-red-300 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-zinc-800 rounded-2xl">
          <p className="text-zinc-500 mb-3">No expenses yet</p>
          <button
            onClick={() => setOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-black px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 mx-auto"
          >
            <Plus size={16} /> Add Your First Expense
          </button>
        </div>
      )}
      {open && (
        <AddExpenseModal
          onClose={() => setOpen(false)}
          onSuccess={fetchExpenses}
        />
      )}
    </div>
  );
}
