# Documentación de Extracción de Datos - loscocosdevichayito.com

Este archivo contiene toda la información textual, imágenes, scripts, formularios y políticas extraídas directamente de la versión anterior del sitio web para facilitar su reconstrucción y rediseño completo en Next.js.

---

## 1. Metadatos SEO Originales
* **Título (Home):** Los Cocos de Vichayito - Hotel in Vichayito
* **Descripción:** Boasting an outdoor swimming pool with a sun deck and direct beach access, Los Cocos has rooms on Vichayito Beach. Free WiFi access is available in common areas.
* **Palabras Clave:** Los Cocos de Vichayito, Jose Antonio de Lavalle 182 - Acceso Mancora, 0018 Vichayito, Peru
* **Imagen OG (Open Graph):** `https://cf.bstatic.com/xdata/images/hotel/max1024x768/135479658.jpg?k=a973e13085bc03cea718affd2666693c30ee21bc42e1b720c98272286fbc19dc&o=`

---

## 2. Contenido e Información del Hotel

### Descripción General
> Boasting an outdoor swimming pool with a sun deck and direct beach access, Los Cocos has rooms on Vichayito Beach. Free WiFi access is available in common areas.
>
> This property is divided into two parts separated by a path; one with the front desk, pool and rooms with direct access to the beach and the other unit has rooms with garden view and is at 120 mts from the beach.
>
> Los Cocos de Vichayito has rooms with private balconies, garden views and a private bathroom with shower.
>
> Mancora and Los Organos beaches are nearby and Piura City is 200 km away. Tumbes Airport is 120 km away and private parking is free.

### Ubicación y Mapa
* **Dirección:** Jose Antonio de Lavalle 182 - Acceso Mancora, 0018 Vichayito, Peru
* **Coordenadas:** Latitud `-4.164930340647149`, Longitud `-81.12624422952064`
* **Iframe del Mapa Original:**
  ```html
  <iframe title="Map" style="width: 100%; height: 100%; min-height: 450px;" src="https://widgets.housity.net/map?lat=-4.164930340647149&lon=-81.12624422952064&tag=exp-map-exp-loscocosdevichayito"></iframe>
  ```

---

## 3. Galería de Imágenes del Hotel

| # | Descripción Visual / Nombre | URL de Imagen (Calidad Máxima) |
|---|---|---|
| 1 | Vista exterior / Piscina | `https://cf.bstatic.com/xdata/images/hotel/max1200/135479658.jpg` |
| 2 | Vista al mar y terraza | `https://cf.bstatic.com/xdata/images/hotel/max1200/262051000.jpg` |
| 3 | Camas e Interior | `https://cf.bstatic.com/xdata/images/hotel/max1200/226844854.jpg` |
| 4 | Playa y Palapa | `https://cf.bstatic.com/xdata/images/hotel/max1200/14695154.jpg` |
| 5 | Atardecer desde piscina | `https://cf.bstatic.com/xdata/images/hotel/max1200/391418520.jpg` |
| 6 | Bungalows / Habitaciones | `https://cf.bstatic.com/xdata/images/hotel/max1200/258340766.jpg` |
| 7 | Área de descanso exterior | `https://cf.bstatic.com/xdata/images/hotel/max1200/258339778.jpg` |
| 8 | Atardecer en la playa | `https://cf.bstatic.com/xdata/images/hotel/max1200/391418522.jpg` |

---

## 4. Formularios y Páginas Adicionales

### Formulario de Reserva (Home)
El formulario de reserva envía los datos vía URL GET a un enlace de afiliación (`book`) con los siguientes parámetros:
* `checkin` (Tipo: `date`)
* `checkout` (Tipo: `date`)
* `group_adults` (Opciones: `1` a `6`)
* `group_children` (Opciones: `0` a `6`)

### Formulario de Contacto (`/contact`)
* **Campos:**
  - Nombre (`name`) - Requerido
  - Correo electrónico (`email`) - Requerido
  - Asunto (`subject`) - Requerido
  - Mensaje (`message`) - Requerido
  - Aceptación de Políticas (Checkbox `privacy-accepted`) - Requerido
* **Envío:**
  - Envía un payload JSON vía `POST` a `mail.php` con la estructura:
    ```json
    {
      "name": "Nombre",
      "email": "correo@dominio.com",
      "subject": "Asunto",
      "message": "Mensaje",
      "lang": "en-US"
    }
    ```

### Políticas de Privacidad (`/privacy`)
Contiene las secciones estándar sobre:
1. **Recopilación de información**: Nombre, email, datos demográficos.
2. **Uso de información**: Actúa como sitio informativo y redirige a Booking.com para gestionar la reserva formal.
3. **Uso de Cookies**: Google Analytics (`_ga`, `__utmb`, `__utmc`, `__utmz`), cookies de geolocalización, cookies de registro y DoubleClick para publicidad.

### Aviso Legal (`/content_policy`)
* **Propósito**: Declaración explícita de que no es la web oficial del hotel.
* **Afiliación**: Participa en programas de afiliados (Booking.com) y recibe comisiones por reservas sin costo adicional para el usuario.
* **Derechos de Terceros**: Las marcas registradas y fotos pertenecen al hotel o a Booking.com a través de su programa de afiliados.
