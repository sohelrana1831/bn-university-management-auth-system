import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

//Generate Student Id
export const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent?.id.substring(4) : undefined;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester | null
): Promise<string | undefined> => {
  const currentStudentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');
  //   increment by 1
  let incrementedId = (parseInt(currentStudentId) + 1)
    .toString()
    .padStart(5, '0');
  //position 0 1 2 3
  //year     2 0 2 3
  incrementedId = `${academicSemester?.year.substring(2)}${
    academicSemester?.code
  }${incrementedId}`;
  // console.log(incrementedId);
  return incrementedId;
};

//Generate Faculty Id
export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty?.id.substring(2) : undefined;
};

export const generateFacultyId = async (): Promise<string | undefined> => {
  const currentFacultyId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');

  let incrementedId = parseInt(currentFacultyId + 1)
    .toString()
    .padStart(5, '0');

  incrementedId = `F-${incrementedId}`;
  // console.log(incrementedId);
  return incrementedId;
};

//Generate Admin Id
export const findLastAdminId = async () => {
  const lastAdmin = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin?.id.substring(2) : undefined;
};

export const generateAdminId = async (): Promise<string> => {
  const currentAdminId =
    (await findLastAdminId()) || (0).toString().padStart(5, '0');

  let incrementedId = parseInt(currentAdminId + 1)
    .toString()
    .padStart(5, '0');

  incrementedId = `A-${incrementedId}`;
  // console.log(incrementedId);
  return incrementedId;
};
