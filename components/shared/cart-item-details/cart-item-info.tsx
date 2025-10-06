import { cn } from '@/lib/utils';

interface Props {
  name: string;
  className?: string;
}

export const CartItemInfo: React.FC<Props> = ({ name, className }) => {
  return (
    <div>
      <div className={cn('flex items-center justify-between', className)}>
        <p className="text-[16px]">{name}</p>
      </div>
    </div>
  );
};