import { z } from 'zod';
import { bloodGroup, studentGender } from './../student/student.constants';

const createStudentZodSchema = z.object({
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

const createFacultyZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),

    faculty: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
        middleName: z.string().optional(),
      }),
      gender: z.string({
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'Contact number is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),
      bloodGroup: z
        .string({
          required_error: 'Blood group is required',
        })
        .optional(),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic department is required',
      }),

      academicFaculty: z.string({
        required_error: 'Academic faculty is required',
      }),
      designation: z.string({
        required_error: 'Designation is required',
      }),
      profileImage: z.string().optional(),
    }),
  }),
});

const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),

    admin: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
        middleName: z.string().optional(),
      }),

      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),

      gender: z.string({
        required_error: 'Gender is required',
      }),

      bloodGroup: z.string({
        required_error: 'Blood group is required',
      }),

      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),

      contactNo: z.string({
        required_error: 'Contact number is required',
      }),

      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),

      presentAddress: z.string({
        required_error: 'Present address is required',
      }),

      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),

      managementDepartment: z.string({
        required_error: 'Management department is required',
      }),

      designation: z.string({
        required_error: 'Designation is required',
      }),

      profileImage: z.string().optional(),
    }),
  }),
});

export const UserValidation = {
  createStudentZodSchema,
  createAdminZodSchema,
  createFacultyZodSchema,
};
