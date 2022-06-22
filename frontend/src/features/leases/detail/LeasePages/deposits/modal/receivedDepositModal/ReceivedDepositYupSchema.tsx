import { MAX_SQL_MONEY_SIZE } from 'constants/API';
import * as Yup from 'yup';

export const ReceivedDepositYupSchema = Yup.object().shape({
  depositTypeCode: Yup.string().required('Deposit Type is required.'),
  otherTypeDescription: Yup.string().when('depositTypeCode', {
    is: (depositTypeCode: string) => depositTypeCode && depositTypeCode === 'OTHER',
    then: Yup.string()
      .required('Other Description required.')
      .max(200, 'Other description must be 200 characters or less.'),
    otherwise: Yup.string().nullable(),
  }),
  description: Yup.string().max(2000, 'Description must be 2000 characters or less.'),
  amountPaid: Yup.string()
    .required('Deposit amount is required')
    .max(MAX_SQL_MONEY_SIZE, 'Amount paid size exceeded.'),
  depositDate: Yup.string().required('Deposit Date is required.'),
  contactHolder: Yup.object().required('Deposit Holder is required.'),
});
