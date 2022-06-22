import { MAX_SQL_INT_SIZE } from 'constants/API';
import * as Yup from 'yup';

import { isLeaseCategoryVisible } from './AdministrationSubForm';

export const LeaseSchema = Yup.object().shape({
  startDate: Yup.date().required('Required'),
  expiryDate: Yup.date().min(Yup.ref('startDate'), 'Expiry Date must be after Start Date'),
  paymentReceivableType: Yup.string().required('Payment Receivable Type is required'),
  region: Yup.string().required('MOTI Region Type is required'),
  programType: Yup.string().required('Program Type is required'),
  motiContact: Yup.string().max(200, 'MOTI contact must be 200 characters or less.'),
  otherProgramType: Yup.string().when('programType', {
    is: (programType: string) => programType && programType === 'OTHER',
    then: Yup.string().required('Other Description required'),
    otherwise: Yup.string().nullable(),
  }),
  type: Yup.string().required('Lease Type is required'),
  hasPhysicalLicense: Yup.string(),
  hasDigitalLicense: Yup.string(),
  otherType: Yup.string().when('type', {
    is: (type: string) => type && type === 'OTHER',
    then: Yup.string()
      .required('Other Description required')
      .max(200, 'Other Description must be 200 characters or less.'),
    otherwise: Yup.string().nullable(),
  }),
  categoryType: Yup.string().when('type', {
    is: (type: string) => type && isLeaseCategoryVisible(type),
    then: Yup.string()
      .required('Other Description required')
      .max(200, 'Other Description must be 200 characters or less.'),
    otherwise: Yup.string().nullable(),
  }),
  otherCategoryType: Yup.string().when('categoryType', {
    is: (categoryType: string) => categoryType && categoryType === 'OTHER',
    then: Yup.string()
      .required('Other Description required')
      .max(200, 'Other Description must be 200 characters or less.'),
    otherwise: Yup.string().nullable(),
  }),
  purposeType: Yup.string().required('Purpose Type is required'),
  otherPurposeType: Yup.string().when('purposeType', {
    is: (purposeType: string) => purposeType && purposeType === 'OTHER',
    then: Yup.string()
      .required('Other Description required')
      .max(200, 'Other Description must be 200 characters or less.'),
    otherwise: Yup.string().nullable(),
  }),
  documentationReference: Yup.string().max(
    500,
    'Documentation reference must be 500 characters or less.',
  ),
  description: Yup.string().max(2000, 'Description must be 2000 characters or less.'),
  tfaFileNo: Yup.number().max(MAX_SQL_INT_SIZE, 'TFA File No size exceeded.'),
  psFileNo: Yup.string().max(50, 'PS File No size exceeded.'),
  properties: Yup.array().of(
    Yup.object().shape(
      {
        pid: Yup.string().when('pin', {
          is: (pin: string) => !!pin,
          then: Yup.string().nullable(),
          otherwise: Yup.string()
            .required('valid PID or PIN required')
            .max(12, 'A pid must be less than 12 characters.'),
        }),
        pin: Yup.string().when('pid', {
          is: (pid: string) => !!pid,
          then: Yup.string().nullable(),
          otherwise: Yup.string()
            .required('valid PID or PIN required')
            .max(10, 'A pin must be less than 10 characters.'),
        }),
        landArea: Yup.number().max(Number.MAX_VALUE, 'Land area size exceeded.'),
      },
      [
        ['pid', 'pin'],
        ['pin', 'pid'],
      ],
    ),
  ),
});
