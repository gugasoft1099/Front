"use client";

import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-blue-600">
              Dukanym
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#categories"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Kategoriýalar
            </a>
            <a
              href="#products"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Harytlar
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Biz barada
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Habarlaşmak
            </a>
          </div>

          {/* Search, Account, Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Gözleg..."
                className="border border-gray-300 rounded-lg px-4 py-2 w-48 focus:outline-none focus:border-blue-500"
              />
              <button className="absolute right-2 top-2.5 text-gray-400">
                🔍
              </button>
            </div>
            <button className="text-gray-700 hover:text-blue-600 transition">
              <span className="text-2xl">👤</span>
            </button>
            <button className="relative text-gray-700 hover:text-blue-600 transition">
              <span className="text-2xl">🛒</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <input
                type="text"
                placeholder="Gözleg..."
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              />
              <a
                href="#categories"
                className="text-gray-700 hover:text-blue-600 transition py-2"
              >
                Kategoriýalar
              </a>
              <a
                href="#products"
                className="text-gray-700 hover:text-blue-600 transition py-2"
              >
                Harytlar
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-blue-600 transition py-2"
              >
                Biz barada
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-blue-600 transition py-2"
              >
                Habarlaşmak
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
