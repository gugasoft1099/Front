'use client';

import Link from 'next/link';
import { Heart, ShoppingCart, Trash2, Star } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { useToastStore } from '@/store/toastStore';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { formatPrice, calculateDiscount, formatDate } from '@/lib/utils';

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addItem);
  const addToast = useToastStore((state) => state.addToast);

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
    addToast('info', 'Removed from wishlist');
  };

  const handleClearWishlist = () => {
    if (confirm('Are you sure you want to clear your wishlist?')) {
      clearWishlist();
      addToast('info', 'Wishlist cleared');
    }
  };

  const handleAddToCart = (item: typeof items[0]) => {
    addToCart(item.product, 1);
    addToast('success', `${item.product.name} added to cart!`);
  };

  const handleAddAllToCart = () => {
    items.forEach((item) => {
      if (item.product.inStock) {
        addToCart(item.product, 1);
      }
    });
    addToast('success', 'All available items added to cart!');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <Heart className="w-24 h-24 mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your wishlist is empty</h1>
          <p className="text-gray-600 mb-6">
            Save your favorite products and never lose track of them!
          </p>
          <Link href="/catalog">
            <Button size="lg">Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
          <p className="text-gray-600">{items.length} item{items.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleAddAllToCart}>
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add All to Cart
          </Button>
          <Button variant="ghost" onClick={handleClearWishlist}>
            Clear All
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => {
          const discount = calculateDiscount(item.product.price, item.product.originalPrice);
          
          return (
            <Card key={item.product.id} className="group overflow-hidden flex flex-col">
              <div className="relative">
                <Link href={`/product/${item.product.slug}`}>
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {discount > 0 && (
                      <Badge variant="danger" className="absolute top-2 right-2">
                        -{discount}%
                      </Badge>
                    )}
                  </div>
                </Link>
                <button
                  onClick={() => handleRemoveItem(item.product.id)}
                  className="absolute top-2 left-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <p className="text-xs text-gray-500 mb-1">{item.product.brand}</p>
                <Link
                  href={`/product/${item.product.slug}`}
                  className="font-semibold mb-2 line-clamp-2 hover:text-blue-600"
                >
                  {item.product.name}
                </Link>

                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{item.product.rating}</span>
                  <span className="text-sm text-gray-500">({item.product.reviewCount})</span>
                </div>

                <p className="text-xs text-gray-500 mb-3">Added {formatDate(item.addedAt)}</p>

                <div className="mt-auto">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl font-bold">{formatPrice(item.product.price)}</span>
                    {item.product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(item.product.originalPrice)}
                      </span>
                    )}
                  </div>

                  {item.product.inStock ? (
                    <Button
                      className="w-full"
                      size="sm"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  ) : (
                    <Button className="w-full" size="sm" disabled>
                      Out of Stock
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
