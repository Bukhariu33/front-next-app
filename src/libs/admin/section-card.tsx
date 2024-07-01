import { cn } from '@/utils/cn';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-5 rounded-2xl bg-white p-5 shadow-sm',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Card;

type CardSectionProps = {
  children: React.ReactNode;
  title: string;
  className?: string;
};

export const CardSection = ({
  children,
  title,
  className,
}: CardSectionProps) => {
  return (
    <div className={cn('flex flex-col gap-7', className)}>
      <p className="m-0 mb-3 text-2xl font-bold text-brand-primary-main">
        {title}
      </p>
      {children}
    </div>
  );
};
