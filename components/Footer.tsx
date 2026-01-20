export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Dukanym</h3>
            <p className="text-gray-400 mb-4">
              Türkmenistanyň iň ygtybarly we häzirki zaman onlaýn söwda platformasy.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                📘
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                📷
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                🐦
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Baglanyşyklar</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Biz barada
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Habarlaşmak
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Karyera
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hyzmat</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Kömek merkezi
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Yzyna gaýtarmak
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Eltip bermek
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Töleg usullary
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Habarlaşmak</h3>
            <ul className="space-y-2 text-gray-400">
              <li>📧 info@dukanym.tm</li>
              <li>📱 +993 12 34 56 78</li>
              <li>📍 Aşgabat, Türkmenistan</li>
              <li>🕒 Duş-Ýek: 9:00 - 18:00</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-6 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Dukanym. Ähli hukuklar goragly.
          </p>
        </div>
      </div>
    </footer>
  );
}
