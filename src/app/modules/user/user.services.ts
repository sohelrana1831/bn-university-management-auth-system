import mongoose from 'mongoose';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import { Student } from '../student/student.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  user.role = 'student';

  // Generate Student Id
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );

  let newUserAllData = null;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateStudentId(academicSemester);

    user.id = id;
    student.id = id;

    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create student');
    }

    // set student in user
    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create user');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};

// const createFaculty = async (
//   faculty: IAcademicFaculty,
//   user: IUser
// ): Promise<IUser | null> => {
//   user.role = 'faculty';

//   // Generate faculty Id
//   const academicSemester = await AcademicSemester.findById(
//     faculty.academicSemester
//   );

//   let newUserAllData = null;

//   const session = await mongoose.startSession();
//   try {
//     session.startTransaction();
//     const id = await generateStudentId(academicSemester);

//     user.id = id;
//     student.id = id;

//     const newStudent = await Student.create([student], { session });

//     if (!newStudent.length) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create student');
//     }

//     // set student in user
//     user.student = newStudent[0]._id;

//     const newUser = await User.create([user], { session });

//     if (!newUser.length) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create user');
//     }

//     newUserAllData = newUser[0];

//     await session.commitTransaction();
//     await session.endSession();
//   } catch (error) {
//     await session.abortTransaction();
//     await session.endSession();
//     throw error;
//   }

//   if (newUserAllData) {
//     newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
//       path: 'student',
//       populate: [
//         {
//           path: 'academicSemester',
//         },
//         {
//           path: 'academicDepartment',
//         },
//         {
//           path: 'academicFaculty',
//         },
//       ],
//     });
//   }

//   return newUserAllData;
// };

export const UserServices = {
  createStudent,
  // createFaculty,
};
