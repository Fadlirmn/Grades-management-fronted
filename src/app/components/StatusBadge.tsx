interface StatusBadgeProps {
  status: 'Belum' | 'Cukup' | 'Menguasai';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    'Belum': 'bg-red-100 text-red-700 border-red-200',
    'Cukup': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Menguasai': 'bg-green-100 text-green-700 border-green-200',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
      {status}
    </span>
  );
}
