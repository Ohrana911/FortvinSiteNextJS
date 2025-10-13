'use client';

import { WhiteBlock } from '@/components/shared/white-block';
import { useEffect, useState } from 'react';

type Product = {
  name: string;
  size: string;
  color: string;
  imageUrl: string;
  retailPriceRubWithVAT: number;
  quantityPerPallet: number;
  isOnSale: boolean;
  saleDescription: string | null;
};

type OrderItem = {
  id: number;
  quantity: number;
  productItem: {
    price: number;
    product: Product;
  };
};

type Order = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  comment: string;
  status: string;
  totalAmount: number;
  items: OrderItem[];
  createdAt: string;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  if (loading) return <p className="p-6">Загрузка...</p>;

  // фильтруем заказы по номеру
  const filteredOrders = search
    ? orders.filter((order) => order.id.toString() === search)
    : orders;

  // отдельный компонент для рендера товаров без кнопок
  const AdminOrderItem: React.FC<{ item: OrderItem }> = ({ item }) => {
    const p = item.productItem.product;
    return (
      <div className="flex items-center justify-between border p-2 rounded">
        <div className="flex items-center gap-4 flex-1">
          <img src={p.imageUrl} alt={p.name} className="w-16 h-16 object-cover rounded" />
          <div>
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm text-gray-600">
              {p.size}, {p.color}
            </div>
          </div>
        </div>

        <div className="flex flex-col text-sm text-gray-600 gap-1 text-right">
          {p.isOnSale && p.saleDescription && (
            <span className="text-red-500 font-semibold">{p.saleDescription}</span>
          )}
          <span>Количество на поддон: {p.quantityPerPallet}</span>
          <span>Цена за поддон: {p.retailPriceRubWithVAT} ₽</span>
          <span>
            Итого за {item.quantity} шт: {p.retailPriceRubWithVAT * p.quantityPerPallet * item.quantity} ₽
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold mb-4">Заказы пользователей</h1>

      {/* Поле поиска по номеру заказа */}
      <input
        type="text"
        placeholder="Введите номер заказа"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-60 mb-6"
      />

      {filteredOrders.length === 0 && <p className="text-gray-500">Нет заказов</p>}

      {filteredOrders.map((order) => (
        <WhiteBlock key={order.id} title={`Заказ #${order.id}`} className="p-4">
          <div className="mb-4 space-y-1">
            <div><strong>Статус:</strong> {order.status}</div>
            <div><strong>Имя:</strong> {order.fullName}</div>
            <div><strong>Email:</strong> {order.email}</div>
            <div><strong>Телефон:</strong> {order.phone}</div>
            <div><strong>Адрес:</strong> {order.address}</div>
            {order.comment && <div><strong>Комментарий:</strong> {order.comment}</div>}
            <div className="text-sm text-gray-500">
              Дата: {new Date(order.createdAt).toLocaleString('ru-RU')}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {order.items.map((item) => (
              <AdminOrderItem key={item.id} item={item} />
            ))}
          </div>

          <div className="mt-4 font-bold text-right">
            Общая сумма: {order.totalAmount.toLocaleString('ru-RU')} ₽
          </div>
        </WhiteBlock>
      ))}
    </div>
  );
}
