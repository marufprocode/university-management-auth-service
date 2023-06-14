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
  validateRequestZod(semesterValidation.validateSemesterQuerySchema),
  semesterController.getAllSemester
);
router.get('/semesters/:id', semesterController.getSingleSemester);
router.patch(
  '/semesters/:id',
  validateRequestZod(semesterValidation.updateAcadSemesterZodSchema),
  semesterController.updateSemester
);
router.delete('/semesters/:id', semesterController.deleteSemester);

export default router;
