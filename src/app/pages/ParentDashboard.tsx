import { useRole } from '../contexts/RoleContext';
import { 
  getStudentById, 
  getProgressByStudent, 
  subjects, 
  weeklyProgressByStudent,
  alerts 
} from '../data/mockData';
import { ProgressBar } from '../components/ProgressBar';
import { StatusBadge } from '../components/StatusBadge';
import { AlertBadge } from '../components/AlertBadge';
import { User, TrendingUp, BookOpen, AlertCircle, Sparkles, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function ParentDashboard() {
  const { currentStudentId } = useRole();
  const student = getStudentById(currentStudentId || '1');
  const progressEntries = getProgressByStudent(currentStudentId || '1');
  const weeklyProgress = weeklyProgressByStudent[currentStudentId || '1'] || [];
  const studentAlerts = alerts.filter(a => a.studentId === currentStudentId);

  if (!student) return null;

  // Calculate stats
  const averageScore = progressEntries.length > 0
    ? Math.round(progressEntries.reduce((sum, entry) => sum + entry.score, 0) / progressEntries.length)
    : 0;
  
  const masteredCount = progressEntries.filter(e => e.status === 'Menguasai').length;
  const needsHelpCount = progressEntries.filter(e => e.status === 'Belum').length;
  const progressingCount = progressEntries.filter(e => e.status === 'Cukup').length;

  // Overall status
  const overallStatus = needsHelpCount > 2 
    ? 'Needs Attention' 
    : needsHelpCount > 0 
    ? 'Good Progress' 
    : 'Excellent';

  const statusColor = needsHelpCount > 2 
    ? 'text-red-600' 
    : needsHelpCount > 0 
    ? 'text-yellow-600' 
    : 'text-green-600';

  // Get subject performance
  const subjectPerformance = subjects.map(subject => {
    const subjectEntries = progressEntries.filter(e => e.subject === subject.name);
    const avg = subjectEntries.length > 0
      ? Math.round(subjectEntries.reduce((sum, e) => sum + e.score, 0) / subjectEntries.length)
      : 0;
    
    const status = avg >= 80 ? 'Menguasai' : avg >= 65 ? 'Cukup' : 'Belum';
    const trend = subjectEntries.length >= 2 
      ? subjectEntries[subjectEntries.length - 1].score - subjectEntries[0].score
      : 0;
    
    return {
      ...subject,
      score: avg,
      status: status as 'Belum' | 'Cukup' | 'Menguasai',
      entries: subjectEntries.length,
      trend
    };
  }).filter(s => s.entries > 0);

  return (
    <div className="space-y-6">
      {/* Child Overview Card */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
              {student.avatar}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
              <p className="text-gray-600 mt-1">{student.grade}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 mb-1">Overall Performance</p>
            <p className={`text-2xl font-bold ${statusColor}`}>{overallStatus}</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">{averageScore}</p>
            <p className="text-sm text-gray-600 mt-1">Average Score</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">{masteredCount}</p>
            <p className="text-sm text-gray-600 mt-1">Mastered</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-yellow-600">{progressingCount}</p>
            <p className="text-sm text-gray-600 mt-1">Progressing</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-600">{needsHelpCount}</p>
            <p className="text-sm text-gray-600 mt-1">Needs Help</p>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      {studentAlerts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {studentAlerts.map((alert) => (
            <div 
              key={alert.id}
              className={`rounded-xl border-2 p-5 ${
                alert.type === 'warning' 
                  ? 'bg-red-50 border-red-200' 
                  : alert.type === 'improving'
                  ? 'bg-yellow-50 border-yellow-200'
                  : 'bg-green-50 border-green-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <AlertBadge type={alert.type} />
                <div>
                  <p className={`text-sm font-semibold mb-1 ${
                    alert.type === 'warning' 
                      ? 'text-red-900' 
                      : alert.type === 'improving'
                      ? 'text-yellow-900'
                      : 'text-green-900'
                  }`}>
                    {alert.type === 'warning' ? 'Needs Attention' : alert.type === 'improving' ? 'Improving' : 'Excellent!'}
                  </p>
                  <p className="text-sm text-gray-700">{alert.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Weekly Progress Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Progress Over Time</h2>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={weeklyProgress}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="week" 
              stroke="#9ca3af"
              style={{ fontSize: '14px' }}
              label={{ value: 'Week', position: 'insideBottom', offset: -5, style: { fontSize: '14px' } }}
            />
            <YAxis 
              stroke="#9ca3af"
              style={{ fontSize: '14px' }}
              domain={[0, 100]}
              label={{ value: 'Score', angle: -90, position: 'insideLeft', style: { fontSize: '14px' } }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600
              }}
            />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="#3b82f6" 
              strokeWidth={4}
              dot={{ fill: '#3b82f6', r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Subject Performance */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg font-semibold text-gray-900">Subject Performance</h2>
        </div>
        <div className="space-y-4">
          {subjectPerformance.map((subject) => (
            <div key={subject.id} className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${subject.color} rounded-lg flex items-center justify-center`}>
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{subject.name}</h3>
                    <p className="text-sm text-gray-600">{subject.code}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right mr-3">
                    <p className="text-3xl font-bold text-gray-900">{subject.score}</p>
                    <p className="text-xs text-gray-600">Average</p>
                  </div>
                  <StatusBadge status={subject.status} />
                  {subject.trend !== 0 && (
                    <div className={`flex items-center gap-1 ${
                      subject.trend > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <TrendingUp className={`w-4 h-4 ${subject.trend < 0 ? 'rotate-180' : ''}`} />
                      <span className="text-sm font-medium">{Math.abs(subject.trend)}</span>
                    </div>
                  )}
                </div>
              </div>
              <ProgressBar value={subject.score} showLabel={false} size="lg" />
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations for Parents */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Guidance for Parents</h2>
            <p className="text-sm text-gray-600">Simple recommendations to support learning</p>
          </div>
        </div>
        
        <div className="space-y-3">
          {needsHelpCount > 0 ? (
            <>
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <p className="font-medium text-gray-900 mb-2">📚 How to Help at Home</p>
                <p className="text-sm text-gray-700">
                  Encourage {student.name.split(' ')[0]} to spend 20-30 minutes daily on subjects marked as "Belum". 
                  Regular practice makes a big difference!
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <p className="font-medium text-gray-900 mb-2">💬 Talk to Teacher</p>
                <p className="text-sm text-gray-700">
                  Consider scheduling a meeting with the teacher to discuss personalized learning strategies 
                  for areas needing improvement.
                </p>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <p className="font-medium text-gray-900 mb-2">🌟 Great Job!</p>
              <p className="text-sm text-gray-700">
                {student.name.split(' ')[0]} is performing excellently! Continue to encourage consistent 
                study habits and celebrate their achievements.
              </p>
            </div>
          )}
          
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <p className="font-medium text-gray-900 mb-2">⏰ Study Tips</p>
            <p className="text-sm text-gray-700">
              Help maintain a consistent study schedule. A quiet, comfortable study space at home 
              can significantly improve focus and retention.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activities Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-gray-700" />
          <h2 className="text-lg font-semibold text-gray-900">This Week's Summary</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Subjects Studied</p>
            <p className="text-2xl font-bold text-gray-900">{subjectPerformance.length}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Objectives Covered</p>
            <p className="text-2xl font-bold text-gray-900">{progressEntries.length}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Current Week</p>
            <p className="text-2xl font-bold text-gray-900">Week {weeklyProgress.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
