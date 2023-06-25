import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicSemester.validation';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.academicFacultyCreateZodScheme),
  AcademicFacultyController.createFaculty
);
router.get('/', AcademicFacultyController.getAllFaculty);
router.get('/:id', AcademicFacultyController.getSingleFaculty);
router.delete('/:id', AcademicFacultyController.deleteFaculty);
router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.academicFacultyUpdateZodScheme),
  AcademicFacultyController.updateFaculty
);

export const AcademicFacultyRoute = router;
