import { useParams, Link } from 'react-router';
import { ArrowLeft, Mail, BookOpen, TrendingUp, Sparkles } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getStudentById, getProgressByStudent, weeklyProgressByStudent } from '../data/mockData';
import { StatusBadge } from '../components/StatusBadge';

export function StudentDetail() {
  const { id } = useParams<{ id: string }>();
  const student = getStudentById(id || '');
  const progressEntries = getProgressByStudent(id || '');
  const weeklyProgress = weeklyProgressByStudent[id || ''] || [];

  if (!student) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Student not found</p>
        <Link to="/" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  // Calculate statistics
  const averageScore = progressEntries.length > 0
    ? Math.round(progressEntries.reduce((sum, entry) => sum + entry.score, 0) / progressEntries.length)
    : 0;
  
  const masteredCount = progressEntries.filter(e => e.status === 'Menguasai').length;
  const needsAttentionCount = progressEntries.filter(e => e.status === 'Belum').length;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      {/* Student Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-2xl font-semibold">
            {student.avatar}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-900">{student.name}</h1>
            <p className="text-gray-600 mt-1">{student.grade}</p>
            <div className="flex items-center gap-2 mt-2">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{student.email}</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-semibold text-gray-900">{averageScore}</p>
              <p className="text-xs text-gray-600 mt-1">Avg Score</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-green-600">{masteredCount}</p>
              <p className="text-xs text-gray-600 mt-1">Mastered</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-red-600">{needsAttentionCount}</p>
              <p className="text-xs text-gray-600 mt-1">Needs Help</p>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h2 className="font-semibold text-gray-900">Weekly Progress Timeline</h2>
        </div>
        <ResponsiveContainer width="100%" height={250}>
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
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Objective Mastery Breakdown */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-purple-600" />
            <h2 className="font-semibold text-gray-900">Objective Mastery Breakdown</h2>
          </div>
          <div className="space-y-4">
            {progressEntries.map((entry) => (
              <div key={entry.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-medium text-gray-500">Week {entry.week}</span>
                      <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                        {entry.subject}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{entry.objective}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-gray-900">{entry.score}</span>
                    <StatusBadge status={entry.status} />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{entry.recommendation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h2 className="font-semibold text-gray-900">AI Recommendations</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Focus Areas</h3>
              <ul className="space-y-2">
                {needsAttentionCount > 0 ? (
                  <>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-red-500 mt-0.5">•</span>
                      <span>Requires additional support in {needsAttentionCount} objective(s)</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-yellow-500 mt-0.5">•</span>
                      <span>Consider one-on-one tutoring sessions</span>
                    </li>
                  </>
                ) : (
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-green-500 mt-0.5">•</span>
                    <span>Student is performing well across all objectives</span>
                  </li>
                )}
              </ul>
            </div>

            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Strengths</h3>
              <ul className="space-y-2">
                {masteredCount > 0 && (
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-green-500 mt-0.5">•</span>
                    <span>Mastered {masteredCount} objective(s)</span>
                  </li>
                )}
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Showing consistent progress</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Next Steps</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-purple-500 mt-0.5">•</span>
                  <span>Review progress in 2 weeks</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-purple-500 mt-0.5">•</span>
                  <span>Provide additional practice materials</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
