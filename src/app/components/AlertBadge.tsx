import { AlertTriangle, TrendingUp, Star } from 'lucide-react';

interface AlertBadgeProps {
  type: 'warning' | 'improving' | 'excellent';
  size?: 'sm' | 'md';
}

export function AlertBadge({ type, size = 'md' }: AlertBadgeProps) {
  const config = {
    warning: {
      icon: AlertTriangle,
      bg: 'bg-red-100',
      text: 'text-red-700',
      border: 'border-red-200',
    },
    improving: {
      icon: TrendingUp,
      bg: 'bg-yellow-100',
      text: 'text-yellow-700',
      border: 'border-yellow-200',
    },
    excellent: {
      icon: Star,
      bg: 'bg-green-100',
      text: 'text-green-700',
      border: 'border-green-200',
    },
  };

  const Icon = config[type].icon;
  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
  const padding = size === 'sm' ? 'p-1' : 'p-1.5';

  return (
    <div className={`inline-flex items-center justify-center ${padding} rounded-md border ${config[type].bg} ${config[type].border}`}>
      <Icon className={`${iconSize} ${config[type].text}`} />
    </div>
  );
}
