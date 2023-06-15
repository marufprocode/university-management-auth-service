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

router.get('/faculties', facultyController.getAllFaculties);
router.patch(
  '/:id',
  validateRequestZod(facultyValidation.createAndUpdateFacultyZodSchema),
  facultyController.updateFaculty
);
router.get('/:id', facultyController.getSingleFaculty);
router.delete('/:id', facultyController.deleteFaculty);

export default router;
