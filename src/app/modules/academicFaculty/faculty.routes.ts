import express from 'express';
import facultyController from './faculty.controller';
import facultyValidation from './faculty.validation';
import validateRequestZod from '../../middlewares/validateReqZodMiddleware';

const router = express.Router();

router.post(
  '/create',
  validateRequestZod(facultyValidation.createAndUpdateFacultyZodSchema),
  facultyController.createFaculty
);

// router.get('/faculty' /* semesterController.getSingleSemester */);

export default router;
