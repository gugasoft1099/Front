// Data for the e-commerce frontend

export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface Stat {
  label: string;
  value: string;
}

export const categories: Category[] = [
  { id: 1, name: "Egin-eşik", icon: "👔" },
  { id: 2, name: "Elektronika", icon: "📱" },
  { id: 3, name: "Öý üçin", icon: "🏠" },
  { id: 4, name: "Sport", icon: "⚽" },
  { id: 5, name: "Kitaplar", icon: "📚" },
  { id: 6, name: "Çagalar üçin", icon: "🧸" },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Krossowka",
    price: 450,
    description: "Ýokary hilli sport aýakgaby",
    image: "/p1.jpg",
    category: "Sport",
  },
  {
    id: 2,
    name: "Smartfon",
    price: 3500,
    description: "Häzirki zaman telefon",
    image: "/p2.jpg",
    category: "Elektronika",
  },
  {
    id: 3,
    name: "Köýnek",
    price: 280,
    description: "Gyş möwsümi üçin ýyly köýnek",
    image: "/p3.jpg",
    category: "Egin-eşik",
  },
  {
    id: 4,
    name: "Kitap toplumy",
    price: 150,
    description: "Meşhur edebiýat kitaplary",
    image: "/p4.jpg",
    category: "Kitaplar",
  },
  {
    id: 5,
    name: "Oýunjak",
    price: 95,
    description: "Çagalar üçin öwredijilik oýunjak",
    image: "/p5.jpg",
    category: "Çagalar üçin",
  },
  {
    id: 6,
    name: "Noutbuk",
    price: 5200,
    description: "Güýçli iş noutbugy",
    image: "/p6.jpg",
    category: "Elektronika",
  },
  {
    id: 7,
    name: "Stol lampasy",
    price: 180,
    description: "LED lampasy öý üçin",
    image: "/p7.jpg",
    category: "Öý üçin",
  },
  {
    id: 8,
    name: "Futbol topy",
    price: 120,
    description: "Hünär derejeli futbol topy",
    image: "/p8.jpg",
    category: "Sport",
  },
];

export const stats: Stat[] = [
  { label: "Harytlar", value: "5000+" },
  { label: "Karzyna", value: "10000+" },
  { label: "Kategoriýalar", value: "50+" },
  { label: "Ýurtlar", value: "25+" },
];
