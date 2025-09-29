"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="small-button pl-[20px] pr-[20px] pt-[8px] pb-[8px] w-auto"
    >
      Выйти из профиля
    </button>
  );
}
