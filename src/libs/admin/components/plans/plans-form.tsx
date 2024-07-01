/* eslint-disable no-underscore-dangle */
/* eslint-disable simple-import-sort/imports */
import { Card } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { type FC } from 'react';

import Button from '@/libs/components/Base/Buttons/Button';
import Input from '@/libs/components/Base/inputs/input';
import { axiosInternal } from '@/libs/configs/axios';
import { useMutation } from '@/libs/hooks/use-mutation';
import { useForms } from '@/libs/hooks/useForms';
import listAdminPlansQueryOptions from '@/libs/services/admin/plans/list-plans';
import { getAdminPlansAdsQueryOptions } from '@/libs/services/admin/plans/plans-ads';
import PlansValidationSchema from '@/libs/validations/NetworkBuxx/plans-form-validations';
import { useQuery } from '@tanstack/react-query';
// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Select from 'react-select';

type PlansFormProps = {
  type: 'update' | 'create';
  data?: any;
};

const PlanFormBody: FC<PlansFormProps> = ({ data, type }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  // const [selectedAdIds, setSelectedAd] = useState<string[]>([]);
  const [selectedValues, setSelectedValues] = React.useState([]);

  const { data: adsData } = useQuery(getAdminPlansAdsQueryOptions.details());
  // const { data: filteredAds } = useQuery(
  //   getAdminPlansFilteredAdsQueryOptions.details(),
  // );

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      if (type === 'update') {
        const requestData = {
          ...values,
          ads: selectedValues.map((item: any) => item.value),
          referralBonus: 0,
        };
        // eslint-disable-next-line no-underscore-dangle
        await axiosInternal.put(`/admin/plans/${data?._id}`, requestData);
      } else {
        const requestData = {
          ...values,
          ads: selectedValues.map((item: any) => item.value),
        };
        await axiosInternal.post(`/admin/plans/create-plans`, requestData);
      }
    },
    revalidateOnSettled: true,
    queryOptions: [listAdminPlansQueryOptions],
    onSuccess: () => {
      notifications.show({
        title: t('success'),
        message: t('successModalMessage'),
      });
      router.push('/admin/plans');
    },
  });

  const initialValues: any = {
    name: data?.name || '',
    planPrice: data?.planPrice || '',
    dailyLimit: data?.dailyLimit || '',
    allowedReferrals: data?.allowedReferrals || '',
    validity: data?.validity || '',
    ads: '',
  };

  const formik = useForms({
    initialValues,
    validationSchema: PlansValidationSchema,
    enableReinitialize: true,
    onSubmit: mutateAsync,
  });

  // const FetchSelectedAdIds = (selectedLinks: string[]) => {
  //   // Create an array to store the matching IDs
  //   const selectedIds: string[] = [];
  //   for (let i = 0; i < filteredAds.length; i += 1) {
  //     for (const link of selectedLinks) {
  //       if (filteredAds[i].value === link) {
  //         selectedIds.push(filteredAds[i].label);
  //       }
  //     }
  //   }
  //   setSelectedAd(selectedIds);
  // };

  console.log('Here is my plan data: ', data);

  // State to manage selected values

  // Handle change event
  const handleSelectChange = (selectedOptions: any) => {
    setSelectedValues(selectedOptions);
  };

  React.useEffect(() => {
    if (data?.ads?.length > 0) {
      const selectedAds = data?.adsData?.map((item: any) => ({
        label: item.link || '',
        value: item._id || '',
      }));
      setSelectedValues(selectedAds);
    }
  }, []);
  return (
    <Card className="mt-[2rem] w-full rounded-2xl bg-white px-[1.5rem] py-[1.25rem] pb-[30px] shadow-sm">
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <div className=" grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            namespace="common"
            label="name"
            placeholder="name"
            {...formik.getFieldProps('name')}
            {...(formik.errors.name &&
              formik.touched.name && {
                errorMessage: formik.errors.name as any,
              })}
          />
          <Input
            namespace="admin-common"
            label="planPrice"
            placeholder="planPrice"
            type="number"
            {...formik.getFieldProps('planPrice')}
            {...(formik.errors.planPrice &&
              formik.touched.planPrice && {
                errorMessage: formik.errors.planPrice as any,
              })}
          />
          <Input
            namespace="admin-common"
            label="dailyLimit"
            placeholder="dailyLimit"
            type="number"
            {...formik.getFieldProps('dailyLimit')}
            {...(formik.errors.dailyLimit &&
              formik.touched.dailyLimit && {
                errorMessage: formik.errors.dailyLimit as any,
              })}
          />
          <Input
            namespace="admin-common"
            label="allowedRefferal"
            placeholder="allowedRefferal"
            type="number"
            {...formik.getFieldProps('allowedReferrals')}
            {...(formik.errors.allowedReferrals &&
              formik.touched.allowedReferrals && {
                errorMessage: formik.errors.allowedReferrals as any,
              })}
          />
          {/* <Input
            namespace="admin-common"
            label="referralBonus"
            placeholder="referralBonus"
            type="number"
            {...formik.getFieldProps('referralBonus')}
            {...(formik.errors.referralBonus &&
              formik.touched.referralBonus && {
                errorMessage: formik.errors.referralBonus as any,
              })}
          /> */}
          <Input
            namespace="admin-common"
            label="validity"
            placeholder="validity"
            type="number"
            {...formik.getFieldProps('validity')}
            {...(formik.errors.validity &&
              formik.touched.validity && {
                errorMessage: formik.errors.validity as any,
              })}
          />

          <div>
            <p
              style={{
                color: 'red',
                marginBottom: '0.5em',
              }}
            >
              Please Select Ads:
            </p>
            <Select
              isMulti
              options={adsData}
              value={selectedValues}
              onChange={handleSelectChange}
              // value={formik.values.ads}
            />
          </div>

          {/* 
          <Select
            isMulti
            name="ads"
            options={adsData?.data?.map((item: any) => ({
              label: item.link || '',
              value: item.id || '',
            }))}
            value={formik.values.ads}
            onChange={selectedOptions => {
              // Use the map function to extract the values from the selected options
              const selectedValues = (selectedOptions || []).map(
                option => option.value,
              );
              console.log('Here is my selected values: ', selectedValues);
              // Update the formik field value with the array of selected values
              // formik.setFieldValue('ads', selectedValues);
            }}
          /> */}

          {/* <MultiSelect
            label="Select Ads"
            placeholder="selected ads"
            data={adsData}
            searchable
            onChange={e => {
              FetchSelectedAdIds(e);
            }}
          /> */}

          {/* <SelectInput
            namespace="admin-common"
            label="ads"
            placeholder="ads"
            data={adsData}
            classNames={{
              input: 'bg-white',
            }}
            multiple
            name="ads"
            onChange={(e: any) => {
              formik.setFieldValue('ads', e);
            }}
            onBlur={_ => {
              formik.setFieldTouched('ads', true);
            }}
            value={formik.values.ads}
            {...(formik.errors.ads &&
              formik.touched.ads && {
                errorMessage: formik.errors.ads as any,
              })}
          /> */}
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <Button
            namespace="common"
            onClick={() => router.push('/admin/plans')}
            variant="outlined-black"
            text="cancel"
          />
          <Button
            namespace="admin-common"
            type="submit"
            text={type}
            loading={isLoading}
          />
        </div>
      </form>
    </Card>
  );
};

export default PlanFormBody;
