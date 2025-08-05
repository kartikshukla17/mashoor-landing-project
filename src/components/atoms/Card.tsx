import { cn } from '@/lib/utils';

export default function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('rounded-lg border bg-white dark:bg-primary shadow', className)}>{children}</div>;
}