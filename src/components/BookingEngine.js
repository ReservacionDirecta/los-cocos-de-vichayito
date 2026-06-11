"use client";

import { useState } from "react";
import CustomDatePicker from "./CustomDatePicker";

const ROOM_TEMPLATES = [
  {
    id: "std-garden",
    name: "Habitación Doble Estándar (Vista Jardín)",
    description: "Habitación cálida a 120 metros de la playa. Balcón privado y baño completo.",
    maxAdults: 2,
    maxChildren: 1,
    image: "https://cf.bstatic.com/xdata/images/hotel/max1200/226844854.jpg?k=51b61877cce93c192c7cd4bb3a92ba4598d1582c2c4c7c04007899674426da42&o=",
  },
  {
    id: "bungalow-ocean",
    name: "Bungalow Vista al Mar",
    description: "Acceso directo a la playa de Vichayito y a pocos pasos de la piscina. Terraza privada.",
    maxAdults: 3,
    maxChildren: 2,
    image: "/bungalow_ocean_interior.png",
  },
  {
    id: "bungalow-family",
    name: "Bungalow Familiar Superior",
    description: "Espacioso bungalow de dos plantas ideal para familias. Sala de estar amplia y balcón con hamaca.",
    maxAdults: 5,
    maxChildren: 3,
    image: "/bungalow_family_interior.png",
  },
  {
    id: "deluxe-beachfront",
    name: "Habitación Familiar Deluxe (Frente al Mar)",
    description: "Nuestra suite más exclusiva con terraza panorámica, vista completa al océano y piscina privada compartida.",
    maxAdults: 6,
    maxChildren: 4,
    image: "/deluxe_beachfront_interior.png",
  },
];

const formatDate = (date) => {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export default function BookingEngine() {
  const todayStr = formatDate(new Date());
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = formatDate(tomorrow);

  const [checkIn, setCheckIn] = useState(todayStr);
  const [checkOut, setCheckOut] = useState(tomorrowStr);
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [bookedRoom, setBookedRoom] = useState(null);
  const [pricingInfo, setPricingInfo] = useState({});
  const [guestName, setGuestName] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  const totalGuests = parseInt(adults) + parseInt(children);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      alert("Por favor seleccione las fechas de llegada y salida.");
      return;
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
      alert("La fecha de salida debe ser posterior a la de llegada.");
      return;
    }

    setLoading(true);
    setSearched(false);

    try {
      // Fetch dynamic rates with Booking.com discounts from API Route
      const res = await fetch(
        `/api/rates?checkin=${checkIn}&checkout=${checkOut}&adults=${adults}&children=${children}`
      );
      const data = await res.json();

      if (data.error) {
        alert(data.error);
        setLoading(false);
        return;
      }

      // Filter rooms matching capacity criteria
      const filtered = ROOM_TEMPLATES.filter(
        (room) =>
          room.maxAdults >= parseInt(adults) &&
          (room.maxAdults + room.maxChildren) >= totalGuests
      );

      // Merge layout details with API prices
      const mergedRooms = filtered.map((room) => {
        const rateDetails = data.rooms.find((r) => r.id === room.id) || {
          originalPricePerNight: 100,
          discountedPricePerNight: 85,
          totalOriginal: 100,
          totalDiscounted: 85,
          savings: 15,
          hasGeniusDiscount: true,
          geniusLevel: 2,
          stayDiscountApplied: false,
          seasonName: "Estándar"
        };
        return {
          ...room,
          pricing: rateDetails
        };
      });

      setAvailableRooms(mergedRooms);
      setPricingInfo({
        nights: data.nights,
        simulatorActive: data.simulatorActive,
      });
      setSearched(true);
    } catch (err) {
      console.error(err);
      alert("Error al conectar con el servidor de tarifas de Booking.com.");
    } finally {
      setLoading(false);
      // Scroll to results
      setTimeout(() => {
        document.getElementById("booking-results")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleBookRoom = (room) => {
    setBookedRoom(room);
  };

  return (
    <section id="booking-section" className="w-full py-12 scroll-mt-24">
      <div className="bg-white/80 backdrop-blur-md border border-stone-200/80 rounded-3xl p-8 md:p-12 shadow-xl shadow-stone-900/5 max-w-5xl mx-auto transition-all duration-300 hover:shadow-2xl hover:shadow-stone-900/10">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900 text-center mb-8">
          Encuentra tu Habitación Perfecta
        </h2>
        
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          <CustomDatePicker
            label="Llegada"
            selectedDate={checkIn}
            onChange={(date) => {
              setCheckIn(date);
              const nextDay = new Date(date + "T00:00:00");
              nextDay.setDate(nextDay.getDate() + 1);
              const nextDayStr = formatDate(nextDay);
              if (new Date(checkOut) <= new Date(date)) {
                setCheckOut(nextDayStr);
              }
            }}
            minDate={todayStr}
          />

          <CustomDatePicker
            label="Salida"
            selectedDate={checkOut}
            onChange={(date) => setCheckOut(date)}
            minDate={
              checkIn
                ? (() => {
                    const d = new Date(checkIn + "T00:00:00");
                    d.setDate(d.getDate() + 1);
                    return formatDate(d);
                  })()
                : todayStr
            }
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Adultos
              </span>
              <select
                id="adults"
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent text-sm font-medium text-stone-700 bg-stone-50 transition-all duration-200 hover:bg-stone-100"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Niños
              </span>
              <select
                id="children"
                value={children}
                onChange={(e) => setChildren(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent text-sm font-medium text-stone-700 bg-stone-50 transition-all duration-200 hover:bg-stone-100"
              >
                {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 inline-flex items-center justify-center rounded-xl bg-emerald-800 hover:bg-emerald-950 disabled:bg-stone-350 text-white font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] shadow-lg shadow-emerald-950/15"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Consultando...
                </span>
              ) : (
                "Consultar Disponibilidad"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Results Area */}
      {searched && (
        <div id="booking-results" className="max-w-5xl mx-auto mt-16 px-4 animate-in fade-in slide-in-from-bottom-6 duration-500">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200 pb-4 mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-stone-900">
              Habitaciones disponibles para {adults} {parseInt(adults) === 1 ? "adulto" : "adultos"}{" "}
              {parseInt(children) > 0 && `y ${children} ${parseInt(children) === 1 ? "niño" : "niños"}`}
            </h3>
            {availableRooms[0]?.pricing && (
              <span className="inline-block mt-2 sm:mt-0 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
                🏷️ {availableRooms[0].pricing.seasonName}
              </span>
            )}
          </div>

          {availableRooms.length === 0 ? (
            <div className="text-center py-12 bg-stone-100 rounded-3xl animate-pulse">
              <p className="text-stone-500 font-medium">
                No encontramos habitaciones que coincidan con la cantidad de huéspedes solicitada.
              </p>
              <p className="text-stone-400 text-xs mt-2">
                Prueba reduciendo el número de personas o solicitando múltiples habitaciones.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {availableRooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-lg shadow-stone-900/5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-stone-900/10 hover:-translate-y-1 group"
                >
                  <div className="relative h-64 w-full overflow-hidden">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-emerald-800 text-white text-sm font-bold px-4 py-2 rounded-full shadow-md flex items-center gap-1.5 transition-transform duration-300 group-hover:scale-105">
                      <span className="line-through text-stone-300/80 font-normal text-xs">
                        ${room.pricing.originalPricePerNight}
                      </span>
                      <span>${room.pricing.discountedPricePerNight}</span>
                      <span className="text-[10px] font-normal">/ noche</span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {room.pricing.hasGeniusDiscount && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-wider">
                            Genius 15% Desc.
                          </span>
                        )}
                        {room.pricing.stayDiscountApplied && (
                          <span className="px-2 py-0.5 rounded-md bg-sky-100 text-sky-900 text-[10px] font-bold uppercase tracking-wider">
                            Estadía Larga
                          </span>
                        )}
                      </div>
                      <h4 className="text-lg font-bold text-stone-900 mb-2 transition-colors group-hover:text-emerald-900">
                        {room.name}
                      </h4>
                      <p className="text-stone-600 text-sm leading-relaxed mb-4">{room.description}</p>
                    </div>

                    <div className="flex items-center justify-between mt-4 border-t border-stone-100 pt-4">
                      <div className="flex gap-4 text-xs font-semibold text-stone-500">
                        <span className="flex items-center gap-1">
                          👤 Max: {room.maxAdults}
                        </span>
                        <span className="flex items-center gap-1">
                          👶 Max Niños: {room.maxChildren}
                        </span>
                      </div>

                      <button
                        onClick={() => handleBookRoom(room)}
                        className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-950 text-white rounded-xl text-xs font-semibold transition-all duration-200 active:scale-95 hover:shadow-md hover:shadow-emerald-800/10"
                      >
                        Reservar por WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Booking Confirmation Dialog */}
      {bookedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl relative border border-stone-200 animate-in zoom-in-95 slide-in-from-bottom-8 duration-300 overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => {
                setBookedRoom(null);
                setGuestName("");
                setSpecialRequests("");
              }}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 transition-colors w-8 h-8 rounded-full flex items-center justify-center hover:bg-stone-100"
            >
              ✕
            </button>

            <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-950 text-[10px] font-bold uppercase tracking-wider mb-4">
              🏷️ Tarifa Especial Booking.com
            </span>
            
            <h4 className="text-xl font-bold text-stone-900 mb-6">Detalles de la Solicitud</h4>

            {/* Premium Voucher Layout */}
            <div className="border border-stone-200 rounded-2xl overflow-hidden mb-6 bg-stone-50/50">
              <div className="bg-emerald-900/5 px-4 py-3 border-b border-stone-200">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Resumen de Estancia
                </span>
              </div>
              <div className="p-4 flex flex-col gap-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-stone-500 text-xs">Habitación:</span>
                  <span className="font-semibold text-stone-800 text-right max-w-[70%]">{bookedRoom.name}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 border-t border-stone-200/60 pt-3">
                  <div>
                    <span className="text-stone-500 text-[10px] uppercase tracking-wider block">Entrada</span>
                    <span className="font-medium text-stone-800">{checkIn}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 text-[10px] uppercase tracking-wider block">Salida</span>
                    <span className="font-medium text-stone-800">{checkOut}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 border-t border-stone-200/60 pt-3">
                  <div>
                    <span className="text-stone-500 text-[10px] uppercase tracking-wider block">Duración</span>
                    <span className="font-medium text-stone-800">
                      {pricingInfo.nights} {pricingInfo.nights === 1 ? "noche" : "noches"}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-500 text-[10px] uppercase tracking-wider block">Huéspedes</span>
                    <span className="font-medium text-stone-800">
                      {adults} Adulto(s) {parseInt(children) > 0 ? `y ${children} Niño(s)` : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Details */}
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="guest-name" className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Nombre y Apellido
                </label>
                <input
                  type="text"
                  id="guest-name"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Ingrese el nombre del titular"
                  className="h-11 px-4 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 text-sm bg-stone-50"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="special-req" className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Pedidos Especiales (Opcional)
                </label>
                <textarea
                  id="special-req"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Ej: Camas separadas, cuna para bebé, llegada tardía..."
                  className="p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 text-sm bg-stone-50 resize-none h-16"
                />
              </div>
            </div>

            {/* Pricing Section */}
            <div className="bg-emerald-950 text-white rounded-2xl p-5 mb-6 shadow-md">
              <div className="flex justify-between text-xs text-stone-300 mb-1.5">
                <span>Precio regular:</span>
                <span className="line-through">${bookedRoom.pricing.totalOriginal} USD</span>
              </div>
              <div className="flex justify-between text-xs text-emerald-300 mb-3">
                <span>Ahorro Booking.com (Genius 15%):</span>
                <span>-${bookedRoom.pricing.savings} USD</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold border-t border-white/10 pt-3">
                <span>Tarifa Final Estimada:</span>
                <span className="text-amber-300 text-xl font-extrabold">
                  ${bookedRoom.pricing.totalDiscounted} USD
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  if (!guestName.trim()) {
                    alert("Por favor ingrese su Nombre y Apellido para la solicitud.");
                    return;
                  }

                  const estimatedNights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
                  const estimatedTotal = bookedRoom.pricing.totalDiscounted;
                  
                  const messageText = `Hola! Deseo realizar una reserva en Los Cocos de Vichayito.

Titular de la Solicitud:
- Nombre: ${guestName.trim()}

Detalles de la cotización (Web con Tarifas Booking.com):
- Habitación: ${bookedRoom.name}
- Fecha de Llegada: ${checkIn}
- Fecha de Salida: ${checkOut}
- Noches: ${pricingInfo.nights}
- Huéspedes: ${adults} Adulto(s) ${parseInt(children) > 0 ? `y ${children} Niño(s)` : ""}
- Precio Regular Total: $${bookedRoom.pricing.totalOriginal} USD
- Ahorro Descuentos: -$${bookedRoom.pricing.savings} USD
- Total Tarifa Final: $${estimatedTotal} USD
${specialRequests.trim() ? `- Pedidos Especiales: ${specialRequests.trim()}\n` : ""}
Por favor confirmar disponibilidad.`;

                  const whatsappUrl = `https://wa.me/51963432773?text=${encodeURIComponent(messageText)}`;
                  window.open(whatsappUrl, "_blank");
                  
                  // Reset states and close modal
                  setBookedRoom(null);
                  setGuestName("");
                  setSpecialRequests("");
                }}
                className="flex-1 py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-semibold text-sm text-center shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
              >
                Solicitar Reserva por WhatsApp
              </button>
              <button
                onClick={() => {
                  setBookedRoom(null);
                  setGuestName("");
                  setSpecialRequests("");
                }}
                className="px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-semibold text-sm transition-colors"
              >
                Cancelar
              </button>
            </div>
            
            <p className="text-[9px] text-stone-400 text-center mt-4 leading-relaxed">
              * La confirmación de disponibilidad se gestiona por WhatsApp. No se realiza ningún cobro en este sitio web.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
