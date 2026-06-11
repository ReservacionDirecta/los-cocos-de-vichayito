"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay for slide-in effect
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-50 animate-in slide-in-from-bottom-12 duration-500 ease-out">
      <div className="bg-white/95 backdrop-blur-md border border-stone-200 p-6 rounded-3xl shadow-2xl flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="text-2xl mt-0.5">🍪</div>
          <div className="flex flex-col gap-1">
            <h4 className="font-bold text-sm text-stone-900">Uso de Cookies</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Utilizamos cookies propias y de terceros para analizar la navegación y mejorar tu experiencia. Al continuar navegando, aceptas nuestra{" "}
              <a href="/privacy" className="text-emerald-800 font-semibold hover:underline">
                política de cookies
              </a>.
            </p>
          </div>
        </div>

        <div className="flex gap-3 justify-end text-xs font-semibold">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-stone-600 hover:text-stone-900 transition-colors"
          >
            Rechazar
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-950 text-white rounded-xl shadow-md transition-colors"
          >
            Aceptar todo
          </button>
        </div>
      </div>
    </div>
  );
}
