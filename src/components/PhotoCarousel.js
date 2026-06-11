"use client";

import { useState, useEffect } from "react";

const IMAGES = [
  {
    url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/135479658.jpg?k=a973e13085bc03cea718affd2666693c30ee21bc42e1b720c98272286fbc19dc&o=",
  },
  {
    url: "https://cf.bstatic.com/xdata/images/hotel/max1200/262051000.jpg?k=75e203c0919bfaeb592f7ab550e6ccf8c5c68d8e5ec7205c9c5279474269d38d&o=",
  },
  {
    url: "/plato-de-ceviche-peruano_0.webp",
  },
  {
    url: "https://cf.bstatic.com/xdata/images/hotel/max1200/226844854.jpg?k=51b61877cce93c192c7cd4bb3a92ba4598d1582c2c4c7c04007899674426da42&o=",
  },
  {
    url: "https://cf.bstatic.com/xdata/images/hotel/max1200/14695154.jpg?k=1471ad70febbdaa65b594b273dd4cff0d0851c641484a12b55ac73a04c0c2505&o=",
  },
  {
    url: "https://cf.bstatic.com/xdata/images/hotel/max1200/391418520.jpg?k=2a38ec6b935764cd00c3515febe92d8f23b0bc7eb23363d53c51ca711d5ac5db&o=",
  },
];

export default function PhotoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === IMAGES.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
      {IMAGES.map((img, index) => (
        <div
          key={img.url}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-stone-950/40 z-10" />
          
          <img
            src={img.url}
            alt="Vichayito Background"
            className="w-full h-full object-cover transform scale-100 transition-transform duration-[6000ms] ease-out"
          />
        </div>
      ))}

      {/* Pagination indicators inside hero */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentIndex
                ? "bg-white w-6"
                : "bg-white/45 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
