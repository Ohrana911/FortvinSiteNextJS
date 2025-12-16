// "use client";

// import { useState } from "react";

// export default function UpdateProductPage() {
//   const [productId, setProductId] = useState("");
//   const [field, setField] = useState("name");
//   const [value, setValue] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState<{ [key: string]: unknown } | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch("/api/admin/update-product", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           productId,
//           field,
//           value,
//         }),
//       });

//       const data = await response.json();
//       setResult(data);
//     } catch (error) {
//       console.error("Ошибка:", error);
//       setResult({ error: "Произошла ошибка" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Обновление товара</h1>

//       <form onSubmit={handleSubmit} className="max-w-md space-y-4">
//         <div>
//           <label className="block mb-2">ID товара (число):</label>
//           <input
//             type="text"
//             value={productId}
//             onChange={(e) => setProductId(e.target.value)}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-2">Поле для обновления:</label>
//           <select
//             value={field}
//             onChange={(e) => setField(e.target.value)}
//             className="w-full p-2 border rounded"
//           >
//             <option value="name">Название</option>
//             <option value="imageUrl">URL изображения</option>
//             <option value="color">Цвет</option>
//             <option value="frostResistance">Морозостойкость</option>
//             <option value="waterAbsorption">Водопоглощение</option>
//             <option value="size">Размер</option>
//             <option value="weightKg">Вес (кг)</option>
//             <option value="quantityPerPallet">Кол-во на паллете</option>
//             <option value="palletsPerTruck">Паллет в грузовике</option>
//             <option value="totalPerTruck">Всего в грузовике</option>
//             <option value="retailPriceRubWithVAT">Цена с НДС</option>
//             <option value="city">Город</option>
//             <option value="isOnSale">Распродажа</option>
//             <option value="saleDescription">Описание скидки</option>
//             <option value="densityKgPerM3">Плотность (кг/м³)</option>
//             <option value="description">Описание</option>
//             <option value="manufacturer">Производитель</option>
//             <option value="strengthClass">Класс прочности</option>
//             <option value="quantityPerPalletKvM">
//               Кол-во на паллете (кв.м)
//             </option>
//             <option value="weightOnePalletKg">Вес паллета (кг)</option>
//             <option value="heightMm">Высота (мм)</option>
//             <option value="form">Форма</option>
//           </select>
//         </div>

//         <div>
//           <label className="block mb-2">Новое значение:</label>
//           <input
//             type="text"
//             value={value}
//             onChange={(e) => setValue(e.target.value)}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
//         >
//           {loading ? "Обновление..." : "Обновить"}
//         </button>
//       </form>

//       {result && (
//         <div className="mt-6 p-4 bg-gray-100 rounded">
//           <h3 className="font-bold mb-2">Результат:</h3>
//           <pre className="whitespace-pre-wrap">
//             {JSON.stringify(result, null, 2)}
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  color: string;
  category?: {
    name: string;
  };
  // Добавляем другие поля, которые могут быть в вашем API
}

export default function UpdateProductPage() {
  const [productId, setProductId] = useState("");
  const [field, setField] = useState("name");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Загружаем список товаров при монтировании
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const response = await fetch("/api/admin/products");
      const products = await response.json();
      setProducts(products || []);
    } catch (error) {
      console.error("Ошибка загрузки товаров:", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

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

      // Обновляем список товаров после успешного обновления
      if (data.success) {
        fetchProducts();
      }
    } catch (error) {
      console.error("Ошибка:", error);
      setResult({ error: "Произошла ошибка" });
    } finally {
      setLoading(false);
    }
  };

  // Фильтруем товары по поисковому запросу
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.color.toLowerCase().includes(search.toLowerCase()) ||
      product.id.toString().includes(search)
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Обновление товара</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Левая колонка: Список товаров */}
        <div className="lg:col-span-2">
          <div className="mb-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по названию, цвету или ID..."
              className="w-full p-3 border rounded-lg"
            />
          </div>

          {loadingProducts ? (
            <div className="text-center p-8">Загрузка товаров...</div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">ID</th>
                    <th className="p-3 text-left">Название</th>
                    <th className="p-3 text-left">Цвет</th>
                    <th className="p-3 text-left">Категория</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className={`border-t hover:bg-gray-50 cursor-pointer ${
                        productId === product.id.toString() ? "bg-blue-50" : ""
                      }`}
                      onClick={() => {
                        setProductId(product.id.toString());
                        setResult(null);
                      }}
                    >
                      <td className="p-3">
                        <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                          {product.id}
                        </span>
                      </td>
                      <td className="p-3 font-medium">{product.name}</td>
                      <td className="p-3">{product.color}</td>
                      <td className="p-3 text-gray-600">
                        {product.category?.name || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredProducts.length === 0 && (
                <div className="text-center p-8 text-gray-500">
                  Товары не найдены
                </div>
              )}
            </div>
          )}
        </div>

        {/* Правая колонка: Форма обновления */}
        <div>
          <div className="bg-gray-50 p-6 rounded-lg sticky top-6">
            <h2 className="text-lg font-bold mb-4">Обновление товара</h2>

            <div className="mb-4 p-3 bg-white border rounded">
              <div className="text-sm text-gray-500">Выбранный товар:</div>
              <div className="font-medium">
                {productId ? (
                  products.find((p) => p.id.toString() === productId)?.name ||
                  `ID: ${productId}`
                ) : (
                  <span className="text-gray-400">Не выбран</span>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  ID товара:
                </label>
                <input
                  type="text"
                  value={productId}
                  onChange={(e) => {
                    setProductId(e.target.value);
                    setResult(null);
                  }}
                  className="w-full p-2 border rounded"
                  placeholder="Выберите товар из списка или введите ID"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Поле для обновления:
                </label>
                <select
                  value={field}
                  onChange={(e) => {
                    setField(e.target.value);
                    setValue("");
                  }}
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
                <label className="block mb-2 text-sm font-medium">
                  Новое значение:
                </label>
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
                disabled={loading || !productId}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? "Обновление..." : "Обновить товар"}
              </button>
            </form>

            {result && (
              <div
                className={`mt-6 p-4 rounded-lg ${
                  result.error
                    ? "bg-red-50 border border-red-200"
                    : "bg-green-50 border border-green-200"
                }`}
              >
                <h3
                  className={`font-bold mb-2 ${result.error ? "text-red-800" : "text-green-800"}`}
                >
                  {result.error ? "Ошибка" : "Успешно"}
                </h3>
                <pre className="whitespace-pre-wrap text-sm overflow-x-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
