import { Link } from 'react-router';
import { students } from '../data/mockData';
import { Mail, ExternalLink } from 'lucide-react';

export function Students() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Students</h1>
        <p className="text-gray-600 mt-1">Manage and view all students</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <div 
            key={student.id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-semibold">
                {student.avatar}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{student.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{student.grade}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Mail className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-600">{student.email}</span>
                </div>
              </div>
            </div>
            <Link
              to={`/student/${student.id}`}
              className="mt-4 w-full bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors"
            >
              View Details
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
