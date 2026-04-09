import { createContext, useContext, useState, ReactNode } from 'react';

export type Role = 'teacher' | 'student' | 'parent';

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
  currentStudentId?: string;
  setCurrentStudentId: (id: string) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('teacher');
  const [currentStudentId, setCurrentStudentId] = useState<string>('1'); // Default student for student/parent view

  return (
    <RoleContext.Provider value={{ role, setRole, currentStudentId, setCurrentStudentId }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within RoleProvider');
  }
  return context;
}
