import React from 'react';
import Link from 'next/link';

const AboutUsPage = () => {
    return (
        <div className="container">
            <nav className="breadcrumb">
            <ol>
                <li>
                    <Link href="/" className="breadcrumb-link">Главная</Link>
                </li>
                <li className="breadcrumb-separator">→</li>
                <li className="breadcrumb-current">О нас</li>
            </ol>
        </nav>
        <div className='about_us'>
            <h1 className='underline'>О нас</h1>
            <div className='flex flex-col gap-[40px]'>
                <div className='flex flex-col gap-[20px]'>
                    <p>Профессиональный поставщик строительных материалов. Надежный партнер в строительстве и благоустройстве. </p>
                    <p>Комплексные решения для строительства и благоустройства от профессионалов своего дела. Мы не просто поставляем строительные материалы — мы воплощаем мечты о идеальном доме в реальность.</p>
                    <p><strong>Специализируемся</strong> на поставках высококачественных строительных материалов для частного и коммерческого строительства. В нашем ассортименте — надёжные газобетонные блоки, стильная тротуарная плитка и премиальный облицовочный кирпич от проверенных производителей. </p>
                </div>
                <div>
                    <p className='big-text'>Наши направления:</p>
                    <ul className="list">
                            <li>
                                <div className="text-wrapper">
                                    <p className="item-title">Поставка газобетонных блоков, тротуарной плитки и облицовочного кирпича</p>
                                </div>
                            </li>

                            <li>
                                <div className="text-wrapper">
                                    <p className="item-title">Строительство загородных домов под ключ</p>
                                </div>
                            </li>

                            <li>
                                <div className="text-wrapper">
                                    <p className="item-title">Ландшафтный дизайн и благоустройство территории</p>
                                </div>
                            </li>
                    </ul>
                </div>
                <div>
                    <p className='big-text'>Почему выбирают нас:</p>
                    <ul className="list grid grid-cols-1 md:grid-cols-2 gap-x-8">
                            <li>
                                <div className="text-wrapper">
                                    <p className="item-title">Прямые поставки от ведущих производителей</p>
                                </div>
                            </li>

                            <li>
                                <div className="text-wrapper">
                                    <p className="item-title">Индивидуальный подход к каждому проекту</p>
                                </div>
                            </li>

                            <li>
                                <div className="text-wrapper">
                                    <p className="item-title">Полный цикл услуг – от выбора материала до сдачи готового объекта </p>
                                </div>
                            </li>
                            <li>
                                <div className="text-wrapper">
                                    <p className="item-title">Широкий выбор материалов для любых строительных задач</p>
                                </div>
                            </li>

                            <li>
                                <div className="text-wrapper">
                                    <p className="item-title">Гарантированное качество каждой партии</p>
                                </div>
                            </li>

                            <li>
                                <div className="text-wrapper">
                                    <p className="item-title">Профессиональная консультация по подбору материалов</p>
                                </div>
                            </li>

                            <li>
                                <div className="text-wrapper">
                                    <p className="item-title">Удобная система заказа и доставки</p>
                                </div>
                            </li>

                            <li>
                                <div className="text-wrapper">
                                    <p className="item-title">Конкурентные цены и гибкая система скидок</p>
                                </div>
                            </li>
                    </ul>
                </div>
                <div className='flex flex-col gap-[20px]'>
                    <p><strong>Наши материалы</strong> — это залог прочности и долговечности вашего строительства. Мы помогаем воплотить в жизнь любые архитектурные проекты, от частных домов до масштабных коммерческих объектов. Гарантия качества на все виды работ.</p>
                    <p>Доверьте строительство профессионалам — выбирайте надёжные материалы от проверенного поставщика!</p>
                </div>
            </div>
        </div>
        </div>
    );
};

export default AboutUsPage;