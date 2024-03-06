import { Prisma } from '@prisma/client';
import { prisma } from '../utils/prisma';

export const createStudent = async (input: Prisma.studentsCreateInput) => {
  return await prisma.students.create({ data: input });
};
export const getAllStudents = async () => {
  return await prisma.students.findMany();
};
export const deleteStudent = async (studentId: string) => {
  return await prisma.students.delete({
    where: {
      id: studentId,
    },
  });
};
