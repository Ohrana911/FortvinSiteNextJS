// import { signIn } from "next-auth/react";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { RegisterForm } from "./modals/auth-modal/forms/register-form"; // поправь импорт под себя

// interface LoginFormProps {
//   onClose?: () => void;
// }

// const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [formType, setFormType] = useState<"login" | "register">("login");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     if (formType === "login") {
//       if (!email || !password) {
//         setError("Напишите ваш email и пароль.");
//         return;
//       }

//       // 🔥 Реальный вызов авторизации
//       const resp = await signIn("credentials", {
//         email,
//         password,
//         redirect: false,
//       });

//       if (!resp?.ok) {
//         setError("Неверный email или пароль");
//         return;
//       }

//       onClose?.(); // Закроем модалку после успешного входа
//     } else {
//       // TODO: регистрация
//       console.log("Регистрация:", email, password);
//     }
//   };

//   return (
//     <div className="login-block">
//       {formType === "login" ? (
//         <>
//           <h2 className="font-bold underline">Вход в аккаунт</h2>
//           <form onSubmit={handleSubmit} className="request-form">
//             {error && <div className="error">{error}</div>}
//             <label htmlFor="email">Email</label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               placeholder="email@example.com"
//               autoComplete="username"
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <label htmlFor="password">Пароль</label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               placeholder="password"
//               autoComplete="current-password"
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <Button className="cursor-pointer" type="submit">
//               Войти
//             </Button>
//           </form>
//           <div className="flex flex-row justify-between items-center">
//             <p>Не зарегистрированы?</p>
//             <button
//               className="small-button"
//               onClick={() => setFormType("register")}
//             >
//               Зарегистрироваться
//             </button>
//           </div>
//         </>
//       ) : (
//         <RegisterForm
//           onRegister={(name, phone, email, password) => {
//             console.log("Регистрация:", name, phone, email, password);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default LoginForm;
