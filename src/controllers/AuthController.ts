import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Student } from '../models/Student';
import { db } from '../database/Database';

class AuthController {
  register(req: Request, res: Response) {
    try {
      const { name, email, rollNumber, year, department, password } = req.body;

      if (db.getStudentByEmail(email)) {
        res.status(400).json({ success: false, message: 'Email exists' });
        return;
      }

      const student = new Student(name, email, rollNumber, year, department, password);
      db.addStudent(student);

      const token = jwt.sign({ id: student.id, email: student.email }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '7d',
      });

      res.status(201).json({ success: true, message: 'Registered', token, data: student });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const student = db.getStudentByEmail(email);
      if (!student || !student.comparePassword(password)) {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
        return;
      }

      const token = jwt.sign({ id: student.id, email: student.email }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '7d',
      });

      res.json({ success: true, message: 'Logged in', token, data: student });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

export default new AuthController();
