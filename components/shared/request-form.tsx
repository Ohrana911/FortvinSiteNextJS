'use client';

import React, { useState } from 'react';
import { Button } from '../ui';
import toast from "react-hot-toast";

interface FormData {
  name: string;
  phone: string;
  city: string;
  service: string;
}

const RequestForm: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    name: '',
    phone: '',
    city: '',
    service: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/send-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("✅ Заявка успешно отправлена!");
        setForm({ name: '', phone: '', city: '', service: '' }); // очистим форму
      } else {
        toast.error("❌ Ошибка при отправке заявки");
      }
    } catch (err) {
      toast.error("⚠️ Что-то пошло не так, попробуйте позже");
    }
  };

    return (
        <div className="request-block scroll-mt-20" id="request-form">
                <h1 className="underline">Хотите заказать услугу?</h1>
                <div className="request-card">
                    <div className="request-left">
                        <p>Заполните форму, а наши менеджеры с радостью подскажут лучший вариант и помогут оформить заказ</p>
                        <img src="/request.jpg" alt="Заявка" className="request-image" />
                    </div>

                    <div className="request-right">
                    <form className="request-form" onSubmit={handleSubmit}>
                        <label htmlFor="name">ФИО</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Иван Иванович Иванов"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        <label htmlFor="phone">Номер телефона</label>
                                <input 
                                    id="phone"
                                    name="phone"
                                    type="tel" 
                                    placeholder="+7 (000) 000-00-00" 
                                    value={form.phone}
                                    onChange={handleChange}
                                    required 
                                />
                        <label htmlFor="city">Город</label>
                            <input
                                id="city"
                                name="city"
                                type="text"
                                placeholder="Например: Санкт-Петербург"
                                value={form.city}
                                onChange={handleChange}
                                required
                            />
                        <label htmlFor="service">Услуга</label>
                        <select 
                            id="service"
                            name="service"
                            value={form.service}
                            onChange={handleChange}
                            required
                        >
                            <option value=""></option>
                            <option value="house">Строительство домов</option>
                            <option value="design">Дизайн интерьеров</option>
                            <option value="landscape">Благоустройство</option>
                        </select>
                        <div className="flex items-center gap-2">
                            <input
                            type="checkbox"
                            id="agreement"
                            name="agreement"
                            required
                            className="cursor-pointer accent-[var(--color-blue)] w-[24px] h-[24px]"
                            />
                            <label htmlFor="agreement" className="note mb-[20px]">
                            Я даю <a className="text-[var(--color-blue)] underline" href="/privacy-policy">Согласие на обработку данных</a> и соглашаюсь с <a className="text-[var(--color-blue)] underline" href="/privacy-policy">Политикой конфиденциальности</a>
                            </label>
                        </div>
                        <Button variant="request" size="request">Оставить заявку</Button>
                    </form>
                </div>
            </div>
        </div>
  );
};

export default RequestForm;
