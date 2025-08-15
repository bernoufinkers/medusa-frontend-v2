"use client";

import React, { useEffect, useRef, useState } from "react";
import { HttpTypes } from "@medusajs/types";
import { Container } from "@medusajs/ui";
import Image from "next/image";

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[];
};

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // NEW: refs & state voor scroll-controls
  const thumbsRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  // NEW: helper om te checken of we nog kunnen scrollen
  const updateArrows = () => {
    const el = thumbsRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const atStart = scrollLeft <= 0;
    const atEnd = scrollLeft + clientWidth >= scrollWidth - 1; // speling
    setCanLeft(!atStart);
    setCanRight(!atEnd);
  };

  // NEW: scroll-functie
  const scrollByAmount = (dir = 1) => {
    const el = thumbsRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9) * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  useEffect(() => {
    updateArrows();
    const el = thumbsRef.current;
    if (!el) return;

    const onScroll = () => updateArrows();
    const onResize = () => updateArrows();

    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // NEW: muiswiel verticaal -> horizontaal
  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = thumbsRef.current;
    if (!el) return;
    // Alleen omzetten als verticale scroll dominant is en Shift niet ingedrukt
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && !e.shiftKey) {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    }
  };

  return (
    <div className="flex flex-col items-center relative">
      {/* Hoofdafbeelding */}
      <div className="relative w-full max-h-[500px] pt-2 flex items-center justify-center overflow-hidden small:mx-16">
        {images[selectedIndex]?.url && (
          <img
            src={images[selectedIndex].url}
            alt={`Product image ${selectedIndex + 1}`}
            className="max-h-[400px] object-contain"
          />
        )}
      </div>

      {/* Thumbnails wrapper met pijltjes */}
      <div className="relative mt-12 w-full small:mx-16">
        {/* NEW: Linkerpijl */}
        {canLeft && (
          <button
            type="button"
            onClick={() => scrollByAmount(-1)}
            aria-label="Scroll thumbnails left"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10
                       rounded-full p-2 shadow-md bg-white/80 backdrop-blur
                       hover:bg-white focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            {/* simpele chevron */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* NEW: Rechterpijl */}
        {canRight && (
          <button
            type="button"
            onClick={() => scrollByAmount(1)}
            aria-label="Scroll thumbnails right"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10
                       rounded-full p-2 shadow-md bg-white/80 backdrop-blur
                       hover:bg-white focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* optionele fades aan de randen voor visuele hint */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent" />

        {/* Thumbnails scroller */}
        <div
          ref={thumbsRef}
          role="listbox"
          aria-label="Thumbnails"
          onWheel={onWheel} // NEW
          className="w-full overflow-x-auto scroll-smooth
                     flex flex-nowrap gap-4 pr-2 pl-2
                     scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedIndex(index)}
              role="option"
              aria-selected={index === selectedIndex}
              className={`relative w-24 h-24 flex-shrink-0 overflow-hidden border rounded snap-start
                          focus:outline-none focus:ring-2 focus:ring-secondary
                          ${index === selectedIndex ? "border-secondary" : "border-gray-200"}`}
            >
              {image.url && (
                <Image
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  sizes="96px"
                  className="object-contain"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

};

export default ImageGallery;
