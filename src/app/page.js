import PhotoCarousel from "@/components/PhotoCarousel";
import BookingEngine from "@/components/BookingEngine";
import FaqSection from "@/components/FaqSection";

export default function Home() {
  return (
    <div className="flex flex-col gap-16">
      {/* Hero Header Section with Background Slide */}
      <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center px-6 py-20 text-center overflow-hidden">
        {/* Absolute Background Slideshow */}
        <PhotoCarousel />

        {/* Overlaid Hero Content */}
        <div className="relative z-20 max-w-3xl mx-auto flex flex-col gap-6 text-white drop-shadow-md">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/80 text-white text-xs font-semibold uppercase tracking-wider mx-auto backdrop-blur-sm shadow-md animate-pulse">
            ☀️ Vichayito: Sol todo el año (Aprox. 28°C)
          </div>
          <span className="text-emerald-300 text-sm md:text-base font-semibold uppercase tracking-widest">
            Hotel Boutique y Bungalows
          </span>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-tight select-none">
            Un Paraíso Escondido en Vichayito
          </h1>
          <p className="text-stone-100 text-base md:text-lg leading-relaxed max-w-2xl mx-auto opacity-95">
            Disfruta del sol del norte peruano, nuestra refrescante piscina al
            aire libre y el susurro constante del océano con acceso directo a la
            playa.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 text-xs font-medium text-stone-200">
            <span className="flex items-center gap-1.5">
              📍 Jose Antonio de Lavalle 182 - Acceso Máncora, Vichayito, Perú
            </span>
            <span className="hidden sm:inline">|</span>
            <a
              href="https://wa.me/51963432773"
              target="_blank"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              💬 WhatsApp: +51 963 432 773
            </a>
          </div>
        </div>
      </section>

      {/* Booking Widget Section - Placed right below the hero */}
      <div className="px-6 max-w-7xl mx-auto w-full -mt-24 relative z-30">
        <BookingEngine />
      </div>

      <div className="flex flex-col gap-24 py-12 px-6 max-w-7xl mx-auto w-full">
        {/* Rooms Showcase Section */}
        <section
          id="habitaciones"
          className="scroll-mt-24 flex flex-col gap-12"
        >
          <div className="text-center max-w-xl mx-auto flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Nuestros Alojamientos
            </span>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-stone-900">
              Habitaciones & Bungalows
            </h2>
            <p className="text-stone-500 text-sm">
              Diseños amplios de madera y caña con balcones privados y vistas
              relajantes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-lg flex flex-col md:flex-row group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                <img
                  src="https://cf.bstatic.com/xdata/images/hotel/max1200/226844854.jpg?k=51b61877cce93c192c7cd4bb3a92ba4598d1582c2c4c7c04007899674426da42&o="
                  alt="Habitación Doble"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="md:w-1/2 p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                    Zona Jardín (120m del mar)
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 mt-1 mb-2 group-hover:text-emerald-950">
                    Doble Estándar
                  </h3>
                  <p className="text-stone-600 text-xs leading-relaxed mb-4">
                    Habitación íntima y sumamente tranquila, rodeada de áreas
                    verdes con terraza privada y baño completo con agua
                    caliente.
                  </p>
                </div>
                <div className="border-t border-stone-100 pt-4 flex justify-between items-center text-xs text-stone-500">
                  <span>👤 Max: 2 Adultos</span>
                  <span className="font-bold text-emerald-800 text-sm">
                    $85 (S/ 306) / noche
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-lg flex flex-col md:flex-row group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                <img
                  src="/bungalow_ocean_interior.png"
                  alt="Bungalow Vista Mar"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="md:w-1/2 p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">
                    Frente al Mar (Beachside)
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 mt-1 mb-2 group-hover:text-emerald-950">
                    Bungalow Vista al Mar
                  </h3>
                  <p className="text-stone-600 text-xs leading-relaxed mb-4">
                    A pocos pasos de la piscina infinita y salida directa a la
                    arena. Cuenta con balcón privado y televisión satelital.
                  </p>
                </div>
                <div className="border-t border-stone-100 pt-4 flex justify-between items-center text-xs text-stone-500">
                  <span>👤 Max: 3 Adultos + 2 Niños</span>
                  <span className="font-bold text-emerald-800 text-sm">
                    $130 (S/ 468) / noche
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dining / Restaurant Section */}
        <section
          id="gastronomia"
          className="scroll-mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-stone-100/50 border border-stone-200/50 p-8 md:p-16 rounded-3xl"
        >
          <div className="relative rounded-2xl overflow-hidden h-[400px] shadow-lg group">
            <img
              src="/gastronomia.jpg"
              alt="Restaurante y Comedor Frente al Mar"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col gap-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Gastronomía Frente al Océano
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900">
              Pescado fresco del día y recetas peruanas locales
            </h2>
            <p className="text-stone-600 text-sm md:text-base leading-relaxed">
              Nuestro restaurante interno ofrece un ambiente relajado y vistas
              al océano. Disfruta de pescados y mariscos capturados el mismo
              día, además de los mejores clásicos norteños peruanos.
            </p>
            <ul className="flex flex-col gap-3 text-stone-600 text-sm">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-700 font-bold">✓</span>
                <span>
                  <strong>Desayuno Continental:</strong> Servido diariamente con
                  frutas frescas de temporada, jugos naturales, café y panes
                  tradicionales.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-700 font-bold">✓</span>
                <span>
                  <strong>Cevichería Norteña:</strong> Saborea el clásico
                  ceviche de pescado fresco preparado al momento con limón de
                  Chulucanas.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Services & Experiences Section */}
        <section
          id="experiencias"
          className="scroll-mt-24 flex flex-col gap-12"
        >
          <div className="text-center max-w-xl mx-auto flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Relajación y Aventura
            </span>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-stone-900">
              Experiencias de Hotel Boutique
            </h2>
            <p className="text-stone-500 text-sm">
              Diseñamos servicios adicionales para garantizar que tu estadía sea
              tan activa o pacífica como desees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-stone-200 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4">
              <div className="text-3xl">💆‍♀️</div>
              <h3 className="text-lg font-bold text-stone-900">
                Masajes Frente al Mar
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                Consiéntete con masajes relajantes y descontracturantes en
                nuestra cabaña exterior, acompañados del sonido rítmico de las
                olas de Vichayito.
              </p>
            </div>

            <div className="bg-white border border-stone-200 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4">
              <div className="text-3xl">🐋</div>
              <h3 className="text-lg font-bold text-stone-900">
                Avistamiento de Ballenas
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                Durante la temporada de julio a octubre, coordinamos excursiones
                guiadas para observar el paso majestuoso de las ballenas
                jorobadas frente a nuestras costas.
              </p>
            </div>

            <div className="bg-white border border-stone-200 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4">
              <div className="text-3xl">🏄‍♂️</div>
              <h3 className="text-lg font-bold text-stone-900">
                Kitesurf y Surf local
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                La playa de Vichayito ofrece vientos ideales y oleaje idóneo
                para la práctica y aprendizaje de deportes acuáticos durante
                todo el año.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FaqSection />

        {/* Map & Location Section */}
        <section id="ubicacion" className="scroll-mt-24 flex flex-col gap-6">
          <div className="text-center max-w-xl mx-auto flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Cómo Llegar
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900">
              Nuestra Ubicación en Vichayito
            </h2>
            <p className="text-stone-500 text-sm">
              Disfruta de la privacidad de Vichayito estando a corta distancia
              de la vibrante Máncora.
            </p>
          </div>
          <div className="w-full h-[450px] rounded-3xl overflow-hidden border border-stone-200 shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5243.710954204014!2d-81.10788998836583!3d-4.138062795818375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9036924dfc76fc99%3A0x21fa66befe732719!2sLos%20Cocos%20de%20Vichayito!5e1!3m2!1ses!2spe!4v1781193652881!5m2!1ses!2spe"
              style={{ width: "100%", height: "100%", border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Los Cocos de Vichayito"
            ></iframe>
          </div>
        </section>
      </div>
    </div>
  );
}
