import express from 'express';
import departmentController from './department.controller';
import validateRequestZod from '../../middlewares/validateReqZodMiddleware';
import departmentValidation from './department.validation';

const router = express.Router();

router.post(
  '/',
  validateRequestZod(departmentValidation.createAcademicDepartmentZodSchema),
  departmentController.createDepartment
);
router.get('/', departmentController.getAllDepartments);
router.get('/:id', departmentController.getSingleDepartment);
router.delete('/:id', departmentController.deleteDepartment);
router.patch(
  '/:id',
  validateRequestZod(departmentValidation.updateAcademicDepartmentZodSchema),
  departmentController.updateDepartment
);

export default router;
