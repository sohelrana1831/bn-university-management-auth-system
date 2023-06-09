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

    year: z.number({ required_error: 'Year is require' }),

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

export const AcademicSemesterValidation = {
  academicSemesterZodScheme,
};
