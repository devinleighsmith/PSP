import { Input, Select } from 'components/common/form';
import { Label } from 'components/common/Label';
import TooltipWrapper from 'components/common/TooltipWrapper';
import {
  MOTI_CLASSIFICATION_CODE_SET_NAME,
  MOTI_REGION_CODE_SET_NAME,
  PURPOSE_CODE_SET_NAME,
  RURAL_AREA_CODE_SET_NAME,
} from 'constants/API';
import { Formik } from 'formik';
import useLookupCodeHelpers from 'hooks/useLookupCodeHelpers';
import * as React from 'react';
import { useMemo } from 'react';
import { Col, Form, FormGroup } from 'react-bootstrap';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { postalCodeFormatter } from 'utils';

import {
  defaultPropertyValues,
  DraftSynchronizer,
  FormHeader,
  FormSection,
  InlineFormFields,
  propertyFormSchema,
  StackedFormFields,
} from '..';
import {
  lookupPostalCodeLink,
  lookupPostalCodeTooltip,
  ocpDesignation,
  zoningTooltip,
} from '../strings';

interface IPropertyFormProps {
  formikRef: any;
}

const TextField = styled.p`
  max-width: 200px;
  min-width: 200px;
  text-align: left;
  padding: 6px 12px;
  margin-bottom: 0;
`;

const SmallInput = styled(Input)`
  max-width: 200px;
  min-width: 200px;
`;

/**
 * Property Form, displays fields from LTSA, Parcel Map, and Geocoder.
 * @param param0 formikRef used by the parent to interact with this form.
 */
export const PropertyForm: React.FunctionComponent<IPropertyFormProps> = ({ formikRef }) => {
  const { getOptionsByType } = useLookupCodeHelpers();
  const purposes = useMemo(() => getOptionsByType(PURPOSE_CODE_SET_NAME), [getOptionsByType]);
  const motiClassifications = useMemo(() => getOptionsByType(MOTI_CLASSIFICATION_CODE_SET_NAME), [
    getOptionsByType,
  ]);
  const motiRegions = useMemo(() => getOptionsByType(MOTI_REGION_CODE_SET_NAME), [
    getOptionsByType,
  ]);
  const ruralAreas = useMemo(() => getOptionsByType(RURAL_AREA_CODE_SET_NAME), [getOptionsByType]);
  return (
    <>
      <FormHeader>Property Information</FormHeader>
      <Formik
        innerRef={formikRef}
        onSubmit={() => {
          toast.dark('Save Property Placeholder message');
        }}
        initialValues={defaultPropertyValues}
        validationSchema={propertyFormSchema}
      >
        {({ values }) => (
          <Form>
            <DraftSynchronizer />
            <FormSection>
              <InlineFormFields md={6}>
                <SmallInput label="PID:" field="pid" disabled />
                <SmallInput label="Title Number:" field="titleNumber" disabled />
                <FormGroup>
                  <Label>Legal Description:</Label>
                  <TextField>{values.legalDescription}</TextField>
                </FormGroup>
              </InlineFormFields>
              <InlineFormFields md={6}>
                <SmallInput label="Civic:" field="address.line1" disabled />
                <SmallInput label="City:" field="address.administrativeArea" disabled />
                <SmallInput label="Province:" field="address.provinceId" disabled />
                <Form.Group className="postal">
                  <Label>
                    Postal Code&nbsp;
                    <TooltipWrapper
                      toolTipId="postal-lookup-link"
                      toolTip={lookupPostalCodeTooltip}
                    >
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={{
                          pathname: lookupPostalCodeLink,
                        }}
                      >
                        <FaExternalLinkAlt size={12} />
                      </Link>
                    </TooltipWrapper>
                  </Label>

                  <SmallInput
                    className="input-small"
                    style={{ width: '120px' }}
                    onBlurFormatter={(postal: string) =>
                      postal.replace(postal, postalCodeFormatter(postal))
                    }
                    field="address.postal"
                    displayErrorTooltips
                    outerClassName="d-block"
                  />
                </Form.Group>
              </InlineFormFields>
            </FormSection>
            <FormSection>
              <Col md={6}>
                <Select
                  label="MOTI Region"
                  field="motiRegion"
                  placeholder="Select Region"
                  options={motiRegions}
                />
              </Col>
              <Col md={6}>
                <Select
                  label="MOTI Classification"
                  field="motiClassification"
                  placeholder="Select Classification"
                  options={motiClassifications}
                />
                <Select
                  label="Select Purpose"
                  field="purpose"
                  placeholder="Select Purpose"
                  options={purposes}
                />
              </Col>
            </FormSection>
            <FormSection>
              <Col md={12}>
                <Input label="Regional District:" field="regionalDistrict" disabled />
                <Select
                  label="Rural Area"
                  field="ruralArea"
                  placeholder="Select Rural Area"
                  options={ruralAreas}
                  outerClassName="d-flex flex-column w-50"
                />
                <Input label="Provincial Electoral District:" field="electoralDistrict" disabled />
              </Col>
            </FormSection>
            <FormSection>
              <StackedFormFields md={12}>
                <Input
                  outerClassName="d-flex flex-row"
                  label="Municipality:"
                  field="municipality"
                  disabled
                />
                <Input label="Municipal Zoning:" field="zoning" tooltip={zoningTooltip} />
                <Input label="OCP Designation:" field="ocpDesignation" tooltip={ocpDesignation} />
              </StackedFormFields>
            </FormSection>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default PropertyForm;
