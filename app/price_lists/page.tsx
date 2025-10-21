import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const PriceListPage = () => {
    return (
        <div className="container">
            <nav className="breadcrumb">
            <ol>
                <li>
                    <Link href="/" className="breadcrumb-link">Главная</Link>
                </li>
                <li className="breadcrumb-separator">→</li>
                <li className="breadcrumb-current">Прайс-листы</li>
            </ol>
        </nav>
        <div className='flex flex-col'>
            <h1 className='underline'>Прайс-листы</h1>
            <h3>Специально для Вашего удобства мы предлагаем скачать актуальные прайс-листы нашей продукции.</h3>
            <div className='flex flex-col gap-[10px] mt-[20px]'>
                <div className='flex flex-row items-center gap-[8px]'>
                    <p className='font-semibold'>Газобетонные блоки СК</p>
                    <ArrowRight className="w-4 h-4 mr-2" />
                    <a 
                        href="/Согласие на обработку пд Фортвин.pdf" 
                        download="Согласие_на_обработку_Фортвин.pdf"
                        className="text-[var(--color-blue)] mr-2 font-semibold"
                        >
                        Скачать (PDF)
                    </a>
                    <Link
                     className="text-[var(--color-blue)] font-semibold"
                     href="/Согласие на обработку пд Фортвин.pdf" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     >
                        Предосмотр
                    </Link>
                </div>
                <div className='flex flex-row items-center gap-[8px]'>
                    <p className='font-semibold'>Газобетонные блоки ЛСР</p>
                    <ArrowRight className="w-4 h-4 mr-2" />
                    <a 
                        href="/Согласие на обработку пд Фортвин.pdf" 
                        download="Согласие_на_обработку_Фортвин.pdf"
                        className="text-[var(--color-blue)] mr-2 font-semibold"
                        >
                        Скачать (PDF)
                    </a>
                    <Link
                     className="text-[var(--color-blue)] font-semibold"
                     href="/Согласие на обработку пд Фортвин.pdf" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     >
                        Предосмотр
                    </Link>
                </div>
            </div>
        </div>
        </div>
    );
};

export default PriceListPage;