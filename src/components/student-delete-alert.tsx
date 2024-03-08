'use client';
import { LinkBreak1Icon } from '@radix-ui/react-icons';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { StudentFormValues } from '@/server/schema/students.schema';
import { toast } from 'sonner';
import { trpc } from '@/app/_trpc/client';
import { useContext } from 'react';
import { UpdateStudentsContext } from '@/app/students/students-table';
import { buttonVariants } from '@/components/ui/button';

export interface StudentDeleteAlertDialogProps {
  studentToEdit: StudentFormValues;
}

export function StudentDeleteAlertDialog({
  studentToEdit,
}: Readonly<StudentDeleteAlertDialogProps>) {
  const updateStudentsContext = useContext(UpdateStudentsContext);
  const { mutate: deleteStudentMutation } = trpc.deleteStudent.useMutation({
    onSuccess: () => {
      updateStudentsContext.handleStudentRefetch();
      console.log('Student deleted');
    },
    onError: (err: any) => {
      console.log('error', err);
    },
  });

  const deleteStudent = () => {
    try {
      console.log('Deleting student', studentToEdit.id);
      deleteStudentMutation(studentToEdit.id!);
      toast.info(
        `Student ${studentToEdit.first_name} ${studentToEdit.last_name} was deleted`,
      );
    } catch (e) {
      console.error('error from onSubmit:', e);
      toast.error('Error deleting student');
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <LinkBreak1Icon />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            This action cannot be undone. This will permanently delete the
            student and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={cn(buttonVariants({ variant: 'destructive' }))}
            onClick={deleteStudent}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
