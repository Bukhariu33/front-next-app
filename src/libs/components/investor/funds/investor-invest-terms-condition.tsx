import { Checkbox, Stack } from '@mantine/core';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { type FC, useState } from 'react';

import Button from '../../Base/Buttons/Button';
import ReplaceTranslationKey from '../../utils/ReplaceTranslationKey';

const TermsCard = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-[15px] bg-white  p-4 shadow-sm  md:px-6 md:py-6">
    {children}
  </div>
);
interface InvestAcknowledgmentProps {
  onSubmit: (count: boolean) => void;
  back: () => void;
}

const InvestAcknowledgment: FC<InvestAcknowledgmentProps> = ({
  onSubmit,
  back,
}) => {
  const [value, setValue] = useState<string[]>([]);
  const canSubmit = ['A', 'B', 'C', 'D'].every(item => value.includes(item));
  const { t } = useTranslation();
  return (
    <div className="flex h-full w-full flex-col gap-4 ">
      <Checkbox.Group value={value} onChange={setValue}>
        <Stack>
          <TermsCard>
            <Checkbox
              label={
                <ReplaceTranslationKey
                  text={t('investTermsAndCondtions')}
                  values={{
                    clickHere: (
                      <Link
                        className="text-brand-primary-500 underline hover:text-brand-primary-600"
                        href="/terms-and-conditions"
                      >
                        {t('clickHere')}
                      </Link>
                    ),
                  }}
                />
              }
              value="A"
            />
          </TermsCard>
          <TermsCard>
            <Checkbox value="B" label={t('creditStudyAwareness')} />
          </TermsCard>

          <TermsCard>
            <Checkbox value="C" label={t('financialAdviceDisclaimer')} />
          </TermsCard>
          <TermsCard>
            <Checkbox value="D" label={t('fullUnderstandingAcknowledgment')} />
          </TermsCard>
        </Stack>
      </Checkbox.Group>
      <div className="flex w-full items-center justify-between gap-4">
        <Button
          namespace="common"
          onClick={back}
          variant="outlined"
          text="back"
          className="lg:w-56"
        />
        <Button
          namespace="common"
          disabled={!canSubmit}
          onClick={() => {
            onSubmit(canSubmit);
          }}
          text="acknowledgment"
          className="lg:w-56"
        />
      </div>
    </div>
  );
};

export default InvestAcknowledgment;
