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

router.get(
  '/semesters',
  semesterController.getAllSemester
);

export default router;
