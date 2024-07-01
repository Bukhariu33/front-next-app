import type { InferType } from 'yup';
import * as yup from 'yup';

import { AttachmentSchema } from '../attachment';

export const MemberValidationSchema = yup.object().shape({
  name: yup.string().required('thisFieldIsRequired'),
  position: yup.string().required('thisFieldIsRequired'),
  image: yup.string().required('thisFieldIsRequired'),
});

export const FundInformationValidationSchema = yup.object().shape({
  nameEn: yup.string().required('thisFieldIsRequired'),
  nameAr: yup.string().required('thisFieldIsRequired'),
  assetsClass: yup.string().required('thisFieldIsRequired'),
  fundManagerId: yup.string().required('thisFieldIsRequired'),
  type: yup.string().required('thisFieldIsRequired'),
  city: yup.string().required('thisFieldIsRequired'),
  coverage: yup
    .number()
    .required('thisFieldIsRequired')
    .positive('isPositiveNumber')
    .integer(),
  minCoverage: yup.lazy((value, { parent }) =>
    yup
      .number()
      .required('thisFieldIsRequired')
      .positive('isPositiveNumber')
      .integer()
      .test('is-smaller-than-coverage', 'minimumCoverageError', () => {
        return value <= parent?.coverage;
      }),
  ),
  minInvestment: yup
    .number()
    .required('thisFieldIsRequired')
    .positive('isPositiveNumber')
    .integer(),
  investmentStartingDate: yup.string().required('thisFieldIsRequired'),
  investmentEndingDate: yup.lazy((value, { parent }) =>
    yup
      .string()
      .required('thisFieldIsRequired')
      .test('is-after-starting-date', 'investmentEndingDateError', () => {
        const { investmentStartingDate } = parent;
        const startDate = new Date(investmentStartingDate);
        const endDate = new Date(value);
        return endDate > startDate;
      }),
  ),
  expectedRoi: yup
    .number()
    .min(0, 'numberShouldBeBetweenPercentage')
    .max(100, 'numberShouldBeBetweenPercentage')
    .required('thisFieldIsRequired')
    .integer(),
  durationInMonths: yup
    .number()
    .required('thisFieldIsRequired')
    .positive('isPositiveNumber')
    .integer(),
  unitPrice: yup
    .number()
    .required('thisFieldIsRequired')
    .positive('isPositiveNumber')
    .integer(),
  units: yup
    .number()
    .required('thisFieldIsRequired')
    .positive('isPositiveNumber')
    .integer()
    .integer(),
  subscriptionFeesPercentage: yup
    .number()
    .min(0, 'numberShouldBeBetweenPercentage')
    .max(99, 'numberShouldBeBetweenPercentage')
    .required('thisFieldIsRequired')
    .integer(),
  distributionFees: yup
    .number()
    .required('thisFieldIsRequired')
    .positive('isPositiveNumber')
    .integer(),
});

export const FundAdditionalInformationValidationSchema = yup.object().shape({
  riskMessageEn: yup.string(),
  riskMessageAr: yup.string(),
});

export const FundGeneralInformationValidationSchema = yup.object().shape({
  generalInformationEn: yup.string().required('thisFieldIsRequired'),
  generalInformationAr: yup.string().required('thisFieldIsRequired'),
  financialInformationEn: yup.string().required('thisFieldIsRequired'),
  financialInformationAr: yup.string().required('thisFieldIsRequired'),
  updatesEn: yup.string().required('thisFieldIsRequired'),
  updatesAr: yup.string().required('thisFieldIsRequired'),
});

export const FundTeamValidationSchema = yup
  .object()
  .shape({ fundTeam: yup.array().of(MemberValidationSchema) });

export const FundFormValidationSchema = yup
  .object()
  .shape({
    imageDimension: yup.string(),
    fundImages: yup.array().of(yup.string()).min(1, 'thisFieldIsRequired'),
    attachments: yup.array().of(AttachmentSchema).min(1, 'thisFieldIsRequired'),
    location: yup.lazy(() =>
      yup
        .object({
          lat: yup.number(),
          lng: yup.number(),
          place: yup
            .object({
              name: yup.string(),
              address: yup.string(),
              placeId: yup.string(),
              addressComponents: yup.array().of(
                yup
                  .object({
                    long_name: yup.string(),
                    short_name: yup.string(),
                    types: yup.array().of(yup.string()),
                  })
                  .optional(),
              ),
            })
            .optional(),
          _place: yup.object().optional(),
        })
        .test(
          'location-required',
          'thisFieldIsRequired',
          (location, { parent }) => {
            const { assetsClass } = parent;
            if (assetsClass === 'realEstateDevelopmentFund') {
              if (!location || location.lat == null || location.lng == null) {
                return false;
              }
            }
            return true;
          },
        ),
    ),
  })
  .concat(FundInformationValidationSchema)
  .concat(FundAdditionalInformationValidationSchema)
  .concat(FundTeamValidationSchema)
  .concat(FundGeneralInformationValidationSchema);

export const FrequentPayoutFundsValidationSchema =
  FundFormValidationSchema.concat(
    yup.object().shape({
      paymentFrequency: yup
        .string()
        .oneOf(['monthly', 'quarterly', 'semiAnnual', 'annually', 'onMaturity'])
        .required('thisFieldIsRequired'),
    }),
  );

export type FundFormValidationType = InferType<typeof FundFormValidationSchema>;
export type FundInformationValidationType = InferType<
  typeof FundInformationValidationSchema
>;
export type FundGeneralInformationValidationType = InferType<
  typeof FundGeneralInformationValidationSchema
>;
export type FundAdditionalInformationValidationType = InferType<
  typeof FundAdditionalInformationValidationSchema
>;
export type FundTeamValidationType = InferType<typeof FundTeamValidationSchema>;
export type FrequentPayoutFundsValidationType = InferType<
  typeof FrequentPayoutFundsValidationSchema
>;

export type TeamMemberValidationType = InferType<typeof MemberValidationSchema>;
