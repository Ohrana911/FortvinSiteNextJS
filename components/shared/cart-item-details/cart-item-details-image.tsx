import { cn } from '@/lib/utils';

interface Props {
  src: string;
  className?: string;
}

export const CartItemDetailsImage: React.FC<Props> = ({ src, className }) => {
  return <img className={cn('sm:w-[60px] sm:h-[60px] w-[80px] h-[80px]', className)} src={src} />;
};