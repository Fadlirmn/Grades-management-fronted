import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { StudentDetail } from './pages/StudentDetail';
import { Students } from './pages/Students';
import { Subjects } from './pages/Subjects';
import { Assignments } from './pages/Assignments';
import { ProgressTracking } from './pages/ProgressTracking';
import { Reports } from './pages/Reports';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: 'students', Component: Students },
      { path: 'student/:id', Component: StudentDetail },
      { path: 'subjects', Component: Subjects },
      { path: 'assignments', Component: Assignments },
      { path: 'progress', Component: ProgressTracking },
      { path: 'reports', Component: Reports },
      { path: '*', Component: NotFound },
    ],
  },
]);
