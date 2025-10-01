"use client";

import { useState } from "react";

export default function AdminPosts() {
  const currentUser = { id: 1, role: "ADMIN" }; // пока заглушка

  const [form, setForm] = useState({
    date: "",
    title: "",
    description: "",
    content: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/admin_posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": currentUser.id.toString(),
        "x-user-role": currentUser.role,
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Пост добавлен!");
      setForm({ date: "", title: "", description: "", content: "" });
    } else {
      const data = await res.json();
      alert(data.error);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Добавить пост</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="date"
          value={form.date}
          onChange={handleChange}
          placeholder="Дата"
          className="border p-2 rounded"
          required
        />
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Заголовок"
          className="border p-2 rounded"
          required
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Описание"
          className="border p-2 rounded"
          required
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Содержимое"
          className="border p-2 rounded min-h-[150px]"
          required
        />
        <button className="bg-blue-600 text-white py-2 rounded">Опубликовать</button>
      </form>
    </div>
  );
}
