import { NextResponse } from "next/server";

// Standard base prices for the hotel rooms
const BASE_ROOMS = [
  { id: "std-garden", basePrice: 85 },
  { id: "bungalow-ocean", basePrice: 130 },
  { id: "bungalow-family", basePrice: 180 },
  { id: "deluxe-beachfront", basePrice: 240 },
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");
  const adults = parseInt(searchParams.get("adults") || "2");
  const children = parseInt(searchParams.get("children") || "0");

  if (!checkin || !checkout) {
    return NextResponse.json({ error: "Fechas inválidas" }, { status: 400 });
  }

  const dateIn = new Date(checkin + "T00:00:00");
  const dateOut = new Date(checkout + "T00:00:00");
  const nights = Math.ceil((dateOut - dateIn) / (1000 * 60 * 60 * 24));

  if (nights <= 0) {
    return NextResponse.json({ error: "Rango de fechas inválido" }, { status: 400 });
  }

  // --- LIVE API INTEGRATION MODE (RAPIDAPI TEMPLATE) ---
  // In a real environment, you would call Booking.com API via RapidAPI:
  /*
  try {
    const rapidApiKey = process.env.RAPIDAPI_KEY;
    if (rapidApiKey) {
      const response = await fetch(
        `https://booking-com.p.rapidapi.com/v1/hotels/room-list?checkin_date=${checkin}&checkout_date=${checkout}&hotel_id=135479658&adults_number_by_rooms=${adults}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "booking-com.p.rapidapi.com",
            "x-rapidapi-key": rapidApiKey,
          },
        }
      );
      const data = await response.json();
      // Process and return live data here...
    }
  } catch (err) {
    console.error("API Fetch Error:", err);
  }
  */

  // --- SMART SIMULATOR MODE (Booking.com Genius Discounts & Seasons) ---
  // Calculates simulated real-time dynamic pricing based on actual parameters
  
  // 1. Season Factor
  // High season in Peru: Dec to April (Summer/New Year), July & Aug (Holidays)
  const month = dateIn.getMonth(); // 0-indexed (11 = Dec, 0 = Jan, 1 = Feb, 2 = Mar, 3 = Apr, 6 = July, 7 = Aug)
  let seasonFactor = 1.0;
  let seasonName = "Temporada Estándar";

  if ([11, 0, 1, 2, 3].includes(month)) {
    seasonFactor = 1.25; // +25% High Summer Season
    seasonName = "Temporada Alta (Verano)";
  } else if ([6, 7].includes(month)) {
    seasonFactor = 1.15; // +15% Winter Holidays
    seasonName = "Temporada Media-Alta (Vacaciones)";
  } else if ([4, 5, 8, 9, 10].includes(month)) {
    seasonFactor = 0.90; // -10% Low Season
    seasonName = "Temporada Baja";
  }

  // 2. Length of Stay discount
  let stayDiscount = 0;
  if (nights >= 7) {
    stayDiscount = 0.10; // 10% off for 7+ nights
  } else if (nights >= 3) {
    stayDiscount = 0.05; // 5% off for 3+ nights
  }

  // 3. Simulated Booking.com Genius discounts (Genius Level 2/3 standard discounts)
  const geniusDiscount = 0.15; // 15% Genius Discount

  const calculatedRooms = BASE_ROOMS.map((room) => {
    // Apply seasonal factor
    const seasonalPrice = room.basePrice * seasonFactor;
    
    // Apply Booking.com discounts (Genius + Stay Length discounts)
    const discountMultiplier = 1 - (geniusDiscount + stayDiscount);
    const finalPricePerNight = Math.round(seasonalPrice * discountMultiplier);
    
    const totalOriginalPrice = Math.round(room.basePrice * seasonFactor * nights);
    const totalDiscountedPrice = finalPricePerNight * nights;
    const savings = totalOriginalPrice - totalDiscountedPrice;

    return {
      id: room.id,
      originalPricePerNight: Math.round(seasonalPrice),
      discountedPricePerNight: finalPricePerNight,
      totalOriginal: totalOriginalPrice,
      totalDiscounted: totalDiscountedPrice,
      savings,
      hasGeniusDiscount: true,
      geniusLevel: 2,
      stayDiscountApplied: stayDiscount > 0,
      seasonName,
    };
  });

  return NextResponse.json({
    checkin,
    checkout,
    nights,
    rooms: calculatedRooms,
    simulatorActive: true,
    note: "Para tarifas reales, configure la variable de entorno RAPIDAPI_KEY."
  });
}
