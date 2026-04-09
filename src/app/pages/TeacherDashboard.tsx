import { OverviewCard } from '../components/OverviewCard';
import { StudentProgressTable } from '../components/StudentProgressTable';
import { ProgressCharts } from '../components/ProgressCharts';
import { Users, AlertTriangle, Award, Target, Sparkles, AlertCircle } from 'lucide-react';
import { students, progressData, alerts, aiInsights, difficultObjectives } from '../data/mockData';
import { AlertBadge } from '../components/AlertBadge';
import { Link } from 'react-router';

export function TeacherDashboard() {
  const studentsNeedingHelp = progressData.filter(p => p.status === 'Belum').length;
  const averageScore = Math.round(
    progressData.reduce((sum, p) => sum + p.score, 0) / progressData.length
  );
  const activeObjectives = new Set(progressData.map(p => p.objective)).size;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Teacher Dashboard</h1>
        <p className="text-gray-600 mt-1">Monitor student progress and identify learning gaps</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <OverviewCard
          title="Total Students"
          value={students.length}
          change="+3 from last month"
          changeType="positive"
          icon={Users}
          iconBg="bg-blue-500"
        />
        <OverviewCard
          title="Students Below Target"
          value={studentsNeedingHelp}
          change="Needs attention"
          changeType="negative"
          icon={AlertTriangle}
          iconBg="bg-red-500"
        />
        <OverviewCard
          title="Average Score"
          value={averageScore}
          change="+3 points this week"
          changeType="positive"
          icon={Award}
          iconBg="bg-green-500"
        />
        <OverviewCard
          title="Active Objectives"
          value={activeObjectives}
          change="Across all subjects"
          changeType="neutral"
          icon={Target}
          iconBg="bg-purple-500"
        />
      </div>

      {/* AI Insights and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Insights Panel */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">AI Insights</h2>
              <p className="text-xs text-gray-600">Powered by intelligent analysis</p>
            </div>
          </div>
          <div className="space-y-3">
            {aiInsights.map((insight) => (
              <div key={insight.id} className="bg-white rounded-lg p-4 border border-blue-200">
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 ${
                    insight.type === 'intervention' 
                      ? 'text-red-500' 
                      : 'text-blue-500'
                  }`}>
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{insight.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Students Needing Attention */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <div>
              <h2 className="font-semibold text-gray-900">Students Needing Attention</h2>
              <p className="text-xs text-gray-600">Immediate action recommended</p>
            </div>
          </div>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <Link
                key={alert.id}
                to={`/student/${alert.studentId}`}
                className="block bg-gray-50 hover:bg-gray-100 rounded-lg p-4 border border-gray-200 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-gray-900">{alert.studentName}</p>
                      <AlertBadge type={alert.type} size="sm" />
                    </div>
                    <p className="text-sm text-gray-600">{alert.message}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Most Difficult Objectives */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Most Difficult Objectives</h2>
          <p className="text-gray-600 mt-1">Topics where students are struggling</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {difficultObjectives.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded">
                  {item.subject}
                </span>
                <span className="text-lg font-semibold text-red-600">{item.studentsStruggling}</span>
              </div>
              <p className="text-sm font-medium text-gray-900 mt-2">{item.objective}</p>
              <p className="text-xs text-gray-600 mt-1">
                {item.studentsStruggling} {item.studentsStruggling === 1 ? 'student' : 'students'} struggling
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Charts */}
      <ProgressCharts />

      {/* Class Performance Table */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Class Performance</h2>
          <p className="text-gray-600 mt-1">Detailed view of student progress and status</p>
        </div>
        <StudentProgressTable />
      </div>
    </div>
  );
}
