'use client';

import Link from 'next/link';
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useUserStore } from '@/store/userStore';
import Badge from '@/components/ui/Badge';
import { categories } from '@/data/mockData';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const cartItemCount = useCartStore((state) => state.getItemCount());
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const { isAuthenticated, user } = useUserStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white text-sm">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <p>Free shipping on orders over $50!</p>
          <div className="flex gap-4">
            <Link href="/help" className="hover:underline">Help</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
            ShopHub
          </Link>

          {/* Search Bar (Desktop) */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </form>

          {/* Icons */}
          <div className="flex items-center gap-4">
            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Heart className="w-6 h-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* User */}
            <Link
              href={isAuthenticated ? '/account' : '/account/login'}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full" />
              ) : (
                <User className="w-6 h-6" />
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar (Mobile) */}
        <form onSubmit={handleSearch} className="md:hidden mt-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </form>
      </div>

      {/* Navigation */}
      <nav className={`border-t ${mobileMenuOpen ? 'block' : 'hidden md:block'}`}>
        <div className="container mx-auto px-4">
          <ul className="flex flex-col md:flex-row md:items-center md:gap-8 py-4">
            <li>
              <Link href="/catalog" className="block py-2 hover:text-blue-600 font-medium">
                All Products
              </Link>
            </li>
            {categories.slice(0, 5).map((category) => (
              <li key={category.id}>
                <Link
                  href={`/catalog?category=${category.slug}`}
                  className="block py-2 hover:text-blue-600"
                >
                  {category.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/catalog" className="block py-2 text-blue-600 font-medium">
                Shop Now →
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
