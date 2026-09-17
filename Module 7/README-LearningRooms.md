# ReadFlow Learning Rooms

This module is built for a Vite + React + TypeScript + Tailwind CSS project.

## Included

- Classroom creation
- Automatic unique room-code generation
- Classroom selector
- Enrolled student list
- Assign Module page
- Fake modules:
  - Easy Module 1
  - Medium Module 1
  - Hard Module 1
- Student progress table
- Dummy scores and completion percentages
- Enrolled student view
- Classroom assignment management
- Browser localStorage persistence

## Connectivity design

All Learning Room data is stored under:

`readflow_classrooms_v1`

The important shared objects are:

- Classroom
- Student
- Module
- Assignment

This means later modules can read the same classroom/student/assignment data instead of keeping separate hard-coded arrays.

## How to use

1. Copy the files from `src/` into your project's `src/` folder.
2. Keep your existing Vite/Tailwind configuration.
3. Make sure `src/main.tsx` renders `App`.
4. Run:

```bash
npm install
npm run dev
```

## Later backend connection

Replace the functions in `src/storage.ts` with API calls such as:

- GET /api/classrooms
- POST /api/classrooms
- GET /api/classrooms/:id/students
- GET /api/modules
- POST /api/classrooms/:id/assignments
- GET /api/classrooms/:id/progress

The React pages can remain mostly unchanged because they already use Classroom, Student, Module, and Assignment objects.
