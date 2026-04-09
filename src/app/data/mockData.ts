// Mock data for the Grades Management System

export interface Student {
  id: string;
  name: string;
  avatar: string;
  email: string;
  grade: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  color: string;
}

export interface ProgressEntry {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  week: number;
  objective: string;
  score: number;
  status: 'Belum' | 'Cukup' | 'Menguasai';
  recommendation: string;
  alert?: boolean;
}

export interface WeeklyProgress {
  week: number;
  score: number;
}

export interface Alert {
  id: string;
  studentId: string;
  studentName: string;
  type: 'warning' | 'improving' | 'excellent';
  message: string;
}

export interface AIInsight {
  id: string;
  type: 'intervention' | 'recommendation' | 'motivation';
  message: string;
  studentId?: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'pending' | 'completed';
  score?: number;
}

export const students: Student[] = [
  { id: '1', name: 'Ahmad Fauzi', avatar: 'AF', email: 'ahmad.fauzi@student.com', grade: 'Kelas 10A' },
  { id: '2', name: 'Siti Nurhaliza', avatar: 'SN', email: 'siti.nurhaliza@student.com', grade: 'Kelas 10A' },
  { id: '3', name: 'Budi Santoso', avatar: 'BS', email: 'budi.santoso@student.com', grade: 'Kelas 10B' },
  { id: '4', name: 'Dewi Lestari', avatar: 'DL', email: 'dewi.lestari@student.com', grade: 'Kelas 10B' },
  { id: '5', name: 'Rizky Ramadhan', avatar: 'RR', email: 'rizky.ramadhan@student.com', grade: 'Kelas 10A' },
  { id: '6', name: 'Maya Anggraini', avatar: 'MA', email: 'maya.anggraini@student.com', grade: 'Kelas 10C' },
];

export const subjects: Subject[] = [
  { id: '1', name: 'Matematika', code: 'MAT', color: 'bg-blue-500' },
  { id: '2', name: 'Bahasa Indonesia', code: 'BIN', color: 'bg-green-500' },
  { id: '3', name: 'Fisika', code: 'FIS', color: 'bg-purple-500' },
  { id: '4', name: 'Kimia', code: 'KIM', color: 'bg-orange-500' },
  { id: '5', name: 'Biologi', code: 'BIO', color: 'bg-teal-500' },
];

export const progressData: ProgressEntry[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'Ahmad Fauzi',
    subject: 'Matematika',
    week: 1,
    objective: 'Memahami konsep aljabar dasar',
    score: 85,
    status: 'Menguasai',
    recommendation: 'Lanjutkan ke materi aljabar lanjutan',
    alert: false
  },
  {
    id: '2',
    studentId: '1',
    studentName: 'Ahmad Fauzi',
    subject: 'Fisika',
    week: 1,
    objective: 'Memahami hukum Newton',
    score: 72,
    status: 'Cukup',
    recommendation: 'Tambahkan latihan soal aplikasi hukum Newton',
    alert: false
  },
  {
    id: '3',
    studentId: '2',
    studentName: 'Siti Nurhaliza',
    subject: 'Matematika',
    week: 1,
    objective: 'Memahami konsep aljabar dasar',
    score: 92,
    status: 'Menguasai',
    recommendation: 'Siswa menguasai dengan baik, berikan tantangan tambahan',
    alert: false
  },
  {
    id: '4',
    studentId: '2',
    studentName: 'Siti Nurhaliza',
    subject: 'Bahasa Indonesia',
    week: 1,
    objective: 'Menganalisis struktur teks argumentasi',
    score: 88,
    status: 'Menguasai',
    recommendation: 'Berikan contoh teks yang lebih kompleks',
    alert: false
  },
  {
    id: '5',
    studentId: '3',
    studentName: 'Budi Santoso',
    subject: 'Matematika',
    week: 1,
    objective: 'Memahami konsep aljabar dasar',
    score: 58,
    status: 'Belum',
    recommendation: 'Perlu bimbingan intensif pada konsep dasar variabel',
    alert: true
  },
  {
    id: '6',
    studentId: '3',
    studentName: 'Budi Santoso',
    subject: 'Fisika',
    week: 1,
    objective: 'Memahami hukum Newton',
    score: 65,
    status: 'Cukup',
    recommendation: 'Latihan tambahan dengan contoh kasus nyata',
    alert: false
  },
  {
    id: '7',
    studentId: '4',
    studentName: 'Dewi Lestari',
    subject: 'Biologi',
    week: 1,
    objective: 'Memahami struktur sel',
    score: 95,
    status: 'Menguasai',
    recommendation: 'Excellent! Siap untuk materi sel kompleks',
    alert: false
  },
  {
    id: '8',
    studentId: '5',
    studentName: 'Rizky Ramadhan',
    subject: 'Kimia',
    week: 1,
    objective: 'Memahami tabel periodik',
    score: 78,
    status: 'Cukup',
    recommendation: 'Perkuat pemahaman golongan dan periode',
    alert: false
  },
  {
    id: '9',
    studentId: '6',
    studentName: 'Maya Anggraini',
    subject: 'Matematika',
    week: 1,
    objective: 'Memahami konsep aljabar dasar',
    score: 82,
    status: 'Menguasai',
    recommendation: 'Bagus! Siap lanjut ke materi berikutnya',
    alert: false
  },
  {
    id: '10',
    studentId: '1',
    studentName: 'Ahmad Fauzi',
    subject: 'Matematika',
    week: 2,
    objective: 'Menyelesaikan persamaan linear',
    score: 88,
    status: 'Menguasai',
    recommendation: 'Progress sangat baik, pertahankan',
    alert: false
  },
  {
    id: '11',
    studentId: '1',
    studentName: 'Ahmad Fauzi',
    subject: 'Kimia',
    week: 2,
    objective: 'Memahami reaksi kimia',
    score: 80,
    status: 'Menguasai',
    recommendation: 'Pemahaman baik, lanjutkan',
    alert: false
  },
  {
    id: '12',
    studentId: '3',
    studentName: 'Budi Santoso',
    subject: 'Bahasa Indonesia',
    week: 2,
    objective: 'Menulis paragraf argumentatif',
    score: 55,
    status: 'Belum',
    recommendation: 'Perlu latihan menulis lebih intensif',
    alert: true
  },
];

export const weeklyProgressByStudent: Record<string, WeeklyProgress[]> = {
  '1': [
    { week: 1, score: 78 },
    { week: 2, score: 82 },
    { week: 3, score: 85 },
    { week: 4, score: 87 },
  ],
  '2': [
    { week: 1, score: 88 },
    { week: 2, score: 90 },
    { week: 3, score: 92 },
    { week: 4, score: 91 },
  ],
  '3': [
    { week: 1, score: 55 },
    { week: 2, score: 60 },
    { week: 3, score: 62 },
    { week: 4, score: 65 },
  ],
  '4': [
    { week: 1, score: 92 },
    { week: 2, score: 93 },
    { week: 3, score: 95 },
    { week: 4, score: 94 },
  ],
  '5': [
    { week: 1, score: 75 },
    { week: 2, score: 78 },
    { week: 3, score: 76 },
    { week: 4, score: 80 },
  ],
  '6': [
    { week: 1, score: 80 },
    { week: 2, score: 82 },
    { week: 3, score: 84 },
    { week: 4, score: 86 },
  ],
};

export const subjectAverages = [
  { subject: 'Matematika', average: 79 },
  { subject: 'Fisika', average: 74 },
  { subject: 'Kimia', average: 76 },
  { subject: 'Biologi', average: 82 },
  { subject: 'Bahasa Indonesia', average: 85 },
];

export const weeklyTrend = [
  { week: 'Week 1', average: 76 },
  { week: 'Week 2', average: 79 },
  { week: 'Week 3', average: 81 },
  { week: 'Week 4', average: 83 },
];

export const alerts: Alert[] = [
  {
    id: '1',
    studentId: '3',
    studentName: 'Budi Santoso',
    type: 'warning',
    message: 'Membutuhkan perhatian khusus dalam Matematika dan Bahasa Indonesia'
  },
  {
    id: '2',
    studentId: '5',
    studentName: 'Rizky Ramadhan',
    type: 'improving',
    message: 'Menunjukkan peningkatan konsisten dalam 2 minggu terakhir'
  },
  {
    id: '3',
    studentId: '2',
    studentName: 'Siti Nurhaliza',
    type: 'excellent',
    message: 'Performa luar biasa di semua mata pelajaran'
  },
];

export const aiInsights: AIInsight[] = [
  {
    id: '1',
    type: 'intervention',
    message: '3 siswa memerlukan bimbingan tambahan dalam konsep aljabar',
    studentId: '3'
  },
  {
    id: '2',
    type: 'recommendation',
    message: 'Pertimbangkan sesi remedial untuk Matematika minggu depan'
  },
  {
    id: '3',
    type: 'intervention',
    message: 'Budi Santoso berisiko tertinggal, rekomendasikan tutor personal',
    studentId: '3'
  },
];

export const studentAssignments: Assignment[] = [
  {
    id: '1',
    title: 'Latihan Aljabar Set 1',
    subject: 'Matematika',
    dueDate: 'April 5, 2026',
    status: 'completed',
    score: 85
  },
  {
    id: '2',
    title: 'Essay Hukum Newton',
    subject: 'Fisika',
    dueDate: 'April 8, 2026',
    status: 'pending'
  },
  {
    id: '3',
    title: 'Persamaan Linear',
    subject: 'Matematika',
    dueDate: 'April 10, 2026',
    status: 'pending'
  },
];

export const difficultObjectives = [
  { objective: 'Memahami konsep aljabar dasar', studentsStruggling: 3, subject: 'Matematika' },
  { objective: 'Menulis paragraf argumentatif', studentsStruggling: 2, subject: 'Bahasa Indonesia' },
  { objective: 'Memahami hukum Newton', studentsStruggling: 2, subject: 'Fisika' },
];

export function getStudentById(id: string): Student | undefined {
  return students.find(s => s.id === id);
}

export function getProgressByStudent(studentId: string): ProgressEntry[] {
  return progressData.filter(p => p.studentId === studentId);
}