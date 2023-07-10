import express from 'express';
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.route';
import { UserRoute } from '../modules/user/user.route';
import { AcademicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route';
import { StudentRoutes } from '../modules/student/student.route';
const router = express.Router();

const modulesRouters = [
  {
    pathName: '/users',
    routeName: UserRoute,
  },
  {
    pathName: '/academic-semester',
    routeName: AcademicSemesterRoute,
  },
  {
    pathName: '/academic-faculty',
    routeName: AcademicFacultyRoute,
  },
  {
    pathName: '/academic-department',
    routeName: AcademicDepartmentRoute,
  },
  {
    pathName: '/students',
    routeName: StudentRoutes,
  },
];
modulesRouters.forEach(route => router.use(route.pathName, route.routeName));

export default router;
