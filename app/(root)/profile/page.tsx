import { ProfileForm } from '@/components/shared';
import LogoutButton from '@/components/shared/profile/LogoutButton';
import { getUserSession } from '@/lib/get-user-session';
import { prisma } from '@/prisma/prisma-client';

import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await getUserSession();

  if (!session) {
    return redirect('/not-auth');
  }

  const user = await prisma.user.findFirst({ 
    where: 
      { id: Number(session?.id) }, 
    select: {
        fullName: true,
        email: true,
        orders: true,
      },
    });

  if (!user) {
    return redirect('/not-auth');
  }

  return (
    <div className='container'>
      <nav className="breadcrumb">
        <ol>
            <li>
              <a href="/" className="breadcrumb-link">Главная</a>
            </li>
            <li className="breadcrumb-separator">→</li>
            <li className="breadcrumb-current">Личный кабинет</li>
        </ol>
      </nav>
      <div>
        <h1 className="underline">Личный кабинет</h1>
                <div className="gap-[40px] flex flex-col">
                    <div className="profile-block">
                        <p className="font-bold">Персональные данные</p>
                        <div className="w-full flex flex-row gap-10">
                            <div className="blue-card gap-[5px]">
                                <p className="small-bold-text text-[var(--color-blue)]">ФИО</p>
                                <h3>{user.fullName}</h3>
                            </div>
                            {/* <div className="blue-card gap-[5px]">
                                <p className="small-bold-text text-[var(--color-blue)]">Номер телефона</p>
                                <h3>{profile.phone}</h3>
                            </div> */}
                            <div className="blue-card gap-[5px]">
                                <p className="small-bold-text text-[var(--color-blue)]">Email</p>
                                <h3>{user.email}</h3>
                            </div>
                        </div>
                        <div className="flex flex-row gap-[10px]">
                            <button className="small-button pl-[20px] pr-[20px] pt-[8px] pb-[8px] w-auto">Редактировать</button>
                            <LogoutButton />
                        </div>
                  </div>

                  <div className="profile-block">
                        <p className="font-bold">История заявок</p>
                        {user.orders.length === 0 ? (
                            <div className="blue-card gap-[5px]">
                              <div className='flex w-full items-center'>
                                <p>Заявок еще нет... Мы очень ждем Ваш первый заказ!</p>
                              </div>
                            </div>
                          ) : (
                            <div>
                              {user.orders.map((order) => (
                                <div className="blue-card gap-[5px]">
                                <div className="flex flex-col gap-5">
                                    <div key={order.id} className="flex flex-row w-full justify-between items-start">
                                        <div className="flex flex-col gap-[5px]">
                                            <p className="small-bold-text text-[var(--color-blue)]">Адрес заявки</p>
                                            <h3>{order.address}</h3>
                                        </div>
                                        <div className="bg-[var(--color-light-blue)] pl-[20px] pr-[20px] pt-[8px] pb-[8px] w-auto">
                                            <h3>{new Date(order.createdAt).toLocaleDateString()}</h3>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-[5px]">
                                        <p className="small-bold-text text-[var(--color-blue)]">Состав заявки</p>
                                        <h3>Бетон М300 - 5 м3, Бетон М400 - 3 м3</h3>
                                    </div>
                                    <div className="flex flex-col gap-[5px]">
                                        <p className="small-bold-text text-[var(--color-blue)]">Сумма</p>
                                        <p className="big-text">{order.totalAmount} ₽</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                    </div>
              </div>
      </div>
    </div>

  );
}
