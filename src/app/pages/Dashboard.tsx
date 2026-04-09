import { useRole } from '../contexts/RoleContext';
import { TeacherDashboard } from './TeacherDashboard';
import { StudentDashboard } from './StudentDashboard';
import { ParentDashboard } from './ParentDashboard';

export function Dashboard() {
  const { role } = useRole();

  return (
    <>
      {role === 'teacher' && <TeacherDashboard />}
      {role === 'student' && <StudentDashboard />}
      {role === 'parent' && <ParentDashboard />}
    </>
  );
}
