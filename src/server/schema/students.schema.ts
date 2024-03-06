import { boolean, string, object, coerce, TypeOf } from 'zod';

export const studentFormSchema = object({
  id: string().optional(),
  first_name: string({ required_error: 'Please add a first name.' }),
  last_name: string({ required_error: 'Please add a last name.' }),
  email: string({ required_error: 'Please add an email.' }).email(),
  identification_number: string({
    required_error: 'Please add a valid identification number',
  })
    .length(11)
    .refine((data) => /^\d+$/.test(data), {
      message: 'Must contain only numbers',
    }),
  mobile_number: string({
    required_error: 'Please add a valid phone number',
  })
    .length(10)
    .refine((data) => /^\d+$/.test(data), {
      message: 'Must contain only numbers',
    }),
  alias: string().optional(),
  date_of_birthday: coerce.date({
    required_error: 'Please add a date of birth.',
  }),
  date_of_join: coerce.date({ required_error: 'Please add a date of join.' }),
  has_medical_condition: boolean(),
  is_active: boolean(),
});

export type StudentFormValues = TypeOf<typeof studentFormSchema>;
