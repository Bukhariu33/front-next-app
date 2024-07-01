import { Divider, Overlay, Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

import Calender from '@/icons/Calender';
import Clock from '@/icons/Clock';
import useFormatToMoney from '@/libs/hooks/useFormatToMoney';
import { cn } from '@/utils/cn';

import Image from '../Image';
import type { BaseCardProps } from '.';

type HeaderProps = {
  orientation?: 'vertical' | 'horizontal';
  overlayText?: BaseCardProps['overlayText'];
  isInvested?: boolean;
} & BaseCardProps['image'];

const HeaderTag = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div
    className="min-h-5 flex items-center  justify-center gap-1.5 rounded-xl bg-white  px-4 py-1.5 font-medium text-black lg:h-10 lg:gap-2.5  lg:py-2"
    key={text}
  >
    {icon}
    <Text className="text-sm lg:text-base">{text}</Text>
  </div>
);

const FooterCard = ({ title, value }: { title: string; value: string }) => (
  <div className="text-center text-sm  font-medium lg:text-lg lg:leading-7">
    <Text>{title}</Text>
    <Text className="font-bold">{value}</Text>
  </div>
);

const CardOverlay = ({ text }: { text?: string }) => {
  if (!text) return null;

  return (
    <Overlay className="z-50 flex items-center justify-center text-4xl font-extrabold text-white">
      <Text className="font-bold">{text}</Text>
    </Overlay>
  );
};

const Header: FC<HeaderProps> = ({
  footer,
  src,
  tags,
  base64,
  overlayText,
  orientation,
  isInvested,
  className,
}) => {
  const { t } = useTranslation();
  const { format } = useFormatToMoney();
  const isVertical = orientation === 'vertical';
  return (
    <div
      className={cn(
        'flex-grow-1 relative h-full flex-shrink-0 overflow-hidden rounded-2xl ',
        {
          'h-[250px] w-full rounded-b-none': isVertical,
          'h-[400px] w-[55%] max-w-[625px]': !isVertical,
        },
        className,
      )}
    >
      {overlayText && !isInvested && <CardOverlay text={t(overlayText)} />}
      <Image
        alt="bg"
        fill
        placeholder={base64}
        src={src}
        className="absolute inset-0 z-0"
        style={{
          objectFit: 'cover',
        }}
      />
      {/* Gradient Overlay */}
      <div className="z-1 absolute inset-0 h-full w-full bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Tags */}
      <div className="absolute z-10 flex  h-fit w-full items-center gap-4   p-6 ">
        <HeaderTag icon={<Clock width={20} height={20} />} text={tags.time} />
        <HeaderTag
          icon={<Calender width={20} height={20} />}
          text={tags.date}
        />
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 z-10 flex h-fit  w-full items-center justify-between gap-4 p-6   text-white">
        <FooterCard
          title={t('OwaisCapitalCoverage')}
          value={format(footer.coverage)}
        />
        <Divider orientation="vertical" />
        <FooterCard title={t('ExpectedReturn')} value={`${footer.roi}%`} />
        <Divider orientation="vertical" />
        <FooterCard
          title={t('OpportunityDuration')}
          value={footer?.durationInMonths?.toString()}
        />
      </div>
    </div>
  );
};

export default Header;
