import { LinkButton, RemoveButton } from 'components/common/buttons';
import { Input, Multiselect, Select, Text, TextArea } from 'components/common/form';
import { RadioGroup } from 'components/common/form/RadioGroup';
import { UnsavedChangesPrompt } from 'components/common/form/UnsavedChangesPrompt';
import { YesNoSelect } from 'components/common/form/YesNoSelect';
import { UserNameTooltip } from 'components/common/UserNameTooltip';
import AreaContainer from 'components/measurements/AreaContainer';
import VolumeContainer from 'components/measurements/VolumeContainer';
import * as API from 'constants/API';
import { PropertyAdjacentLandTypes, PropertyTenureTypes } from 'constants/index';
import { FormikProps, getIn, useFormikContext } from 'formik';
import useDeepCompareEffect from 'hooks/useDeepCompareEffect';
import { useLookupCodeHelpers } from 'hooks/useLookupCodeHelpers';
import isEmpty from 'lodash/isEmpty';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { MdClose } from 'react-icons/md';
import styled from 'styled-components';
import { prettyFormatDate } from 'utils';
import { stringToBoolean } from 'utils/formUtils';

import { Section } from '../../Section';
import { SectionField } from '../../SectionField';
import {
  PropertyAdjacentLandFormModel,
  PropertyAnomalyFormModel,
  PropertyRoadFormModel,
  PropertyTenureFormModel,
  UpdatePropertyDetailsFormModel,
} from './models';

export interface IUpdatePropertyDetailsFormProps {
  formikProps: FormikProps<UpdatePropertyDetailsFormModel>;
}

export const UpdatePropertyDetailsForm: React.FunctionComponent<
  IUpdatePropertyDetailsFormProps
> = ({ formikProps }) => {
  const { values } = useFormikContext<UpdatePropertyDetailsFormModel>();

  const [showAddressLine2, setShowAddressLine2] = useState(false);
  const [showAddressLine3, setShowAddressLine3] = useState(false);
  const address = values.address;

  useDeepCompareEffect(() => {
    if (address !== undefined) {
      setShowAddressLine2(!isEmpty(address.streetAddress2));
      setShowAddressLine3(!isEmpty(address.streetAddress3));
    }
  }, [address]);

  // Lookup codes
  const { getByType, getOptionsByType } = useLookupCodeHelpers();
  const volumetricTypeOptions = getOptionsByType(API.PROPERTY_VOLUMETRIC_TYPES);
  const propertyTypeOptions = getOptionsByType(API.PROPERTY_LAND_PARCEL_TYPES);
  const pphTypeOptions = getOptionsByType(API.PPH_STATUS_TYPES);
  const anomalyOptions = getByType(API.PROPERTY_ANOMALY_TYPES).map(x =>
    PropertyAnomalyFormModel.fromLookup(x),
  );
  const tenureOptions = getByType(API.PROPERTY_TENURE_TYPES).map(x =>
    PropertyTenureFormModel.fromLookup(x),
  );
  const roadTypeOptions = getByType(API.PROPERTY_ROAD_TYPES).map(x =>
    PropertyRoadFormModel.fromLookup(x),
  );
  const adjacentLandOptions = getByType(API.PROPERTY_ADJACENT_LAND_TYPES).map(x =>
    PropertyAdjacentLandFormModel.fromLookup(x),
  );
  const regionOptions = getOptionsByType(API.REGION_TYPES);
  const districtOptions = getOptionsByType(API.DISTRICT_TYPES);

  // multi-selects
  const tenureStatus = getIn(values, 'tenures') as PropertyTenureFormModel[];
  const adjacentLands = getIn(values, 'adjacentLands') as PropertyAdjacentLandFormModel[];
  // show/hide conditionals
  const isHighwayRoad = tenureStatus?.some(obj => obj.typeCode === PropertyTenureTypes.HighwayRoad);
  const isAdjacentLand = tenureStatus?.some(
    obj => obj.typeCode === PropertyTenureTypes.AdjacentLand,
  );
  const isIndianReserve =
    isAdjacentLand &&
    adjacentLands?.some(obj => obj.typeCode === PropertyAdjacentLandTypes.IndianReserve);
  const isVolumetricParcel = stringToBoolean(getIn(values, 'isVolumetricParcel'));
  // area measurements table inputs
  const landArea = getIn(values, 'landArea') as number | undefined;
  const areaUnit = getIn(values, 'areaUnitTypeCode') as string;
  // volume measurements table inputs
  const volumetricMeasurement = getIn(values, 'volumetricMeasurement') as number;
  const volumetricUnit = getIn(values, 'volumetricUnitTypeCode') as string;

  const setFieldValue = formikProps.setFieldValue;

  // clear related fields when volumetric parcel radio changes
  useEffect(() => {
    if (!isVolumetricParcel) {
      setFieldValue('volumetricMeasurement', 0);
      setFieldValue('volumetricUnitTypeCode', undefined);
      setFieldValue('volumetricParcelTypeCode', undefined);
    }
  }, [isVolumetricParcel, setFieldValue]);

  // clear related fields when tenure status changes
  useEffect(() => {
    if (!isHighwayRoad) {
      setFieldValue('roadTypes', []);
    }
    if (!isAdjacentLand) {
      setFieldValue('adjacentLands', []);
    }
  }, [isAdjacentLand, isHighwayRoad, setFieldValue]);

  const cannotDetermineInfoText =
    'This means the property is out of bounds or there was an error at the time of determining this value. If needed, edit property details and pick the appropriate  value to update it.';

  return (
    <StyledSummarySection>
      <UnsavedChangesPrompt />
      <Section header="Property Address">
        <StyledSubtleText>
          This is the address stored in PIMS application for this property and will be used wherever
          this property's address is needed.
        </StyledSubtleText>
        <SectionField label="Address (line 1)">
          <Row>
            <Col xs="9">
              <Input field="address.streetAddress1" />
            </Col>
          </Row>
          {!showAddressLine2 && (
            <LinkButton onClick={() => setShowAddressLine2(true)}>+ Add an address line</LinkButton>
          )}
        </SectionField>
        {showAddressLine2 && (
          <SectionField label="Address (line 2)">
            <Row>
              <Col>
                <Input field="address.streetAddress2" />
              </Col>
              <Col xs="3" className="pl-0">
                {!showAddressLine3 && (
                  <RemoveButton
                    onRemove={() => {
                      setShowAddressLine2(false);
                      setFieldValue('address.streetAddress2', '');
                    }}
                  >
                    <MdClose size="2rem" /> <span className="text">Remove</span>
                  </RemoveButton>
                )}
              </Col>
            </Row>
            {!showAddressLine3 && (
              <LinkButton onClick={() => setShowAddressLine3(true)}>
                + Add an address line
              </LinkButton>
            )}
          </SectionField>
        )}
        {showAddressLine3 && (
          <SectionField label="Address (line 3)">
            <Row>
              <Col>
                <Input field="address.streetAddress3" />
              </Col>
              <Col xs="3" className="pl-0">
                <RemoveButton
                  onRemove={() => {
                    setShowAddressLine3(false);
                    setFieldValue('address.streetAddress3', '');
                  }}
                >
                  <MdClose size="2rem" /> <span className="text">Remove</span>
                </RemoveButton>
              </Col>
            </Row>
          </SectionField>
        )}
        <SectionField label="City">
          <Input field="address.municipality" />
        </SectionField>
        <SectionField label="Postal code">
          <Input field="address.postal" />
        </SectionField>
        <SectionField label="General location">
          <Input field="generalLocation" />
        </SectionField>
      </Section>
      <Section header="Property Attributes">
        <SectionField label="MOTI region">
          <Select
            field="regionTypeCode"
            options={regionOptions}
            placeholder={values.regionTypeCode ? undefined : 'Please Select'}
          />
          {regionOptions.find(x => x.code?.toString() === values.regionTypeCode?.toString())
            ?.label === 'Cannot determine' && (
            <StyledInfoSection>{cannotDetermineInfoText}</StyledInfoSection>
          )}
        </SectionField>
        <SectionField label="Highways district">
          <Select
            field="districtTypeCode"
            options={districtOptions}
            placeholder={values.highwaysDistrict ? undefined : 'Please Select'}
          />
          {districtOptions.find(x => x.code?.toString() === values.districtTypeCode?.toString())
            ?.label === 'Cannot determine' && (
            <StyledInfoSection>{cannotDetermineInfoText}</StyledInfoSection>
          )}
        </SectionField>
        <SectionField label="Electoral district">
          <Text field="electoralDistrict.ED_NAME" />
        </SectionField>
        <SectionField label="Agricultural Land Reserve">
          <Text>{values.isALR ? 'Yes' : 'No'}</Text>
        </SectionField>
        <SectionField label="Railway belt / Dominion patent">
          <YesNoSelect field="isRwyBeltDomPatent"></YesNoSelect>
        </SectionField>
        <SectionField label="Land parcel type">
          <Select
            field="propertyTypeCode"
            options={propertyTypeOptions}
            placeholder={values.propertyTypeCode ? undefined : 'Please Select'}
          />
        </SectionField>
        <SectionField label="Municipal zoning">
          <Input field="municipalZoning" />
        </SectionField>
        <SectionField label="Anomalies">
          <Multiselect
            field="anomalies"
            displayValue="typeDescription"
            placeholder=""
            hidePlaceholder
            options={anomalyOptions}
          />
        </SectionField>
      </Section>

      <Section header="Tenure Status">
        <SectionField label="Tenure status">
          <Multiselect
            field="tenures"
            displayValue="typeDescription"
            placeholder=""
            hidePlaceholder
            options={tenureOptions}
          />
        </SectionField>
        <SectionField label="Provincial Public Hwy">
          <Select field="pphStatusTypeCode" options={pphTypeOptions} />
          {values?.pphStatusUpdateTimestamp && (
            <p className="text-right font-italic">
              PPH status last updated by{' '}
              <UserNameTooltip
                userName={values?.pphStatusUpdateUserid}
                userGuid={values?.pphStatusUpdateUserGuid}
              />{' '}
              on {prettyFormatDate(values?.pphStatusUpdateTimestamp)}
            </p>
          )}
        </SectionField>
        {isHighwayRoad && (
          <SectionField label="Highway / Road established by">
            <Multiselect
              field="roadTypes"
              displayValue="typeDescription"
              placeholder=""
              hidePlaceholder
              options={roadTypeOptions}
            />
          </SectionField>
        )}
        {isAdjacentLand && (
          <SectionField label="Adjacent Land type">
            <Multiselect
              field="adjacentLands"
              displayValue="typeDescription"
              placeholder=""
              hidePlaceholder
              options={adjacentLandOptions}
            />
          </SectionField>
        )}
      </Section>

      {isIndianReserve && (
        <Section header="First Nations Information">
          <SectionField label="Band name">
            <Text field="firstNations.BAND_NAME" />
          </SectionField>
          <SectionField label="Reserve name">
            <Text field="firstNations.ENGLISH_NAME" />
          </SectionField>
        </Section>
      )}
      <Section header="Measurements">
        <SectionField label="Area" labelWidth="2">
          <AreaContainer
            landArea={landArea}
            unitCode={areaUnit}
            isEditable={true}
            onChange={(landArea, areaUnitTypeCode) => {
              formikProps.setFieldValue('landArea', landArea);
              formikProps.setFieldValue('areaUnitTypeCode', areaUnitTypeCode);
            }}
          />
        </SectionField>
        <SectionField label="Is this a volumetric parcel?" labelWidth="auto" className="py-4">
          <RadioGroup
            flexDirection="row"
            field="isVolumetricParcel"
            radioGroupClassName="pb-3"
            radioValues={[
              {
                radioLabel: 'Yes',
                radioValue: 'true',
              },
              {
                radioLabel: 'No',
                radioValue: 'false',
              },
            ]}
          />
        </SectionField>
        {isVolumetricParcel && (
          <SectionField label="Volume" labelWidth="2">
            <Row>
              <Col>
                <VolumeContainer
                  volumetricMeasurement={volumetricMeasurement}
                  volumetricUnit={volumetricUnit}
                  volumetricType={values.volumetricParcelTypeCode}
                  isEditable={true}
                  onChange={(volume, volumeUnitTypeCode) => {
                    formikProps.setFieldValue('volumetricMeasurement', volume);
                    formikProps.setFieldValue('volumetricUnitTypeCode', volumeUnitTypeCode);
                  }}
                />
              </Col>
              <Col>
                <SectionField label="Type" labelWidth="3" contentWidth="auto">
                  <Select
                    field="volumetricParcelTypeCode"
                    options={volumetricTypeOptions}
                    placeholder={values.volumetricParcelTypeCode ? undefined : 'Please Select'}
                  />
                </SectionField>
              </Col>
            </Row>
          </SectionField>
        )}
      </Section>

      <Section header="Notes">
        <TextArea field="notes" rows={4} />
      </Section>
    </StyledSummarySection>
  );
};

const StyledSummarySection = styled.div`
  background-color: ${props => props.theme.css.filterBackgroundColor};
`;

const StyledInfoSection = styled.div`
  background-color: ${({ theme }) => theme.css.filterBoxColor};
  padding: 0.5rem;
  margin-bottom: 1.5rem;
`;

const StyledSubtleText = styled.p`
  color: ${props => props.theme.css.subtleColor};
  text-align: left;
`;