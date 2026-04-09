import { Outlet, Navigate } from 'react-router';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { DemoBanner } from './DemoBanner';
import { useAuth } from '../contexts/AuthContext';

export function Layout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <DemoBanner />
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}