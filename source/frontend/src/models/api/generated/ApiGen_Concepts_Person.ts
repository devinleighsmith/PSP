/**
 * File autogenerated by TsGenerator.
 * Do not manually modify, changes made to this file will be lost when this file is regenerated.
 */
import { ApiGen_Base_BaseConcurrent } from './ApiGen_Base_BaseConcurrent';
import { ApiGen_Concepts_ContactMethod } from './ApiGen_Concepts_ContactMethod';
import { ApiGen_Concepts_PersonAddress } from './ApiGen_Concepts_PersonAddress';
import { ApiGen_Concepts_PersonOrganization } from './ApiGen_Concepts_PersonOrganization';

// LINK: @backend/apimodels/Models/Concepts/Person/PersonModel.cs
export interface ApiGen_Concepts_Person extends ApiGen_Base_BaseConcurrent {
  id: number;
  isDisabled: boolean;
  surname: string | null;
  firstName: string | null;
  middleNames: string | null;
  preferredName: string | null;
  personOrganizations: ApiGen_Concepts_PersonOrganization[] | null;
  personAddresses: ApiGen_Concepts_PersonAddress[] | null;
  contactMethods: ApiGen_Concepts_ContactMethod[] | null;
  comment: string | null;
}