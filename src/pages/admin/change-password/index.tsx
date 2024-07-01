// eslint-disable-next-line simple-import-sort/imports
import { notifications } from '@mantine/notifications';

import Button from '@/libs/components/Base/Buttons/Button';
import PasswordInput from '@/libs/components/Base/inputs/password-input';
import { axiosInternal } from '@/libs/configs/axios';
import { useMutation } from '@/libs/hooks/use-mutation';
import { useForms } from '@/libs/hooks/useForms';
import useUser from '@/libs/hooks/useUser';
import PasswordValidationSchema from '@/libs/validations/NetworkBuxx/change-password';
import { Card } from '@mantine/core';

const ChangePassword = () => {
  const { user } = useUser();
  const { mutateAsync } = useMutation({
    mutationFn: async (values: any) => {
      const body = {
        password: values.password,
        // eslint-disable-next-line no-underscore-dangle
        userId: user?._id,
      };
      await axiosInternal.put(`/change-password`, body);
    },
    onSuccess: () => {
      notifications.show({
        title: 'success',
        message: 'password updated successfully',
      });
    },
    onError(error) {
      notifications.show({
        title: 'error',
        message: error.message,
      });
    },
  });

  const initialValues: any = {
    password: '',
    confirmPassword: '',
  };

  const formik = useForms({
    initialValues,
    validationSchema: PasswordValidationSchema,
    onSubmit: mutateAsync,
  });
  return (
    <Card className="mt-5">
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-5 text-sm sm:text-lg">
          <PasswordInput
            namespace="auth"
            label="password"
            placeholder="enterPassword"
            {...formik.getFieldProps('password')}
            {...(formik.errors.password &&
              formik.touched.password && {
                errorMessage: formik.errors.password as any,
              })}
          />
          <PasswordInput
            namespace="auth"
            label="confirmPassword"
            data-cy-input="confirmPassword"
            placeholder="reEnterPassword"
            {...formik.getFieldProps('confirmPassword')}
            {...(formik.errors.confirmPassword &&
              formik.touched.confirmPassword && {
                errorMessage: formik.errors.confirmPassword as any,
              })}
          />
        </div>
        <Button
          type="submit"
          loading={formik.isSubmitting}
          disabled={!formik.isValid}
          namespace="admin-common"
          text="update"
          className="mt-6 w-full text-base"
        />
      </form>
    </Card>
  );
};

export default ChangePassword;
