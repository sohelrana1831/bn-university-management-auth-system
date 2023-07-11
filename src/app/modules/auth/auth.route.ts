import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { LoginValidation } from './auth.Validation';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
  '/login',
  validateRequest(LoginValidation.loginZodSchema),
  AuthController.loginUser
);

export const AuthRoutes = router;
