import { FormSection } from 'components/common/form/styles';
import LoadingBackdrop from 'components/maps/leaflet/LoadingBackdrop/LoadingBackdrop';
import { IBcAssessmentSummary } from 'hooks/useBcAssessmentLayer';
import moment from 'moment';
import * as React from 'react';
import styled from 'styled-components';

import { Section } from '../Section';
import { SectionField } from '../SectionField';
import { InlineMessage, StyledInlineMessageSection } from '../SectionStyles';

export interface IBcAssessmentTabViewProps {
  summaryData?: IBcAssessmentSummary;
  requestedOn?: Date;
  loading: boolean;
  pid?: string;
}

export const BcAssessmentTabView: React.FunctionComponent<IBcAssessmentTabViewProps> = ({
  summaryData,
  requestedOn,
  loading,
  pid,
}) => {
  const address = summaryData?.ADDRESSES.find(a => a.PRIMARY_IND === 'true');
  console.log(summaryData);

  return (
    <>
      <LoadingBackdrop show={loading} parentScreen={true} />

      {!pid ? (
        <FormSection>
          <b>
            This property does not have a valid PID.
            <br />
            <br /> Only properties that are associated to a valid PID can display corresponding data
            from LTSA.
          </b>
        </FormSection>
      ) : !loading && !summaryData ? (
        <FormSection>
          <b>
            Failed to load data from BC Assessment.
            <br />
            <br /> Refresh this page to try again, or select a different property.
          </b>
        </FormSection>
      ) : (
        <StyledForm>
          {requestedOn && (
            <StyledInlineMessageSection>
              <InlineMessage>
                This data was retrieved from BC Assessment on{' '}
                {moment(requestedOn).format('DD-MMM-YYYY h:mm A')}
              </InlineMessage>
            </StyledInlineMessageSection>
          )}
          <Section header="Assessment Overview">
            <SectionField label="PID">{pid}</SectionField>
            <SectionField label="Jurisdiction">
              {summaryData?.FOLIO_DESCRIPTION.JURISDICTION}
            </SectionField>
            <SectionField label="Neighbourhood">
              {summaryData?.FOLIO_DESCRIPTION.NEIGHBOURHOOD}
            </SectionField>
            <SectionField label="Ownership year">n/a</SectionField>
            <SectionField label="Roll number">
              {summaryData?.FOLIO_DESCRIPTION.ROLL_NUMBER}
            </SectionField>
            <SectionField label="Roll year">n/a</SectionField>
            <SectionField label="Document number">n/a</SectionField>
          </Section>
          <Section header="Property Address">
            <SectionField label="Address">
              {[
                address?.UNIT_NUMBER,
                address?.STREET_NUMBER,
                address?.STREET_DIRECTION_PREFIX,
                address?.STREET_NAME,
                address?.STREET_TYPE,
                address?.STREET_DIRECTION_SUFFIX,
              ]
                .filter(a => !!a)
                .join(' ')}
            </SectionField>
            <SectionField label="City">{address?.CITY}</SectionField>
            <SectionField label="Province">{address?.PROVINCE}</SectionField>
            <SectionField label="Postal code">{address?.POSTAL_CODE}</SectionField>
          </Section>
          <Section header="Assessed Value">
            {summaryData?.VALUES?.map(v => (
              <React.Fragment key={`assessed-value-${v.BCA_FGPV_SYSID}`}>
                <SectionField label="Year">n/a</SectionField>
                <SectionField label="Property class">{v.GEN_PROPERTY_CLASS_DESC}</SectionField>
                <SectionField label="Land">{v.GEN_GROSS_LAND_VALUE}</SectionField>
                <SectionField label="Improvement">{v.GEN_GROSS_IMPROVEMENT_VALUE}</SectionField>
                <SectionField label="Total assessed value">
                  {(v.GEN_NET_IMPROVEMENT_VALUE ?? 0) + (v.GEN_NET_LAND_VALUE ?? 0)}
                </SectionField>
              </React.Fragment>
            ))}
          </Section>
          <Section header="Assessment Details">
            <SectionField label="Manual class">
              {summaryData?.FOLIO_DESCRIPTION.MANUAL_CLASS_DESCRIPTION}
            </SectionField>
            <SectionField label="Actual use">
              {summaryData?.FOLIO_DESCRIPTION.ACTUAL_USE_DESCRIPTION}
            </SectionField>
            <SectionField label="ALR">
              {summaryData?.FOLIO_DESCRIPTION.ALR_DESCRIPTION}
            </SectionField>
            <SectionField label="Land dimension">
              {(summaryData?.FOLIO_DESCRIPTION.LAND_SIZE ?? '') +
                ' ' +
                (summaryData?.FOLIO_DESCRIPTION.LAND_UNITS ?? '')}
            </SectionField>
            <SectionField label="Land dimension type">
              {summaryData?.FOLIO_DESCRIPTION.LAND_DIMENSION_TYPE}
            </SectionField>
          </Section>
          <Section header="Sales">
            {summaryData?.SALES?.map(s => (
              <React.Fragment key={`assessed-sales-${s.BCA_FS_SYSID}`}>
                <SectionField label="Number">{s.SALES_ID}</SectionField>
                <SectionField label="Description">
                  {[s?.CONVEYANCE_DATE, s.CONVEYANCE_PRICE, s.CONVEYANCE_TYPE_DESCRIPTION]
                    .filter(a => !!a)
                    .join(' ')}
                </SectionField>
              </React.Fragment>
            ))}
          </Section>
        </StyledForm>
      )}
    </>
  );
};

export const StyledForm = styled.div`
  position: relative;
  &&& {
    input,
    select,
    textarea {
      background: none;
      border: none;
      resize: none;
      height: fit-content;
      padding: 0;
    }
    .form-label {
      font-weight: bold;
    }
  }
`;

export default BcAssessmentTabView;
