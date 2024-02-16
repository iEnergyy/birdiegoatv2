import { MainNav } from '@/components/main-nav';
import { baseNavConfig } from '@config/base-nav';
import { DataTable } from './data-table';
import { serverClient } from '../_trpc/serverClient';
import { columns } from './columns';

export default async function Students() {
  const students = await serverClient.getStudents();

  return (
    <div className="flex">
      <MainNav items={baseNavConfig.mainNav} />
      <main className="flex-grow p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-medium">Students</h1>
        </div>
        <DataTable columns={columns} data={students} />
      </main>
    </div>
  );
}
