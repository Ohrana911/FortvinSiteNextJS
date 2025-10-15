// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import './articles/articles.css'; // ✅ оставить файл на месте
import { Header } from "@/components/shared/header";
import Script from "next/script";
// import Footer from "@/components/shared/footer";
// import { useEffect, useState } from "react";
// import ModalWindow from "@/components/shared/modal-window";
// import { Providers } from "@/components/shared/providers";
// import { LoginForm } from "@/components/shared/modals/auth-modal/forms/login-form";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const [isOpen, setIsOpen] = useState(false);
  
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }

//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isOpen]);
  
//   return (
//     <html lang="en">
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
//         <Providers>
//           <Header onOpenModal={() => setIsOpen(true)} />
//           <ModalWindow isOpen={isOpen} onClose={() => setIsOpen(false)} setFormType={(type) => {"login"}} >
//             <LoginForm />
//           </ModalWindow>
//           <main>{children}</main>
//           <Footer />
//         </Providers>
//       </body>
//     </html>
//   );
// }

import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import { Header } from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import { Providers } from "@/components/shared/providers";
import ModalManager from "@/components/shared/modal-manager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        
        {/* ✅ Подключаем Яндекс.Метрику */}
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=104644020", "ym");

              ym(104644020, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
              });
            `,
          }}
        />

        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/104644020"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>

        <Providers>
          <ModalManager>
            <Header />
              <main>{children}</main>
            <Footer />
          </ModalManager>
        </Providers>
      </body>
    </html>
  );
}
