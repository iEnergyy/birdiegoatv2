'use client';
import { trpc } from '../_trpc/client';

export default function StudentList() {
  const getStudents = trpc.getStudents.useQuery();
  return (
    <div>
      <div>{JSON.stringify(getStudents.data)}</div>
    </div>
  );
}
