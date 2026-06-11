"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "¿Cómo se distribuyen las instalaciones del hotel?",
    answer: "La propiedad está dividida en dos secciones por un pequeño camino vecinal: la sección de playa (alberga recepción, restaurante, piscina y habitaciones con salida a la arena) y la sección de jardín (ubicada a 120 metros de la playa, ideal para parejas y familias que buscan mayor silencio y contacto con la naturaleza)."
  },
  {
    question: "¿El estacionamiento es gratuito?",
    answer: "Sí, el hotel cuenta con una zona de estacionamiento privado al aire libre completamente gratuita para los huéspedes hospedados. No requiere reserva previa."
  },
  {
    question: "¿Aceptan mascotas?",
    answer: "Por políticas de convivencia e higiene del hotel, lamentablemente no se permite el ingreso de mascotas en ninguna de nuestras instalaciones o bungalows."
  },
  {
    question: "¿Cómo se procesan las reservas y pagos?",
    answer: "Nuestro motor de disponibilidad calcula los estimados. Al confirmar, los clientes envían un mensaje estructurado vía WhatsApp directamente al canal de atención del hotel para coordinar los detalles del pago de manera personalizada."
  },
  {
    question: "¿Cuál es el horario de Check-in y Check-out?",
    answer: "El horario de entrada (Check-in) es a partir de las 14:00 horas, y la salida (Check-out) debe realizarse antes de las 12:00 horas. Si necesitas salir más tarde, consulta con recepción la disponibilidad de Late Check-out."
  }
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="scroll-mt-24 flex flex-col gap-12 max-w-3xl mx-auto w-full">
      <div className="text-center flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
          Dudas Frecuentes
        </span>
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-stone-900">
          Preguntas Frecuentes
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = activeIndex === index;
          return (
            <div
              key={index}
              className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                isOpen ? "border-emerald-700 shadow-lg shadow-emerald-950/5" : "border-stone-200 hover:border-stone-300"
              }`}
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full py-5 px-6 flex items-center justify-between text-left font-semibold text-stone-800 transition-colors hover:text-emerald-900"
              >
                <span>{item.question}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className={`w-4 h-4 text-stone-400 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-emerald-700" : ""
                  }`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-[300px] opacity-100 border-t border-stone-100" : "max-h-0 opacity-0 pointer-events-none"
                }`}
              >
                <div className="p-6 text-stone-500 text-sm leading-relaxed bg-stone-50/50">
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
