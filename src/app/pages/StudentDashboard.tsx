import { useRole } from '../contexts/RoleContext';
import { 
  getStudentById, 
  getProgressByStudent, 
  subjects, 
  studentAssignments,
  weeklyProgressByStudent 
} from '../data/mockData';
import { ProgressBar } from '../components/ProgressBar';
import { StatusBadge } from '../components/StatusBadge';
import { BookOpen, Target, TrendingUp, Sparkles, Calendar, CheckCircle2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function StudentDashboard() {
  const { currentStudentId } = useRole();
  const student = getStudentById(currentStudentId || '1');
  const progressEntries = getProgressByStudent(currentStudentId || '1');
  const weeklyProgress = weeklyProgressByStudent[currentStudentId || '1'] || [];

  if (!student) return null;

  // Calculate stats
  const averageScore = progressEntries.length > 0
    ? Math.round(progressEntries.reduce((sum, entry) => sum + entry.score, 0) / progressEntries.length)
    : 0;
  
  const masteredCount = progressEntries.filter(e => e.status === 'Menguasai').length;
  const masteryPercentage = progressEntries.length > 0
    ? (masteredCount / progressEntries.length) * 100
    : 0;

  // Get subject performance
  const subjectPerformance = subjects.map(subject => {
    const subjectEntries = progressEntries.filter(e => e.subject === subject.name);
    const avg = subjectEntries.length > 0
      ? Math.round(subjectEntries.reduce((sum, e) => sum + e.score, 0) / subjectEntries.length)
      : 0;
    
    const status = avg >= 80 ? 'Menguasai' : avg >= 65 ? 'Cukup' : 'Belum';
    
    return {
      ...subject,
      score: avg,
      status: status as 'Belum' | 'Cukup' | 'Menguasai',
      entries: subjectEntries.length
    };
  }).filter(s => s.entries > 0);

  const pendingAssignments = studentAssignments.filter(a => a.status === 'pending');
  const completedAssignments = studentAssignments.filter(a => a.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Hello, {student.name.split(' ')[0]}! 👋</h1>
            <p className="text-blue-100 text-lg">Ready to learn today?</p>
            <div className="mt-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm font-medium">{student.grade}</span>
            </div>
          </div>
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <span className="text-4xl font-bold">{student.avatar}</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Mastery Level</p>
              <p className="text-2xl font-bold text-gray-900">{Math.round(masteryPercentage)}%</p>
            </div>
          </div>
          <ProgressBar value={masteryPercentage} color="green" showLabel={false} />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-gray-900">{averageScore}</p>
            </div>
          </div>
          <p className="text-xs text-gray-600">Keep up the great work!</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Objectives Mastered</p>
              <p className="text-2xl font-bold text-gray-900">{masteredCount}</p>
            </div>
          </div>
          <p className="text-xs text-gray-600">Out of {progressEntries.length} total</p>
        </div>
      </div>

      {/* Progress Over Time */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h2 className="font-semibold text-gray-900">Your Progress Journey</h2>
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
              }}
            />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Subject Cards */}
      <div>
        <h2 className="font-semibold text-gray-900 mb-4">Your Subjects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjectPerformance.map((subject) => (
            <div 
              key={subject.id}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 ${subject.color} rounded-xl flex items-center justify-center`}>
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <StatusBadge status={subject.status} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{subject.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Score</span>
                <span className="text-2xl font-bold text-gray-900">{subject.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assignments */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-orange-600" />
            <h2 className="font-semibold text-gray-900">Assignments</h2>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-xs font-medium text-gray-600 uppercase mb-2">Pending ({pendingAssignments.length})</p>
              {pendingAssignments.map((assignment) => (
                <div key={assignment.id} className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{assignment.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 bg-white text-gray-700 rounded">
                          {assignment.subject}
                        </span>
                        <span className="text-xs text-gray-600">{assignment.dueDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs font-medium text-gray-600 uppercase mb-2">Completed ({completedAssignments.length})</p>
              {completedAssignments.map((assignment) => (
                <div key={assignment.id} className="bg-green-50 border border-green-200 rounded-lg p-3 mb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <p className="text-sm font-medium text-gray-900">{assignment.title}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 bg-white text-gray-700 rounded">
                          {assignment.subject}
                        </span>
                        {assignment.score && (
                          <span className="text-xs font-semibold text-green-700">
                            Score: {assignment.score}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h2 className="font-semibold text-gray-900">AI Tips for You</h2>
          </div>
          
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <p className="text-sm font-medium text-gray-900 mb-2">🎯 Great Progress!</p>
              <p className="text-sm text-gray-700">
                You're doing amazing in {subjectPerformance[0]?.name}! Keep practicing to maintain this level.
              </p>
            </div>

            {progressEntries.filter(e => e.status === 'Cukup').length > 0 && (
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <p className="text-sm font-medium text-gray-900 mb-2">💪 Areas to Improve</p>
                <p className="text-sm text-gray-700">
                  Focus more on topics where you scored "Cukup". A little extra practice will help you master them!
                </p>
              </div>
            )}

            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <p className="text-sm font-medium text-gray-900 mb-2">⭐ Pro Tip</p>
              <p className="text-sm text-gray-700">
                Try studying for 25 minutes, then take a 5-minute break. This helps you stay focused!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Objective Breakdown */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Your Learning Objectives</h2>
        <div className="space-y-3">
          {progressEntries.slice(0, 6).map((entry) => (
            <div key={entry.id} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
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
