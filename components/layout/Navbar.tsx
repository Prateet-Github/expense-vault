"use client";

import { useAuth } from "@/hooks/useAuth";
import ProfileDropdown from "./ProfileDropDown";
import useClickOutside from "@/hooks/useClickOutside";
import { getInitials } from "@/utils/string";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user } = useAuth();

  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setDropdownOpen(false));

  useEffect(() => {
    setMounted(true);
  }, []);

  // lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  if (!mounted) return null;

  return (
    <header className="fixed bg-black top-0 left-0 w-full right-0  z-50">
      {/* NAV */}
      <nav className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto border-b border-emerald-500">
        {/* Logo */}
        <Link href="/" className="text-emerald-500 font-bold text-2xl">
          Expense Tracker
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-20 items-center">
          {/* Links */}
          <div className="flex gap-4">
            <Link href="/dashboard" className="text-emerald-500">
              Dashboard
            </Link>
            <Link href="/expenses" className="text-emerald-500">
              Expenses
            </Link>
          </div>

          {/* Right */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-black font-bold border hover:bg-emerald-400 transition"
              >
                {getInitials(user?.name || "User")}
              </button>

              {dropdownOpen && (
                <ProfileDropdown closeDropdown={() => setDropdownOpen(false)} />
              )}
            </div>
          ) : (
            <div className="flex gap-4">
              <Link
                href="/signup"
                className="border-2 border-emerald-600 hover:border-emerald-700 py-2 px-4 rounded-lg text-emerald-500"
              >
                Sign Up
              </Link>
              <Link
                href="/signin"
                className="bg-emerald-600 hover:bg-emerald-700 text-black py-2 px-4 rounded-lg"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className={`md:hidden text-white z-45 ${
            mobileOpen ? "fixed top-4 right-4" : ""
          }`}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 bg-black z-40 md:hidden transition-all duration-300 ${
          mobileOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full p-6 pt-24 gap-6">
          {/* Links */}
          <Link
            href="/dashboard"
            onClick={() => setMobileOpen(false)}
            className="text-xl text-emerald-500"
          >
            Dashboard
          </Link>

          <Link
            href="/expenses"
            onClick={() => setMobileOpen(false)}
            className="text-xl text-emerald-500"
          >
            Expenses
          </Link>

          {/* Bottom */}
          <div className="mt-auto">
            {user ? (
              <button className="w-full border border-rose-400 text-red-400 py-4 rounded-xl font-bold">
                Logout
              </button>
            ) : (
              <div className="flex flex-col gap-4">
                <Link
                  href="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="border border-emerald-500 py-3 text-center rounded-xl"
                >
                  Sign Up
                </Link>
                <Link
                  href="/signin"
                  onClick={() => setMobileOpen(false)}
                  className="bg-emerald-600 text-black py-3 text-center rounded-xl"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
