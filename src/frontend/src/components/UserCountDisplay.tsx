import { Users, Loader2 } from 'lucide-react';

interface UserCountDisplayProps {
  count: number;
  isLoading: boolean;
}

export function UserCountDisplay({ count, isLoading }: UserCountDisplayProps) {
  return (
    <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl px-6 py-3 shadow-lg">
      <div className="flex items-center gap-3">
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Users className="w-5 h-5" />
        )}
        <div>
          <p className="text-xs font-medium opacity-90">Total Users</p>
          <p className="text-2xl font-bold">{count}</p>
        </div>
      </div>
    </div>
  );
}
