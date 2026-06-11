"use client";

import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [status, setStatus] = useState("idle"); // idle, sending, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!accepted) {
      alert("Debe aceptar la política de privacidad.");
      return;
    }

    setStatus("sending");

    // Simulate standard SMTP mail send
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setAccepted(false);
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      <div className="text-center flex flex-col gap-3 mb-12">
        <span className="text-emerald-800 text-xs font-semibold uppercase tracking-wider">
          ¿Tienes preguntas?
        </span>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-emerald-950">
          Contáctanos
        </h1>
        <p className="text-stone-500 text-sm max-w-md mx-auto">
          Escríbenos para cualquier consulta sobre tarifas, grupos especiales, traslados o servicios de nuestro hotel.
        </p>
      </div>

      <div className="bg-white border border-stone-200 rounded-3xl p-8 md:p-12 shadow-xl shadow-stone-900/5">
        {status === "success" && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-950 p-6 rounded-2xl mb-8 flex flex-col gap-2">
            <p className="font-bold">✓ ¡Mensaje enviado con éxito!</p>
            <p className="text-xs text-stone-600">
              Gracias por ponerte en contacto. Responderemos a tu solicitud lo antes posible.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Tu Nombre
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Juan Pérez"
                className="h-12 px-4 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent text-sm font-medium text-stone-700 bg-stone-50"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="juan@correo.com"
                className="h-12 px-4 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent text-sm font-medium text-stone-700 bg-stone-50"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="subject" className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Asunto
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Ej. Consulta sobre reservas grupales"
              className="h-12 px-4 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent text-sm font-medium text-stone-700 bg-stone-50"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Mensaje
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu consulta detalladamente aquí..."
              className="min-h-[160px] p-4 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent text-sm font-medium text-stone-700 bg-stone-50 resize-y"
              required
            />
          </div>

          <div className="flex items-start gap-3 mt-2">
            <input
              type="checkbox"
              id="privacy"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-stone-300 text-emerald-800 focus:ring-emerald-700"
              required
            />
            <label htmlFor="privacy" className="text-xs text-stone-500 leading-normal">
              Acepto y doy consentimiento para el procesamiento de mis datos de acuerdo con la{" "}
              <a href="/privacy" className="text-emerald-800 font-semibold hover:underline">
                política de privacidad
              </a>
              .
            </label>
          </div>

          <button
            type="submit"
            disabled={status === "sending" || !accepted}
            className="w-full h-12 inline-flex items-center justify-center rounded-xl bg-emerald-800 hover:bg-emerald-900 disabled:bg-stone-300 text-white font-semibold text-sm transition-all shadow-md shadow-emerald-950/10"
          >
            {status === "sending" ? "Enviando..." : "Enviar Mensaje"}
          </button>
        </form>
      </div>
    </div>
  );
}
