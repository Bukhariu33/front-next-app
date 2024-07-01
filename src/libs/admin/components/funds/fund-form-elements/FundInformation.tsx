/* eslint-disable max-lines */
import { Flex, SimpleGrid } from '@mantine/core';
import { useFormikContext } from 'formik';
import type { FC } from 'react';

import Card from '@/libs/admin/components/funds/fund-form-elements/Card';
import DateTimePicker from '@/libs/components/Base/inputs/date-time-picker';
import Input from '@/libs/components/Base/inputs/input';
import NumberInput from '@/libs/components/Base/inputs/number-input';
import SelectInput from '@/libs/components/Base/inputs/select-input';
import useFundManagersListOptions from '@/libs/hooks/admin/use-fund-managers-list-options';
import useAdminSettings from '@/libs/hooks/useAdminSettings';
import CalendarIcon from '@/libs/icons/calendar-icon';
import PercentageIcon from '@/libs/icons/percentage-icon';
import SARIcon from '@/libs/icons/SAR-icon';
import type { FundInformationValidationType } from '@/libs/validations/admin/fund-form-validation';

import { Addon } from '../../../../components/Base/Addon';
import MoneyInput from '../../../../components/Base/inputs/money-input';

interface FundInformationProps {
  type: 'frequentPayoutFunds' | 'maturityPayoutFunds';
}

const FundInformation: FC<FundInformationProps> = ({ type }) => {
  const { data: settings, isLoading: isLoadingSettings } = useAdminSettings();
  const { data: fundManagerNameOptions, isLoading } =
    useFundManagersListOptions();

  const {
    getFieldProps,
    setFieldValue,
    setFieldTouched,
    touched,
    errors,
    values,
  } = useFormikContext<
    FundInformationValidationType & {
      paymentFrequency: string;
    }
  >();

  const getNumberInputProps = (name: keyof typeof touched) => {
    return {
      hideControls: true,
      allowNegative: false,
      ...getFieldProps(name),
      onChange: (value: string | number | null) => {
        return setFieldValue(name, Number(value));
      },
      errorMessage:
        touched?.[name] && errors?.[name] ? errors?.[name] : undefined,
    };
  };

  const getSelectInputProps = (name: keyof typeof touched) => {
    return {
      ...getFieldProps(name),
      onChange: (value: string | null) => {
        return setFieldValue(name, value);
      },
      errorMessage:
        touched?.[name] && errors?.[name] ? errors?.[name] : undefined,
    };
  };

  const getMoneyInputProps = (name: keyof typeof touched) => {
    return {
      ...getFieldProps(name),
      onChange: (value: number | null) => {
        return setFieldValue(name, Number(value));
      },
      errorMessage:
        touched?.[name] && errors?.[name] ? errors?.[name] : undefined,
    };
  };

  return (
    <Card title="fundInformation">
      <SimpleGrid className="gap-x-[1.25] gap-y-[1.62rem] @3xl:grid-cols-2">
        <Input
          namespace="fund"
          label="fundNameInArabic"
          data-cy-input="nameAr"
          placeholder="enterFundName"
          {...getFieldProps('nameAr')}
          errorMessage={(touched?.nameAr && errors?.nameAr) as string}
          classNames={{
            input: 'dir-rtl text-start ltr:placeholder:text-end',
          }}
        />
        <Input
          namespace="fund"
          label="fundNameInEnglish"
          data-cy-input="nameEn"
          placeholder="enterFundName"
          {...getFieldProps('nameEn')}
          errorMessage={(touched?.nameEn && errors?.nameEn) as string}
          classNames={{
            input: 'dir-ltr text-start rtl:placeholder:text-end',
          }}
        />
        <SelectInput
          namespace="fund"
          isLoading={isLoadingSettings}
          data-cy-input="fundAssetsClass"
          label="fundAssetsClass"
          placeholder="SelectFundAssetsClass"
          data={settings?.fundAssetsClassOptions}
          {...getSelectInputProps('assetsClass')}
        />
        <SelectInput
          namespace="fund"
          label="fundManagerName"
          data-cy-input="fundManagerName"
          isLoading={isLoading}
          placeholder="selectFundManager"
          data={fundManagerNameOptions}
          {...getSelectInputProps('fundManagerId')}
        />
        <SelectInput
          namespace="fund"
          isLoading={isLoadingSettings}
          data-cy-input="fundType"
          label="fundType"
          placeholder="selectFundType"
          data={settings?.fundTypeOptions}
          {...getSelectInputProps('type')}
        />
        <SelectInput
          namespace="fund"
          isLoading={isLoadingSettings}
          data-cy-input="fundSCity"
          label="fundSCity"
          placeholder="selectFundSCity"
          data={settings?.fundCityOptions}
          {...getSelectInputProps('city')}
        />
        <Flex className="gap-[0.5rem]">
          <MoneyInput
            namespace="fund"
            data-cy-input="fundCoverage"
            label="fundCoverage"
            placeholder="enterFundCoverage"
            classNames={{
              root: 'w-full',
            }}
            {...getMoneyInputProps('coverage')}
          />
          <Addon Icon={SARIcon} />
        </Flex>
        <Flex className="gap-[0.5rem]">
          <MoneyInput
            namespace="fund"
            label="minimumCoverageAmount"
            data-cy-input="minimumCoverageAmount"
            placeholder="enterMinimumCoverageAmount"
            classNames={{
              root: '@3xl:min-w-[19.125rem] w-full',
            }}
            {...getMoneyInputProps('minCoverage')}
          />
          <Addon Icon={SARIcon} />
        </Flex>
        <SimpleGrid className="col-span-full @3xl:grid-cols-2">
          <Flex className="gap-[0.5rem]">
            <MoneyInput
              namespace="fund"
              label="minimumInvestmentAmount"
              data-cy-input="minimumInvestmentAmount"
              placeholder="enterYourLowestAmount"
              classNames={{
                root: '@3xl:min-w-[19.125rem] w-full',
              }}
              {...getMoneyInputProps('minInvestment')}
            />
            <Addon Icon={SARIcon} />
          </Flex>
        </SimpleGrid>
        <Flex className="gap-[0.5rem]">
          <DateTimePicker
            data-cy="investment-starting-date"
            namespace="fund"
            label="startingDayAndTimeToReceiveInvestment"
            placeholder="fundDateAndTime"
            classNames={{
              root: '@3xl:min-w-[19.125rem] w-full',
            }}
            minDate={new Date()}
            {...getFieldProps('investmentStartingDate')}
            onChange={value => {
              return setFieldValue('investmentStartingDate', value);
            }}
            errorMessage={
              (touched?.investmentStartingDate &&
                errors?.investmentStartingDate) as string
            }
          />
          <Addon Icon={CalendarIcon} />
        </Flex>
        <Flex className="gap-[0.5rem]">
          <DateTimePicker
            data-cy="investment-ending-date"
            namespace="fund"
            label="lastDayToReceiveInvestment"
            placeholder="fundDateAndTime"
            classNames={{ root: '@3xl:min-w-[19.125rem] w-full' }}
            submitButtonProps={{
              id: `submit-date-fund-form-investment-ending-date`,
            }}
            minDate={
              values?.investmentStartingDate
                ? new Date(values?.investmentStartingDate)
                : new Date()
            }
            {...getFieldProps('investmentEndingDate')}
            onChange={value => {
              setFieldTouched('investmentEndingDate', true);
              return setFieldValue('investmentEndingDate', value);
            }}
            errorMessage={
              (touched?.investmentEndingDate &&
                errors?.investmentEndingDate) as string
            }
          />
          <Addon Icon={CalendarIcon} />
        </Flex>
        <Flex className=" gap-[0.5rem]">
          <NumberInput
            namespace="fund"
            label="expectedReturn"
            data-cy-input="expectedRoi"
            placeholder="enterReturnsOnInvestment"
            classNames={{
              root: '@3xl:min-w-[19.125rem] w-full',
            }}
            {...getNumberInputProps('expectedRoi')}
            clampBehavior="strict"
            min={0}
            max={100}
          />
          <Addon Icon={PercentageIcon} />
        </Flex>
        <SelectInput
          namespace="fund"
          isLoading={isLoadingSettings}
          data-cy-input="fundDuration"
          label="duration"
          limit={30}
          placeholder="selectTheFundDuration"
          data={settings?.durationOptions}
          {...getSelectInputProps('durationInMonths')}
        />
        <MoneyInput
          namespace="fund"
          label="investmentUnitPrice"
          data-cy-input="investmentUnitPrice"
          placeholder="enterInvestmentUnitPrice"
          {...getMoneyInputProps('unitPrice')}
        />
        <NumberInput
          namespace="fund"
          label="numberOfInvestmentUnit"
          data-cy-input="numberOfInvestmentUnit"
          placeholder="enterNumberOfInvestmentUnit"
          {...getNumberInputProps('units')}
          onChange={value => {
            return setFieldValue('units', Number(value));
          }}
        />
        <SimpleGrid className="@3xl:col-span-full @3xl:grid-cols-2">
          <Flex className="col-span-full h-[1px] w-full bg-gray-300" />
          <Flex className="gap-[0.5rem]">
            <NumberInput
              namespace="fund"
              data-cy-input="subscriptionFeesPercentage"
              label="subscriptionFees"
              placeholder="subscriptionFees"
              classNames={{
                root: '@3xl:min-w-[19.125rem] w-full',
              }}
              {...getNumberInputProps('subscriptionFeesPercentage')}
              clampBehavior="strict"
              min={0}
              max={100}
            />
            <Addon Icon={PercentageIcon} />
          </Flex>
          <Flex className="gap-[0.5rem]">
            <MoneyInput
              namespace="fund"
              placeholder="distributionFees"
              data-cy-input="distributionFees"
              label="distributionFees"
              classNames={{
                root: '@3xl:min-w-[19.125rem] w-full',
              }}
              {...getMoneyInputProps('distributionFees')}
              errorMessage={
                (touched?.distributionFees &&
                  errors?.distributionFees) as string
              }
            />
            <Addon Icon={SARIcon} />
          </Flex>
        </SimpleGrid>
        {type === 'frequentPayoutFunds' && (
          <SelectInput
            namespace="fund"
            label="paymentFrequency"
            placeholder="selectPaymentFrequency"
            isLoading={isLoadingSettings}
            classNames={{ root: 'col-span-full' }}
            data={settings?.paymentFrequencyOptions}
            {...getFieldProps('paymentFrequency')}
            onChange={value => {
              return setFieldValue('paymentFrequency', value);
            }}
            errorMessage={
              (touched?.paymentFrequency && errors?.paymentFrequency) as string
            }
          />
        )}
      </SimpleGrid>
    </Card>
  );
};
export default FundInformation;
