import { subjects } from '../data/mockData';
import { BookOpen } from 'lucide-react';

export function Subjects() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Subjects</h1>
        <p className="text-gray-600 mt-1">Manage curriculum subjects</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <div 
            key={subject.id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 ${subject.color} rounded-xl flex items-center justify-center`}>
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{subject.name}</h3>
                <p className="text-sm text-gray-600 mt-1">Code: {subject.code}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Active Students</span>
                <span className="font-medium text-gray-900">24</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-gray-600">Objectives</span>
                <span className="font-medium text-gray-900">12</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
