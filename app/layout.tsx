"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import { useEffect, useState } from "react";
import ModalWindow from "@/components/shared/modal-window";
import LoginForm from "@/components/shared/login-form";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Header onOpenModal={() => setIsOpen(true)} />
          <ModalWindow isOpen={isOpen} onClose={() => setIsOpen(false)} setFormType={(type) => {"login"}} >
            <LoginForm />
          </ModalWindow>
          <main>{children}</main>
          <Footer />
      </body>
    </html>
  );
}
