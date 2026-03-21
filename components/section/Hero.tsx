"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Hero = () => {
  const { user } = useAuth();

  return (
    <section className="flex items-center px-4 sm:px-6 lg:px-12 min-h-screen text-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
        
        {/* LEFT */}
        <div className="space-y-6 sm:space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold leading-tight tracking-tight">
            Master Your <br />
            <span className="text-emerald-500">Money with</span>
            <br />
            <span className="text-emerald-500">Precision</span>
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg max-w-md sm:max-w-lg">
            Track expenses, understand your habits, and gain clarity over your
            finances with a system designed for simplicity.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            
            {/* Primary Button */}
            <Link
              href={user ? "/dashboard" : "/signup"}
              className="bg-emerald-600 hover:bg-emerald-500 text-black px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              {user ? "Go to Dashboard" : "Get Started"}
              <ArrowRight size={18} />
            </Link>

            {/* Secondary Button (only if NOT logged in) */}
            {!user && (
              <Link
                href="/signin"
                className="bg-zinc-900 border border-zinc-700 px-6 py-3 rounded-xl font-bold text-center"
              >
                Sign In
              </Link>
            )}
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
  );
};

export default Hero;