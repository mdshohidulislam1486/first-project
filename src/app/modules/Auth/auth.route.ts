import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';

const router = express.Router();

router
  .post(
    '/login',
    validateRequest(AuthValidation.loginValidationSchema),
    AuthControllers.loginUser
  )
  .post(
    '/change-password',
    auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
    validateRequest(AuthValidation.changePassValidationSchema),
    AuthControllers.chngePassword
  )
  .post(
    '/refresh-token',
    validateRequest(AuthValidation.refreshTokenValidation),
    AuthControllers.refreshToken
  )
  .post(
    '/forget-password',
    validateRequest(AuthValidation.forgetPasswordValidationSchema),
    AuthControllers.forgetPassword
  )
  .post(
    '/reset-password',
    validateRequest(AuthValidation.forgetPasswordValidationSchema),
    AuthControllers.resetPassword
  );

export const AuthRoutes = router;
