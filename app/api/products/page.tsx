// 'use client';

// import { useEffect, useState } from 'react';

// type Product = {
//   id: number;
//   name: string;
// };

// export default function ProductsPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const res = await fetch(`/api/products/search?page=${page}&limit=5`);
//       const data = await res.json();
//       setProducts(data.data);
//       setTotalPages(data.totalPages);
//     };

//     fetchProducts();
//   }, [page]);

//   return (
//     <div className="p-5">
//       <h1 className="text-2xl font-bold mb-4">Products</h1>
//       <ul className="space-y-2">
//         {products.map((p) => (
//           <li key={p.id} className="border p-2 rounded">
//             {p.name}
//           </li>
//         ))}
//       </ul>

//       <div className="flex gap-2 mt-4">
//         <button
//           disabled={page === 1}
//           onClick={() => setPage((p) => p - 1)}
//           className="px-3 py-1 border rounded disabled:opacity-50"
//         >
//           Prev
//         </button>
//         <span>
//           Page {page} of {totalPages}
//         </span>
//         <button
//           disabled={page === totalPages}
//           onClick={() => setPage((p) => p + 1)}
//           className="px-3 py-1 border rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }


// рабочий код ниже

// 'use client';

// import { useEffect, useState } from 'react';

// type Product = {
//   id: number;
//   name: string;
//   imageUrl?: string;
//   retailPriceRubWithVAT?: number;
// };

// export default function ProductsPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const res = await fetch(`/api/products/search?page=${page}&limit=6`);
//       const data = await res.json();
//       setProducts(data.data);
//       setTotalPages(data.totalPages);
//     };

//     fetchProducts();
//   }, [page]);

//   return (
//     <div className="p-5 max-w-7xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">Каталог продукции</h1>

//       {/* Сетка продуктов */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products.map((p) => (
//           <div
//             key={p.id}
//             className="border rounded-lg shadow-sm p-4 flex flex-col items-center hover:shadow-md transition"
//           >
//             <img
//               src={p.imageUrl ?? '/placeholder.png'}
//               alt={p.name}
//               className="w-40 h-40 object-cover mb-4 rounded"
//             />
//             <h2 className="text-lg font-semibold text-center">{p.name}</h2>
//             <p className="text-gray-600 mt-2">
//               {p.retailPriceRubWithVAT
//                 ? `${p.retailPriceRubWithVAT} ₽`
//                 : 'Цена по запросу'}
//             </p>
//             <a
//               href={`/product/${p.id}`}
//               className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//             >
//               Подробнее
//             </a>
//           </div>
//         ))}
//       </div>

//       {/* Пагинация */}
//       <div className="flex justify-center items-center gap-4 mt-8">
//         <button
//           disabled={page === 1}
//           onClick={() => setPage((p) => p - 1)}
//           className="px-3 py-1 border rounded disabled:opacity-50"
//         >
//           Предыдущая
//         </button>
//         <span>
//           Страница {page} из {totalPages}
//         </span>
//         <button
//           disabled={page === totalPages}
//           onClick={() => setPage((p) => p + 1)}
//           className="px-3 py-1 border rounded disabled:opacity-50"
//         >
//           Следующая
//         </button>
//       </div>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';

type Product = {
  id: number;
  name: string;
  imageUrl?: string;
  retailPriceRubWithVAT?: number;
};

const categories = [
  { key: 'GAZOBETONNYE_BLOKI', label: 'Газобетонные блоки' },
  { key: 'OBLITSOVOCHNYY_KIRPICH', label: 'Облицовочный кирпич' },
  { key: 'TROTUARNAYA_PLITKA', label: 'Тротуарная плитка' },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState(categories[0].key); // по умолчанию первая категория

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        `/api/products/search?page=${page}&limit=6&category=${category}`
      );
      const data = await res.json();
      setProducts(data.data);
      setTotalPages(data.totalPages);
    };

    fetchProducts();
  }, [page, category]);

  return (
    <div className="p-5 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Каталог продукции</h1>

      {/* Кнопки категорий */}
      <div className="flex gap-3 mb-6">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => {
              setCategory(c.key);
              setPage(1); // при смене категории возвращаемся на первую страницу
            }}
            className={`px-4 py-2 rounded border transition ${
              category === c.key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Сетка продуктов */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="border rounded-lg shadow-sm p-4 flex flex-col items-center hover:shadow-md transition"
          >
            <img
              src={p.imageUrl ?? '/placeholder.png'}
              alt={p.name}
              className="w-40 h-40 object-cover mb-4 rounded"
            />
            <h2 className="text-lg font-semibold text-center">{p.name}</h2>
            <p className="text-gray-600 mt-2">
              {p.retailPriceRubWithVAT
                ? `${p.retailPriceRubWithVAT} ₽`
                : 'Цена по запросу'}
            </p>
            <a
              href={`/product/${p.id}`}
              className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Подробнее
            </a>
          </div>
        ))}
      </div>

      {/* Пагинация */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Предыдущая
        </button>
        <span>
          Страница {page} из {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Следующая
        </button>
      </div>
    </div>
  );
}
