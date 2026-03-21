"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp, Wallet, Shield } from "lucide-react";
import { FeatureCard } from "@/components/ui/FeatureCard";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* HERO */}
      <section className="flex items-center px-4 sm:px-6 lg:px-12 min-h-screen">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          {/* LEFT */}
          <div className="space-y-6 sm:space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
              Master Your <br />
              <span className="text-emerald-500">Money with</span>
              <br />
              <span className="text-emerald-500">Precision</span>
            </h1>

            <p className="text-zinc-400 text-base sm:text-lg max-w-md sm:max-w-lg">
              Track expenses, understand your habits, and gain clarity over your
              finances with a system designed for simplicity.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/signup"
                className="bg-emerald-600 hover:bg-emerald-500 text-black px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                Get Started <ArrowRight size={18} />
              </Link>

              <Link
                href="/signin"
                className="bg-zinc-900 border border-zinc-700 px-6 py-3 rounded-xl font-bold text-center"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative mt-10 lg:mt-0">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 sm:p-6 shadow-xl">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <div className="text-xs text-zinc-500 uppercase tracking-widest">
                  Portfolio
                </div>
                <div className="text-emerald-500 text-xs sm:text-sm flex items-center gap-1">
                  <TrendingUp size={14} /> +12.4%
                </div>
              </div>

              <div className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
                ₹84,295
              </div>

              <div className="flex items-end gap-1 sm:gap-2 h-32 sm:h-40">
                {[40, 65, 50, 85, 70, 100, 60].map((h, i) => (
                  <div
                    key={i}
                    className="w-full bg-emerald-500/80 rounded"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="absolute -top-10 -right-10 w-32 sm:w-40 h-32 sm:h-40 bg-emerald-500/10 blur-3xl rounded-full" />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="min-h-[70vh] px-4 sm:px-6 lg:px-12 flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-12 sm:mb-16">
            <div className="inline-flex px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold mb-4">
              Core Features
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold max-w-xl bg-linear-to-r from-slate-400 to-emerald-500 bg-clip-text text-transparent">
              Built for Real Financial Clarity
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <FeatureCard
              icon={<Wallet />}
              title="Track Expenses"
              desc="Log and manage your daily spending effortlessly."
            />
            <FeatureCard
              icon={<TrendingUp />}
              title="Analytics"
              desc="Understand where your money goes with insights."
            />
            <FeatureCard
              icon={<Shield />}
              title="Secure"
              desc="Your data is protected with secure authentication."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto bg-emerald-600 text-black p-6 sm:p-10 md:p-16 rounded-3xl">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start lg:items-center justify-between">
            <div className="text-left max-w-xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4">
                Ready to take control of your finances?
              </h2>

              <p className="text-black/80 text-sm sm:text-base">
                Track every expense, understand your spending patterns, and
                build smarter financial habits with a system designed for
                clarity and long-term growth.
              </p>
            </div>

            <Link
              href="/signup"
              className="bg-black text-emerald-500 px-6 sm:px-8 py-3 rounded-xl font-bold hover:scale-105 transition w-full sm:w-auto text-center"
            >
              Get Started →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
