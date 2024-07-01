// eslint-disable-next-line simple-import-sort/imports
import { Flex, Stack } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import useCreateSupportTicket from '@/libs/hooks/support/useCreateSupportTicket';
import useSupportCategories from '@/libs/hooks/support/useSupportCategories';
import useSupportTicketsList from '@/libs/hooks/support/useSupportTicketsList';
import { useMutation } from '@/libs/hooks/use-mutation';
import { useForms } from '@/libs/hooks/useForms';
import { openSuccessModal } from '@/libs/packages/modals';
import UploadButton from '@/libs/packages/upload-zone/upload-files-button';
import type { SupportFormType } from '@/libs/types/interface/support/Support-Forms';
import { HelpAndSupportSchema } from '@/libs/validations/help-and-support/HelpAndSupportSchema';

import Button from '../Base/Buttons/Button';
import Input from '../Base/inputs/input';
import InputErrorMessage from '../Base/inputs/input-error-message';
import SelectInput from '../Base/inputs/select-input';
import Textarea from '../Base/inputs/textarea';

function NewSupportTickerForm() {
  const { t } = useTranslation('support');

  const categories = useSupportCategories();
  const createSupportTicketFn = useCreateSupportTicket();

  const supportTicketsListOptions = useSupportTicketsList();

  const { mutateAsync } = useMutation({
    mutationFn: createSupportTicketFn,
    onSuccess: () => {
      openSuccessModal({
        namespace: 'support',
        id: 'createSupportTicket',
        body: 'ticketCreatedSuccessfully',
      });
    },
    revalidateOnSettled: true,
    queryOptions: supportTicketsListOptions,
  });

  const initialValues: SupportFormType = {
    title: '',
    message: '',
    category: '',
    attachments: [],
  };

  const formik = useForms({
    initialValues,
    validationSchema: HelpAndSupportSchema,
    onSubmit: mutateAsync,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack className="w-full">
        <Flex wrap="wrap" gap={20} maw={{ base: 'full', md: '65vw' }}>
          {/* MAIN ADDRESS */}
          <Input
            namespace="support"
            label="mainAddress"
            data-cy-input="title"
            placeholder="typeMessageAddressHere"
            {...formik.getFieldProps('title')}
            className="min-w-[300px] flex-1"
            errorMessage={
              (formik?.touched?.title && formik?.errors.title) as string
            }
          />

          {/* CATEGORY */}
          <SelectInput
            data={categories}
            namespace="support"
            label="category"
            data-cy-input="category"
            placeholder="chooseCategory"
            {...formik.getFieldProps('category')}
            onChange={value => {
              return formik.setFieldValue('category', value);
            }}
            className="min-w-[300px] flex-1"
            errorMessage={
              (formik?.touched?.category && formik?.errors.category) as string
            }
          />
        </Flex>

        {/* MESSAGE */}
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
        <Stack className="gap-[8px]">
          <UploadButton
            modelType="ticketAttachments"
            id="ticketAttachments"
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

        {/* SUBMIT BUTTON */}
        <Button
          namespace="auth"
          loading={formik.isSubmitting}
          disabled={!formik.dirty}
          text="send"
          data-cy-button="send"
          type="submit"
          maw={{ base: 'full', sm: '30vw' }}
          miw={{ base: 'initial', sm: '300px' }}
        />
      </Stack>
    </form>
  );
}

export default NewSupportTickerForm;
