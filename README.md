# Dukanym - Onlaýn Dükany

Türkmen dilinde we TMT (Türkmen Manady) walýutasynda döredilen häzirki zaman e-söwda frontend programmasy.

## Aýratynlyklary

- ✨ Next.js 14 App Router
- 🎨 Tailwind CSS bilen dizaýn
- 📱 Responsive dizaýn (ykjam we desktop)
- 🌐 Türkmen dili (tk) lokalizasiýasy
- 💰 TMT walýutasy goldawy
- 🛒 Haryt katalogu we kategoriýalar
- 🔍 Gözleg funksiýasy
- 🎯 Häzirki zaman UI/UX

## Tehnologiýalar

- **Next.js 14.1.0** - React framework
- **React 18.2.0** - UI kitaphanasy
- **TypeScript 5.3.3** - Ýazuw dili
- **Tailwind CSS 3.4.1** - CSS framework
- **PostCSS & Autoprefixer** - CSS prosessorlar

## Gurnama

### Talaplary

- Node.js 18+ görnüşi
- npm ýa-da yarn paket dolandyryjysy

### Gurnamak

1. Repositoriýany klonlaň:
```bash
git clone https://github.com/gugasoft1099/Front.git
cd Front
```

2. Baglylyklary guruň:
```bash
npm install
```

3. Ösüş serwerini işlediň:
```bash
npm run dev
```

4. Brauzeriňizde açyň: [http://localhost:3000](http://localhost:3000)

## Taslamanyň gurluşy

```
Front/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Esasy layout (Navbar + Footer)
│   ├── page.tsx           # Baş sahypa
│   └── globals.css        # Global CSS (Tailwind)
├── components/            # React komponentleri
│   ├── Navbar.tsx        # Navigasiýa paneli
│   └── Footer.tsx        # Footer komponenti
├── lib/                  # Kömekçi funksiýalar we maglumatlar
│   └── data.ts          # Statik maglumatlar (harytlar, kategoriýalar)
├── public/              # Statik faýllar
│   ├── hero.jpg        # Hero seksiýasy suraty
│   ├── p1.jpg - p8.jpg # Haryt suratlary
│   └── ...
├── next.config.js       # Next.js konfigurasiýasy
├── tailwind.config.js   # Tailwind konfigurasiýasy
├── tsconfig.json        # TypeScript konfigurasiýasy
└── package.json         # Taslama baglylyklary
```

## Suratlar

Sahypa dogry işlemegi üçin aşakdaky suratlary `public/` katalogyna goşuň:

- `hero.jpg` - Baş sahypanyň hero seksiýasy üçin surat
- `p1.jpg` - `p8.jpg` - Haryt suratlary (8 sany)

Ýa-da islendik surat URL-lerini ulanyp bilersiňiz (next.config.js-de remotePatterns goşulan).

## Skriptler

```bash
npm run dev      # Ösüş serwerini işletmek
npm run build    # Önümçilik üçin gurnamak
npm start        # Önümçilik serwerini işletmek
npm run lint     # ESLint bilen barlamak
```

## Düzümler

### Kategoriýalar

Haryt kategoriýalary `lib/data.ts` faýlynda kesgitlenýär:
- Egin-eşik
- Elektronika
- Öý üçin
- Sport
- Kitaplar
- Çagalar üçin

### Harytlar

Har bir harytda:
- Ady
- Bahasy (TMT)
- Beýany
- Suraty
- Kategoriýasy

Täze harytlary `lib/data.ts` faýlynda `products` massiwide goşup bilersiňiz.

## Listenziýa

Bu taslama açyk çeşme taslamasy bolup, ony erkin ulanyp we üýtgedip bilersiňiz.

## Goldaw

Soraglar ýa-da kömek üçin: info@dukanym.tm

---

**Dukanym** - Türkmenistanyň ygtybarly onlaýn dükany 🇹🇲
