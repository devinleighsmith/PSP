/**
 * File autogenerated by TsGenerator.
 * Do not manually modify, changes made to this file will be lost when this file is regenerated.
 */
import { ApiGen_CodeTypes_ExternalResponseStatus } from './ApiGen_CodeTypes_ExternalResponseStatus';
import { ApiGen_System_HttpStatusCode } from './ApiGen_System_HttpStatusCode';

// LINK: @backend/apimodels/Models/Requests/Http/ExternalResponse.cs
export interface ApiGen_Requests_ExternalResponse<T> {
  status: ApiGen_CodeTypes_ExternalResponseStatus;
  message: string | null;
  payload: T | null;
  httpStatusCode: ApiGen_System_HttpStatusCode;
}