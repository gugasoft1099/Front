import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToastContainer from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "E-Commerce Store - Shop the Latest Products",
  description: "Discover amazing products at great prices. Browse our wide selection of categories including electronics, fashion, home & garden, and more.",
  keywords: ["ecommerce", "shop", "online store", "products", "shopping"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
