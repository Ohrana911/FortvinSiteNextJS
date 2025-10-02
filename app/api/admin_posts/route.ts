import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

// GET — получить все посты
export async function GET() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { date, title, description, content } = body;

    if (!date || !title || !description || !content) {
      return NextResponse.json({ error: "Все поля обязательны" }, { status: 400 });
    }

    // Берём существующего админа
    const currentUser = await prisma.user.findUnique({ where: { id: 21 } });

    if (!currentUser || currentUser.role !== "ADMIN") {
      return NextResponse.json({ error: "Только админ может добавлять посты" }, { status: 403 });
    }

    const newPost = await prisma.post.create({
      data: { date, title, description, content, authorId: currentUser.id },
    });

    return NextResponse.json(newPost);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

