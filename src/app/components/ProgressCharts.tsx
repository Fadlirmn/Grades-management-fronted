import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { weeklyTrend, subjectAverages } from '../data/mockData';
import { useTheme } from '../contexts/ThemeContext';

export function ProgressCharts() {
  const { isDark } = useTheme();

  const chartColors = {
    grid: isDark ? '#374151' : '#f0f0f0',
    axis: isDark ? '#9ca3af' : '#9ca3af',
    text: isDark ? '#e5e7eb' : '#6b7280',
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Line Chart - Weekly Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 md:p-6">
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white">Weekly Progress Trend</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Average score across all students</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyTrend} key="weekly-trend-chart">
            <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} key="grid-weekly" />
            <XAxis 
              dataKey="week" 
              stroke={chartColors.axis}
              style={{ fontSize: '12px', fill: chartColors.text }}
              key="xaxis-weekly"
            />
            <YAxis 
              stroke={chartColors.axis}
              style={{ fontSize: '12px', fill: chartColors.text }}
              domain={[0, 100]}
              key="yaxis-weekly"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDark ? '#1f2937' : '#fff',
                border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                color: isDark ? '#e5e7eb' : '#1f2937'
              }}
              key="tooltip-weekly"
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px', color: chartColors.text }}
              key="legend-weekly"
            />
            <Line 
              type="monotone" 
              dataKey="average" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
              name="Average Score"
              key="line-average"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart - Subject Averages */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 md:p-6">
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white">Average Score by Subject</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Performance comparison across subjects</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={subjectAverages} key="subject-average-chart">
            <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} key="grid-subject" />
            <XAxis 
              dataKey="subject" 
              stroke={chartColors.axis}
              style={{ fontSize: '11px', fill: chartColors.text }}
              angle={-15}
              textAnchor="end"
              height={80}
              key="xaxis-subject"
            />
            <YAxis 
              stroke={chartColors.axis}
              style={{ fontSize: '12px', fill: chartColors.text }}
              domain={[0, 100]}
              key="yaxis-subject"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDark ? '#1f2937' : '#fff',
                border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                color: isDark ? '#e5e7eb' : '#1f2937'
              }}
              key="tooltip-subject"
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px', color: chartColors.text }}
              key="legend-subject"
            />
            <Bar 
              dataKey="average" 
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
              name="Average Score"
              key="bar-average"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}