import { Search, Bell, User } from 'lucide-react';
import { RoleSwitcher } from './RoleSwitcher';
import { useRole } from '../contexts/RoleContext';
import { getStudentById } from '../data/mockData';

export function Navbar() {
  const { role, currentStudentId } = useRole();
  
  const getUserInfo = () => {
    if (role === 'teacher') {
      return { name: 'Prof. Sari', subtitle: 'Teacher' };
    } else if (role === 'student') {
      const student = getStudentById(currentStudentId || '1');
      return { name: student?.name || 'Student', subtitle: 'Student' };
    } else {
      const student = getStudentById(currentStudentId || '1');
      return { name: 'Parent', subtitle: `Parent of ${student?.name.split(' ')[0]}` };
    }
  };

  const userInfo = getUserInfo();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search students, subjects, or objectives..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 ml-8">
          {/* Role Switcher */}
          <RoleSwitcher />

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{userInfo.name}</p>
              <p className="text-xs text-gray-500">{userInfo.subtitle}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}