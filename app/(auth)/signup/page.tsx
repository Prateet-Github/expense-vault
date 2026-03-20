"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import Link from "next/link";
import { Lock, Mail, UserRound } from "lucide-react";

export default function Signup() {
  const router = useRouter();
  const [loading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Something went wrong");
        return;
      }

      toast.success("Account created! Redirecting...");

      setTimeout(() => {
        router.push("/signin");
      }, 1000);
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen bg-zinc-950 overflow-hidden">
      <section className="w-full flex items-center justify-center px-8 lg:px-24 py-12">
        <div className="w-full max-w-md space-y-10">
          {/* Heading */}
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight mb-3">
              Create an <span className="text-emerald-700">Account</span>
            </h1>
            <p className="text-zinc-400">
              Want to be a creator? Join us now and start sharing.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="relative group">
                <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-500 transition-colors w-5 h-5" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Full Name"
                  className="bg-zinc-900/40 border border-zinc-800 hover:border-zinc-600 p-4 pl-12 rounded-2xl w-full text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                />
              </div>

              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-500 transition-colors w-5 h-5" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Email Address"
                  className="bg-zinc-900/40 border border-zinc-800 hover:border-zinc-600 p-4 pl-12 rounded-2xl w-full text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-500 transition-colors w-5 h-5" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Password"
                  className="bg-zinc-900/40 border border-zinc-800 hover:border-zinc-600 p-4 pl-12 rounded-2xl w-full text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-black p-4 rounded-2xl w-full font-bold transition-all active:scale-[0.98] shadow-[0_10px_20px_-10px_rgba(34,197,94,0.4)]"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-zinc-500 text-sm">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-emerald-500 hover:text-emerald-600 underline font-semibold transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
