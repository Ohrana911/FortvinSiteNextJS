import React, { useState } from "react";
import { Button } from "../ui";
import RegistrationForm from "./registration-form";

interface LoginFormProps {
    onLogin?: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [formType, setFormType] = useState<"login" | "register">("login");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (formType === "login") {
            if (!email || !password) {
                setError("Напишите ваш email и пароль.");
                return;
            }
            onLogin?.(email, password);
        } else {
            // Здесь можно добавить логику регистрации
            console.log("Регистрация:", email, password);
        }
    };

    return (
        <div className="login-block">
            {formType === "login" ? (
                <>
                <h2 className="font-bold underline">Вход в аккаунт</h2>
                <form onSubmit={handleSubmit} className="request-form">
                    {error && <div className="error">{error}</div>}
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        placeholder="email@example.com"
                        autoComplete="username"
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="password">Пароль</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        placeholder="password"
                        autoComplete="current-password"
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <Button className="cursor-pointer" variant="request" size="request" type="submit">Войти</Button>
                </form>
                <div className="flex flex-row justify-between items-center">
                    <p>Не зарегистрированы?</p>
                    <button className="small-button" onClick={() => setFormType("register")}>Зарегистрироваться</button>
                </div>
                </>
            ) : (
                <>
                <RegistrationForm onRegister={(name, phone, email, password) => {
                    console.log("Регистрация:", name, phone, email, password);
                }} />
                </>
            )}
        </div>
    );
};

export default LoginForm;