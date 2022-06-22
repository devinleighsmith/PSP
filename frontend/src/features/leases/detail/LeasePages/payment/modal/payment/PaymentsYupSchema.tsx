import { MAX_SQL_MONEY_SIZE } from 'constants/API';
import * as Yup from 'yup';

export const PaymentsYupSchema = Yup.object().shape({
  receivedDate: Yup.date().required('Required'),
  amountPreTax: Yup.number()
    .transform((value, originalValue) => (String(originalValue).trim() === '' ? null : value))
    .max(MAX_SQL_MONEY_SIZE, 'Amount pre-tax size exceeded.'),
  amountTotal: Yup.number()
    .transform((value, originalValue) => (String(originalValue).trim() === '' ? null : value))
    .min(0, 'must be a value greater than 0')
    .max(MAX_SQL_MONEY_SIZE, 'Amount total size exceeded.'),
  amountGst: Yup.number()
    .transform((value, originalValue) => (String(originalValue).trim() === '' ? null : value))
    .max(MAX_SQL_MONEY_SIZE, 'Amount gst size exceeded.'),
});
