import { z } from 'zod';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constants';

const academicSemesterZodScheme = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
      required_error: 'Title is require',
    }),

    year: z.string({ required_error: 'Year is require' }),

    code: z.enum([...academicSemesterCodes] as [string, ...string[]], {
      required_error: 'Code is require',
    }),

    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'Start month is require',
    }),

    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'End Month is require',
    }),
  }),
});

const updateAcademicSemesterZodScheme = z
  .object({
    body: z.object({
      title: z
        .enum([...academicSemesterTitles] as [string, ...string[]], {
          required_error: 'Title is require',
        })
        .optional(),

      year: z.string({ required_error: 'Year is require' }).optional(),

      code: z
        .enum([...academicSemesterCodes] as [string, ...string[]], {
          required_error: 'Code is require',
        })
        .optional(),

      startMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]], {
          required_error: 'Start month is require',
        })
        .optional(),

      endMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]], {
          required_error: 'End Month is require',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both title and code should be provide or neither',
    }
  );

export const AcademicSemesterValidation = {
  academicSemesterZodScheme,
  updateAcademicSemesterZodScheme,
};
