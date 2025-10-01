import React from 'react';
import './articles.css';
import articlesData from '../../data/articles.json';
import Link from 'next/link';
import { prisma } from "@/prisma/prisma-client";

// type Article = {
//     id: string;
//     date: string;
//     title: string;
//     description: string;
//     content: string;
// };

// async function getArticles(): Promise<Article[]> {
//     return articlesData;
// }

// const ArticlesPage = async () => {
//     const articles = await getArticles();
//     return (
//         <div className="container">
//             <nav className="breadcrumb">
//                 <ol>
//                     <li>
//                         <a href="/" className="breadcrumb-link">Главная</a>
//                     </li>
//                     <li className="breadcrumb-separator">→</li>
//                     <li className="breadcrumb-current">Статьи</li>
//                 </ol>
//             </nav>
//             <div>
//                 <h1 className='underline'>Статьи</h1>
//                 <div className="articles-list">
//                     {(articles.length === 0) ? (
//                         <h2>Пока статей нет. Следите за обновлениями!</h2>
//                     ) : (
//                         articles.map(article => (
//                             <div className="article-item" key={article.id}>
//                                 <p style={{ fontSize: '14px', color: 'var(--color-blue)' }}>{article.date}</p>
//                                 <div className="article-content">
//                                     <h2 className="article-title">{article.title}</h2>
//                                     <p className="article-description">{article.description}</p>
//                                 </div>
//                                 <div className="article-footer">
//                                     <Link href={`/articles/${article.id}`}>
//                                         <button className="colored-button">Читать далее</button>
//                                     </Link>                                
//                                 </div>
//                             </div>
//                         ))
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ArticlesPage;

// import { prisma } from "@/prisma/prisma-client";

// const ArticlesPage = async () => {
//   const articles = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });

//   return (
//     <div className="container">
//       <h1 className="underline">Статьи</h1>
//       <div className="articles-list">
//         {articles.length === 0 ? (
//           <h2>Пока статей нет. Следите за обновлениями!</h2>
//         ) : (
//           articles.map(article => (
//             <div className="article-item" key={article.id}>
//               <p style={{ fontSize: '14px', color: 'var(--color-blue)' }}>{article.date}</p>
//               <div className="article-content">
//                 <h2 className="article-title">{article.title}</h2>
//                 <p className="article-description">{article.description}</p>
//               </div>
//               <div className="article-footer">
//                 <Link href={`/articles/${article.id}`}>
//                   <button className="colored-button">Читать далее</button>
//                 </Link>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default ArticlesPage;


// Объединённый тип для статических и динамических статей
type Article = {
  id: string;
  date: string;
  title: string;
  description: string;
  content: string;
};

const ArticlesPage = async () => {
  // Посты из базы
  const dbPosts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" }
  });

  // Преобразуем dbPosts в формат Article
  const dynamicArticles: Article[] = dbPosts.map(post => ({
    id: post.id.toString(),
    date: post.date,
    title: post.title,
    description: post.description,
    content: post.content
  }));

  // Объединяем статические и динамические статьи
  const allArticles: Article[] = [...articlesData, ...dynamicArticles];

  return (
    <div className="container">
      <nav className="breadcrumb">
        <ol>
          <li><a href="/" className="breadcrumb-link">Главная</a></li>
          <li className="breadcrumb-separator">→</li>
          <li className="breadcrumb-current">Статьи</li>
        </ol>
      </nav>

      <h1 className='underline'>Статьи</h1>

      <div className="articles-list">
        {allArticles.length === 0 ? (
          <h2>Пока статей нет. Следите за обновлениями!</h2>
        ) : (
          allArticles.map(article => (
            <div className="article-item" key={article.id}>
              <p style={{ fontSize: '14px', color: 'var(--color-blue)' }}>{article.date}</p>
              <div className="article-content">
                <h2 className="article-title">{article.title}</h2>
                <p className="article-description">{article.description}</p>
              </div>
              <div className="article-footer">
                <Link href={`/articles/${article.id}`}>
                  <button className="colored-button">Читать далее</button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ArticlesPage;
