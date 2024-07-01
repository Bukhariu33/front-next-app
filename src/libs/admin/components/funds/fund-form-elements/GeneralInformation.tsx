import { SimpleGrid } from '@mantine/core';
import { useFormikContext } from 'formik';
import type { FC } from 'react';

import Card from '@/libs/admin/components/funds/fund-form-elements/Card';
import Textarea from '@/libs/components/Base/inputs/textarea';
import type { FundGeneralInformationValidationType } from '@/libs/validations/admin/fund-form-validation';

const GeneralInformation: FC = () => {
  const { getFieldProps, touched, errors } =
    useFormikContext<FundGeneralInformationValidationType>();

  return (
    <Card>
      <SimpleGrid
        className="gap-x-[1.25] gap-y-[1.88rem] @3xl:grid-cols-2"
        dir="rtl"
      >
        <Textarea
          label="generalInfoEnglish"
          charsLimit={500}
          namespace="common"
          data-cy-input="generalInformationEn"
          placeholder="writeHere"
          {...getFieldProps('generalInformationEn')}
          errorMessage={
            (touched?.generalInformationEn &&
              errors?.generalInformationEn &&
              '') as string
          }
          classNames={{
            input: 'dir-ltr text-start rtl:placeholder:text-end',
          }}
        />
        <Textarea
          label="generalInfoArabic"
          data-cy-input="generalInformationAr"
          charsLimit={500}
          namespace="common"
          placeholder="writeHere"
          {...getFieldProps('generalInformationAr')}
          errorMessage={
            (touched?.generalInformationAr &&
              errors?.generalInformationAr &&
              'thisFieldIsRequired') as string
          }
        />
        <Textarea
          label="financialInfoEnglish"
          data-cy-input="financialInformationEn"
          charsLimit={500}
          namespace="common"
          placeholder="writeHere"
          {...getFieldProps('financialInformationEn')}
          errorMessage={
            (touched?.financialInformationEn &&
              errors?.financialInformationEn &&
              'thisFieldIsRequired') as string
          }
          classNames={{
            input: 'dir-ltr text-start rtl:placeholder:text-end',
          }}
        />
        <Textarea
          label="financialInfoArabic"
          data-cy-input="financialInformationAr"
          charsLimit={500}
          namespace="common"
          placeholder="writeHere"
          {...getFieldProps('financialInformationAr')}
          errorMessage={
            (touched?.financialInformationAr &&
              errors?.financialInformationAr &&
              'thisFieldIsRequired') as string
          }
        />
        <Textarea
          label="updatesInEnglish"
          data-cy-input="updatesEn"
          charsLimit={500}
          namespace="common"
          placeholder="writeHere"
          {...getFieldProps('updatesEn')}
          errorMessage={
            (touched?.updatesEn &&
              errors?.updatesEn &&
              'thisFieldIsRequired') as string
          }
          classNames={{
            input: 'dir-ltr text-start rtl:placeholder:text-end',
          }}
        />
        <Textarea
          label="updatesInEnglish"
          data-cy-input="updatesAr"
          charsLimit={500}
          namespace="common"
          placeholder="writeHere"
          {...getFieldProps('updatesAr')}
          errorMessage={
            (touched?.updatesAr &&
              errors?.updatesAr &&
              'thisFieldIsRequired') as string
          }
        />
      </SimpleGrid>
    </Card>
  );
};

export default GeneralInformation;
