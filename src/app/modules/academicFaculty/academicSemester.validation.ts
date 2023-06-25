import { z } from 'zod';

const academicFacultyCreateZodScheme = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is require' }),
  }),
});
const academicFacultyUpdateZodScheme = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});

export const AcademicFacultyValidation = {
  academicFacultyCreateZodScheme,
  academicFacultyUpdateZodScheme,
};
