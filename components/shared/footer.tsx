import React from 'react';

const Footer: React.FC = () => (
    <footer>
        <div className='bg-[var(--color-gray)] h-20 w-full pl-[130px] pr-[130px]'>

        </div>
        <div className='bg-[var(--color-dark)] h-20 w-full pl-[130px] pr-[130px]'>
            <a className='text-[var(--color-light-blue)] text-sm' href="/privacy-policy">Политика обработки персональных данных</a>
            <a className='text-[var(--color-light-blue)] text-sm' href="#">Уведомление об обработке персональных данных</a>
        </div>
    </footer>
);

export default Footer;