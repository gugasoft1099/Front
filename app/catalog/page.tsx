'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Grid, List, SlidersHorizontal, Star, X } from 'lucide-react';
import { products, categories, brands } from '@/data/mockData';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { Product } from '@/types';

export default function CatalogPage() {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minRating, setMinRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Initialize from URL params
  useEffect(() => {
    const category = searchParams.get('category') || '';
    const search = searchParams.get('search') || '';
    setSelectedCategory(category);
    setSearchQuery(search);
  }, [searchParams]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory) {
      const categoryName = categories.find((c) => c.slug === selectedCategory)?.name;
      if (categoryName) {
        filtered = filtered.filter((p) => p.category === categoryName);
      }
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) => selectedBrands.includes(p.brand));
    }

    // Price range filter
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter((p) => p.rating >= minRating);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // featured
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedBrands, priceRange, minRating, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedBrands([]);
    setPriceRange([0, 1000]);
    setMinRating(0);
    setSearchQuery('');
  };

  const activeFiltersCount =
    (selectedCategory ? 1 : 0) +
    selectedBrands.length +
    (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0) +
    (minRating > 0 ? 1 : 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Filters</h2>
              {activeFiltersCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              )}
            </div>

            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-3">Category</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === ''}
                      onChange={() => setSelectedCategory('')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm">All Categories</span>
                  </label>
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category.slug}
                        onChange={() => setSelectedCategory(category.slug)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm">{category.name}</span>
                      <span className="text-xs text-gray-500">({category.productCount})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h3 className="font-semibold mb-3">Brand</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="text-sm">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      placeholder="Min"
                      className="text-sm"
                    />
                    <span>-</span>
                    <Input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      placeholder="Max"
                      className="text-sm"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Rating */}
              <div>
                <h3 className="font-semibold mb-3">Minimum Rating</h3>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        checked={minRating === rating}
                        onChange={() => setMinRating(rating)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{rating}+ Stars</span>
                      </div>
                    </label>
                  ))}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === 0}
                      onChange={() => setMinRating(0)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm">All Ratings</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">
                {searchQuery
                  ? `Search Results for "${searchQuery}"`
                  : selectedCategory
                  ? categories.find((c) => c.slug === selectedCategory)?.name
                  : 'All Products'}
              </h1>
              <p className="text-gray-600">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex-1 sm:flex-none"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="info" className="ml-2">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 flex-1 sm:flex-none"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name A-Z</option>
              </select>

              {/* View Mode Toggle */}
              <div className="hidden sm:flex border border-gray-300 rounded-md">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {searchQuery && (
                <Badge variant="info" className="flex items-center gap-2">
                  Search: {searchQuery}
                  <button onClick={() => setSearchQuery('')}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {selectedCategory && (
                <Badge variant="info" className="flex items-center gap-2">
                  {categories.find((c) => c.slug === selectedCategory)?.name}
                  <button onClick={() => setSelectedCategory('')}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {selectedBrands.map((brand) => (
                <Badge key={brand} variant="info" className="flex items-center gap-2">
                  {brand}
                  <button onClick={() => toggleBrand(brand)}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Products */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg mb-4">No products found</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredProducts.map((product) =>
                viewMode === 'grid' ? (
                  <ProductCardGrid key={product.id} product={product} />
                ) : (
                  <ProductCardList key={product.id} product={product} />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductCardGrid({ product }: { product: Product }) {
  const discount = calculateDiscount(product.price, product.originalPrice);

  return (
    <Link href={`/product/${product.slug}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
        <div className="aspect-square relative overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {discount > 0 && (
            <Badge variant="danger" className="absolute top-2 right-2">
              -{discount}%
            </Badge>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <Badge variant="default">Out of Stock</Badge>
            </div>
          )}
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
          <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-blue-600">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-gray-500">({product.reviewCount})</span>
          </div>
          <div className="mt-auto">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

function ProductCardList({ product }: { product: Product }) {
  const discount = calculateDiscount(product.price, product.originalPrice);

  return (
    <Link href={`/product/${product.slug}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
        <div className="flex gap-4 p-4">
          <div className="w-48 h-48 flex-shrink-0 relative overflow-hidden rounded">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {discount > 0 && (
              <Badge variant="danger" className="absolute top-2 right-2">
                -{discount}%
              </Badge>
            )}
          </div>
          <div className="flex-1 flex flex-col">
            <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
            <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600">
              {product.name}
            </h3>
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2 mb-4">{product.description}</p>
            <div className="mt-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              {product.inStock ? (
                <Badge variant="success">In Stock</Badge>
              ) : (
                <Badge variant="default">Out of Stock</Badge>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
