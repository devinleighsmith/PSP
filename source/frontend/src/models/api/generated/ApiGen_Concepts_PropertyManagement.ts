/**
 * File autogenerated by TsGenerator.
 * Do not manually modify, changes made to this file will be lost when this file is regenerated.
 */
import { ApiGen_Base_BaseAudit } from './ApiGen_Base_BaseAudit';
import { ApiGen_Concepts_PropertyManagementPurpose } from './ApiGen_Concepts_PropertyManagementPurpose';

// LINK: @backend/apimodels/Models/Concepts/Property/PropertyManagementModel.cs
export interface ApiGen_Concepts_PropertyManagement extends ApiGen_Base_BaseAudit {
  id: number;
  managementPurposes: ApiGen_Concepts_PropertyManagementPurpose[] | null;
  additionalDetails: string | null;
  isUtilitiesPayable: boolean | null;
  isTaxesPayable: boolean | null;
  relatedLeases: number;
  leaseExpiryDate: string | null;
}