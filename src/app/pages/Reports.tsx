import { BarChart3, Download, FileText, Calendar } from 'lucide-react';

const reports = [
  {
    id: '1',
    title: 'Monthly Performance Report',
    description: 'Comprehensive analysis of student performance for March 2026',
    type: 'Monthly',
    date: 'March 31, 2026',
    format: 'PDF'
  },
  {
    id: '2',
    title: 'Subject-wise Analysis',
    description: 'Detailed breakdown of performance across all subjects',
    type: 'Custom',
    date: 'April 1, 2026',
    format: 'Excel'
  },
  {
    id: '3',
    title: 'Student Progress Summary',
    description: 'Individual student progress tracking and recommendations',
    type: 'Weekly',
    date: 'March 28, 2026',
    format: 'PDF'
  },
  {
    id: '4',
    title: 'Objective Mastery Report',
    description: 'Analysis of curriculum objective completion rates',
    type: 'Monthly',
    date: 'March 31, 2026',
    format: 'PDF'
  },
];

export function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
            <p className="text-gray-600">Generate and download comprehensive reports</p>
          </div>
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2 transition-colors">
          <FileText className="w-4 h-4" />
          Generate New Report
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Total Reports</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{reports.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-600">This Month</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">2</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Last Generated</p>
          <p className="text-sm font-medium text-gray-900 mt-1">April 1, 2026</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Format</p>
          <p className="text-sm font-medium text-gray-900 mt-1">PDF, Excel</p>
        </div>
      </div>

      {/* Reports List */}
      <div className="grid gap-4">
        {reports.map((report) => (
          <div 
            key={report.id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{report.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                      {report.type}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Calendar className="w-3 h-3" />
                      {report.date}
                    </div>
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                      {report.format}
                    </span>
                  </div>
                </div>
              </div>
              <button className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2 transition-colors">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
