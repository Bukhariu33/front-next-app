import { ButtonGroup, Stack } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import useSendSupportMessage from '@/libs/hooks/support/useSendSupportMessage';
import useSupportTicketMessages from '@/libs/hooks/support/useSupportTicketMessages';
import { useMutation } from '@/libs/hooks/use-mutation';
import { useForms } from '@/libs/hooks/useForms';
import AttachSquareIcon from '@/libs/icons/attach-square-icon';
import { openSuccessModal } from '@/libs/packages/modals';
import UploadZone from '@/libs/packages/upload-zone/upload-zone';
import type { SupportMessageFormType } from '@/libs/types/interface/support/Support-Forms';
import { HelpAndSupportMessageSchema } from '@/libs/validations/help-and-support/HelpAndSupportSchema';

import Button from '../Base/Buttons/Button';
import InputErrorMessage from '../Base/inputs/input-error-message';
import Textarea from '../Base/inputs/textarea';

interface SupportMessageFormProps {
  ticketId: string;
}

function SupportMessageForm({ ticketId }: SupportMessageFormProps) {
  const { t } = useTranslation('support');

  const messagesQueryOptions = useSupportTicketMessages(ticketId);

  const [viewUploadZone, setViewUploadZone] = useState(false);

  const sendMessageFn = useSendSupportMessage({ ticketId });

  const { mutateAsync } = useMutation({
    mutationFn: sendMessageFn,
    onSuccess: () => {
      openSuccessModal({
        namespace: 'support',
        id: 'sendMessage',
        body: 'messageSentSuccessfully',
      });
    },
    revalidateOnSettled: true,
    queryOptions: messagesQueryOptions,
  });

  const initialValues: SupportMessageFormType = {
    message: '',
    attachments: [],
  };

  const formik = useForms({
    initialValues,
    validationSchema: HelpAndSupportMessageSchema,
    onSubmit: mutateAsync,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack className="w-full">
        <Textarea
          charsLimit={100}
          namespace="support"
          placeholder="typeMessageHere"
          data-cy-input="message"
          {...formik.getFieldProps('message')}
          errorMessage={
            (formik.touched?.message && formik.errors?.message) as string
          }
          classNames={{
            input: 'w-full',
          }}
        />

        {/* UPLOAD ZONE */}
        {viewUploadZone && (
          <Stack className="gap-[8px]">
            <UploadZone
              modelType="messageAttachments"
              id="messageAttachment"
              onUploadEnd={files => {
                return formik.setFieldValue('attachments', files);
              }}
              maxSizeInMb={10}
            />
            <InputErrorMessage
              message={t(
                formik?.touched?.attachments &&
                  (formik?.errors.attachments as any),
              )}
            />
          </Stack>
        )}

        {/* SUBMIT BUTTON */}
        <ButtonGroup className="flex w-full flex-wrap gap-4">
          <Button
            namespace="auth"
            loading={formik.isSubmitting}
            disabled={!formik.dirty}
            text="send"
            data-cy-button="send-message"
            type="submit"
            className="min-w-full flex-1 sm:min-w-[280px] sm:max-w-[25vw]"
          />
          <Button
            namespace="support"
            text="attachFile"
            data-cy-button="attach-file"
            loading={formik.isSubmitting}
            onClick={() => {
              setViewUploadZone(prev => !prev);
            }}
            variant="outlined-black"
            className="min-w-full flex-1 text-lg font-bold text-gray-700 sm:min-w-[235px] sm:max-w-[18vw]"
            icon={<AttachSquareIcon width={20} height="full" />}
          />
        </ButtonGroup>
      </Stack>
    </form>
  );
}

export default SupportMessageForm;
