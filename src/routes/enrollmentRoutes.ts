import { Router } from 'express';
import EnrollmentController from '../controllers/EnrollmentController';

const router = Router();

router.post('/', (req, res) => EnrollmentController.enroll(req, res));
router.get('/', (req, res) => EnrollmentController.listAll(req, res));
router.get('/:id', (req, res) => EnrollmentController.getById(req, res));
router.put('/:id', (req, res) => EnrollmentController.update(req, res));
router.delete('/:id', (req, res) => EnrollmentController.drop(req, res));

export default router;
