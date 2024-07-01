import { SimpleGrid } from '@mantine/core';
import { useFormikContext } from 'formik';
import type { FC } from 'react';

import Card from '@/libs/admin/components/funds/fund-form-elements/Card';
import Textarea from '@/libs/components/Base/inputs/textarea';
import type { FundAdditionalInformationValidationType } from '@/libs/validations/admin/fund-form-validation';

const AdditionalInfo: FC = () => {
  const { getFieldProps, touched, errors } =
    useFormikContext<FundAdditionalInformationValidationType>();
  return (
    <Card title="additionalInfo">
      <SimpleGrid
        className="gap-x-[1.25] gap-y-[1.88rem] @3xl:grid-cols-2"
        dir="rtl"
      >
        <Textarea
          namespace="fund"
          data-cy-input="riskMessageEn"
          label="textRiskMessage"
          charsLimit={100}
          placeholder="writeHere"
          {...getFieldProps('riskMessageEn')}
          errorMessage={
            (touched?.riskMessageEn && errors?.riskMessageEn) as string
          }
        />
        <Textarea
          namespace="fund"
          data-cy-input="riskMessageAr"
          label="textRiskMessage"
          charsLimit={100}
          placeholder="writeHere"
          {...getFieldProps('riskMessageAr')}
          errorMessage={
            (touched?.riskMessageAr && errors?.riskMessageAr) as string
          }
        />
      </SimpleGrid>
    </Card>
  );
};

export default AdditionalInfo;
