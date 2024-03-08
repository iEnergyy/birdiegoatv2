import { Prisma } from '@prisma/client';
import { StudentFormValues } from '../schema/students.schema';
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  updateStudent,
} from '../services/student.service';
import { TRPCError } from '@trpc/server';

export const createStudentHandler = async (input: StudentFormValues) => {
  try {
    const newStudent = await createStudent(input);
    return {
      status: 200,
      data: 'New Student created',
      result: newStudent,
    };
  } catch (err) {
    console.error('Error in mutation', err);
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle known Prisma errors
      switch (err.code) {
        case 'P2002':
          return {
            status: 400,
            data: 'Duplicate value',
          };
        default:
          return {
            status: 400,
            data: 'Database error',
          };
      }
    } else {
      // Handle other errors
      return {
        status: 400,
        data: 'Unknown error',
      };
    }
  }
};

export const updateStudentHandler = async (input: StudentFormValues) => {
  try {
    const updatedStudent = await updateStudent(input);
    return {
      status: 200,
      data: 'Student updated',
      result: updatedStudent,
    };
  } catch (err: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message,
    });
  }
};

export const getStudentsHandler = async () => {
  try {
    const students = await getAllStudents();

    return {
      status: 200,
      data: 'Returned students',
      result: students,
    };
  } catch (err: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message,
    });
  }
};
export const deleteStudentHandler = async (input: string) => {
  try {
    const deletedStudent = await deleteStudent(input);

    return {
      status: 200,
      data: 'Deleted student',
      result: deletedStudent,
    };
  } catch (err: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message,
    });
  }
};
