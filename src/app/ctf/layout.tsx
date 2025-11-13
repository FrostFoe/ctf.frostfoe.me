import { CTFSidebar } from '@/components/ctf/ctf-sidebar';
import { ReactNode } from 'react';

export default function CTFLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <CTFSidebar />
      <main className="flex-1 md:ml-64">
        {children}
      </main>
    </div>
  );
}
