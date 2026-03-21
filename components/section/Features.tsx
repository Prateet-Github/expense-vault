import {
  TrendingUp,
  Wallet,
  Shield,
  Target,
  BarChart3,
  Zap,
} from "lucide-react";
import { FeatureCard } from "@/components/ui/FeatureCard";

const Features = () => {
  return (
    <section className="min-h-[70vh] px-4 sm:px-6 lg:px-12 flex items-center text-white">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-12 sm:mb-16">
          <div className="inline-flex px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold mb-4">
            Core Features
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold max-w-xl bg-linear-to-r from-white to-emerald-500 bg-clip-text text-transparent">
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
          <FeatureCard
            icon={<Target />}
            title="Budget Control"
            desc="Set spending limits and stay within budget with real-time tracking and smart alerts."
          />

          <FeatureCard
            icon={<BarChart3 />}
            title="Insights & Reports"
            desc="Get detailed reports and visualize your spending trends to make better financial decisions."
          />

          <FeatureCard
            icon={<Zap />}
            title="Fast & Reliable"
            desc="Experience a smooth and secure system built for performance, scalability, and real-world use."
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
