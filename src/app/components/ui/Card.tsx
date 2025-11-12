import type { HTMLAttributes } from 'react'
import cn from '@lib/cn'

type CardVariant = 'elevated' | 'outline' | 'translucent' | 'gradient' | 'void' | 'glass' | 'cosmic'

type CardProps = {
  variant?: CardVariant
} & HTMLAttributes<HTMLDivElement>

const cardVariants: Record<CardVariant, string> = {
  elevated:
    'border border-slate-800/70 bg-slate-950/75 shadow-[0_28px_60px_-38px_rgba(56,189,248,0.8)]',
  outline:
    'border border-slate-700/65 bg-slate-900/60 shadow-[0_22px_48px_-36px_rgba(100,116,139,0.55)]',
  translucent:
    'border border-white/12 bg-gradient-to-br from-white/12 via-white/6 to-white/4 backdrop-blur-2xl shadow-[0_32px_64px_-46px_rgba(148,163,184,0.6)]',
  gradient:
    'border border-transparent bg-gradient-to-br from-sky-500/35 via-indigo-500/25 to-fuchsia-500/30 shadow-[0_34px_68px_-40px_rgba(99,102,241,0.8)]',
  void:
    'border border-slate-900 bg-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_52px_-40px_rgba(15,23,42,0.9)]',
  glass:
    'border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_24px_60px_-42px_rgba(125,211,252,0.65)]',
  cosmic:
    'border border-cyan-500/25 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.18),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(168,85,247,0.2),transparent_52%)]',
}

export const Card = ({ className, variant = 'elevated', onClick, ...props }: CardProps) => {
  const isInteractive = typeof onClick === 'function' || props.role === 'button' || props.tabIndex === 0

  return (
    <div
      onClick={onClick}
      className={cn(
        'relative flex flex-col overflow-hidden rounded-3xl p-6 transition-transform duration-200',
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:opacity-0 before:transition-opacity before:duration-300 before:content-['']",
        "after:pointer-events-none after:absolute after:top-0 after:left-1/2 after:block after:h-full after:w-[125%] after:-translate-x-1/2 after:rounded-[inherit] after:opacity-0 after:transition-opacity after:duration-300 after:content-['']",
        'hover:-translate-y-0.5 hover:before:opacity-60 hover:after:opacity-70 focus-within:-translate-y-0.5 focus-within:before:opacity-60 focus-within:after:opacity-70',
        "before:bg-gradient-to-br before:from-white/18 before:via-white/10 before:to-white/4 after:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.2),transparent_60%)]",
        cardVariants[variant],
        isInteractive && 'cursor-pointer',
        className,
      )}
      {...props}
    />
  )
}

type CardSectionProps = HTMLAttributes<HTMLDivElement>

export const CardHeader = ({ className, ...props }: CardSectionProps) => (
  <div
    className={cn(
      'relative flex flex-col gap-2 px-6 pb-4 pt-6 text-slate-100',
      "after:pointer-events-none after:absolute after:bottom-0 after:left-6 after:right-6 after:h-px after:bg-slate-700/35 after:content-['']",
      className,
    )}
    {...props}
  />
)

export const CardTitle = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn(
      'text-lg font-semibold tracking-tight text-slate-100 sm:text-xl',
      className,
    )}
    {...props}
  />
)

export const CardDescription = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-sm text-slate-400', className)} {...props} />
)

export const CardContent = ({ className, ...props }: CardSectionProps) => (
  <div className={cn('px-6 py-5 text-sm text-slate-300', className)} {...props} />
)

export const CardFooter = ({ className, ...props }: CardSectionProps) => (
  <div className={cn('mt-auto flex items-center justify-end gap-3 px-6 pb-6 pt-4', className)} {...props} />
)

Card.displayName = 'Card'
CardHeader.displayName = 'CardHeader'
CardTitle.displayName = 'CardTitle'
CardDescription.displayName = 'CardDescription'
CardContent.displayName = 'CardContent'
CardFooter.displayName = 'CardFooter'

export type { CardProps, CardVariant }

