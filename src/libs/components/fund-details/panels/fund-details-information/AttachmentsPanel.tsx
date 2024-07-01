import type { FC } from 'react';

import Attachment from '@/libs/components/Base/Attachment';
import type { AdminFund } from '@/libs/types/interface/fund';

import BasePanel from '../BasePanel';

type Attachments = AdminFund['attachments'];

const AttachmentsPanel: FC<{ attachments: Attachments }> = ({
  attachments,
}) => {
  return (
    <BasePanel className="gap-y-[10px]">
      {attachments.map(attachment => (
        <Attachment
          key={attachment.key}
          name={attachment.name}
          fileSrc={attachment.name}
          fileType={attachment.type}
        />
      ))}
    </BasePanel>
  );
};

export default AttachmentsPanel;
