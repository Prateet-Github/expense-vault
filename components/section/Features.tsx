import { TrendingUp, Wallet, Shield } from "lucide-react";
import { FeatureCard } from "@/components/ui/FeatureCard";

const Features = () => {
  return (
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
  )
}

export default Features