"use client";

import { useState, useEffect } from "react";
import ModalWindow from "@/components/shared/modal-window";
import { LoginForm } from "@/components/shared/modals/auth-modal/forms/login-form";
import { Header } from "@/components/shared/header";

export default function ModalManager({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* ✅ теперь проп передаётся */}
      <Header onOpenModal={() => setIsOpen(true)} />
      <ModalWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        setFormType={() => "login"}
      >
        <LoginForm />
      </ModalWindow>
      {children}
    </>
  );
}