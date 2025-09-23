// components/shared/client-components-wrapper.tsx
// 'use client';

// import React, { useState, useEffect } from "react";
// import { Header } from "./header";
// import ModalWindow from "./modal-window";
// import LoginForm from "./login-form";

// export const ClientComponentsWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const [isOpen, setIsOpen] = useState(false);

//     useEffect(() => {
//         document.body.style.overflow = isOpen ? "hidden" : "auto";
//         return () => { document.body.style.overflow = "auto"; };
//     }, [isOpen]);

//     return (
//         <>
//             <Header onOpenModal={() => setIsOpen(true)} />
//             <ModalWindow isOpen={isOpen} onClose={() => setIsOpen(false)} setFormType={() => "login"}>
//                 <LoginForm />
//             </ModalWindow>
//             {children}
//         </>
//     );
// };
