import { cn } from '@/utils/cn';

const GrayCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-[10px] rounded-2xl bg-[#F5F7F9] p-6">
      {children}
    </div>
  );
};

export default GrayCard;

export const GrayCardInfo = ({
  name,
  value,
  className,
  nameClassName,
  valueClassName,
}: {
  name: string;
  value: string | number;
  className?: string;
  nameClassName?: string;
  valueClassName?: string;
}) => {
  return (
    <div
      className={cn('flex justify-between text-brand-accent-500', className)}
    >
      <span className={nameClassName}>{name}</span>
      <span className={valueClassName}>{value}</span>
    </div>
  );
};
