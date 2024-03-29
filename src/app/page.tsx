import { MainNav } from '@/components/main-nav';
import { baseNavConfig } from '../../config/base-nav';

export default async function Home() {
  return (
    <div className="flex">
      <MainNav items={baseNavConfig.mainNav} />
      <main className="flex-grow p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-medium">Home</h1>
        </div>
      </main>
    </div>
  );
}
