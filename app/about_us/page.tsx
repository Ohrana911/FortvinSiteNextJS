import React from 'react';
import Link from 'next/link';

const AboutUsPage = () => {
    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">About Us</h1>
            <p className="text-lg">
                Welcome to Fortvin! We are dedicated to providing the best services and solutions for our clients.
                Our team is passionate about innovation, quality, and customer satisfaction.
            </p>
            <nav className="breadcrumb">
            <ol>
                <li>
                    <Link href="/" className="breadcrumb-link">Главная</Link>
                </li>
                <li className="breadcrumb-separator">→</li>
                <li className="breadcrumb-current">О нас</li>
            </ol>
        </nav>
        </main>
    );
};

export default AboutUsPage;