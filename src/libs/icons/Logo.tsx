import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';

import useUser from '../hooks/useUser';

function MainLogo({ className }: { className: string }) {
  return (
    <Image
      src="/images/blue.jpeg"
      className={className}
      alt="image"
      width="60"
      height="60"
      style={{
        padding: '20px',
      }}
    />
  );
}

function WhiteLogo({ className }: { className: string }) {
  return (
    <Image
      src="/images/eads.jpeg"
      className={className}
      alt="image"
      style={{
        padding: '20px',
      }}
      width="60"
      height="60"
    />
  );
}

interface LogoProps {
  variant?: 'main' | 'white';
}
const Logo: FC<LogoProps> = ({ variant = 'main' }) => {
  const { user } = useUser();

  return (
    <Link
      href={user?.role === 'admin' ? '/admin' : '/user'}
      className="w-full max-w-[75px] sm:max-w-[95px] xl:max-w-[120px] 2xl:max-w-[142px] "
    >
      {variant === 'main' ? (
        <MainLogo className="h-auto w-full" />
      ) : (
        <WhiteLogo className="ml-2.5 h-auto w-full" />
      )}
    </Link>
  );
};

export default Logo;
