"use client";

import { useState } from "react";

export default function UpdateProductPage() {
  const [productId, setProductId] = useState("");
  const [field, setField] = useState("name");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ [key: string]: unknown } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/update-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          field,
          value,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Ошибка:", error);
      setResult({ error: "Произошла ошибка" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Обновление товара</h1>

      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label className="block mb-2">ID товара (число):</label>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Поле для обновления:</label>
          <select
            value={field}
            onChange={(e) => setField(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="name">Название</option>
            <option value="imageUrl">URL изображения</option>
            <option value="color">Цвет</option>
            <option value="frostResistance">Морозостойкость</option>
            <option value="waterAbsorption">Водопоглощение</option>
            <option value="size">Размер</option>
            <option value="weightKg">Вес (кг)</option>
            <option value="quantityPerPallet">Кол-во на паллете</option>
            <option value="palletsPerTruck">Паллет в грузовике</option>
            <option value="totalPerTruck">Всего в грузовике</option>
            <option value="retailPriceRubWithVAT">Цена с НДС</option>
            <option value="city">Город</option>
            <option value="isOnSale">Распродажа</option>
            <option value="saleDescription">Описание скидки</option>
            <option value="densityKgPerM3">Плотность (кг/м³)</option>
            <option value="description">Описание</option>
            <option value="manufacturer">Производитель</option>
            <option value="strengthClass">Класс прочности</option>
            <option value="quantityPerPalletKvM">
              Кол-во на паллете (кв.м)
            </option>
            <option value="weightOnePalletKg">Вес паллета (кг)</option>
            <option value="heightMm">Высота (мм)</option>
            <option value="form">Форма</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">Новое значение:</label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Обновление..." : "Обновить"}
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h3 className="font-bold mb-2">Результат:</h3>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
