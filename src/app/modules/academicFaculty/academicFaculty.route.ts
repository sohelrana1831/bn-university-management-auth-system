import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicSemester.validation';
import validateRequest from '../../middleware/validateRequest';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middleware/auth';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.academicFacultyCreateZodScheme),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicFacultyController.createFaculty
);
router.get(
  '/',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT,
    ENUM_USER_ROLE.SUPER_ADMIN
  ),
  AcademicFacultyController.getAllFaculty
);
router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT,
    ENUM_USER_ROLE.SUPER_ADMIN
  ),
  AcademicFacultyController.getSingleFaculty
);
router.delete(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY
  ),
  AcademicFacultyController.deleteFaculty
);
router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.academicFacultyUpdateZodScheme),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY
  ),
  AcademicFacultyController.updateFaculty
);

export const AcademicFacultyRoute = router;
