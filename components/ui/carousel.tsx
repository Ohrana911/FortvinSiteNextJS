import React from "react";

const images = [
  "/carousel/Выбор-СПб.png",
  "/carousel/RECKE_BRICKEREI.png",
  "/carousel/Cтарооскольский_кз.png",
  "/carousel/Вышневолоцкая керамика.png",
  "/carousel/газобетон_ск.png",
  "/carousel/Железногорский_кз.png",
  "/carousel/Кирпичный завод BRAER лого.png",
  "/carousel/лср.png",
  "/carousel/Красная Гвардия.png",
];

interface CarouselProps {
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({ className }) => {
  return (
    <div id="carousel" className={`height-scroll w-full pt-2 pb-2 overflow-hidden gap-10 ${className}`} style={{ background: "var(--color-light-gray)" }}>
      <div className="flex animate-scroll">
        {/* Дублируем массив картинок, чтобы создать бесконечный цикл */}
        {[...images, ...images].map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`carousel-${i}`}
            className="h-18 mr-5 flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
