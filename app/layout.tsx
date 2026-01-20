import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Dukanym",
  description: "Owadan we ygtybarly onlaýn dükanyňyz",
  keywords: ["onlaýn dükany", "haryt", "TMT", "Türkmenistan", "söwda", "elektronika"],
  authors: [{ name: "Dukanym" }],
  openGraph: {
    title: "Dukanym",
    description: "Owadan we ygtybarly onlaýn dükanyňyz",
    locale: "tk_TM",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tk" dir="ltr">
      <body className="font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
