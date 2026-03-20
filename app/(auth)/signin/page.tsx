"use client";

import Link from "next/link";
import { Lock, Mail } from "lucide-react";

export default function Signup() {
  return (
    <main className="flex min-h-screen bg-zinc-950 overflow-hidden">
      <section className="w-full flex items-center justify-center px-8 lg:px-24 py-12">
        <div className="w-full max-w-md space-y-10">
          {/* Heading */}
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight mb-3">
              Welcome <span className="text-emerald-700">back</span>
            </h1>
            <p className="text-zinc-400">
              Continue where you left off. Sign in to access your dashboard and
              manage your expenses.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <div className="space-y-4">
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-500 transition-colors w-5 h-5" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="bg-zinc-900/40 border border-zinc-800 hover:border-zinc-600 p-4 pl-12 rounded-2xl w-full text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-500 transition-colors w-5 h-5" />
                <input
                  type="password"
                  placeholder="Password"
                  className="bg-zinc-900/40 border border-zinc-800 hover:border-zinc-600 p-4 pl-12 rounded-2xl w-full text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            {/* Button */}
            <button className="flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-black p-4 rounded-2xl w-full font-bold transition-all active:scale-[0.98] shadow-[0_10px_20px_-10px_rgba(34,197,94,0.4)]">
              Create your account
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-zinc-500 text-sm">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-emerald-500 hover:text-emerald-600 underline font-semibold transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
