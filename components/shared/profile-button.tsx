import { useSession } from 'next-auth/react';
import { SessionProvider } from "next-auth/react"
import React from 'react';
import { Button } from '../ui/button';
import { CircleUser, User } from 'lucide-react';
import Link from 'next/link';

interface Props {
  onClickSignIn?: () => void;
  className?: string;
}

export const ProfileButton: React.FC<Props> = ({ className, onClickSignIn }) => {
  const { data: session } = useSession();

  return (
    <div className={className}>
      {!session ? (
        <Button onClick={onClickSignIn} variant="outline" className='cursor-pointer hover:text-[var(--color-blue)] transition duration-300'>
          <User 
            size={24}
            strokeWidth={2} 
            className="hover:text-[var(--color-blue)] transition duration-300" 
          />
        </Button>
      ) : (
        <Link href="/profile">
          <Button variant="outline" className='cursor-pointer fill-current text-[var(--color-blue)]'>
            <CircleUser size={24} strokeWidth={2}/>
          </Button>
        </Link>
      )}
    </div>
  );
};
