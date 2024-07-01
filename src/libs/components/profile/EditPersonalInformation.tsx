import { SimpleGrid } from '@mantine/core';
import { useFormikContext } from 'formik';

import PhoneNumberInput from '@/libs/components/Base/inputs/phone-number-input';
import { ProfileSectionLayout } from '@/libs/components/profile/ProfileSectionLayout';
import type { UpdateProfileSchemaType } from '@/libs/validations/profile';

import Input from '../Base/inputs/input';
import SelectInput from '../Base/inputs/select-input';

export default function EditPersonalInformation() {
  const formik = useFormikContext<UpdateProfileSchemaType>();

  const selectGenderData = [
    {
      label: 'Male',
      value: 'Male',
    },
    {
      label: 'Female',
      value: 'Female',
    },
  ];

  return (
    <ProfileSectionLayout title="PersonalInformation" className="mt-[60px]">
      <SimpleGrid className="grid-cols-2 gap-x-[40px]  max-sm:grid-cols-1">
        <Input
          namespace="common"
          label="fullName"
          placeholder="EnterFullName"
          {...formik.getFieldProps('fullName')}
          errorMessage={
            (formik.touched?.fullName && formik.errors?.fullName) as string
          }
        />
        <Input
          namespace="common"
          label="JobTitle"
          placeholder="EnterJobTitle"
          {...formik.getFieldProps('jobTitle')}
          errorMessage={
            (formik.touched?.jobTitle && formik.errors?.jobTitle) as string
          }
        />
      </SimpleGrid>
      <SimpleGrid className="grid-cols-2 gap-x-[40px] max-lg:grid-cols-1">
        <PhoneNumberInput
          label="PhoneNumber"
          placeholder="EnterPhoneNumber"
          namespace="common"
          {...formik.getFieldProps('phoneNumber')}
          onChange={value => {
            return formik.setFieldValue('phoneNumber', value);
          }}
          errorMessage={
            (formik.touched?.phoneNumber &&
              formik.errors?.phoneNumber) as string
          }
        />
        <SelectInput
          namespace="common"
          label="Gender"
          placeholder="EnterGender"
          data={selectGenderData}
          {...formik.getFieldProps('gender')}
          onChange={value => {
            return formik.setFieldValue('gender', value);
          }}
          errorMessage={
            (formik.touched?.gender && formik.errors?.gender) as string
          }
        />
      </SimpleGrid>
    </ProfileSectionLayout>
  );
}
