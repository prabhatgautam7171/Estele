import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";
import hero4 from "../assets/hero4.jpg";

const Hero = () => {
  const slides = [hero1, hero2, hero3, hero4];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-white px-[35px] ">
      {/* Banner */}
      <div className="relative aspect-[2.50/1] w-full overflow-hidden rounded-[30px]">
        {/* Slides */}
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="h-full min-w-full 10"
            >
              <img
                src={slide}
                alt={`Estele collection ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Previous Button */}
        <button
          onClick={previousSlide}
          aria-label="Previous slide"
          className="absolute left-[17px] top-1/2 flex h-[40px] w-[40px] -translate-y-1/2 items-center justify-center rounded-full bg-white transition-transform duration-200 hover:scale-105"
        >
          <ChevronLeft
            size={20}
            strokeWidth={1.5}
            className="text-[#333]"
          />
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-[17px] top-1/2 flex h-[40px] w-[40px] -translate-y-1/2 items-center justify-center rounded-full bg-white transition-transform duration-200 hover:scale-105"
        >
          <ChevronRight
            size={20}
            strokeWidth={1.5}
            className="text-[#333]"
          />
        </button>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-[8px] pt-[19px]">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-[9px] w-[9px] rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-[#888]"
                : "bg-[#d5d5d5]"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
