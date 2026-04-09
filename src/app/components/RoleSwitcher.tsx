import { useRole, Role } from '../contexts/RoleContext';
import { GraduationCap, User, Users } from 'lucide-react';

const roles: { value: Role; label: string; icon: typeof GraduationCap }[] = [
  { value: 'teacher', label: 'Teacher', icon: GraduationCap },
  { value: 'student', label: 'Student', icon: User },
  { value: 'parent', label: 'Parent', icon: Users },
];

export function RoleSwitcher() {
  const { role, setRole } = useRole();

  return (
    <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
      {roles.map((r) => {
        const Icon = r.icon;
        return (
          <button
            key={r.value}
            onClick={() => setRole(r.value)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              role === r.value
                ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{r.label}</span>
          </button>
        );
      })}
    </div>
  );
}