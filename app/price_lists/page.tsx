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
            <div className='mt-[40px] mb-[10px] flex flex-row items-center gap-[20px]'>
                <img src="/carousel/steingot.png" alt="Steingot" className='max-h-[40px] w-auto'/>
                <h2 className='font-semibold'>Steingot</h2>
            </div>
            <div className='flex flex-col gap-[10px]'>
                <div className='flex flex-row items-center gap-[8px]'>
                    <p className='font-semibold'>Все прайс-листы Steingot</p>
                    <ArrowRight className="w-4 h-4 mr-2" />
                    <a 
                        href="/pricelists/steingot/ФОРТВИН Прайс-листы Steingot.zip" 
                        download="ФОРТВИН Прайс-листы Steingot.zip"
                        className="text-[var(--color-blue)] mr-2 font-semibold"
                        >
                        Скачать (ZIP)
                    </a>
                </div>
                <div className='flex flex-row items-center gap-[8px]'>
                    <p className='font-semibold'>Бордюры Steingot</p>
                    <ArrowRight className="w-4 h-4 mr-2" />
                    <a 
                        href="/pricelists/steingot/ФОРТВИН Бордюры Steingot.pdf" 
                        download="Бордюры Steingot.pdf"
                        className="text-[var(--color-blue)] mr-2 font-semibold"
                        >
                        Скачать (PDF)
                    </a>
                    <Link
                     className="text-[var(--color-blue)] font-semibold"
                     href="/pricelists/steingot/ФОРТВИН Бордюры Steingot.pdf" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     >
                        Предосмотр
                    </Link>
                </div>
                <div className='flex flex-row items-center gap-[8px]'>
                    <p className='font-semibold'>Бавария Steingot</p>
                    <ArrowRight className="w-4 h-4 mr-2" />
                    <a 
                        href="/pricelists/steingot/ФОРТВИН Бавария Steingot.pdf" 
                        download="ФОРТВИН Бавария Steingot.pdf"
                        className="text-[var(--color-blue)] mr-2 font-semibold"
                        >
                        Скачать (PDF)
                    </a>
                    <Link
                     className="text-[var(--color-blue)] font-semibold"
                     href="/pricelists/steingot/ФОРТВИН Бавария Steingot.pdf" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     >
                        Предосмотр
                    </Link>
                </div>
                <div className='flex flex-row items-center gap-[8px]'>
                    <p className='font-semibold'>Классика Steingot</p>
                    <ArrowRight className="w-4 h-4 mr-2" />
                    <a 
                        href="/pricelists/steingot/ФОРТВИН Классика Steingot.pdf" 
                        download="ФОРТВИН Классика Steingot.pdf"
                        className="text-[var(--color-blue)] mr-2 font-semibold"
                        >
                        Скачать (PDF)
                    </a>
                    <Link
                     className="text-[var(--color-blue)] font-semibold"
                     href="/pricelists/steingot/ФОРТВИН Классика Steingot.pdf" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     >
                        Предосмотр
                    </Link>
                </div>
                <div className='flex flex-row items-center gap-[8px]'>
                    <p className='font-semibold'>Маринталь Steingot</p>
                    <ArrowRight className="w-4 h-4 mr-2" />
                    <a 
                        href="/pricelists/steingot/ФОРТВИН Маринталь Steingot.pdf" 
                        download="ФОРТВИН Маринталь Steingot.pdf"
                        className="text-[var(--color-blue)] mr-2 font-semibold"
                        >
                        Скачать (PDF)
                    </a>
                    <Link
                     className="text-[var(--color-blue)] font-semibold"
                     href="/pricelists/steingot/ФОРТВИН Маринталь Steingot.pdf" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     >
                        Предосмотр
                    </Link>
                </div>
                <div className='flex flex-row items-center gap-[8px]'>
                    <p className='font-semibold'>Мюнхен Steingot</p>
                    <ArrowRight className="w-4 h-4 mr-2" />
                    <a 
                        href="/pricelists/steingot/ФОРТВИН Мюнхен Steingot.pdf" 
                        download="ФОРТВИН Мюнхен Steingot.pdf"
                        className="text-[var(--color-blue)] mr-2 font-semibold"
                        >
                        Скачать (PDF)
                    </a>
                    <Link
                     className="text-[var(--color-blue)] font-semibold"
                     href="/pricelists/steingot/ФОРТВИН Мюнхен Steingot.pdf" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     >
                        Предосмотр
                    </Link>
                </div>
                <div className='flex flex-row items-center gap-[8px]'>
                    <p className='font-semibold'>Новый Город Steingot</p>
                    <ArrowRight className="w-4 h-4 mr-2" />
                    <a 
                        href="/pricelists/steingot/ФОРТВИН Новый Город Steingot.pdf" 
                        download="ФОРТВИН Новый Город Steingot.pdf"
                        className="text-[var(--color-blue)] mr-2 font-semibold"
                        >
                        Скачать (PDF)
                    </a>
                    <Link
                     className="text-[var(--color-blue)] font-semibold"
                     href="/pricelists/steingot/ФОРТВИН Новый Город Steingot.pdf" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     >
                        Предосмотр
                    </Link>
                </div>
                <div className='flex flex-row items-center gap-[8px]'>
                    <p className='font-semibold'>Паркет Steingot</p>
                    <ArrowRight className="w-4 h-4 mr-2" />
                    <a 
                        href="/pricelists/steingot/ФОРТВИН Паркет Steingot.pdf" 
                        download="ФОРТВИН Паркет Steingot.pdf"
                        className="text-[var(--color-blue)] mr-2 font-semibold"
                        >
                        Скачать (PDF)
                    </a>
                    <Link
                     className="text-[var(--color-blue)] font-semibold"
                     href="/pricelists/steingot/ФОРТВИН Паркет Steingot.pdf" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     >
                        Предосмотр
                    </Link>
                </div>
                <div className='flex flex-row items-center gap-[8px]'>
                    <p className='font-semibold'>Плита Steingot</p>
                    <ArrowRight className="w-4 h-4 mr-2" />
                    <a 
                        href="/pricelists/steingot/ФОРТВИН Плита Steingot.pdf" 
                        download="ФОРТВИН Плита Steingot.pdf"
                        className="text-[var(--color-blue)] mr-2 font-semibold"
                        >
                        Скачать (PDF)
                    </a>
                    <Link
                     className="text-[var(--color-blue)] font-semibold"
                     href="/pricelists/steingot/ФОРТВИН Плита Steingot.pdf" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     >
                        Предосмотр
                    </Link>
                </div>
                <div className='flex flex-row items-center gap-[8px]'>
                    <p className='font-semibold'>Старый город. Steingot</p>
                    <ArrowRight className="w-4 h-4 mr-2" />
                    <a 
                        href="/pricelists/steingot/ФОРТВИН Старый город. Steingot.pdf" 
                        download="ФОРТВИН Старый город. Steingot.pdf"
                        className="text-[var(--color-blue)] mr-2 font-semibold"
                        >
                        Скачать (PDF)
                    </a>
                    <Link
                     className="text-[var(--color-blue)] font-semibold"
                     href="/pricelists/steingot/ФОРТВИН Старый город. Steingot.pdf" 
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