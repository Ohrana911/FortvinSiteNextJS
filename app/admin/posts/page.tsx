// "use client";

// import { authOptions } from "@/components/constants/auth-options";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";

// import { useState } from "react";

// export default async function AdminPosts() {
//   // const currentUser = { id: 1, role: "ADMIN" }; // пока заглушка
//   const session = await getServerSession(authOptions);
//   const currentUser = session?.user;

//   if (!currentUser || currentUser.role !== "ADMIN") {
//     redirect("/");
//   }


//   const [form, setForm] = useState({
//     date: "",
//     title: "",
//     description: "",
//     content: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const res = await fetch("/api/admin_posts", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "x-user-id": currentUser.id.toString(),
//         "x-user-role": currentUser.role,
//       },
//       body: JSON.stringify(form),
//     });

//     if (res.ok) {
//       alert("Пост добавлен!");
//       setForm({ date: "", title: "", description: "", content: "" });
//     } else {
//       const data = await res.json();
//       alert(data.error);
//     }
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto">
//       <h1 className="text-xl font-bold mb-4">Добавить пост</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           name="date"
//           value={form.date}
//           onChange={handleChange}
//           placeholder="Дата"
//           className="border p-2 rounded"
//           required
//         />
//         <input
//           name="title"
//           value={form.title}
//           onChange={handleChange}
//           placeholder="Заголовок"
//           className="border p-2 rounded"
//           required
//         />
//         <input
//           name="description"
//           value={form.description}
//           onChange={handleChange}
//           placeholder="Описание"
//           className="border p-2 rounded"
//           required
//         />
//         <textarea
//           name="content"
//           value={form.content}
//           onChange={handleChange}
//           placeholder="Содержимое"
//           className="border p-2 rounded min-h-[150px]"
//           required
//         />
//         <button className="bg-blue-600 text-white py-2 rounded">Опубликовать</button>
//       </form>
//     </div>
//   );
// }

// app/admin/posts/page.tsx
import { prisma } from "@/prisma/prisma-client";
import AddPostForm from "./add-post-form";

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Посты</h1>
      <AddPostForm />

      <ul className="mt-6 space-y-2">
        {posts.map((post) => (
          <li key={post.id} className="border p-2 rounded">
            <h2 className="font-semibold">{post.title}</h2>
            <p>{post.description}</p>
            <small>{new Date(post.date).toLocaleDateString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
