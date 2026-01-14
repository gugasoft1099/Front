'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Star, Heart, ShoppingCart, Minus, Plus, Check } from 'lucide-react';
import { products } from '@/data/mockData';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useToastStore } from '@/store/toastStore';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { formatPrice, calculateDiscount } from '@/lib/utils';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const product = products.find((p) => p.slug === slug);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const addToCart = useCartStore((state) => state.addItem);
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlistStore();
  const addToast = useToastStore((state) => state.addToast);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link href="/catalog">
          <Button>Back to Catalog</Button>
        </Link>
      </div>
    );
  }

  const discount = calculateDiscount(product.price, product.originalPrice);
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      addToast('error', 'Please select a color');
      return;
    }
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      addToast('error', 'Please select a size');
      return;
    }

    addToCart(product, quantity, selectedColor, selectedSize);
    addToast('success', `${product.name} added to cart!`);
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      addToast('info', 'Removed from wishlist');
    } else {
      addToWishlist(product);
      addToast('success', 'Added to wishlist!');
    }
  };

  const incrementQuantity = () => {
    if (quantity < product.stockCount) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <Link href="/catalog" className="hover:text-blue-600">Catalog</Link>
        <span>/</span>
        <Link href={`/catalog?category=${product.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="hover:text-blue-600">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square relative overflow-hidden rounded-lg mb-4 bg-gray-100">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {discount > 0 && (
              <Badge variant="danger" className="absolute top-4 right-4 text-base px-3 py-1">
                -{discount}% OFF
              </Badge>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-gray-600">({product.reviewCount} reviews)</span>
            </div>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl font-bold">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            {product.inStock ? (
              <Badge variant="success" className="text-sm">In Stock ({product.stockCount} available)</Badge>
            ) : (
              <Badge variant="danger" className="text-sm">Out of Stock</Badge>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3">
                Color: {selectedColor && <span className="font-normal text-gray-600">{selectedColor}</span>}
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border-2 rounded-md transition-colors ${
                      selectedColor === color
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3">
                Size: {selectedSize && <span className="font-normal text-gray-600">{selectedSize}</span>}
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border-2 rounded-md transition-colors ${
                      selectedSize === size
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Quantity</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-6 py-2 font-semibold">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stockCount}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-sm text-gray-600">
                {product.stockCount} items available
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-6">
            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1"
            >
              <ShoppingCart className="mr-2 w-5 h-5" />
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant={isWishlisted ? 'secondary' : 'outline'}
              onClick={handleWishlistToggle}
            >
              <Heart
                className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
              />
            </Button>
          </div>

          {/* Features */}
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Free shipping on orders over $50</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-sm">30-day return policy</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Secure payment</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Customer support 24/7</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Related Products */}
      <section>
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products
            .filter((p) => p.category === product.category && p.id !== product.id)
            .slice(0, 4)
            .map((relatedProduct) => (
              <Link key={relatedProduct.id} href={`/product/${relatedProduct.slug}`}>
                <Card className="group overflow-hidden hover:shadow-lg transition-shadow h-full">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-blue-600">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{relatedProduct.rating}</span>
                    </div>
                    <span className="font-bold">{formatPrice(relatedProduct.price)}</span>
                  </div>
                </Card>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
