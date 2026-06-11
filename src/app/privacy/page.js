export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-emerald-950 mb-8 text-center">
        Políticas de Privacidad y Cookies
      </h1>
      
      <div className="prose prose-stone max-w-none text-stone-600 text-sm md:text-base leading-relaxed flex flex-col gap-6">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl md:text-2xl font-bold text-stone-900 border-b border-stone-200 pb-2">
            1. Políticas de Privacidad
          </h2>
          <p>
            Esta Política de Privacidad establece los términos bajo los cuales recopilamos, procesamos y protegemos la información proporcionada por nuestros usuarios al navegar por nuestro sitio web.
          </p>
          <p>
            Nos tomamos muy en serio la seguridad y confidencialidad de los datos. En los casos en que se le solicite completar campos con información de carácter personal que pueda identificarlo, lo hacemos garantizando que solo se utilizará de acuerdo con los términos de este documento.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h3 className="font-bold text-stone-900">Uso de la Información Recopilada</h3>
          <p>
            Nuestro sitio web funciona principalmente como un portal informativo y de afiliación comercial. Los formularios de consulta de reservas procesados en nuestro motor redirigen a la plataforma externa oficial de nuestro socio estratégico, **Booking.com**, quienes realizan la reserva final y procesan los pagos seguros en nombre del alojamiento.
          </p>
          <p>
            Puedes revisar la política de privacidad oficial del procesador de reservas final aquí:{" "}
            <a
              href="https://www.booking.com/content/privacy.es.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-800 hover:underline font-semibold"
            >
              Políticas de Privacidad de Booking.com
            </a>.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl md:text-2xl font-bold text-stone-900 border-b border-stone-200 pb-2">
            2. Políticas de Cookies
          </h2>
          <p>
            Una cookie es un pequeño archivo que solicita permiso para guardarse en el disco duro de tu ordenador. Al aceptar, el archivo se añade y la cookie ayuda a analizar el tráfico web, permitiendo recordarte individualmente para personalizar tu experiencia.
          </p>
          <p>
            Utilizamos cookies de terceros para obtener estadísticas de navegación mediante Google Analytics y optimizar el rendimiento del sitio.
          </p>
          <ul className="list-disc pl-6 flex flex-col gap-2">
            <li><strong>Cookies Analíticas:</strong> Nos permiten cuantificar de forma anónima el número de visitantes y analizar sus hábitos de navegación para introducir mejoras.</li>
            <li><strong>Cookies de Geolocalización:</strong> Nos ayudan a identificar de manera agregada la región o país desde el cual nos visitas para orientar correctamente los contenidos.</li>
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h3 className="font-bold text-stone-900">Control de Cookies</h3>
          <p>
            Usted puede elegir aceptar o denegar el uso de cookies en cualquier momento a través de la configuración de su navegador web. La mayoría de los navegadores aceptan cookies automáticamente, pero usualmente puede modificar la configuración para declinarlas si así lo prefiere.
          </p>
        </section>
      </div>
    </div>
  );
}
