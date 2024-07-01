import type { Resources } from 'i18next';

type Namespace = keyof Resources;
type TranslationKey<T extends Namespace> = keyof Resources[T];
type WithTranslateError = {
  translateError: true;
  errorMessage: TranslationKey<'error'>;
};
type WithoutTranslateError = {
  translateError?: false;
  errorMessage?: string | string[];
};
type TranslatableError = WithTranslateError | WithoutTranslateError;
interface WithTranslation<T extends Namespace> {
  namespace: T;
}
export type { Namespace, TranslatableError, TranslationKey, WithTranslation };
