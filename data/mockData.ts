import { Product, Category, ShippingMethod, PaymentMethod } from '@/types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
    productCount: 156
  },
  {
    id: '2',
    name: 'Fashion',
    slug: 'fashion',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
    productCount: 342
  },
  {
    id: '3',
    name: 'Home & Garden',
    slug: 'home-garden',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    productCount: 198
  },
  {
    id: '4',
    name: 'Sports & Outdoors',
    slug: 'sports-outdoors',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop',
    productCount: 124
  },
  {
    id: '5',
    name: 'Books & Media',
    slug: 'books-media',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=300&fit=crop',
    productCount: 267
  },
  {
    id: '6',
    name: 'Toys & Games',
    slug: 'toys-games',
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=300&fit=crop',
    productCount: 89
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Noise-Canceling Headphones',
    slug: 'wireless-noise-canceling-headphones',
    description: 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and superior sound quality. Perfect for music lovers and frequent travelers.',
    price: 299.99,
    originalPrice: 399.99,
    category: 'Electronics',
    brand: 'AudioTech',
    rating: 4.7,
    reviewCount: 1243,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop'
    ],
    inStock: true,
    stockCount: 45,
    colors: ['Black', 'Silver', 'Blue'],
    tags: ['wireless', 'audio', 'premium'],
    featured: true
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    slug: 'smart-watch-pro',
    description: 'Advanced smartwatch with health tracking, GPS, water resistance, and week-long battery life. Stay connected and healthy.',
    price: 349.99,
    originalPrice: 449.99,
    category: 'Electronics',
    brand: 'TechWear',
    rating: 4.5,
    reviewCount: 892,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&h=600&fit=crop'
    ],
    inStock: true,
    stockCount: 32,
    colors: ['Black', 'Silver', 'Rose Gold'],
    tags: ['smartwatch', 'fitness', 'tech'],
    featured: true
  },
  {
    id: '3',
    name: 'Ultra HD 4K Camera',
    slug: 'ultra-hd-4k-camera',
    description: 'Professional-grade 4K camera with image stabilization, 20MP sensor, and versatile lens options. Capture stunning photos and videos.',
    price: 899.99,
    category: 'Electronics',
    brand: 'PhotoPro',
    rating: 4.8,
    reviewCount: 456,
    images: [
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606980707617-e3c6296a7b78?w=600&h=600&fit=crop'
    ],
    inStock: true,
    stockCount: 18,
    colors: ['Black'],
    tags: ['camera', 'photography', 'professional'],
    featured: true
  },
  {
    id: '4',
    name: 'Designer Leather Jacket',
    slug: 'designer-leather-jacket',
    description: 'Genuine leather jacket with premium craftsmanship. Timeless style that never goes out of fashion. Available in multiple sizes.',
    price: 249.99,
    originalPrice: 349.99,
    category: 'Fashion',
    brand: 'UrbanStyle',
    rating: 4.6,
    reviewCount: 324,
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1520975867597-0af37a22e31e?w=600&h=600&fit=crop'
    ],
    inStock: true,
    stockCount: 28,
    colors: ['Black', 'Brown'],
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['fashion', 'leather', 'jacket'],
    featured: false
  },
  {
    id: '5',
    name: 'Running Sneakers Pro',
    slug: 'running-sneakers-pro',
    description: 'High-performance running shoes with cushioned sole and breathable mesh. Ideal for marathon runners and fitness enthusiasts.',
    price: 129.99,
    category: 'Fashion',
    brand: 'SportFit',
    rating: 4.4,
    reviewCount: 567,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&h=600&fit=crop'
    ],
    inStock: true,
    stockCount: 64,
    colors: ['White', 'Black', 'Blue', 'Red'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    tags: ['shoes', 'running', 'sports'],
    featured: false
  },
  {
    id: '6',
    name: 'Ergonomic Office Chair',
    slug: 'ergonomic-office-chair',
    description: 'Premium office chair with lumbar support, adjustable height, and breathable mesh back. Perfect for long work hours.',
    price: 399.99,
    originalPrice: 499.99,
    category: 'Home & Garden',
    brand: 'ComfortPro',
    rating: 4.7,
    reviewCount: 789,
    images: [
      'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=600&h=600&fit=crop'
    ],
    inStock: true,
    stockCount: 23,
    colors: ['Black', 'Gray'],
    tags: ['furniture', 'office', 'ergonomic'],
    featured: true
  },
  {
    id: '7',
    name: 'Modern Table Lamp',
    slug: 'modern-table-lamp',
    description: 'Elegant minimalist table lamp with adjustable brightness and USB charging port. Perfect for bedside or desk.',
    price: 79.99,
    category: 'Home & Garden',
    brand: 'LightHouse',
    rating: 4.3,
    reviewCount: 234,
    images: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=600&fit=crop'
    ],
    inStock: true,
    stockCount: 156,
    colors: ['White', 'Black', 'Gold'],
    tags: ['lighting', 'home', 'decor'],
    featured: false
  },
  {
    id: '8',
    name: 'Yoga Mat Premium',
    slug: 'yoga-mat-premium',
    description: 'Extra thick yoga mat with non-slip surface and carrying strap. Perfect for yoga, pilates, and floor exercises.',
    price: 49.99,
    category: 'Sports & Outdoors',
    brand: 'FitZone',
    rating: 4.5,
    reviewCount: 445,
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=600&fit=crop'
    ],
    inStock: true,
    stockCount: 89,
    colors: ['Purple', 'Blue', 'Pink', 'Black'],
    tags: ['yoga', 'fitness', 'exercise'],
    featured: false
  },
  {
    id: '9',
    name: 'Camping Tent 4-Person',
    slug: 'camping-tent-4-person',
    description: 'Spacious waterproof tent with easy setup. Includes carrying bag and stakes. Perfect for family camping trips.',
    price: 199.99,
    category: 'Sports & Outdoors',
    brand: 'OutdoorLife',
    rating: 4.6,
    reviewCount: 312,
    images: [
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&h=600&fit=crop'
    ],
    inStock: true,
    stockCount: 34,
    colors: ['Green', 'Orange'],
    tags: ['camping', 'outdoor', 'tent'],
    featured: false
  },
  {
    id: '10',
    name: 'Classic Novel Collection',
    slug: 'classic-novel-collection',
    description: 'Beautifully bound collection of 10 classic novels. Perfect for book lovers and collectors.',
    price: 89.99,
    category: 'Books & Media',
    brand: 'ClassicReads',
    rating: 4.9,
    reviewCount: 678,
    images: [
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=600&fit=crop'
    ],
    inStock: true,
    stockCount: 45,
    tags: ['books', 'classics', 'literature'],
    featured: true
  },
  {
    id: '11',
    name: 'Board Game Deluxe Edition',
    slug: 'board-game-deluxe-edition',
    description: 'Premium strategy board game for 2-6 players. Includes high-quality components and storage box.',
    price: 69.99,
    category: 'Toys & Games',
    brand: 'GameNight',
    rating: 4.7,
    reviewCount: 523,
    images: [
      'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=600&h=600&fit=crop'
    ],
    inStock: true,
    stockCount: 67,
    tags: ['games', 'board game', 'family'],
    featured: false
  },
  {
    id: '12',
    name: 'Wireless Gaming Mouse',
    slug: 'wireless-gaming-mouse',
    description: 'High-precision wireless gaming mouse with customizable RGB lighting and programmable buttons.',
    price: 79.99,
    originalPrice: 99.99,
    category: 'Electronics',
    brand: 'GameTech',
    rating: 4.6,
    reviewCount: 892,
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop'
    ],
    inStock: true,
    stockCount: 112,
    colors: ['Black', 'White'],
    tags: ['gaming', 'mouse', 'wireless'],
    featured: false
  }
];

export const shippingMethods: ShippingMethod[] = [
  {
    id: '1',
    name: 'Standard Shipping',
    description: 'Delivery in 5-7 business days',
    price: 5.99,
    estimatedDays: '5-7 days'
  },
  {
    id: '2',
    name: 'Express Shipping',
    description: 'Delivery in 2-3 business days',
    price: 12.99,
    estimatedDays: '2-3 days'
  },
  {
    id: '3',
    name: 'Next Day Delivery',
    description: 'Delivery by tomorrow',
    price: 24.99,
    estimatedDays: '1 day'
  },
  {
    id: '4',
    name: 'Free Shipping',
    description: 'Free delivery in 7-10 business days',
    price: 0,
    estimatedDays: '7-10 days'
  }
];

export const paymentMethods: PaymentMethod[] = [
  {
    id: '1',
    name: 'Credit Card',
    description: 'Pay with Visa, Mastercard, or Amex',
    icon: 'credit-card'
  },
  {
    id: '2',
    name: 'PayPal',
    description: 'Pay securely with your PayPal account',
    icon: 'wallet'
  },
  {
    id: '3',
    name: 'Apple Pay',
    description: 'Quick checkout with Apple Pay',
    icon: 'smartphone'
  },
  {
    id: '4',
    name: 'Google Pay',
    description: 'Fast and secure payment with Google Pay',
    icon: 'smartphone'
  }
];

export const brands = [
  'AudioTech',
  'TechWear',
  'PhotoPro',
  'UrbanStyle',
  'SportFit',
  'ComfortPro',
  'LightHouse',
  'FitZone',
  'OutdoorLife',
  'ClassicReads',
  'GameNight',
  'GameTech'
];
