# E-Commerce Frontend

A modern, fully-featured e-commerce frontend built with Next.js 15, TypeScript, Tailwind CSS, and Zustand for state management.

## Features

### 🛍️ Core E-Commerce Functionality
- **Home Page**: Hero section, category browsing, and featured products showcase
- **Product Catalog**: Advanced filtering (category, brand, price, rating), sorting, and search
- **Product Details**: Image gallery, variant selection (color/size), quantity selector, add to cart/wishlist
- **Shopping Cart**: Item management, quantity updates, coupon codes, order summary
- **Checkout Flow**: Multi-step checkout with address, shipping method, and payment selection
- **Order Confirmation**: Order tracking and detailed order summary
- **Wishlist**: Save favorite products for later
- **User Account**: Login/register, profile management, order history

### 🎨 UI/UX Features
- Beautiful, modern design with Tailwind CSS
- Fully responsive across all devices
- Grid/list view toggle for catalog
- Toast notifications for user feedback
- Loading and empty states
- Accessible components

### 🛠️ Technical Features
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Zustand** for state management with localStorage persistence
- **Tailwind CSS** for styling
- **Lucide React** for icons
- SEO-friendly with metadata

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/gugasoft1099/Front.git
cd Front
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── account/           # Account pages (login, register, profile, orders)
│   ├── cart/              # Shopping cart page
│   ├── catalog/           # Product catalog with filters
│   ├── checkout/          # Checkout flow pages
│   ├── product/[slug]/    # Dynamic product detail pages
│   ├── wishlist/          # Wishlist page
│   ├── layout.tsx         # Root layout with header/footer
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── Header.tsx        # Navigation header
│   └── Footer.tsx        # Footer component
├── store/                # Zustand stores
│   ├── cartStore.ts      # Shopping cart state
│   ├── wishlistStore.ts  # Wishlist state
│   ├── userStore.ts      # User authentication state
│   ├── orderStore.ts     # Order history state
│   └── toastStore.ts     # Toast notifications state
├── data/                 # Mock data
│   └── mockData.ts       # Products, categories, shipping, payment methods
├── lib/                  # Utility functions
│   └── utils.ts          # Helper functions
├── types/                # TypeScript type definitions
│   └── index.ts          # Shared types
└── public/               # Static assets

```

## Features Breakdown

### State Management with Zustand

All state is managed with Zustand and persisted to localStorage:
- **Cart**: Add, remove, update quantities, calculate totals
- **Wishlist**: Save and manage favorite products
- **User**: Fake authentication, profile management
- **Orders**: Order history tracking
- **Toasts**: Global notification system

### Mock Data

The application uses mock data for demonstration:
- 12 sample products across 6 categories
- Multiple shipping methods
- Various payment options
- Try coupon code: **SAVE10** for 10% off

### Authentication

This is a **frontend-only demo** with fake authentication:
- Use any email/password to log in or register
- User sessions persist in localStorage
- No backend validation

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Zustand** - State management
- **Lucide React** - Icon library
- **clsx** - Conditional classNames

## License

MIT

## Author

Built for demonstration purposes.
