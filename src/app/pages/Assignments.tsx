import { FileText, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { useRole } from '../contexts/RoleContext';
import { studentAssignments } from '../data/mockData';

const allAssignments = [
  {
    id: '1',
    title: 'Algebra Practice Set 1',
    subject: 'Matematika',
    dueDate: 'April 15, 2026',
    status: 'Active',
    submissions: 18,
    total: 24
  },
  {
    id: '2',
    title: 'Newton\'s Laws Essay',
    subject: 'Fisika',
    dueDate: 'April 18, 2026',
    status: 'Active',
    submissions: 12,
    total: 24
  },
  {
    id: '3',
    title: 'Cell Structure Diagram',
    subject: 'Biologi',
    dueDate: 'April 20, 2026',
    status: 'Upcoming',
    submissions: 0,
    total: 24
  },
  {
    id: '4',
    title: 'Periodic Table Quiz',
    subject: 'Kimia',
    dueDate: 'March 28, 2026',
    status: 'Completed',
    submissions: 24,
    total: 24
  },
];

export function Assignments() {
  const { role } = useRole();

  // Student/Parent view - show student's assignments
  if (role === 'student' || role === 'parent') {
    const pending = studentAssignments.filter(a => a.status === 'pending');
    const completed = studentAssignments.filter(a => a.status === 'completed');

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {role === 'student' ? 'My Assignments' : 'Assignments'}
          </h1>
          <p className="text-gray-600 mt-1">
            {role === 'student' ? 'Track your assignments and deadlines' : 'View your child\'s assignments'}
          </p>
        </div>

        {/* Pending Assignments */}
        <div>
          <h2 className="font-semibold text-gray-900 mb-3">Pending ({pending.length})</h2>
          <div className="space-y-3">
            {pending.map((assignment) => (
              <div 
                key={assignment.id}
                className="bg-orange-50 border-2 border-orange-200 rounded-xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{assignment.title}</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-sm px-2 py-1 bg-white text-gray-700 rounded">
                          {assignment.subject}
                        </span>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          Due: {assignment.dueDate}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Start
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Assignments */}
        <div>
          <h2 className="font-semibold text-gray-900 mb-3">Completed ({completed.length})</h2>
          <div className="space-y-3">
            {completed.map((assignment) => (
              <div 
                key={assignment.id}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{assignment.title}</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-sm px-2 py-1 bg-gray-100 text-gray-700 rounded">
                          {assignment.subject}
                        </span>
                        {assignment.score && (
                          <span className="text-sm font-semibold text-green-600">
                            Score: {assignment.score}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Teacher view - show all class assignments
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Assignments</h1>
          <p className="text-gray-600 mt-1">Manage and track assignments</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Create Assignment
        </button>
      </div>

      <div className="grid gap-4">
        {allAssignments.map((assignment) => (
          <div 
            key={assignment.id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm px-2 py-1 bg-purple-100 text-purple-700 rounded">
                      {assignment.subject}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {assignment.dueDate}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Submissions</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {assignment.submissions}/{assignment.total}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  assignment.status === 'Active' 
                    ? 'bg-green-100 text-green-700'
                    : assignment.status === 'Upcoming'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {assignment.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}