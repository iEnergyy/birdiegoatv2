'use client';
import { DataTable } from './data-table';
import { serverClient } from '../_trpc/serverClient';
import { columns } from './columns';
import { AddStudentDialog } from '@/components/add-student-dialog';
import { trpc } from '../_trpc/client';

export default function StudentsTable({
  initialStudents,
}: Readonly<{
  initialStudents: Awaited<ReturnType<(typeof serverClient)['getStudents']>>;
}>) {
  const getStudents = trpc.getStudents.useQuery(undefined, {
    initialData: initialStudents,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return (
    <div className="flex">
      <main className="flex-grow p-6">
        <div className="flex justify-end mb-4">
          <AddStudentDialog updateStudents={getStudents}></AddStudentDialog>
        </div>
        <DataTable columns={columns} data={getStudents.data.result} />
      </main>
    </div>
  );
}
