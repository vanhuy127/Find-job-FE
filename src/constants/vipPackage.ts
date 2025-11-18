export const VIP_STYLES: Record<
  number,
  {
    border: string;
    shadow: string;
    ring: string;
    bg: string;
    bgDark: string;
    glow: string;
  }
> = {
  0: {
    border: 'border-emerald-400 dark:border-emerald-500',
    shadow: 'shadow-emerald-500/30',
    ring: 'ring-2 ring-emerald-400/50 dark:ring-emerald-500/60',
    bg: 'bg-emerald-50',
    bgDark: 'dark:bg-emerald-900',
    glow: 'group-hover:shadow-emerald-500/40',
  },
  1: {
    border: 'border-slate-400 dark:border-slate-500',
    shadow: 'shadow-slate-400/40',
    ring: 'ring-2 ring-slate-400/60 dark:ring-slate-500/70',
    bg: 'bg-slate-100',
    bgDark: 'dark:bg-neutral-800',
    glow: 'group-hover:shadow-slate-400/50',
  },
  2: {
    border: 'border-amber-400 dark:border-amber-500',
    shadow: 'shadow-amber-500/50',
    ring: 'ring-2 ring-amber-400/70 dark:ring-amber-500/80',
    bg: 'bg-amber-50',
    bgDark: 'dark:bg-amber-900',
    glow: 'group-hover:shadow-amber-500/60',
  },
  3: {
    border: 'border-violet-400 dark:border-violet-500',
    shadow: 'shadow-violet-500/50',
    ring: 'ring-2 ring-violet-400/70 dark:ring-violet-500/80',
    bg: 'bg-violet-50',
    bgDark: 'dark:bg-violet-900',
    glow: 'group-hover:shadow-violet-500/60',
  },
  4: {
    border: 'border-cyan-400 dark:border-cyan-500',
    shadow: 'shadow-cyan-500/60',
    ring: 'ring-2 ring-cyan-400/80 dark:ring-cyan-500/90',
    bg: 'bg-cyan-50',
    bgDark: 'dark:bg-cyan-900',
    glow: 'group-hover:shadow-cyan-500/70',
  },
};
