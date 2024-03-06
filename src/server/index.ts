import { publicProcedure, router } from './trpc';
import { studentFormSchema } from '@/server/schema/students.schema';
import {
  createStudentHandler,
  deleteStudentHandler,
  getStudentsHandler,
} from './controllers/student.controller';
import { z } from 'zod';

export const appRouter = router({
  getStudents: publicProcedure.query(async () => {
    const students = getStudentsHandler();
    return students;
  }),
  createStudent: publicProcedure
    .input(studentFormSchema)
    .mutation(({ input }) => createStudentHandler(input)),
  deleteStudent: publicProcedure
    .input(z.string())
    .mutation(({ input }) => deleteStudentHandler(input)),
});

export type AppRouter = typeof appRouter;
