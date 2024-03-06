'use client';
import { DataTable } from './data-table';
import { serverClient } from '../_trpc/serverClient';
import { columns } from './columns';
import { AddStudentDialog } from '@/components/add-student-dialog';
import { trpc } from '../_trpc/client';
import { createContext } from 'react';

interface UpdateStudentsContext {
  handleStudentRefetch: () => Promise<void>;
}
export const UpdateStudentsContext = createContext<UpdateStudentsContext>({
  handleStudentRefetch: async () => {},
});

export default function StudentsTable({
  initialStudents,
}: Readonly<{
  initialStudents: Awaited<ReturnType<(typeof serverClient)['getStudents']>>;
}>) {
  const getStudentsQuery = trpc.getStudents.useQuery(undefined, {
    initialData: initialStudents,
  });

  const handleStudentRefetch = async () => {
    console.log('Refetching students from context');
    getStudentsQuery.refetch();
  };

  return (
    <UpdateStudentsContext.Provider value={{ handleStudentRefetch }}>
      <div className="flex">
        <main className="flex-grow p-6">
          <div className="flex justify-end mb-4">
            <AddStudentDialog
              updateStudents={getStudentsQuery}
            ></AddStudentDialog>
          </div>
          <DataTable columns={columns} data={getStudentsQuery.data.result} />
        </main>
      </div>
    </UpdateStudentsContext.Provider>
  );
}
