import { ApiGen_CodeTypes_FormTypes } from '@/models/api/generated/ApiGen_CodeTypes_FormTypes';

export interface FormDocumentEntry {
  formType: ApiGen_CodeTypes_FormTypes;
  text: string;
}
export const generateDocumentEntries: FormDocumentEntry[] = [
  { formType: ApiGen_CodeTypes_FormTypes.LETTER, text: 'Generate Letter' },
  { formType: ApiGen_CodeTypes_FormTypes.H0443, text: 'Conditions of Entry (H0443)' },
];
