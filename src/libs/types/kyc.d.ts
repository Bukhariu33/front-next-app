import type { Resources } from 'i18next';

export type KycTranslationKeys = keyof Resources['kyc'];

export type RatingStatus = 'acceptable' | 'not-acceptable';
