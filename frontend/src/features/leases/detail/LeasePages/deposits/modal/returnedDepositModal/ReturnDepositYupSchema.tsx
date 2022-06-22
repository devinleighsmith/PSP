import { MAX_SQL_MONEY_SIZE } from 'constants/API';
import * as Yup from 'yup';

export const ReturnDepositYupSchema = Yup.object().shape({
  terminationDate: Yup.date().required('Termination Date is required.'),
  returnAmount: Yup.number()
    .required('Return amount is required.')
    .max(MAX_SQL_MONEY_SIZE, 'Return amount size exceeded.'),
  interestPaid: Yup.number().max(MAX_SQL_MONEY_SIZE, 'Interest paid size exceeded.'),
  returnDate: Yup.date().required('Return Date is required.'),
  contactHolder: Yup.object().required('Payee Name is required.'),
  claimsAgainst: Yup.number().max(MAX_SQL_MONEY_SIZE, 'claims against size exceeded.'),
});
