import { MAX_SQL_MONEY_SIZE } from 'constants/API';
import * as Yup from 'yup';

export const InsuranceYupSchema = Yup.object().shape({
  insurances: Yup.array().of(
    Yup.object().shape({
      coverageLimit: Yup.number().max(MAX_SQL_MONEY_SIZE, 'Coverage limit size exceeded.'),
      coverageDescription: Yup.string().max(
        2000,
        'Coverage description must be 2000 characters or less.',
      ),
      expiryDate: Yup.date(),
      otherInsuranceType: Yup.string().max(
        200,
        'Other insurance type must be 200 characters or less.',
      ),
    }),
  ),
});
