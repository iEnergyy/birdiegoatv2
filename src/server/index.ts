import { publicProcedure, router } from './trpc';
import { studentFormSchema } from '@/server/schema/students.schema';
import {
  createStudentHandler,
  getStudentsHandler,
} from './controllers/student.controller';

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
