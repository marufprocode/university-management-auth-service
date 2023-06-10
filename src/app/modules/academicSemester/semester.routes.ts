import express from 'express';
import validateRequestZod from '../../middlewares/validateReqZodMiddleware';
import semesterValidation from './semester.validation';
import semesterController from './semester.controller';

const router = express.Router();

router.post(
  '/create',
  validateRequestZod(semesterValidation.createAcadSemesterZodSchema),
  semesterController.createSemester
);

export default router;
