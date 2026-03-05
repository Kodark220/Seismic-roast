import { cn } from '../../lib/utils';

export function Input({ className = '', ...props }) {
  return <input className={cn('seismic-input', className)} {...props} />;
}
