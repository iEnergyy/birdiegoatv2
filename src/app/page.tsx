import { MainNav } from '@/components/main-nav';
import { baseNavConfig } from '../../config/base-nav';
import StudentList from './_components/StudentList';

export default function Home() {
  return (
    <div className="flex">
      <MainNav items={baseNavConfig.mainNav} />
      <main className="flex-grow p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-medium">Home</h1>
          <StudentList></StudentList>
        </div>
      </main>
    </div>
  );
}
