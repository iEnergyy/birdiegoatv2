import { PrismaClient, students } from '@prisma/client';
import { publicProcedure, router } from './trpc';
const prisma = new PrismaClient();

export const appRouter = router({
  getStudents: publicProcedure.query(async () => {
    const students = await prisma.students.findMany();
    return students;
  }),
});

export type AppRouter = typeof appRouter;
