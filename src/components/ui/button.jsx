import { cn } from '../../lib/utils';

export function Button({ className = '', variant = 'default', ...props }) {
  const base = 'seismic-btn';
  const styles = variant === 'primary' ? 'seismic-btn-primary' : base;
  return <button className={cn(styles, className)} {...props} />;
}
