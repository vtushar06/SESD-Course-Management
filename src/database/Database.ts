import { Student } from '../models/Student';
import { Course } from '../models/Course';
import { Enrollment } from '../models/Enrollment';

export class Database {
  private students: Student[] = [];
  private courses: Course[] = [];
  private enrollments: Enrollment[] = [];

  // ===== STUDENT METHODS =====
  addStudent(student: Student): void {
    this.students.push(student);
  }

  getStudentById(id: string): Student | undefined {
    return this.students.find(s => s.id === id);
  }

  getStudentByEmail(email: string): Student | undefined {
    return this.students.find(s => s.email === email);
  }

  getStudentByRollNumber(rollNumber: string): Student | undefined {
    return this.students.find(s => s.rollNumber === rollNumber);
  }

  getAllStudents(): Student[] {
    return this.students;
  }

  searchStudents(query: string): Student[] {
    return this.students.filter(s =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.rollNumber.toLowerCase().includes(query.toLowerCase())
    );
  }

  filterStudentsByYear(year: number): Student[] {
    return this.students.filter(s => s.year === year);
  }

  updateStudent(id: string, data: Partial<Student>): Student | undefined {
    const student = this.getStudentById(id);
    if (student) {
      student.update(data);
    }
    return student;
  }

  deleteStudent(id: string): boolean {
    const index = this.students.findIndex(s => s.id === id);
    if (index > -1) {
      this.students.splice(index, 1);
      return true;
    }
    return false;
  }

  // ===== COURSE METHODS =====
  addCourse(course: Course): void {
    this.courses.push(course);
  }

  getCourseById(id: string): Course | undefined {
    return this.courses.find(c => c.id === id);
  }

  getCourseByCourseCode(courseCode: string): Course | undefined {
    return this.courses.find(c => c.courseCode === courseCode);
  }

  getCourseByCourse(name: string): Course | undefined {
    return this.courses.find(c => c.name === name);
  }

  getAllCourses(): Course[] {
    return this.courses;
  }

  searchCourses(query: string): Course[] {
    return this.courses.filter(c =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.courseCode.toLowerCase().includes(query.toLowerCase())
    );
  }

  getAvailableCourses(): Course[] {
    return this.courses.filter(c => !c.isFull());
  }

  updateCourse(id: string, data: Partial<Course>): Course | undefined {
    const course = this.getCourseById(id);
    if (course) {
      course.update(data);
    }
    return course;
  }

  deleteCourse(id: string): boolean {
    const index = this.courses.findIndex(c => c.id === id);
    if (index > -1) {
      this.courses.splice(index, 1);
      return true;
    }
    return false;
  }

  // ===== ENROLLMENT METHODS =====
  addEnrollment(enrollment: Enrollment): void {
    this.enrollments.push(enrollment);
  }

  getEnrollmentById(id: string): Enrollment | undefined {
    return this.enrollments.find(e => e.id === id);
  }

  getEnrollmentByStudentAndCourse(studentId: string, courseId: string): Enrollment | undefined {
    return this.enrollments.find(e => e.studentId === studentId && e.courseId === courseId && e.status === 'active');
  }

  getEnrollmentsByStudent(studentId: string): Enrollment[] {
    return this.enrollments.filter(e => e.studentId === studentId);
  }

  getEnrollmentsByCourse(courseId: string): Enrollment[] {
    return this.enrollments.filter(e => e.courseId === courseId && e.status === 'active');
  }

  getAllEnrollments(): Enrollment[] {
    return this.enrollments;
  }

  updateEnrollment(id: string, data: Partial<Enrollment>): Enrollment | undefined {
    const enrollment = this.getEnrollmentById(id);
    if (enrollment) {
      if (data.grade) enrollment.setGrade(data.grade);
      if (data.status) enrollment.setStatus(data.status);
    }
    return enrollment;
  }

  deleteEnrollment(id: string): boolean {
    const index = this.enrollments.findIndex(e => e.id === id);
    if (index > -1) {
      this.enrollments.splice(index, 1);
      return true;
    }
    return false;
  }

  countEnrollmentsByCourse(courseId: string): number {
    return this.enrollments.filter(e => e.courseId === courseId && e.status === 'active').length;
  }
}

// Singleton instance
export const db = new Database();
