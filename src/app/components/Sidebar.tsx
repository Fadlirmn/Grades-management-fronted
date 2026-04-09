import { Link, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  FileText, 
  TrendingUp, 
  BarChart3,
  GraduationCap,
  X
} from 'lucide-react';
import { useRole } from '../contexts/RoleContext';
import { useState, useEffect } from 'react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Students', path: '/students', teacherOnly: true },
  { icon: BookOpen, label: 'Subjects', path: '/subjects' },
  { icon: FileText, label: 'Assignments', path: '/assignments' },
  { icon: TrendingUp, label: 'Progress Tracking', path: '/progress' },
  { icon: BarChart3, label: 'Reports', path: '/reports' },
];

export function Sidebar() {
  const location = useLocation();
  const { role } = useRole();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Filter menu items based on role
  const visibleMenuItems = menuItems.filter(item => 
    !item.teacherOnly || role === 'teacher'
  );

  const roleLabels = {
    teacher: 'Teacher Portal',
    student: 'Student Portal',
    parent: 'Parent Portal'
  };

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900 dark:text-white">Grades</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Management</p>
            </div>
          </Link>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-3">
          <span className="inline-block text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded font-medium">
            {roleLabels[role]}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {visibleMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg p-4">
          <p className="text-xs font-medium text-blue-900 dark:text-blue-100 mb-1">AI Powered</p>
          <p className="text-xs text-blue-700 dark:text-blue-300">
            Smart recommendations for better learning outcomes
          </p>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen flex-col">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
          <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800 z-50 flex flex-col md:hidden shadow-xl">
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
}