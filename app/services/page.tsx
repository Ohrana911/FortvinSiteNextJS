import Link from "next/link";
import "./services.css";
import { Button } from "@/components/ui";
import RequestForm from "@/components/shared/request-form";

export default function ServicesPage() {
  return (
      <div className="container">
        <nav className="breadcrumb">
            <ol>
                <li>
                    <a href="/" className="breadcrumb-link">Главная</a>
                </li>
                <li className="breadcrumb-separator">→</li>
                <li className="breadcrumb-current">Услуги</li>
            </ol>
        </nav>
        <div id="house" className="service-block scroll-mt-[120px]">
            <h1 className="underline">Строительство домов под ключ</h1>
            <div className="service-card">
                <div className="left-side-card">
                    <img src="/house.jpg" alt="Дом" className="service-image" />
                    <div className="desktop-button">
                        <a href="#request-form">
                            <Button className="blue-hover cursor-pointer" variant="custom" size="custom">Заказать</Button>
                        </a>
                    </div>
                </div>
                <div className="right-side-card">
                    <h2>Проектируем и строим монолитные и газобетонные дома в Санкт-Петербурге и Ленинградской области</h2>

                    <ul className="service-list">
                        <li>
                            <div className="text-wrapper">
                                <p className="item-title">Работаем с 2003 года</p>
                                <p className="item-desc">Обладаем богатым опытом, сформировали штат настоящих профессионалов</p>
                            </div>
                        </li>

                        <li>
                            <div className="text-wrapper">
                                <p className="item-title">Строим по индивидуальным проектам</p>
                                <p className="item-desc">Возможна адаптация и доработка любых готовых проектов</p>
                            </div>
                        </li>

                        <li>
                            <div className="text-wrapper">
                                <p className="item-title">Сотрудничаем только с проверенными поставщиками материалов</p>
                                <p className="item-desc">Приемка только качественного сырья, контроль каждой поставки</p>
                            </div>
                        </li>

                        <li>
                            <div className="text-wrapper">
                                <p className="item-title">В нашей команде более 20 бригад</p>
                                <p className="item-desc">Реализовываем проекты любых масштабов без ущерба качеству и завышения цен</p>
                            </div>
                        </li>
                    </ul>
                    <div className="mobile-button">
                        <a href="#request-form">
                            <Button className="blue-hover cursor-pointer" variant="custom" size="custom">Заказать</Button>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div id="landscape" className="service-block scroll-mt-[120px]">
            <h1 className="underline">Благоустройство и мощение</h1>
            <div className="service-card reverse">
                <div className="left-side-card">
                    <img src="/moshenie.jpg" alt="Мощение" className="service-image" />
                    <div className="desktop-button">
                        <a href="#request-form">
                            <Button className="blue-hover cursor-pointer" variant="custom" size="custom">Заказать</Button>
                        </a>
                    </div>
                </div>
                <div className="right-side-card">
                    <h2>Работаем как с частными, так и с коммерческими объектами. Предлагаем полный комплекс услуг:</h2>

                    <ul className="service-list">
                        <li>
                            <div className="text-wrapper">
                                <p className="item-title">Мощение тротуарной плиткой (любые формы)</p>
                                <p className="item-desc">Подготовка основания (песчаная, щебеночная подушка), установка бордюров и поребриков, выравнивание и уплотнение поверхности</p>
                            </div>
                        </li>

                        <li>
                            <div className="text-wrapper">
                                <p className="item-title">Благоустройство территорий</p>
                                <p className="item-desc">Планировка и озеленение участков, устройство клумб, газонов и цветников, посадка деревьев и кустарников, установка декоративных элементов</p>
                            </div>
                        </li>

                        <li>
                            <div className="text-wrapper">
                                <p className="item-title">Дренажные и ливневые системы</p>
                                <p className="item-desc">Обустройство поверхностного и подземного водоотвода, монтаж ливневых решеток и трубопровода</p>
                            </div>
                        </li>

                        <li>
                            <div className="text-wrapper">
                                <p className="item-title">Устройство подпорных стенок</p>
                                <p className="item-desc">А также монтаж малых архитектурных форм (лавочки, урны, навесы), демонтаж старого покрытия</p>
                            </div>
                        </li>
                    </ul>
                    <div className="mobile-button">
                        <a href="#request-form">
                            <Button className="blue-hover cursor-pointer" variant="custom" size="custom">Заказать</Button>
                        </a>
                    </div>                    
                </div>
            </div>
        </div>

        <div id="design" className="service-block scroll-mt-[120px]">
            <h1 className="underline">Дизайн интерьеров</h1>
            <div className="service-card">
                <div className="left-side-card">
                    <img src="/design.jpg" alt="Дизайн" className="service-image" />
                    <div className="desktop-button">
                        <a href="#request-form">
                            <Button className="blue-hover cursor-pointer" variant="custom" size="custom">Заказать</Button>
                        </a>
                    </div>                
                </div>
                <div className="right-side-card">
                    <h2>Предлагаем профессиональные услуги в сфере дизайна интерьеров для квартир, домов и коммерческих помещений</h2>

                    <ul className="service-list">
                        <li>
                            <div className="text-wrapper">
                                <p className="item-title">Дизайн интерьера под ключ</p>
                                <p className="item-desc">Разработка индивидуальных дизайн-проектов, 3D-визуализация помещений, подбор отделочных материалов, мебели и освещения, авторский надзор на всех этапах реализации</p>
                            </div>
                        </li>

                        <li>
                            <div className="text-wrapper">
                                <p className="item-title">Планировочные решения</p>
                                <p className="item-desc">Рациональное зонирование пространства, перепланировка с учетом строительных норм, подготовка планов для согласования и ремонта</p>
                            </div>
                        </li>

                        <li>
                            <div className="text-wrapper">
                                <p className="item-title">Комплектация объектов</p>
                                <p className="item-desc">Подбор и закупка мебели, светильников, сантехники, работа с проверенными поставщиками и производителями, ведение бюджета проекта</p>
                            </div>
                        </li>

                        <li>
                            <div className="text-wrapper">
                                <p className="item-title">Декор и стилизация</p>
                                <p className="item-desc">Разработка концепции оформления, выбор текстиля, аксессуаров, произведений искусства, финальная настройка атмосферы в интерьере</p>
                            </div>
                        </li>
                    </ul>
                    <div className="mobile-button">
                        <a href="#request-form">
                            <Button className="blue-hover cursor-pointer" variant="custom" size="custom">Заказать</Button>
                        </a>
                    </div>                    
                </div>
            </div>
        </div>
        <RequestForm />
    </div>
  );
}
