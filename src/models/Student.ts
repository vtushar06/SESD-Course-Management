import bcrypt from 'bcryptjs';

// Interface for type safety
export interface IStudent {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  year: number;
  department: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// Student Class - represents a student with OOP
export class Student implements IStudent {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  year: number;
  department: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(name: string, email: string, rollNumber: string, year: number, department: string, password: string) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.name = name;
    this.email = email;
    this.rollNumber = rollNumber;
    this.year = year;
    this.department = department;
    this.password = this.hashPassword(password);
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // Hash password
  private hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  // Compare password - method for login
  comparePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }

  // Update student info
  update(data: Partial<IStudent>): void {
    if (data.name) this.name = data.name;
    if (data.year) this.year = data.year;
    if (data.department) this.department = data.department;
    this.updatedAt = new Date();
  }
}
