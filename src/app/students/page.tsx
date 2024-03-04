import { MainNav } from '@/components/main-nav';
import { baseNavConfig } from '@config/base-nav';
import { serverClient } from '../_trpc/serverClient';
import StudentsTable from './students-table';

export default async function Students() {
  const students = await serverClient.getStudents();

  return (
    <div className="flex">
      <MainNav items={baseNavConfig.mainNav} />
      <main className="flex-grow p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-medium">Students</h1>
        </div>
        <StudentsTable initialStudents={students} />
      </main>
    </div>
  );
}
