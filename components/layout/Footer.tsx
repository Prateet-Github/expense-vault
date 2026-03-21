"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="px-6 py-12 max-w-7xl mx-auto border-t border-emerald-500">
      {/* Top Section */}
      <div className="grid md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-emerald-500 mb-4">
            Expense Tracker
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Track your expenses effortlessly with our intuitive and
            user-friendly expense tracker. Stay on top of your finances and make
            informed decisions with ease.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-emerald-500 font-semibold mb-4">Navigation</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-emerald-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="hover:text-emerald-500 transition"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/expenses"
                className="hover:text-emerald-500 transition"
              >
                Expenses
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-emerald-500 font-semibold mb-4">Connect</h3>
          <div className="flex items-center gap-4 text-gray-400">
            <a
              href="https://github.com/Prateet-Github"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-500 transition"
            >
              <Github size={20} />
            </a>
            <a
              href="https://x.com/prateet_tiwarii"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-500 transition"
            >
              <Twitter size={20} />
            </a>
            <a
              href="www.linkedin.com/in/prateet-tiwari"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-500 transition"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
        <div></div>
      </div>

      {/* Bottom Section */}
      <div className="pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Expense Tracker. Made by Prateet Tiwari.
      </div>
    </footer>
  );
};

export default Footer;
