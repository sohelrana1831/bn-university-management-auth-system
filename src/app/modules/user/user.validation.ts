import { z } from 'zod';
import { bloodGroup, studentGender } from './../student/student.constants';
const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is require!',
        }),
        middleName: z
          .string({
            required_error: 'Middle name is require!',
          })
          .optional(),
        lastName: z.string({
          required_error: 'last name is require!',
        }),
      }),
      gender: z.enum([...studentGender] as [string, ...string[]], {
        required_error: 'Gender is require',
      }),
      dateOfBirth: z.string({ required_error: 'Date of birth is require' }),
      email: z.string({ required_error: 'Email is require' }).email(),
      contactNo: z.string({ required_error: 'contact no is require' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency Contact No is require',
      }),
      presentAddress: z.string({
        required_error: 'Present Address is require',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent Address is require',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      guardian: z.object({
        fatherName: z.string({ required_error: 'Father Name is require' }),
        fatherOccupation: z.string({
          required_error: 'Father Occupation is require',
        }),
        fatherContactNo: z.string({
          required_error: 'Father Contact No is require',
        }),
        motherName: z.string({
          required_error: 'Mother Name is require',
        }),
        motherOccupation: z.string({
          required_error: 'Mother Occupation is require',
        }),
        motherContactNo: z.string({
          required_error: 'Mother Contact No is require',
        }),
        address: z.string({
          required_error: 'Address is require',
        }),
      }),
      localGuardian: z.object({
        name: z.string({ required_error: 'Name is require' }),
        occupation: z.string({ required_error: 'Occupation is require' }),
        contactNo: z.string({ required_error: 'Contact No is require' }),
        address: z.string({ required_error: 'Address is require' }),
      }),
      profileImage: z.string().optional(),
      academicFaculty: z.string().optional(),
      // academicDepartment: z.string().optional(),
      // academicSemester: z.string().optional(),
    }),
  }),
});

// await createUserZodSchema.parseAsync(req)

export const UserValidation = {
  createUserZodSchema,
};
