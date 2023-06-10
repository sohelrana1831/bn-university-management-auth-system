import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';
const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidation.academicSemesterZodScheme),
  AcademicSemesterController.createSemester
);

router.get('/', AcademicSemesterController.getAllSemester);
router.get('/:id', AcademicSemesterController.getSingleSemester);
router.delete('/:id', AcademicSemesterController.deleteSemester);
router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodScheme),
  AcademicSemesterController.updateSemester
);

export const AcademicSemesterRoute = router;
