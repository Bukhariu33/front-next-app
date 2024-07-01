import { Stack } from '@mantine/core';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import Button from '@/libs/components/Base/Buttons/Button';
import PageHeader from '@/libs/components/Base/layout/PageHeader';
import NewSupportTickerForm from '@/libs/components/help-and-support/new-support-ticket-form';
import { Meta } from '@/libs/components/seo/meta';

function InvestorCreateTicketPage() {
  const { t } = useTranslation('support');
  return (
    <Stack>
      <Meta title={t('helpAndSupport')} />

      <PageHeader namespace="support" title="helpAndSupport">
        <Link href="/investor/support">
          <Button namespace="common" variant="black" text="viewAll" />
        </Link>
      </PageHeader>

      <NewSupportTickerForm />
    </Stack>
  );
}

export default InvestorCreateTicketPage;
