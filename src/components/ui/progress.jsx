import { cn } from '../../lib/utils';

export function Progress({ value = 0, className = '' }) {
  return (
    <div className={cn('h-2 overflow-hidden rounded-full border border-seismic-300/30 bg-black/40', className)}>
      <div
        className="h-full bg-gradient-to-r from-seismic-500 to-seismic-300 transition-all duration-300"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}
