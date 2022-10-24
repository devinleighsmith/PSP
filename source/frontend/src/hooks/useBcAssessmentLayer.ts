import { AxiosResponse } from 'axios';
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

import { pidParser } from './../utils/propertyUtils';
import { IWfsGetAllFeaturesOptions, useWfsLayer } from './pims-api';
import { IResponseWrapper } from './pims-api/useApiRequestWrapper';

/**
 * API wrapper to centralize all AJAX requests to WFS endpoints on the BC assessment layer.
 * @returns Object containing functions to make requests to the WFS layer.
 * Note: according to https://catalogue.data.gov.bc.ca/dataset/parcelmap-bc-parcel-fabric/resource/959af382-fb31-4f57-b8ea-e6dcb6ce2e0b
 */
export const useBcAssessmentLayer = (
  url: string,
  names: { [key: string]: string },
): {
  getSummary: (pid: string) => Promise<IBcAssessmentSummary>;
  loadingIndicator: boolean;
  bcAssessmentSummary?: IBcAssessmentSummary;
  getLegalDescriptionsWrapper: IResponseWrapper<
    (
      filter?: Record<string, string>,
      options?: IWfsGetAllFeaturesOptions | undefined,
    ) => Promise<AxiosResponse<FeatureCollection<Geometry, GeoJsonProperties>, any>>
  >;
} => {
  const getLegalDescriptionsWrapper = useWfsLayer(url, {
    name: names['LEGAL_DESCRIPTION'],
    withCredentials: true,
    errorFunction: bcAssessmentError,
  });
  const getAddressesWrapper = useWfsLayer(url, {
    name: names['ADDRESS'],
    withCredentials: true,
    errorFunction: bcAssessmentError,
  });
  const getValuesWrapper = useWfsLayer(url, {
    name: names['VALUE'],
    withCredentials: true,
    errorFunction: bcAssessmentError,
  });
  const getChargesWrapper = useWfsLayer(url, {
    name: names['CHARGE'],
    withCredentials: true,
    errorFunction: bcAssessmentError,
  });
  const getFolioDescriptionsWrapper = useWfsLayer(url, {
    name: names['FOLIO_DESCRIPTION'],
    withCredentials: true,
    errorFunction: bcAssessmentError,
  });
  const getSalesWrapper = useWfsLayer(url, {
    name: names['SALE'],
    withCredentials: true,
    errorFunction: bcAssessmentError,
  });
  const getSales = getSalesWrapper.execute;
  const getFolioDescriptions = getFolioDescriptionsWrapper.execute;
  const getCharges = getChargesWrapper.execute;
  const getValues = getValuesWrapper.execute;
  const getAddresses = getAddressesWrapper.execute;
  const getLegalDescriptions = getLegalDescriptionsWrapper.execute;

  const getSummary = useCallback(
    async (pid: string) => {
      const parsedPid = pidParser(pid);
      if (parsedPid === undefined) {
        throw Error(`Unable to parse PID, invalid format: ${pid}`);
      }
      const legalDescriptionResponse = await getLegalDescriptions(
        { PID_NUMBER: parsedPid.toString() },
        { timeout: 40000 },
      );
      if (!legalDescriptionResponse?.features?.length) {
        throw Error(
          'Invalid BC Assessment response. Unable to load BC Assessment data for property.',
        );
      }
      let folioId = legalDescriptionResponse?.features[0]?.properties?.FOLIO_ID;
      let rollNumber = legalDescriptionResponse?.features[0]?.properties?.ROLL_NUMBER;

      if (!folioId || !rollNumber) {
        throw Error(
          'Invalid BC Assessment response. Unable to load BC Assessment data for property.',
        );
      }

      const addressPromise = getAddresses(
        { FOLIO_ID: folioId, ROLL_NUMBER: rollNumber },
        { timeout: 40000 },
      );

      const valuesPromise = getValues(
        { FOLIO_ID: folioId, ROLL_NUMBER: rollNumber },
        { timeout: 40000 },
      );

      const chargesPromise = getCharges(
        { FOLIO_ID: folioId, ROLL_NUMBER: rollNumber },
        { timeout: 40000 },
      );

      const folioDescriptionsPromise = getFolioDescriptions(
        { FOLIO_ID: folioId, ROLL_NUMBER: rollNumber },
        { timeout: 40000 },
      );

      const salesPromise = getSales(
        { FOLIO_ID: folioId, ROLL_NUMBER: rollNumber },
        { timeout: 40000 },
      );

      const responses = await Promise.all([
        addressPromise,
        valuesPromise,
        chargesPromise,
        folioDescriptionsPromise,
        salesPromise,
      ]);
      const summary: IBcAssessmentSummary = {
        LEGAL_DESCRIPTION: legalDescriptionResponse?.features[0].properties ?? {},
        ADDRESSES: responses[0]?.features.map(f => f.properties ?? {}) ?? [],
        VALUES: responses[1]?.features.map(f => f.properties ?? {}) ?? [],
        CHARACTERISTICS: responses[2]?.features.map(f => f.properties ?? {}) ?? [],
        FOLIO_DESCRIPTION: responses[3]?.features[0].properties ?? {},
        SALES: responses[4]?.features.map(f => f.properties ?? {}) ?? [],
      };
      return summary;
    },
    [getLegalDescriptions, getAddresses, getValues, getCharges, getFolioDescriptions, getSales],
  );

  return {
    getSummary,
    bcAssessmentSummary: getLegalDescriptionsWrapper.response?.features
      ? {
          LEGAL_DESCRIPTION: getLegalDescriptionsWrapper.response?.features[0].properties ?? {},
          FOLIO_DESCRIPTION: getFolioDescriptionsWrapper.response?.features[0].properties ?? {},
          ADDRESSES: getAddressesWrapper.response?.features.map(f => f.properties ?? {}) ?? [],
          VALUES: getValuesWrapper.response?.features.map(f => f.properties ?? {}) ?? [],
          CHARACTERISTICS: getChargesWrapper.response?.features.map(f => f.properties ?? {}) ?? [],
          SALES: getSalesWrapper.response?.features.map(f => f.properties ?? {}) ?? [],
        }
      : undefined,
    loadingIndicator:
      getLegalDescriptionsWrapper.loading ||
      getAddressesWrapper.loading ||
      getChargesWrapper.loading ||
      getFolioDescriptionsWrapper.loading ||
      getValuesWrapper.loading ||
      getSalesWrapper.loading,
    getLegalDescriptionsWrapper,
  };
};

export const LAYER_UNAVAILABLE = [
  'The BC Assessment map layers used in this application are unavailable at this time.',
  'Please notify ',
  'pims@gov.bc.ca',
  ' if this problem persists.',
];

const bcAssessmentError = () =>
  toast.error(LAYER_UNAVAILABLE.join('\n'), { toastId: 'LAYER_DATA_ERROR_ID' });

export interface IBcAssessmentSummary {
  FOLIO_DESCRIPTION: Partial<{
    BCA_FD_SYSID: number;
    ROLL_NUMBER: string;
    FOLIO_ID: string;
    FOLIO_STATUS: string;
    FOLIO_STATUS_DESCRIPTION: string;
    ACTUAL_USE_CODE: string;
    ACTUAL_USE_DESCRIPTION: string;
    ALR_CODE: string;
    ALR_DESCRIPTION: string;
    BC_TRANSIT_IND: string;
    LAND_DEPTH: number;
    LAND_SIZE: number;
    LAND_DIMENSION_TYPE: string;
    LAND_UNITS: string;
    LAND_WIDTH: number;
    NEIGHBOURHOOD_CODE: string;
    NEIGHBOURHOOD: string;
    MANUAL_CLASS_CODE: string;
    MANUAL_CLASS_DESCRIPTION: string;
    REGIONAL_DISTRICT_CODE: string;
    REGIONAL_DISTRICT: string;
    HOSPITAL_DISTRICT_CODE: string;
    HOSPITAL_DISTRICT: string;
    SCHOOL_DISTRICT_CODE: string;
    SCHOOL_DISTRICT: string;
    TENURE_CODE: string;
    TENURE_DESCRIPTION: string;
    JURISDICTION_CODE: string;
    JURISDICTION: string;
    WHEN_CREATED: Date;
    WHEN_UPDATED: Date;
    EXPIRY_DATE: Date;
  }>;
  LEGAL_DESCRIPTION: Partial<{
    BCA_FLD_SYSID: number;
    ROLL_NUMBER: string;
    FOLIO_ID: string;
    FOLIO_STATUS: string;
    FOLIO_STATUS_DESCRIPTION: string;
    LEGAL_DESCRIPTIONS_COUNT: number;
    LEGAL_DESCRIPTION_ID: string;
    BLOCK: string;
    SUB_BLOCK: string;
    DISTRICT_LOT: string;
    EXCEPT_PLAN: string;
    FORMATTED_LEGAL_DESCRIPTION: string;
    LAND_BRANCH_FILE_NUMBER: string;
    LAND_DISTRICT: string;
    LAND_DISTRICT_DESCRIPTION: string;
    LEGAL_TEXT: string;
    LOT: string;
    PID_NUMBER: number;
    PID: string;
    PART_1: string;
    PART_2: string;
    PART_3: string;
    PART_4: string;
    PORTION: string;
    SUB_LOT: string;
    TOWNSHIP: string;
    PLAN: string;
    RANGE: string;
    SECTION: string;
    STRATA_LOT: string;
    LEGAL_SUBDIVISION: string;
    PARCEL: string;
    LEASE_LICENCE_NUMBER: string;
    MERIDIAN: string;
    MERIDIAN_SHORT: string;
    BCA_GROUP: string;
    FIRST_NATION_RESERVE_NUMBER: string;
    FIRST_NATION_RESERVE_DESC: string;
    AIR_SPACE_PARCEL_NUMBER: string;
    JURISDICTION_CODE: string;
    JURISDICTION: string;
    WHEN_CREATED: Date;
    WHEN_UPDATED: Date;
    EXPIRY_DATE: Date;
  }>;
  ADDRESSES: Partial<{
    SE_ANNO_CAD_DATA: string;
    BCA_FA_SYSID: number;
    ROLL_NUMBER: string;
    FOLIO_ID: string;
    FOLIO_STATUS: string;
    FOLIO_STATUS_DESCRIPTION: string;
    ADDRESS_COUNT: number;
    ADDRESS_ID: string;
    UNIT_NUMBER: string;
    STREET_NUMBER: string;
    STREET_DIRECTION_PREFIX: string;
    STREET_NAME: string;
    STREET_TYPE: string;
    STREET_DIRECTION_SUFFIX: string;
    CITY: string;
    POSTAL_CODE: string;
    PROVINCE: string;
    PRIMARY_IND: string;
    MAP_REFERENCE_NUMBER: string;
    JURISDICTION_CODE: string;
    JURISDICTION: string;
    WHEN_CREATED: Date;
    WHEN_UPDATED: Date;
    EXPIRY_DATE: Date;
    FEATURE_AREA_SQM: number;
    FEATURE_LENGTH_M: number;
    SHAPE: any;
    OBJECTID: number;
  }>[];
  SALES: Partial<{
    BCA_FS_SYSID: number;
    ROLL_NUMBER: string;
    FOLIO_ID: string;
    FOLIO_STATUS: string;
    FOLIO_STATUS_DESCRIPTION: string;
    SALES_COUNT: number;
    SALES_ID: string;
    DOCUMENT_NUMBER: string;
    CONVEYANCE_DATE: Date;
    CONVEYANCE_PRICE: number;
    CONVEYANCE_TYPE: string;
    CONVEYANCE_TYPE_DESCRIPTION: string;
    JURISDICTION_CODE: string;
    JURISDICTION: string;
    WHEN_CREATED: Date;
    WHEN_UPDATED: Date;
    EXPIRY_DATE: Date;
    FEATURE_AREA_SQM: number;
    FEATURE_LENGTH_M: number;
    SHAPE: any;
    OBJECTID: number;
    SE_ANNO_CAD_DATA: string;
  }>[];
  VALUES: Partial<{
    BCA_FGPV_SYSID: number;
    ROLL_NUMBER: string;
    FOLIO_ID: string;
    FOLIO_STATUS: string;
    FOLIO_STATUS_DESCRIPTION: string;
    GEN_VALUES_COUNT: number;
    GEN_GROSS_IMPROVEMENT_VALUE: number;
    GEN_GROSS_LAND_VALUE: number;
    GEN_NET_IMPROVEMENT_VALUE: number;
    GEN_NET_LAND_VALUE: number;
    GEN_TXXMT_IMPROVEMENT_VALUE: number;
    GEN_TXXMT_LAND_VALUE: number;
    GEN_PROPERTY_CLASS_CODE: string;
    GEN_PROPERTY_CLASS_DESC: string;
    GEN_PROPERTY_SUBCLASS_CODE: string;
    GEN_PROPERTY_SUBCLASS_DESC: string;
    JURISDICTION_CODE: string;
    JURISDICTION: string;
    WHEN_CREATED: Date;
    WHEN_UPDATED: Date;
    EXPIRY_DATE: Date;
  }>[];
  CHARACTERISTICS: Partial<{
    SE_ANNO_CAD_DATA: string;
    BCA_FLC_SYSID: number;
    ROLL_NUMBER: string;
    FOLIO_ID: string;
    FOLIO_STATUS: string;
    FOLIO_STATUS_DESCRIPTION: string;
    LAND_CHARACTERISTICS_COUNT: number;
    LAND_CHARACTERISTIC_CODE: string;
    LAND_CHARACTERISTIC_DESC: string;
    JURISDICTION_CODE: string;
    JURISDICTION: string;
    WHEN_CREATED: Date;
    WHEN_UPDATED: Date;
    EXPIRY_DATE: Date;
    FEATURE_AREA_SQM: number;
    FEATURE_LENGTH_M: number;
    SHAPE: any;
    OBJECTID: number;
  }>[];
}
