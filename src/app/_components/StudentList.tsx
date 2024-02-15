'use client';
import { student_classes, students } from '@prisma/client';
import { trpc } from '../_trpc/client';
import { serverClient } from '../_trpc/serverClient';

export default function StudentList({
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
    <div>
      <div>{JSON.stringify(getStudents.data)}</div>
    </div>
  );
}
