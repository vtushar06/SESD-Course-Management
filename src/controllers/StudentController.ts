import { Request, Response } from 'express';
import { Student } from '../models/Student';
import { db } from '../database/Database';

class StudentController {
  create(req: Request, res: Response) {
    try {
      const { name, email, rollNumber, year, department, password } = req.body;

      if (!name || !email || !rollNumber || !year || !department || !password) {
        res.status(400).json({ success: false, message: 'All fields required' });
        return;
      }

      if (db.getStudentByEmail(email)) {
        res.status(400).json({ success: false, message: 'Email already exists' });
        return;
      }

      if (db.getStudentByRollNumber(rollNumber)) {
        res.status(400).json({ success: false, message: 'Roll number already exists' });
        return;
      }

      const student = new Student(name, email, rollNumber, year, department, password);
      db.addStudent(student);

      res.status(201).json({ success: true, message: 'Student created', data: student });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  getById(req: Request, res: Response) {
    try {
      const student = db.getStudentById(req.params.id);
      if (!student) {
        res.status(404).json({ success: false, message: 'Student not found' });
        return;
      }
      res.json({ success: true, data: student });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  listAll(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = (req.query.search as string) || '';
      const year = req.query.year as string;

      let students = db.getAllStudents();

      if (search) {
        students = db.searchStudents(search);
      } else if (year) {
        students = db.filterStudentsByYear(parseInt(year));
      }

      const total = students.length;
      const paginatedStudents = students.slice((page - 1) * limit, page * limit);

      res.json({
        success: true,
        data: paginatedStudents,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  update(req: Request, res: Response) {
    try {
      const student = db.updateStudent(req.params.id, req.body);
      if (!student) {
        res.status(404).json({ success: false, message: 'Student not found' });
        return;
      }
      res.json({ success: true, message: 'Student updated', data: student });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  delete(req: Request, res: Response) {
    try {
      const deleted = db.deleteStudent(req.params.id);
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Student not found' });
        return;
      }
      res.json({ success: true, message: 'Student deleted' });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

export default new StudentController();
