import { Prisma, PrismaClient } from '@prisma/client';
import { publicProcedure, router } from './trpc';
import {
  StudentFormValues,
  studentFormSchema,
} from '@/server/schema/students.schema';
import {
  createStudentHandler,
  getStudentsHandler,
} from './controllers/student.controller';
// const prisma = new PrismaClient();

// export const createStudent = async (input: Prisma.studentsCreateInput) => {
//   return await prisma.students.create({ data: input });
// };

// export const createStudentHandler = async (input: StudentFormValues) => {
//   try {
//     const newStudent = await createStudent(input);
//     return {
//       status: 200,
//       data: 'New Student created',
//       result: newStudent,
//     };
//   } catch (err) {
//     console.error('Error in mutation', err);
//     if (err instanceof Prisma.PrismaClientKnownRequestError) {
//       // Handle known Prisma errors
//       switch (err.code) {
//         case 'P2002':
//           return {
//             status: 400,
//             data: 'Duplicate value',
//           };
//         default:
//           return {
//             status: 400,
//             data: 'Database error',
//           };
//       }
//     } else {
//       // Handle other errors
//       return {
//         status: 400,
//         data: 'Unknown error',
//       };
//     }
//   }
// };

export const appRouter = router({
  getStudents: publicProcedure.query(async () => {
    const students = getStudentsHandler();
    return students;
  }),
  createStudent: publicProcedure
    .input(studentFormSchema)
    .mutation(({ input }) => createStudentHandler(input)),
});

export type AppRouter = typeof appRouter;
