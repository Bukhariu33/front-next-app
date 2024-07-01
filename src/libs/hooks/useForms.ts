import type { UseMutateAsyncFunction } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import type {
  FormikConfig,
  FormikErrors,
  FormikProps,
  FormikValues,
} from 'formik';
// eslint-disable-next-line no-restricted-imports
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import type { AnyObjectSchema } from 'yup';

export type FormsProps<T = any> = FormikProps<T>;

interface UseForms<Values>
  extends Omit<FormikConfig<Values>, 'onSubmit' | 'validationSchema'> {
  onSubmit: UseMutateAsyncFunction<
    unknown,
    AxiosError<APIError>,
    Values,
    unknown
  >;
  validationSchema: AnyObjectSchema;
  initialValues: Values;
}

const validateSchemaKey = (schema: Record<string, any>, key: string) => {
  const hasKey = Object.hasOwnProperty.call(schema, key);

  if (!hasKey)
    throw new Error(
      `Wrong schema: Formik Schema keys, Yup schema keys must match the BE schema property "${key}" not found in the initialValues`,
    );
};

const stringifyError = (error: APIError['errors'][number]['constraints']) => {
  const values = Object.values(error);
  return JSON.stringify(values);
};

type ParsedFormikErrors<Values> = {
  [K in keyof Values]: Values[K] extends object
    ? ParsedFormikErrors<Values[K]>
    : string | string[];
};

const parseErrors = <Values>(
  errors: FormikErrors<Values>,
): ParsedFormikErrors<Values> => {
  const parsedErrors: any = {};

  for (const [key, value] of Object.entries(errors)) {
    try {
      const parsedVal = JSON.parse(value as string);
      if (Array.isArray(parsedVal)) {
        parsedErrors[key] = parsedVal as string[];
      } else {
        parsedErrors[key] = parsedVal as string;
      }
    } catch (e) {
      parsedErrors[key] = value; // If parsing fails, leave the value as is
    }
  }

  return parsedErrors;
};

export function useForms<Values extends FormikValues>(props: UseForms<Values>) {
  // Extract the custom prop and the rest of the useFormik props.
  const { onSubmit, initialValues, ...formikProps } = props;

  const [backendError, setBackendError] = useState<string | null>(null);
  useEffect(() => {
    if (backendError) {
      throw new Error(
        `Wrong schema: Formik Schema keys, Yup schema keys must match the BE schema property "${backendError}" not found in the initialValues`,
      );
    }
  }, [backendError]);

  Object.keys(initialValues).forEach(key =>
    validateSchemaKey(props.validationSchema.fields, key),
  );

  Object.keys(props.validationSchema.fields).forEach(key =>
    validateSchemaKey(initialValues, key),
  );

  // Pass the rest of the props to useFormik
  const { submitCount, ...formik } = useFormik({
    ...formikProps,
    initialValues,
    onSubmit: async (val, { setFieldError, setSubmitting }) => {
      try {
        await onSubmit(val);
      } catch (error) {
        if (
          error instanceof AxiosError &&
          error.response?.data.status === 422
        ) {
          const { response } = error as AxiosError<APIError>;
          const errors = response?.data.errors;
          errors?.forEach(err => {
            const hasKey = Object.hasOwnProperty.call(
              props.validationSchema.fields,
              err.property,
            );

            if (!hasKey) {
              return setBackendError(err.property);
            }

            return setFieldError(err.property, stringifyError(err.constraints));
          });
        }
      }
      setSubmitting(false);
    },
  });

  useEffect(() => {
    if (formik.isValid) return;

    const element =
      document.querySelector('input[data-error=true]') ||
      document.querySelector('div[data-error=true]');

    if (!element) return;

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }, [formik.isValid, submitCount]);
  return {
    ...formik,
    submitCount,
    errors: parseErrors(formik.errors),
  };
}
