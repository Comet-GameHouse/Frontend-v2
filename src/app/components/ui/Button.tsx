import { forwardRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import type { ButtonHTMLAttributes } from 'react'
import cn from '@lib/cn'

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'success'
  | 'danger'
  | 'warning'
  | 'plasma'
  | 'void'
  | 'link'

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-br from-sky-400 via-indigo-500 to-fuchsia-500 text-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_18px_38px_-16px_rgba(56,189,248,0.75),0_0_0_2px_rgba(14,165,233,0.4)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_24px_52px_-18px_rgba(76,29,149,0.95),0_0_0_3px_rgba(14,165,233,0.75),0_0_36px_rgba(14,165,233,0.45)] active:shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_12px_28px_-14px_rgba(59,130,246,0.7),0_0_0_2px_rgba(14,165,233,0.55)]',
  secondary:
    'bg-slate-900/85 text-slate-100 border border-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_16px_34px_-20px_rgba(148,163,184,0.55),0_0_0_2px_rgba(148,163,184,0.18)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_44px_-18px_rgba(148,163,184,0.72),0_0_0_3px_rgba(148,163,184,0.28),0_0_32px_rgba(148,163,184,0.28)] active:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_12px_26px_-16px_rgba(148,163,184,0.58),0_0_0_2px_rgba(148,163,184,0.24)]',
  outline:
    'border border-cyan-500/70 text-cyan-100 bg-slate-950/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_16px_34px_-20px_rgba(103,232,249,0.45),0_0_0_2px_rgba(6,182,212,0.22)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_22px_42px_-22px_rgba(8,145,178,0.55),0_0_0_2px_rgba(6,182,212,0.32)] active:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_14px_28px_-18px_rgba(8,145,178,0.5),0_0_0_2px_rgba(6,182,212,0.32)]',
  ghost:
    'border border-transparent text-slate-200 bg-slate-950/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_14px_30px_-22px_rgba(148,163,184,0.35),0_0_0_1px_rgba(148,163,184,0.2)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_36px_-20px_rgba(148,163,184,0.45),0_0_0_1px_rgba(148,163,184,0.28)] active:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_12px_24px_-18px_rgba(148,163,184,0.38),0_0_0_1px_rgba(148,163,184,0.28)]',
  success:
    'bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500 text-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_18px_40px_-18px_rgba(16,185,129,0.7),0_0_0_2px_rgba(5,150,105,0.4)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_24px_52px_-18px_rgba(13,148,136,0.92),0_0_0_3px_rgba(5,150,105,0.68),0_0_34px_rgba(16,185,129,0.45)] active:shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_12px_28px_-16px_rgba(13,148,136,0.74),0_0_0_2px_rgba(5,150,105,0.5)]',
  danger:
    'bg-gradient-to-br from-rose-500 via-red-500 to-amber-500 text-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_18px_40px_-18px_rgba(248,113,113,0.75),0_0_0_2px_rgba(239,68,68,0.42)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_24px_52px_-18px_rgba(248,113,113,0.95),0_0_0_3px_rgba(239,68,68,0.7),0_0_34px_rgba(248,113,113,0.5)] active:shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_12px_30px_-16px_rgba(248,113,113,0.78),0_0_0_2px_rgba(239,68,68,0.52)]',
  warning:
    'bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 text-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.58),0_18px_38px_-16px_rgba(251,191,36,0.7),0_0_0_2px_rgba(251,191,36,0.42)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_24px_50px_-18px_rgba(251,191,36,0.9),0_0_0_3px_rgba(251,191,36,0.65),0_0_32px_rgba(251,191,36,0.4)] active:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_12px_28px_-16px_rgba(251,191,36,0.72),0_0_0_2px_rgba(251,191,36,0.5)]',
  plasma:
    'bg-gradient-to-br from-violet-400 via-purple-500 to-cyan-400 text-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.62),0_20px_48px_-18px_rgba(167,139,250,0.75),0_0_0_2px_rgba(167,139,250,0.4)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_28px_60px_-20px_rgba(167,139,250,0.9),0_0_0_3px_rgba(56,189,248,0.7),0_0_40px_rgba(56,189,248,0.45)] active:shadow-[inset_0_1px_0_rgba(255,255,255,0.66),0_14px_32px_-16px_rgba(167,139,250,0.78),0_0_0_2px_rgba(56,189,248,0.6)]',
  void:
    'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-200 border border-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_16px_40px_-22px_rgba(15,23,42,0.8),0_0_0_2px_rgba(100,116,139,0.25)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_22px_50px_-20px_rgba(15,23,42,0.92),0_0_0_3px_rgba(148,163,184,0.35),0_0_30px_rgba(30,41,59,0.35)] active:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_14px_28px_-18px_rgba(30,41,59,0.85),0_0_0_2px_rgba(148,163,184,0.3)]',
  link:
    'border border-transparent bg-transparent text-cyan-200 shadow-none hover:text-cyan-100 hover:underline focus-visible:ring-0 active:text-cyan-100',
}

const sizeStyles: Record<ButtonSize, string> = {
  xs: 'h-8 px-3 text-xs gap-1.5',
  sm: 'h-9 px-4 text-sm gap-2',
  md: 'h-11 px-5 text-sm gap-2.5',
  lg: 'h-12 px-7 text-base gap-3',
}

type ButtonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  leftIcon?: IconProp
  rightIcon?: IconProp
  loading?: boolean
  block?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = 'primary',
      size = 'md',
      leftIcon,
      rightIcon,
      loading = false,
      disabled,
      block,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading

    const overlayClasses =
      variant === 'link'
        ? ''
        : 'before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.35),transparent_55%)] before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-45 after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:bg-[radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.2),transparent_45%)] after:opacity-0 after:transition-opacity after:duration-200 hover:after:opacity-35'

    return (
      <button
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center overflow-hidden rounded-2xl font-semibold tracking-wide transition-transform duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60',
          'cursor-pointer active:translate-y-0.5',
          overlayClasses,
          isDisabled && 'pointer-events-none opacity-70',
          variantStyles[variant],
          sizeStyles[size],
          block && 'w-full',
          className,
        )}
        disabled={isDisabled}
        {...props}
      >
        {(leftIcon || loading) && (
          <FontAwesomeIcon
            icon={loading ? 'circle-notch' : leftIcon ?? 'circle-notch'}
            spin={loading}
            className="relative z-10 h-4 w-4 shrink-0"
          />
        )}
        <span className="relative z-10">{children}</span>
        {rightIcon && !loading && (
          <FontAwesomeIcon icon={rightIcon} className="relative z-10 h-4 w-4 shrink-0 text-current" />
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'

export type { ButtonProps, ButtonVariant, ButtonSize }
export default Button

