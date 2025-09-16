import { Mail, Phone } from 'lucide-react';
import React from 'react';

const Footer: React.FC = () => (
    <footer>
        <div className='footer-top bg-[var(--color-gray)] flex flex-col justify-start gap-5 md:gap-15'>
            <h1 className='underline text-[var(--background)]'>Связаться с нами</h1>
            <div className='flex flex-col md:flex-row justify-between w-full gap-5'>
                <div className='flex flex-col gap-5 md:gap-10'>
                    <h2 className='font-bold'>ООО "Фортвин"</h2>
                    <div className='flex flex-col gap-2'>
                        <p>ИНН: 4706088188 | ОГРН: 1254700006428</p>
                        <p>188645, Ленинградская область, г. Всеволожск, 
                            ул. Центральная, д. 10 кор. 1, кв. 167</p>
                    </div>
                </div>
                <div className='flex flex-col justify-end gap-2'>
                    <h2 className='font-bold flex items-center gap-3'><Phone size={24} /> +7 (812) 345-67-89</h2>
                    <h2 className='font-bold flex items-center gap-3'><Mail size={24} /> plitka-vspb@yandex.ru</h2>
                </div>
            </div>
        </div>
        <div className='footer-bottom bg-[var(--color-dark)] flex flex-col justify-start gap-0'>
            <a className='text-[var(--color-light-blue)] text-sm underline' href="/privacy-policy">Политика обработки персональных данных</a>
            <a className='text-[var(--color-light-blue)] text-sm underline' href="/privacy-policy">Согласие на обработку персональных данных</a>
        </div>
    </footer>
);

export default Footer;