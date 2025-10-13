"use client";

import React, { useState, useRef, useEffect } from "react";
import { MapPin } from "lucide-react";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import { createPortal } from "react-dom";

const cities = ["Санкт-Петербург", "Оренбург"];

interface CityDropdownProps {
  value: string;
  onChange: (city: string) => void;
}

export const CityDropdown: React.FC<CityDropdownProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Закрытие списка при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    // 🔹 Новый метод — выбираем город, сохраняем cookie и оповещаем других
  const handleSelect = async (city: string) => {
    onChange(city);
    setOpen(false);

    try {
      await fetch("/api/city", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city }),
      });

      // 🔹 Отправляем глобальное событие
      window.dispatchEvent(new CustomEvent("cityChanged", { detail: city }));
    } catch (err) {
      console.error("Ошибка при установке города:", err);
    }
  };

  return (
    <div ref={ref} className="relative">
      {/* Заголовок без hover */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 cursor-pointer text-white px-3 py-1 select-none w-[193px]"
      >
        <MapPin size={16} />
        <span>{value}</span>
        {open ? (
          <ExpandLessOutlinedIcon fontSize="small" />
        ) : (
          <ExpandMoreOutlinedIcon fontSize="small" />
        )}
      </div>

      {/* Список */}
      {open &&
        createPortal(
          <div
            className="absolute bg-white shadow-lg z-[1000] overflow-hidden transition-all duration-300"
            style={{
              top: ref.current?.getBoundingClientRect().bottom,
              left: ref.current?.getBoundingClientRect().left,
              width: "193px",
              position: "fixed",
            }}
          >
            {cities.map((city) => (
              <div
                key={city}
                role="button"
                // onMouseDown={() => {
                //   onChange(city);
                //   setOpen(false);
                // }}
                onMouseDown={() => handleSelect(city)} // ✅ изменили здесь
                className={`px-4 py-2 cursor-pointer transition-colors duration-200 ${
                  city === value
                    ? "bg-[var(--color-blue)] text-white font-medium"
                    : "hover:bg-[var(--color-light-blue)]"
                }`}
              >
                {city}
              </div>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
};
