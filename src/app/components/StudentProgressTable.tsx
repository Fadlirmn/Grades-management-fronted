import { Link } from 'react-router';
import { StatusBadge } from './StatusBadge';
import { progressData } from '../data/mockData';
import { ExternalLink, AlertTriangle } from 'lucide-react';

export function StudentProgressTable() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Week
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Objective
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Score
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Recommendation
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {progressData.slice(0, 8).map((entry) => (
              <tr key={entry.id} className={`hover:bg-gray-50 transition-colors ${entry.alert ? 'bg-red-50/50' : ''}`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                      {entry.studentName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="ml-3 flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-900">{entry.studentName}</p>
                      {entry.alert && (
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{entry.subject}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-600">Week {entry.week}</span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-900 max-w-xs">{entry.objective}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">{entry.score}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={entry.status} />
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-600 max-w-xs">{entry.recommendation}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link 
                    to={`/student/${entry.studentId}`}
                    className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 text-sm"
                  >
                    View
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}