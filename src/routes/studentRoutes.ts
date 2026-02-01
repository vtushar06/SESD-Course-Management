import { Router } from 'express';
import StudentController from '../controllers/StudentController';

const router = Router();

router.post('/', (req, res) => StudentController.create(req, res));
router.get('/', (req, res) => StudentController.listAll(req, res));
router.get('/:id', (req, res) => StudentController.getById(req, res));
router.put('/:id', (req, res) => StudentController.update(req, res));
router.delete('/:id', (req, res) => StudentController.delete(req, res));

export default router;
