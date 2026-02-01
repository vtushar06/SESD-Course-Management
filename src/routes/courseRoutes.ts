import { Router } from 'express';
import CourseController from '../controllers/CourseController';

const router = Router();

router.post('/', (req, res) => CourseController.create(req, res));
router.get('/', (req, res) => CourseController.listAll(req, res));
router.get('/:id', (req, res) => CourseController.getById(req, res));
router.put('/:id', (req, res) => CourseController.update(req, res));
router.delete('/:id', (req, res) => CourseController.delete(req, res));

export default router;
