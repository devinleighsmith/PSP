import { Feature, Geometry } from 'geojson';
import { chain } from 'lodash';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from '@/components/common/buttons';
import { MapFeatureData } from '@/components/common/mapFSM/models';
import { Section } from '@/components/common/Section/Section';
import { PropertyFilter } from '@/features/properties/filter';
import {
  defaultPropertyFilter,
  IPropertyFilter,
} from '@/features/properties/filter/IPropertyFilter';
import { ParcelDataset } from '@/features/properties/parcelList/models';
import { ParcelListContainer } from '@/features/properties/parcelList/ParcelListContainer';
import { ParcelListView } from '@/features/properties/parcelList/ParcelListView';
import { PMBC_FullyAttributed_Feature_Properties } from '@/models/layers/parcelMapBC';
import { PIMS_Property_Location_View } from '@/models/layers/pimsPropertyLocationView';
import { exists } from '@/utils';
import { isStrataCommonProperty } from '@/utils/propertyUtils';

export interface ISearchViewProps {
  onFilterChange: (filter: IPropertyFilter) => void;
  propertyFilter: IPropertyFilter;
  searchResult: MapFeatureData;
}

interface PropertyProjection<T> {
  isStrataLot: boolean;
  pid: string | null;
  pin: string | null;
  plan: string | null;
  feature: Feature<Geometry, T> | null;
}

export const SearchView: React.FC<ISearchViewProps> = props => {
  const history = useHistory();

  const groupedFeatures = chain(props.searchResult?.fullyAttributedFeatures.features)
    .groupBy(feature => feature?.properties?.PLAN_NUMBER)
    .map(
      planGroup =>
        planGroup
          ?.map<PropertyProjection<PMBC_FullyAttributed_Feature_Properties>>(x => ({
            pid: x.properties.PID_FORMATTED,
            pin: exists(x.properties.PIN) ? String(x.properties.PIN) : null,
            isStrataLot: isStrataCommonProperty(x),
            feature: x,
            plan: x.properties.PLAN_NUMBER,
          }))
          .sort((a, b) => {
            if (a.isStrataLot === b.isStrataLot) return 0;
            if (a.isStrataLot) return -1;
            if (b.isStrataLot) return 1;
            return 0;
          }) ?? [],
    );

  const propertyProjections =
    groupedFeatures
      .value()
      .flatMap(x => x)
      .map(x => ParcelDataset.fromFullyAttributedFeature(x.feature)) ?? [];

  const pimsGroupedFeatures = chain(props.searchResult?.pimsLocationFeatures.features)
    .groupBy(feature => feature?.properties?.SURVEY_PLAN_NUMBER)
    .map(
      planGroup =>
        planGroup
          ?.map<PropertyProjection<PIMS_Property_Location_View>>(x => ({
            pid: x.properties.PID_PADDED,
            pin: exists(x.properties.PIN) ? String(x.properties.PIN) : null,
            isStrataLot: false,
            feature: x,
            plan: x.properties.SURVEY_PLAN_NUMBER,
          }))
          .sort((a, b) => {
            if (a.isStrataLot === b.isStrataLot) return 0;
            if (a.isStrataLot) return -1;
            if (b.isStrataLot) return 1;
            return 0;
          }) ?? [],
    );

  const pimsPropertyProjections =
    pimsGroupedFeatures
      .value()
      .flatMap(x => x)
      .map(x => ParcelDataset.fromPimsFeature(x.feature)) ?? [];

  const onOpenPropertyList = () => {
    history.push('/properties/list');
  };

  return (
    <>
      <StyledWrapper>
        <Section>
          <Button onClick={onOpenPropertyList}>Search PIMS information</Button>
        </Section>
        <Section>
          <PropertyFilter
            defaultFilter={{ ...defaultPropertyFilter }}
            propertyFilter={props.propertyFilter}
            onChange={props.onFilterChange}
            useGeocoder
          />
        </Section>
        <Section header="Results (PMBC)" isCollapsable initiallyExpanded>
          <ParcelListContainer View={ParcelListView} parcels={propertyProjections} />
        </Section>
        <Section header="Results (PIMS)" isCollapsable initiallyExpanded>
          <ParcelListContainer View={ParcelListView} parcels={pimsPropertyProjections} />
        </Section>
      </StyledWrapper>
    </>
  );
};

const StyledWrapper = styled.div`
  height: 60%;
`;
