import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../../middleware/validateRequest';
import { UserValidation } from './user.validation';
const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

export const UserRoute = router;
