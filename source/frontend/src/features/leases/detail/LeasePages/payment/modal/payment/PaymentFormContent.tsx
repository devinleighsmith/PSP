import { useFormikContext } from 'formik';
import { Col, Row } from 'react-bootstrap';

import { FastCurrencyInput, FastDatePicker, Select } from '@/components/common/form';
import { InlineFlexDiv } from '@/components/common/styles';
import TooltipIcon from '@/components/common/TooltipIcon';
import * as API from '@/constants/API';
import useLookupCodeHelpers from '@/hooks/useLookupCodeHelpers';

import { useCalculateActualGst } from '../../hooks/useCalculateActualGst';
import { FormLeasePayment } from '../../models';
import * as Styled from '../../styles';

interface IPaymentFormContentProps {
  isReceived: boolean;
  isGstEligible: boolean;
}

const PaymentFormContent: React.FunctionComponent<
  React.PropsWithChildren<IPaymentFormContentProps>
> = ({ isReceived, isGstEligible }) => {
  const formikProps = useFormikContext<FormLeasePayment>();
  const lookups = useLookupCodeHelpers();
  useCalculateActualGst(!!isGstEligible);
  const paymentMethodOptions = lookups.getOptionsByType(API.LEASE_PAYMENT_METHOD_TYPES);
  const categoryOptions = lookups.getOptionsByType(API.LEASE_PAYMENT_CATEGORY_TYPES);

  return (
    <Styled.StyledFormBody>
      <Row>
        <Col md={6}>
          <FastDatePicker
            required
            label={isReceived ? 'Received date:' : 'Sent date:'}
            field="receivedDate"
            formikProps={formikProps}
          />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Select
            label="Method:"
            field="leasePaymentMethodType.id"
            options={paymentMethodOptions}
          />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Select
            label="Payment category:"
            field="leasePaymentCategoryType.id"
            options={categoryOptions}
          />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FastCurrencyInput
            formikProps={formikProps}
            label="Total received ($)"
            field="amountTotal"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Styled.ActualPaymentBox>
            <Styled.FlexRight>
              <TooltipIcon
                toolTipId="actual-calculation-tooltip"
                toolTip="If left blank, these values are calculated based on the total received. Enter values here only to override the system calculation."
              />
            </Styled.FlexRight>
            <InlineFlexDiv>
              <FastCurrencyInput
                formikProps={formikProps}
                label="Expected payment ($)"
                field="amountPreTax"
                innerClassName="small"
              />
              <FastCurrencyInput
                formikProps={formikProps}
                label="GST ($)"
                field="amountGst"
                innerClassName="small"
              />
            </InlineFlexDiv>
          </Styled.ActualPaymentBox>
        </Col>
      </Row>
    </Styled.StyledFormBody>
  );
};

export default PaymentFormContent;
