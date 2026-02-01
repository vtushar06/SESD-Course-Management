import { Request, Response } from 'express';
import { Enrollment } from '../models/Enrollment';
import { db } from '../database/Database';

class EnrollmentController {
  enroll(req: Request, res: Response) {
    try {
      const { studentId, courseId } = req.body;

      const student = db.getStudentById(studentId);
      if (!student) {
        res.status(404).json({ success: false, message: 'Student not found' });
        return;
      }

      const course = db.getCourseById(courseId);
      if (!course) {
        res.status(404).json({ success: false, message: 'Course not found' });
        return;
      }

      const exists = db.getEnrollmentByStudentAndCourse(studentId, courseId);
      if (exists) {
        res.status(400).json({ success: false, message: 'Already enrolled' });
        return;
      }

      if (course.isFull()) {
        res.status(400).json({ success: false, message: 'Course is full' });
        return;
      }

      const enrollment = new Enrollment(studentId, courseId);
      db.addEnrollment(enrollment);
      course.addStudent();

      res.status(201).json({ success: true, message: 'Enrolled successfully', data: enrollment });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  getById(req: Request, res: Response) {
    try {
      const enrollment = db.getEnrollmentById(req.params.id);
      if (!enrollment) {
        res.status(404).json({ success: false, message: 'Enrollment not found' });
        return;
      }
      res.json({ success: true, data: enrollment });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  listAll(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const studentId = req.query.studentId as string;
      const courseId = req.query.courseId as string;

      let enrollments = db.getAllEnrollments();

      if (studentId) {
        enrollments = db.getEnrollmentsByStudent(studentId);
      } else if (courseId) {
        enrollments = db.getEnrollmentsByCourse(courseId);
      }

      const total = enrollments.length;
      const paginatedEnrollments = enrollments.slice((page - 1) * limit, page * limit);

      res.json({
        success: true,
        data: paginatedEnrollments,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  update(req: Request, res: Response) {
    try {
      const enrollment = db.updateEnrollment(req.params.id, req.body);
      if (!enrollment) {
        res.status(404).json({ success: false, message: 'Enrollment not found' });
        return;
      }
      res.json({ success: true, message: 'Updated', data: enrollment });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  drop(req: Request, res: Response) {
    try {
      const enrollment = db.getEnrollmentById(req.params.id);
      if (!enrollment) {
        res.status(404).json({ success: false, message: 'Enrollment not found' });
        return;
      }

      const course = db.getCourseById(enrollment.courseId);
      if (course) {
        course.removeStudent();
      }

      db.deleteEnrollment(req.params.id);
      res.json({ success: true, message: 'Dropped course' });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

export default new EnrollmentController();
