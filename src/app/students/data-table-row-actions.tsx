// 'use client';
// import { DotsHorizontalIcon } from '@radix-ui/react-icons';
// import { Row } from '@tanstack/react-table';
// import { Button, buttonVariants } from '@/components/ui/button';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from '@/components/ui/alert-dialog';
// import { cn } from '@/lib/utils';
// import {
//   StudentFormValues,
//   studentFormSchema,
// } from '@/server/schema/students.schema';
// import { useToast } from '@/components/ui/use-toast';
// import { trpc } from '@/app/_trpc/client';
// import { useContext } from 'react';
// import { UpdateStudentsContext } from './students-table';
// import { StudentFormDialog } from '@/components/student-form-dialog';

// interface DataTableRowActionsProps<TData> {
//   row: Row<TData>;
// }
// export function DataTableRowActions<TData>({
//   row,
// }: DataTableRowActionsProps<TData>) {
//   const updateStudentsContext = useContext(UpdateStudentsContext);
//   const student: StudentFormValues = studentFormSchema.parse(row.original);
//   const { toast } = useToast();
//   const { mutate: deleteStudentMutation } = trpc.deleteStudent.useMutation({
//     onSuccess: () => {
//       updateStudentsContext.handleStudentRefetch();
//       console.log('Student deleted');
//     },
//     onError: (err: any) => {
//       console.log('error', err);
//     },
//   });

//   const deleteStudent = () => {
//     try {
//       console.log('Deleting student', student.id);
//       deleteStudentMutation(student.id!);
//       toast({
//         title: 'You submitted the following values:',
//         description: (
//           <div className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//             <code className="text-white">
//               {JSON.stringify(student.id, null, 2)}
//             </code>
//           </div>
//         ),
//       });
//     } catch (e) {
//       console.log('error from onSubmit:', e);
//     }
//   };
//   return (
//     <AlertDialog>
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button
//             variant="ghost"
//             className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
//           >
//             <DotsHorizontalIcon className="h-4 w-4" />
//             <span className="sr-only">Open menu</span>
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end" className="w-[160px]">
//           {/* <DropdownMenuItem>
//             <StudentFormDialog
//               editMode={true}
//               studentToEdit={student}
//             ></StudentFormDialog>
//           </DropdownMenuItem> */}
//           <DropdownMenuItem>
//             <AlertDialogTrigger className="w-full text-left">
//               Delete
//             </AlertDialogTrigger>
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle className="text-left">
//             Are you absolutely sure?
//           </AlertDialogTitle>
//           <AlertDialogDescription className="text-left">
//             This action cannot be undone. This will permanently delete the
//             student and remove the data from our servers.
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel>Cancel</AlertDialogCancel>
//           <AlertDialogAction
//             className={cn(buttonVariants({ variant: 'destructive' }))}
//             onClick={deleteStudent}
//           >
//             Delete
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }
