import * as Yup from 'yup';

export const AddImprovementsYupSchema = Yup.object().shape({
  improvements: Yup.array().of(
    Yup.object().shape({
      address: Yup.string().max(2000, 'Address must be 2000 characters or less.'),
      structureSize: Yup.string().max(2000, 'Structure size must be 2000 characters or less.'),
      description: Yup.string().max(2000, 'Description must be 2000 characters or less.'),
    }),
  ),
});
