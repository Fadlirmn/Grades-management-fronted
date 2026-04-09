import { RouterProvider } from 'react-router';
import { router } from './routes';
import { RoleProvider } from './contexts/RoleContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RoleProvider>
          <RouterProvider router={router} />
        </RoleProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}