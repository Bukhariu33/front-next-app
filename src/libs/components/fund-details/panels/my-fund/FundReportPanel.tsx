import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import Button from '@/libs/components/Base/Buttons/Button';
import { useMutation } from '@/libs/hooks/use-mutation';
import UploadIcon from '@/libs/icons/upload-icon';
import type { QueryOptionsReturnType } from '@/libs/packages/queryBuilder';
import type { TableQueryFunctionReturn } from '@/libs/packages/tables';
import Table from '@/libs/packages/tables';
import type { FilterParams } from '@/libs/packages/tables/types';
import UploadZone from '@/libs/packages/upload-zone/upload-zone';
import type { AdminFundReportListItem } from '@/libs/types/admin/funds/fund-report';
import type {
  APIResponseUploadReport,
  UploadProps,
} from '@/libs/types/base/uploadFundReport';
import type { FundReportListItem } from '@/libs/types/fund-managers/funds/fund-report';

type AddReportModalContentProps = {
  fundId: string;
  uploadReport: (payload: UploadProps) => Promise<APIResponseUploadReport>;
};

const AddReportModalContent = ({
  fundId,
  uploadReport,
}: AddReportModalContentProps) => {
  const [files, setFiles] = useState<Attachment[]>([]);

  const { t } = useTranslation('fund');

  const { mutate } = useMutation({
    mutationFn: uploadReport,
    onSuccess: () => {
      notifications.show({
        message: t('reportUploadedSuccessfully'),
      });
      modals.closeAll();
    },
  });

  const onUploadEnd = (f: Attachment[]) => {
    setFiles(prevFiles => [...prevFiles, ...f]);
  };

  const handleUpload = () => {
    if (files.length === 0) return;
    mutate({
      fundId,
      attachments: files,
    });
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <UploadZone
        onUploadEnd={onUploadEnd}
        accept="docs"
        modelType="fundReports"
      />
      <div className="flex gap-3">
        <Button
          namespace="fund"
          text="cancel"
          variant="outlined-black"
          className="w-2/5"
          onClick={() => modals.closeAll()}
        />
        <Button
          namespace="fund"
          text="addNewReport"
          className="w-3/5"
          onClick={handleUpload}
          disabled={files.length === 0}
        />
      </div>
    </div>
  );
};

type FundReportPanelProps = {
  fundReportQueryOptions: QueryOptionsReturnType<
    TableQueryFunctionReturn<
      'fund',
      FundReportListItem | AdminFundReportListItem
    >,
    [FilterParams | undefined, string | undefined, string | undefined, ...any[]]
  >;
  uploadReport?: (payload: UploadProps) => Promise<APIResponseUploadReport>;
};

const FundReportPanel = ({
  fundReportQueryOptions,
  uploadReport,
}: FundReportPanelProps) => {
  const router = useRouter();
  const { fundId, investmentId } = router.query;
  const { t } = useTranslation('fund');
  const id = fundId ?? investmentId;
  const handleClicked = () => {
    if (!fundId || !uploadReport) return;
    modals.open({
      title: t('addNewReport'),
      centered: true,
      classNames: {
        title: 'text-2xl font-bold',
      },
      size: '550px',
      children: (
        <AddReportModalContent
          fundId={fundId as string}
          uploadReport={uploadReport}
        />
      ),
    });
  };

  return (
    <div className="flex flex-col gap-3 rounded-lg bg-white p-8 pb-0 shadow-sm">
      {uploadReport && (
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">{t('previousReports')}</h1>
          <Button
            namespace="fund"
            text="addNewReport"
            onClick={handleClicked}
            leftSection={<UploadIcon />}
          />
        </div>
      )}

      <div className="max-w-full">
        <Table
          namespace="fund"
          headers={['id', 'reportSharingDate']}
          cellsType={['text', 'date']}
          queryOptions={fundReportQueryOptions.details}
          args={[id]}
          hideFooter
        />
      </div>
    </div>
  );
};

export default FundReportPanel;
