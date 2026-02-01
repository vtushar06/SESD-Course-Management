export interface IEnrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrollmentDate: Date;
  status: 'active' | 'completed' | 'dropped';
  grade?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Enrollment implements IEnrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrollmentDate: Date;
  status: 'active' | 'completed' | 'dropped';
  grade?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(studentId: string, courseId: string) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.studentId = studentId;
    this.courseId = courseId;
    this.enrollmentDate = new Date();
    this.status = 'active';
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  setGrade(grade: string): void {
    this.grade = grade;
    this.updatedAt = new Date();
  }

  setStatus(status: 'active' | 'completed' | 'dropped'): void {
    this.status = status;
    this.updatedAt = new Date();
  }
}
