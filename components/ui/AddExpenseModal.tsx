"use client";

import { useState } from "react";
import { X } from "lucide-react";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

export default function AddExpenseModal({ onClose, onSuccess }: Props) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Other");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !amount) return;

    try {
      setLoading(true);

      await fetch("/api/expenses", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          amount: Number(amount),
          category,
        }),
      });

      onSuccess();
      onClose();
    } catch {
      console.error("Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      {/* Modal */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md space-y-5 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Add Expense</h2>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Inputs */}
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 rounded bg-black border border-zinc-700"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          className="w-full p-2 rounded bg-black border border-zinc-700"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          className="w-full p-2 rounded bg-black border border-zinc-700"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Food</option>
          <option>Transport</option>
          <option>Rent</option>
          <option>Entertainment</option>
          <option>Shopping</option>
          <option>Health</option>
          <option>Stationery</option>
          <option>Other</option>
        </select>

        {/* Action */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-emerald-600 py-2 rounded-lg text-black font-bold hover:bg-emerald-500 transition"
        >
          {loading ? "Adding..." : "Add Expense"}
        </button>
      </div>
    </div>
  );
}
