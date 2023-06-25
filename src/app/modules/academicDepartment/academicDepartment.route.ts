import express from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(
    AcademicDepartmentValidation.academicDepartmentCreateZodScheme
  ),
  AcademicDepartmentController.createDepartment
);
router.get('/', AcademicDepartmentController.getAllDepartment);
router.get('/:id', AcademicDepartmentController.getSingleDepartment);
router.delete('/:id', AcademicDepartmentController.deleteDepartment);
router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidation.academicDepartmentUpdateZodScheme
  ),
  AcademicDepartmentController.updateDepartment
);

export const AcademicDepartmentRoute = router;
