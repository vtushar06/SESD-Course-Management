import { Request, Response } from 'express';
import { Course } from '../models/Course';
import { db } from '../database/Database';

class CourseController {
  create(req: Request, res: Response) {
    try {
      const { name, courseCode, description, credits, instructor, maxCapacity } = req.body;

      if (db.getCourseByCourseCode(courseCode)) {
        res.status(400).json({ success: false, message: 'Course code already exists' });
        return;
      }

      if (db.getCourseByCourse(name)) {
        res.status(400).json({ success: false, message: 'Course name already exists' });
        return;
      }

      const course = new Course(name, courseCode, description, credits, instructor, maxCapacity);
      db.addCourse(course);
      res.status(201).json({ success: true, message: 'Course created', data: course });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  getById(req: Request, res: Response) {
    try {
      const course = db.getCourseById(req.params.id);
      if (!course) {
        res.status(404).json({ success: false, message: 'Course not found' });
        return;
      }
      res.json({ success: true, data: course });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  listAll(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = (req.query.search as string) || '';
      const available = (req.query.available as string) === 'true';

      let courses = db.getAllCourses();

      if (search) {
        courses = db.searchCourses(search);
      } else if (available) {
        courses = db.getAvailableCourses();
      }

      const total = courses.length;
      const paginatedCourses = courses.slice((page - 1) * limit, page * limit);

      res.json({
        success: true,
        data: paginatedCourses,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  update(req: Request, res: Response) {
    try {
      const course = db.updateCourse(req.params.id, req.body);
      if (!course) {
        res.status(404).json({ success: false, message: 'Course not found' });
        return;
      }
      res.json({ success: true, message: 'Course updated', data: course });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  delete(req: Request, res: Response) {
    try {
      const deleted = db.deleteCourse(req.params.id);
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Course not found' });
        return;
      }
      res.json({ success: true, message: 'Course deleted' });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

export default new CourseController();
