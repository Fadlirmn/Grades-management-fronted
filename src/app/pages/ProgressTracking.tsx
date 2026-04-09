import { ProgressCharts } from '../components/ProgressCharts';
import { StudentProgressTable } from '../components/StudentProgressTable';
import { TrendingUp, BookOpen } from 'lucide-react';
import { useRole } from '../contexts/RoleContext';
import { getProgressByStudent, weeklyProgressByStudent } from '../data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StatusBadge } from '../components/StatusBadge';

export function ProgressTracking() {
  const { role, currentStudentId } = useRole();

  // For student/parent view, show individual progress
  if (role === 'student' || role === 'parent') {
    const progressEntries = getProgressByStudent(currentStudentId || '1');
    const weeklyProgress = weeklyProgressByStudent[currentStudentId || '1'] || [];

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Your Progress</h1>
            <p className="text-gray-600">Track your learning journey</p>
          </div>
        </div>

        {/* Progress Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-6">Weekly Progress</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="week" 
                stroke="#9ca3af"
                style={{ fontSize: '12px' }}
                label={{ value: 'Week', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                stroke="#9ca3af"
                style={{ fontSize: '12px' }}
                domain={[0, 100]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Progress */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-purple-600" />
            <h2 className="font-semibold text-gray-900">All Objectives</h2>
          </div>
          <div className="space-y-3">
            {progressEntries.map((entry) => (
              <div key={entry.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-medium text-gray-500">Week {entry.week}</span>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                        {entry.subject}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-900 mb-2">{entry.objective}</p>
                    <p className="text-sm text-gray-600">{entry.recommendation}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 ml-4">
                    <span className="text-xl font-bold text-gray-900">{entry.score}</span>
                    <StatusBadge status={entry.status} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Teacher view - show all students
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Progress Tracking</h1>
          <p className="text-gray-600">Monitor student learning progress across all objectives</p>
        </div>
      </div>

      {/* Filter Options */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Subjects</option>
            <option>Matematika</option>
            <option>Fisika</option>
            <option>Kimia</option>
            <option>Biologi</option>
            <option>Bahasa Indonesia</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Weeks</option>
            <option>Week 1</option>
            <option>Week 2</option>
            <option>Week 3</option>
            <option>Week 4</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Menguasai</option>
            <option>Cukup</option>
            <option>Belum</option>
          </select>
        </div>
      </div>

      <ProgressCharts />
      
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Detailed Progress</h2>
          <p className="text-gray-600 mt-1">Track individual student performance by objective</p>
        </div>
        <StudentProgressTable />
      </div>
    </div>
  );
}