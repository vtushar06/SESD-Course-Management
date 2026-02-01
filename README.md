# Course Management Backend System

A **beginner-friendly** Node.js + Express + TypeScript backend using **Plain Classes + In-Memory Storage** for managing Students, Courses, and Enrollments.

## 🎯 Architecture

```
Pure OOP with TypeScript Classes
├── Models (Classes)
│   ├── Student class
│   ├── Course class
│   └── Enrollment class
├── Database (In-Memory Storage)
│   └── Database class (stores all data)
├── Controllers (Request Handlers)
│   ├── StudentController
│   ├── CourseController
│   ├── EnrollmentController
│   └── AuthController
└── Routes (API Endpoints)
```

## 📁 Project Structure

```
src/
├── models/              # TypeScript Classes
│   ├── Student.ts       # Student class + interface
│   ├── Course.ts        # Course class + interface
│   └── Enrollment.ts    # Enrollment class + interface
├── database/            # In-Memory Database
│   └── Database.ts      # Database class (singleton)
├── controllers/         # HTTP Request Handlers
│   ├── StudentController.ts
│   ├── CourseController.ts
│   ├── EnrollmentController.ts
│   └── AuthController.ts
├── routes/              # API Endpoints
│   ├── authRoutes.ts
│   ├── studentRoutes.ts
│   ├── courseRoutes.ts
│   └── enrollmentRoutes.ts
├── app.ts               # Express app setup
└── server.ts            # Server entry point
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Server
```bash
npm run dev
```

Output:
```
Server running on port 3000
```

### 3. Build for Production
```bash
npm run build
npm start
```

## 📚 API Endpoints

### Authentication

**Register Student**
```bash
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "rollNumber": "2024000001",
  "year": 2,
  "department": "CSE",
  "password": "password123"
}
Response: { success: true, token: "...", data: {...} }
```

**Login**
```bash
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
Response: { success: true, token: "...", data: {...} }
```

---

### Students

**Create Student**
```bash
POST /api/students
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "rollNumber": "2024000002",
  "year": 1,
  "department": "ECE",
  "password": "pass123"
}
```

**Get Student by ID**
```bash
GET /api/students/:id
```

**List All Students**
```bash
GET /api/students?page=1&limit=10
GET /api/students?search=john         # Search by name
GET /api/students?year=2              # Filter by year
```

**Update Student**
```bash
PUT /api/students/:id
{
  "name": "Jane Updated",
  "year": 2
}
```

**Delete Student**
```bash
DELETE /api/students/:id
```

---

### Courses

**Create Course**
```bash
POST /api/courses
{
  "name": "Web Development",
  "courseCode": "CS101",
  "description": "Learn web development basics",
  "credits": 3,
  "instructor": "Dr. Smith",
  "maxCapacity": 50
}
```

**Get Course by ID**
```bash
GET /api/courses/:id
```

**List All Courses**
```bash
GET /api/courses?page=1&limit=10
GET /api/courses?search=web          # Search
GET /api/courses?available=true      # Only available courses
```

**Update Course**
```bash
PUT /api/courses/:id
{
  "name": "Advanced Web Development",
  "maxCapacity": 60
}
```

**Delete Course**
```bash
DELETE /api/courses/:id
```

---

### Enrollments

**Enroll Student in Course**
```bash
POST /api/enrollments
{
  "studentId": "student_id",
  "courseId": "course_id"
}
```

**Get Enrollment**
```bash
GET /api/enrollments/:id
```

**List Enrollments**
```bash
GET /api/enrollments?page=1&limit=10
GET /api/enrollments?studentId=xxx    # Get student enrollments
GET /api/enrollments?courseId=xxx     # Get course enrollments
```

**Update Enrollment (grade)**
```bash
PUT /api/enrollments/:id
{
  "status": "completed",
  "grade": "A"
}
```

**Drop Course**
```bash
DELETE /api/enrollments/:id
```

---

## 🏗️ Class Structure

### Student Class
```typescript
class Student {
  id: string
  name: string
  email: string
  rollNumber: string
  year: number
  department: string
  password: string (hashed)
  
  Methods:
  - comparePassword(password) → boolean
  - update(data) → void
}
```

### Course Class
```typescript
class Course {
  id: string
  name: string
  courseCode: string
  description: string
  credits: number
  instructor: string
  maxCapacity: number
  currentEnrollment: number
  
  Methods:
  - update(data) → void
  - isFull() → boolean
  - addStudent() → void
  - removeStudent() → void
}
```

### Enrollment Class
```typescript
class Enrollment {
  id: string
  studentId: string
  courseId: string
  enrollmentDate: Date
  status: 'active' | 'completed' | 'dropped'
  grade?: string
  
  Methods:
  - setGrade(grade) → void
  - setStatus(status) → void
}
```

### Database Class (Singleton)
```typescript
class Database {
  // Student methods
  addStudent(student)
  getStudentById(id)
  getStudentByEmail(email)
  getAllStudents()
  searchStudents(query)
  filterStudentsByYear(year)
  updateStudent(id, data)
  deleteStudent(id)
  
  // Course methods
  addCourse(course)
  getCourseById(id)
  getAllCourses()
  searchCourses(query)
  getAvailableCourses()
  updateCourse(id, data)
  deleteCourse(id)
  
  // Enrollment methods
  addEnrollment(enrollment)
  getEnrollmentById(id)
  getEnrollmentsByStudent(studentId)
  getEnrollmentsByCourse(courseId)
  updateEnrollment(id, data)
  deleteEnrollment(id)
}
```

---

## 🎯 Key Features

**CRUD Operations** - Create, Read, Update, Delete
**Search** - Search students by name, courses by code
**Filtering** - Filter by year, course availability
**Pagination** - Page and limit parameters
**Validation** - Prevent duplicates, check capacity
**Authentication** - JWT-based login/register
**Password Hashing** - bcryptjs for security
**Error Handling** - Meaningful error messages
**OOP Design** - Classes with methods and interfaces

---

## 🔧 Tech Stack

- **Node.js** - Runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **JWT** - Authentication
- **bcryptjs** - Password hashing

---

## 📖 File Breakdown

| File | Purpose |
|------|---------|
| `models/Student.ts` | Student class + interface |
| `models/Course.ts` | Course class + interface |
| `models/Enrollment.ts` | Enrollment class + interface |
| `database/Database.ts` | In-memory data storage (singleton) |
| `controllers/*.ts` | HTTP request handlers |
| `routes/*.ts` | API endpoint definitions |
| `app.ts` | Express app configuration |
| `server.ts` | Server startup |

