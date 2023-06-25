import { z } from 'zod';

const academicDepartmentCreateZodScheme = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is require' }),
    academicFaculty: z.string({
      required_error: 'academic faculty is require',
    }),
  }),
});

const academicDepartmentUpdateZodScheme = z.object({
  body: z.object({
    title: z.string().optional(),
    academicFaculty: z.string().optional(),
  }),
});

export const AcademicDepartmentValidation = {
  academicDepartmentCreateZodScheme,
  academicDepartmentUpdateZodScheme,
};
