export interface ICourse {
  id: string;
  name: string;
  courseCode: string;
  description: string;
  credits: number;
  instructor: string;
  maxCapacity: number;
  currentEnrollment: number;
  createdAt: Date;
  updatedAt: Date;
}

export class Course implements ICourse {
  id: string;
  name: string;
  courseCode: string;
  description: string;
  credits: number;
  instructor: string;
  maxCapacity: number;
  currentEnrollment: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(name: string, courseCode: string, description: string, credits: number, instructor: string, maxCapacity: number) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.name = name;
    this.courseCode = courseCode;
    this.description = description;
    this.credits = credits;
    this.instructor = instructor;
    this.maxCapacity = maxCapacity;
    this.currentEnrollment = 0;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  update(data: Partial<ICourse>): void {
    if (data.name) this.name = data.name;
    if (data.description) this.description = data.description;
    if (data.credits) this.credits = data.credits;
    if (data.instructor) this.instructor = data.instructor;
    if (data.maxCapacity) this.maxCapacity = data.maxCapacity;
    this.updatedAt = new Date();
  }

  isFull(): boolean {
    return this.currentEnrollment >= this.maxCapacity;
  }

  addStudent(): void {
    if (!this.isFull()) {
      this.currentEnrollment += 1;
    }
  }

  removeStudent(): void {
    if (this.currentEnrollment > 0) {
      this.currentEnrollment -= 1;
    }
  }
}
