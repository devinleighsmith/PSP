/**
 * File autogenerated by TsGenerator.
 * Do not manually modify, changes made to this file will be lost when this file is regenerated.
 */
import { ApiGen_Base_BaseAudit } from './ApiGen_Base_BaseAudit';
import { ApiGen_Concepts_Role } from './ApiGen_Concepts_Role';
import { ApiGen_Concepts_User } from './ApiGen_Concepts_User';

// LINK: @backend/apimodels/Models/Concepts/User/UserRoleModel.cs
export interface ApiGen_Concepts_UserRole extends ApiGen_Base_BaseAudit {
  id: number;
  userId: number;
  roleId: number;
  user: ApiGen_Concepts_User | null;
  role: ApiGen_Concepts_Role | null;
}