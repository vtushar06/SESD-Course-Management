# Course Management Backend System

A **beginner-friendly** Node.js + Express + TypeScript backend using **Plain Classes + In-Memory Storage** for managing Students, Courses, and Enrollments.

## Architecture

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

## Project Structure

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

## Quick Start

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


## Key Features

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

## Tech Stack

- **Node.js** - Runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **JWT** - Authentication
- **bcryptjs** - Password hashing

---

## File Breakdown

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

