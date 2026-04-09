import { Link, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  FileText, 
  TrendingUp, 
  BarChart3,
  GraduationCap
} from 'lucide-react';
import { useRole } from '../contexts/RoleContext';

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

  // Filter menu items based on role
  const visibleMenuItems = menuItems.filter(item => 
    !item.teacherOnly || role === 'teacher'
  );

  const roleLabels = {
    teacher: 'Teacher Portal',
    student: 'Student Portal',
    parent: 'Parent Portal'
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">Grades</h1>
            <p className="text-xs text-gray-500">Management</p>
          </div>
        </Link>
        <div className="mt-3">
          <span className="inline-block text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded font-medium">
            {roleLabels[role]}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
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
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
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
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
          <p className="text-xs font-medium text-blue-900 mb-1">AI Powered</p>
          <p className="text-xs text-blue-700">
            Smart recommendations for better learning outcomes
          </p>
        </div>
      </div>
    </aside>
  );
}