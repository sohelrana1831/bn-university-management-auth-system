import express from 'express';
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.route';
import { UserRoute } from '../modules/user/user.route';
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
];
modulesRouters.forEach(route => router.use(route.pathName, route.routeName));

export default router;
