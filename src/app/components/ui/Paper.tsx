import type { HTMLAttributes } from 'react'
import cn from '@lib/cn'

type PaperElevation = 'none' | 'sm' | 'md' | 'lg'

type PaperProps = {
  elevation?: PaperElevation
  hoverable?: boolean
} & HTMLAttributes<HTMLDivElement>

const elevationStyles: Record<PaperElevation, string> = {
  none: 'shadow-none border border-slate-800/60 bg-slate-950/60',
  sm: 'shadow-[0_14px_32px_-28px_rgba(59,130,246,0.6)] border border-slate-800/70 bg-slate-950/70',
  md: 'shadow-[0_24px_45px_-32px_rgba(129,140,248,0.5)] border border-slate-700/80 bg-slate-950/70',
  lg: 'shadow-[0_32px_60px_-30px_rgba(15,118,230,0.6)] border border-slate-600/70 bg-slate-950/75',
}

const Paper = ({ className, elevation = 'md', hoverable = false, ...props }: PaperProps) => (
  <section
    className={cn(
      'group rounded-3xl px-6 py-5 text-sm text-slate-200 transition-all duration-200',
      'before:pointer-events-none before:absolute before:-inset-px before:rounded-[inherit] before:bg-gradient-to-br before:from-white/10 before:via-white/5 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 before:content-[""]',
      'relative',
      elevationStyles[elevation],
      hoverable && 'hover:-translate-y-0.5 hover:border-slate-500/70 hover:before:opacity-70',
      className,
    )}
    {...props}
  />
)

Paper.displayName = 'Paper'

export type { PaperProps, PaperElevation }
export default Paper

