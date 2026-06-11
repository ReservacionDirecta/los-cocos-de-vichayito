export default function ContentPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-emerald-950 mb-8 text-center">
        Aviso Legal y Política de Contenido
      </h1>
      
      <div className="prose prose-stone max-w-none text-stone-600 text-sm md:text-base leading-relaxed flex flex-col gap-6">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl md:text-2xl font-bold text-stone-900 border-b border-stone-200 pb-2">
            Aviso de Sitio Web Independiente
          </h2>
          <p>
            <strong>Este sitio web no es la página oficial</strong> del hotel o establecimiento comercial mencionado en este dominio, a menos que se indique expresamente lo contrario. Este sitio opera exclusivamente como una plataforma de información turística y promoción independiente del norte peruano.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl md:text-2xl font-bold text-stone-900 border-b border-stone-200 pb-2">
            Relación de Afiliación y Enlaces Comerciales
          </h2>
          <p>
            Este sitio web participa activamente en programas de marketing de afiliados, en particular con la red de reservas de **Booking.com**. Esto implica que al realizar una búsqueda y reservar un alojamiento a través de los enlaces de redirección de nuestro motor, el operador de este sitio web podría percibir una pequeña comisión comercial por referir la venta, <strong>sin que esto represente ningún costo adicional o recargo para el usuario final</strong>.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl md:text-2xl font-bold text-stone-900 border-b border-stone-200 pb-2">
            Derechos de Autor e Propiedad Intelectual
          </h2>
          <p>
            Todas las marcas comerciales, nombres de hoteles, logotipos, imágenes e información descriptiva pertenecen a sus respectivos propietarios legales. El uso de las fotografías y textos informativos del hotel en este sitio se realiza en calidad de material promocional facilitado bajo las pautas y acuerdos comerciales de los programas oficiales de afiliación turística autorizados.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl md:text-2xl font-bold text-stone-900 border-b border-stone-200 pb-2">
            Limitación de Responsabilidad
          </h2>
          <ul className="list-disc pl-6 flex flex-col gap-2">
            <li><strong>Precios y Tarifas:</strong> Este sitio web no procesa directamente transacciones monetarias ni muestra tarifas garantizadas en tiempo real. Todos los cálculos son simulaciones aproximadas o se confirman de forma definitiva en la plataforma de reservas externa de destino.</li>
            <li><strong>Gestión de Reservas:</strong> No almacenamos datos personales relacionados con tarjetas de crédito, transacciones o pasarelas de pago. La relación legal por cualquier reserva es estrictamente entre el huésped y el proveedor final (Booking.com o el establecimiento directo).</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
