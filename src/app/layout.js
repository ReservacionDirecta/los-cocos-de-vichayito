import { Poppins } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Los Cocos de Vichayito | Hotel on Vichayito Beach, Peru",
  description: "Boasting an outdoor swimming pool with a sun deck and direct beach access, Los Cocos has rooms on Vichayito Beach. Free WiFi access is available in common areas.",
  keywords: "Los Cocos de Vichayito, Vichayito Beach Hotel, Mancora Hotel, Peru Beach Resorts",
  openGraph: {
    title: "Los Cocos de Vichayito - Vichayito Beach Hotel",
    description: "Boasting an outdoor swimming pool with a sun deck and direct beach access, Los Cocos has rooms on Vichayito Beach.",
    images: [
      {
        url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/135479658.jpg?k=a973e13085bc03cea718affd2666693c30ee21bc42e1b720c98272286fbc19dc&o=",
        width: 1024,
        height: 768,
        alt: "Los Cocos de Vichayito Pool & Beach",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${poppins.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans bg-stone-50 text-stone-900 selection:bg-amber-200">
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-stone-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
            <a href="/" className="text-lg sm:text-2xl font-bold tracking-tight text-emerald-900 hover:opacity-90 transition-opacity">
              Los Cocos <span className="font-light text-stone-500">de Vichayito</span>
            </a>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#habitaciones" className="text-sm font-semibold text-stone-600 hover:text-emerald-950 transition-colors">
                Habitaciones
              </a>
              <a href="#gastronomia" className="text-sm font-semibold text-stone-600 hover:text-emerald-950 transition-colors">
                Gastronomía
              </a>
              <a href="#experiencias" className="text-sm font-semibold text-stone-600 hover:text-emerald-950 transition-colors">
                Experiencias
              </a>
              <a href="#faq" className="text-sm font-semibold text-stone-600 hover:text-emerald-950 transition-colors">
                FAQ
              </a>
              <a href="/contact" className="text-sm font-semibold text-stone-600 hover:text-emerald-950 transition-colors">
                Contacto
              </a>
            </nav>
            <div className="flex items-center gap-4">
              <a href="#booking-section" className="inline-flex h-10 sm:h-11 items-center justify-center rounded-full bg-emerald-800 px-4 sm:px-6 text-xs sm:text-sm font-medium text-white shadow-lg shadow-emerald-900/10 transition-all hover:bg-emerald-900 hover:-translate-y-0.5 active:translate-y-0">
                Reservar
              </a>
            </div>
          </div>
        </header>

        <main className="flex-grow">{children}</main>
        <CookieBanner />

        <footer className="w-full bg-white border-t border-stone-200 mt-auto py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
            <div className="flex flex-wrap justify-center gap-6">
              <a href="/contact" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
                Contacto
              </a>
              <a href="/privacy" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
                Privacidad y Cookies
              </a>
              <a href="/content-policy" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
                Aviso Legal y Política de Afiliado
              </a>
            </div>
            <p className="text-xs text-stone-400 text-center max-w-2xl leading-relaxed mt-4">
              Este sitio web no es la página web oficial del establecimiento comercial mencionado. Actuamos como una plataforma informativa independiente y afiliada con el fin de promover el alojamiento y redirigir a los usuarios a servicios de reserva externos.
            </p>
            <p className="text-xs text-stone-300">
              &copy; {new Date().getFullYear()} Los Cocos de Vichayito. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
