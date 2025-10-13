// app/admin/posts/AddPostForm.tsx
"use client";

import { useState } from "react";

export default function AddPostForm() {
  const today = new Date().toISOString().split("T")[0]; // формат YYYY-MM-DD
  const [form, setForm] = useState({ date: today, title: "", description: "", content: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/admin_posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Пост добавлен!");
      setForm({ ...form, title: "", description: "", content: "" });
    } else {
      const data = await res.json();
      alert(data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input name="date" value={form.date} onChange={handleChange} placeholder="Дата" className="border p-2 rounded" required />
      <input name="title" value={form.title} onChange={handleChange} placeholder="Заголовок" className="border p-2 rounded" required />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Описание" className="border p-2 rounded" required />
      <textarea name="content" value={form.content} onChange={handleChange} placeholder="Содержимое" className="border p-2 rounded min-h-[150px]" required />
      <button className="bg-blue-600 text-white py-2 rounded">Опубликовать</button>
    </form>
  );
}
