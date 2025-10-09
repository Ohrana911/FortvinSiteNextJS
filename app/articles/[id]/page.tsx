// import { Button } from '@/components/ui';
// import articlesData from '../../../data/articles.json';
import '../articles.css';
// import Link from 'next/link';
// import React from 'react';

// type Article = {
//     id: string;
//     date: string;
//     title: string;
//     description: string;
//     content: string;
// };

// interface ArticlePageProps {
//     params: { id: string };
// }

// export default function ArticlePage({ params }: ArticlePageProps) {
//     const article = articlesData.find(a => a.id === params.id);

//     if (!article) {
//         return <h2>Статья не найдена</h2>;
//     }

//     return (
//         <div className="container">
//             <nav className="breadcrumb">
//                 <ol>
//                     <li>
//                         <a href="/" className="breadcrumb-link">Главная</a>
//                     </li>
//                     <li className="breadcrumb-separator">→</li>
//                     <a href="/articles" className="breadcrumb-link">Статьи</a>
//                     <li className="breadcrumb-separator">→</li>
//                     <li className="breadcrumb-current">{article.title}</li>
//                 </ol>
//             </nav>
//             <div className="article-content">
//                 <p style={{ fontSize: '14px', color: 'var(--color-blue)' }}>{article.date}</p>
//                 <h1 className="article-title">{article.title}</h1>
//             </div>
//             <div className="article-content">{article.content.split('\n').map((line, idx) => (
//                     <p className="article-content" key={idx}>{line}</p>
//                 ))}
//             </div>
//             <div className="w-[30%]">
//                 <div className="desktop-button">
//                     <Link href={`/articles`}>
//                         <Button className="cursor-pointer" variant="custom" size="custom">Другие статьи →</Button>
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// }

// import { Button } from '@/components/ui';
// import articlesData from '../../../data/articles.json';
// import { prisma } from '@/prisma/prisma-client';
// import '../articles.css';
// import Link from 'next/link';
// import React from 'react';

// type Article = {
//   id: string;
//   date: string;
//   title: string;
//   description: string;
//   content: string;
// };

// interface ArticlePageProps {
//   params: { id: string };
// }

// export default async function ArticlePage({ params }: ArticlePageProps) {
//   // const id = params.id; // просто деструктуризация

//   // Динамические посты из базы
//   const dbPosts = await prisma.post.findMany();
//   const dynamicArticles: Article[] = dbPosts.map(post => ({
//     id: post.id.toString(),
//     date: post.date,
//     title: post.title,
//     description: post.description,
//     content: post.content,
//   }));

//   // Объединяем с статикой
//   const allArticles: Article[] = [...articlesData, ...dynamicArticles];

//   // Ищем статью по id
//   // const article = allArticles.find(a => a.id === params.id);
//   const article = allArticles.find(a => a.id === params.id);

//   if (!article) {
//     return <h2>Статья не найдена</h2>;
//   }

//   return (
//     <div className="container">
//       <nav className="breadcrumb">
//         <ol>
//           <li><a href="/" className="breadcrumb-link">Главная</a></li>
//           <li className="breadcrumb-separator">→</li>
//           <a href="/articles" className="breadcrumb-link">Статьи</a>
//           <li className="breadcrumb-separator">→</li>
//           <li className="breadcrumb-current">{article.title}</li>
//         </ol>
//       </nav>

//       <div className="article-content">
//         <p style={{ fontSize: '14px', color: 'var(--color-blue)' }}>{article.date}</p>
//         <h1 className="article-title">{article.title}</h1>
//       </div>

//       <div className="article-content">
//         {article.content.split('\n').map((line, idx) => (
//           <p className="article-content" key={idx}>{line}</p>
//         ))}
//       </div>

//       <div className="w-[30%]">
//         <div className="desktop-button">
//           <Link href={`/articles`}>
//             <Button className="cursor-pointer" variant="custom" size="custom">
//               Другие статьи →
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React from 'react';
// import Link from 'next/link';
// import { prisma } from '@/prisma/prisma-client';
// import articlesData from '../../../data/articles.json';
// import { Button } from '@/components/ui';
// // import '../articles.css';

// type Article = {
//   id: string;
//   date: string;
//   title: string;
//   description: string;
//   content: string;
// };

// interface ArticlePageProps {
//   params: { id: string };
// }

// export default async function ArticlePage({ params }: ArticlePageProps) {
//   const { id } = params;

//   // Динамические статьи из базы
//   const dbPosts = await prisma.post.findMany();
//   const dynamicArticles: Article[] = dbPosts.map(post => ({
//     id: post.id.toString(),
//     date: post.date,
//     title: post.title,
//     description: post.description,
//     content: post.content,
//   }));

//   // Ищем статью сначала в динамических
//   let article = dynamicArticles.find(a => a.id === id);

//   // Если не нашли в базе, ищем в статических
//   if (!article) {
//     article = articlesData.find(a => a.id === id);
//   }

//   // Если не нашли нигде
//   if (!article) {
//     return (
//       <div className="container">
//         <h2>Статья не найдена</h2>
//         <Link href="/articles">
//           <Button className="cursor-pointer" variant="custom" size="custom">
//             Вернуться к статьям
//           </Button>
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="container">
//       <nav className="breadcrumb">
//         <ol>
//           <li><Link href="/" className="breadcrumb-link">Главная</Link></li>
//           <li className="breadcrumb-separator">→</li>
//           <li><Link href="/articles" className="breadcrumb-link">Статьи</Link></li>
//           <li className="breadcrumb-separator">→</li>
//           <li className="breadcrumb-current">{article.title}</li>
//         </ol>
//       </nav>

//       <div className="article-content">
//         <p style={{ fontSize: '14px', color: 'var(--color-blue)' }}>{article.date}</p>
//         <h1 className="article-title">{article.title}</h1>
//       </div>

//       <div className="article-content">
//         {article.content.split('\n').map((line, idx) => (
//           <p className="article-content" key={idx}>{line}</p>
//         ))}
//       </div>

//       <div className="w-[30%]">
//         <div className="desktop-button">
//           <Link href="/articles">
//             <Button className="cursor-pointer" variant="custom" size="custom">
//               Другие статьи →
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
import React from 'react';
import Link from 'next/link';
import { prisma } from '@/prisma/prisma-client';
import articlesData from '../../../data/articles.json';
import { Button } from '@/components/ui';

type Article = {
  id: string;
  date: string;
  title: string;
  description: string;
  content: string;
};

// Правильный тип для Next.js 15
interface ArticlePageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';
export const revalidate = 0; // полностью отключаем ISR


export default async function ArticlePage({ params }: ArticlePageProps) {
  // Используем await для получения params
  const { id } = await params;

  const dbPosts = await prisma.post.findMany();
  const dynamicArticles: Article[] = dbPosts.map(post => ({
    id: String(post.id),
    date: post.date,
    title: post.title,
    description: post.description,
    content: post.content,
  }));

  let article: Article | undefined = dynamicArticles.find(a => a.id === id);

  if (!article) {
    article = articlesData.find(a => a.id === id);
  }

  if (!article) {
    return (
      <div className="container">
        <h2>Статья не найдена</h2>
        <Link href="/articles">
          <Button className="cursor-pointer" variant="custom" size="custom">
            Вернуться к статьям
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <nav className="breadcrumb">
        <ol>
          <li><Link href="/" className="breadcrumb-link">Главная</Link></li>
          <li className="breadcrumb-separator">→</li>
          <li><Link href="/articles" className="breadcrumb-link">Статьи</Link></li>
          <li className="breadcrumb-separator">→</li>
          <li className="breadcrumb-current">{article.title}</li>
        </ol>
      </nav>

      <div className="article-content">
        <p style={{ fontSize: '14px', color: 'var(--color-blue)' }}>{article.date}</p>
        <h1 className="article-title">{article.title}</h1>
      </div>

      <div className="article-content">
        {article.content.split('\n').map((line, idx) => (
          <p className="article-content" key={idx}>{line}</p>
        ))}
      </div>

      <div className="w-[30%]">
        <div className="desktop-button">
          <Link href="/articles">
            <Button className="cursor-pointer" variant="custom" size="custom">
              Другие статьи →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}