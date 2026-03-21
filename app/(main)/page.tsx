"use client";

import Hero from "@/components/section/Hero";
import Features from "@/components/section/Features";
import Cta from "@/components/section/Cta";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <Cta />
    </div>
  );
}
