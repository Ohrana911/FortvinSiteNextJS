import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Админ-панель</h1>
      <ul className="space-y-4">
        <li>
          <Link href="/admin/posts" className="text-blue-600 underline">
            ➕ Добавить пост
          </Link>
        </li>
        <li>
          <Link href="/admin/orders" className="text-blue-600 underline">
            📦 Просмотреть заказы пользователей
          </Link>
        </li>
        <li>
          <Link
            href="/admin/import_products"
            className="text-blue-600 underline"
          >
            📦 Импортировать товары
          </Link>
        </li>
        <li>
          <Link href="/admin/products" className="text-blue-600 underline">
            📦 Редактировать скидку товаров
          </Link>
        </li>
        <li>
          <Link
            href="/admin/update-product"
            className="text-blue-600 underline"
          >
            📦 Обновить запись о товаре
          </Link>
        </li>

        <li>
          <Link href="/api/export-data" className="text-blue-600 underline">
            📦 Скачать файл с данными из бд (JSON)
          </Link>
        </li>
      </ul>
    </div>
  );
}
