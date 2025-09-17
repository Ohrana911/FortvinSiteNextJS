import React, { useState } from "react";
import { Button } from "../ui";

interface RegistrationFormProps {
    onRegister?: (name: string, phone: string, email: string, password: string) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onRegister }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (!name || !phone || !email || !password) {
            setError("Заполните все поля.");
            return;
        }
        try {
            const res = await fetch('/api/send-registration', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone, email, password }),
            });
            if (!res.ok) setError("Ошибка отправки.");
            else onRegister?.(name, phone, email, password);
        } catch {
            setError("Ошибка отправки.");
        }
    };

    return (
        <div className="login-block">
            <h2 className="font-bold underline">Регистрация</h2>
            <form onSubmit={handleSubmit} className="request-form">
                {error && <div className="error">{error}</div>}
                <label htmlFor="name">ФИО</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    placeholder="Иванов Иван Иванович"
                    onChange={e => setName(e.target.value)}
                    required
                />
                <label htmlFor="phone">Телефон</label>
                <input
                    id="phone"
                    type="tel"
                    value={phone}
                    placeholder="+7 (000) 000-00-00"
                    onChange={e => setPhone(e.target.value)}
                    required
                />
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
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <Button className="cursor-pointer" variant="request" size="request" type="submit">Зарегистрироваться</Button>
                <p className="small-text mt-2">Нажимая на кнопку «Зарегистрироваться», Вы даете
                    <a className="text-[var(--color-blue)] small-text underline" href="/privacy-policy"> Согласие на обработку данных </a>
                    и соглашаетесь c
                    <a className="text-[var(--color-blue)] small-text underline" href="/privacy-policy"> Политикой конфиденциальности</a></p>
            </form>
        </div>
    );
};

export default RegistrationForm;