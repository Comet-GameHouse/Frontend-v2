import { forwardRef, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import type { InputHTMLAttributes } from 'react'
import cn from '@lib/cn'

type InputVariant = 'default' | 'subtle' | 'glass' | 'terminal'

type AOSAttributes = {
  'data-aos'?: string
  'data-aos-delay'?: string
  'data-aos-duration'?: string
}

type InputProps = {
  label?: string
  description?: string
  error?: string
  hint?: string
  leftIcon?: IconProp
  rightIcon?: IconProp
  variant?: InputVariant
  fullWidth?: boolean
} & Omit<InputHTMLAttributes<HTMLInputElement>, keyof AOSAttributes> &
  AOSAttributes

const containerStyles: Record<InputVariant, string> = {
  default:
    'relative flex items-center overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/65 transition duration-200',
  subtle:
    'relative flex items-center overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-950/30 transition duration-200 hover:border-slate-700',
  glass:
    'relative flex items-center overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl transition duration-200',
  terminal:
    'relative flex items-center overflow-hidden rounded-2xl border border-emerald-500/70 bg-slate-950 transition duration-200',
}

const inputPadding: Record<InputVariant, string> = {
  default: 'px-4',
  subtle: 'px-4',
  glass: 'px-4',
  terminal: 'px-4 font-mono text-[13px]',
}

const getGlowClass = (variant: InputVariant, error?: boolean) => {
  if (error) {
    return variant === 'glass'
      ? 'focus-within:border-rose-300/80 focus-within:shadow-[0_0_0_3px_rgba(248,113,113,0.5),0_24px_56px_-24px_rgba(248,113,113,0.42)]'
      : 'focus-within:border-rose-400 focus-within:shadow-[0_0_0_3px_rgba(244,63,94,0.6),0_24px_56px_-24px_rgba(244,63,94,0.5)]'
  }

  if (variant === 'default') {
    return 'focus-within:border-cyan-400 focus-within:shadow-[0_0_0_3px_rgba(56,189,248,0.65),0_28px_62px_-24px_rgba(56,189,248,0.55)]'
  }

  if (variant === 'subtle') {
    return 'focus-within:border-indigo-400 focus-within:shadow-[0_0_0_3px_rgba(99,102,241,0.55),0_24px_54px_-24px_rgba(99,102,241,0.45)]'
  }

  if (variant === 'glass') {
    return 'focus-within:border-cyan-200/80 focus-within:shadow-[0_0_0_3px_rgba(224,242,254,0.65),0_30px_64px_-26px_rgba(56,189,248,0.55)]'
  }

  return 'focus-within:border-emerald-400 focus-within:shadow-[0_0_0_3px_rgba(16,185,129,0.65),0_26px_58px_-26px_rgba(16,185,129,0.5)]'
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      description,
      error,
      hint,
      leftIcon,
      rightIcon,
      className,
      variant = 'default',
      fullWidth = true,
      id,
      ...rest
    },
    ref,
  ) => {
    const inputId = id ?? rest.name ?? undefined
    const [hasFocus, setHasFocus] = useState(false)
    // TypeScript-safe extraction of data-aos attributes with type assertion
    const { 'data-aos': dataAos, 'data-aos-delay': dataAosDelay, 'data-aos-duration': dataAosDuration, ...inputProps } =
      rest

    const { onFocus, onBlur, ...cleanInputProps } = inputProps

    const wrapperDataAttributes: Record<string, string | undefined> = {
      ...(typeof dataAos === 'string' ? { 'data-aos': dataAos } : {}),
      ...(typeof dataAosDelay === 'string' ? { 'data-aos-delay': dataAosDelay } : {}),
      ...(typeof dataAosDuration === 'string' ? { 'data-aos-duration': dataAosDuration } : {}),
    }

    const containerClass = useMemo(
      () =>
        cn(
          containerStyles[variant],
          getGlowClass(variant, !!error),
          hasFocus && 'shadow-md',
        ),
      [error, hasFocus, variant],
    )

    const leftIconClass = cn(
      'pointer-events-none text-slate-500 transition-colors duration-200',
      hasFocus && 'text-cyan-300',
      variant === 'terminal' ? 'absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2' : 'absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2',
      'flex items-center justify-center',
    )

    const rightIconClass = cn(
      'text-slate-500 transition-colors duration-200',
      hasFocus && 'text-cyan-300',
      variant === 'terminal' ? 'absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2' : 'absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2',
      'flex items-center justify-center',
    )

    return (
      <div
        className={cn('flex flex-col gap-2 text-sm text-slate-300', fullWidth && 'w-full')}
        {...wrapperDataAttributes}
      >
        {label ? (
          <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-[0.38em] text-slate-400">
            {label}
          </label>
        ) : null}

        {description ? <p className="text-xs text-slate-500">{description}</p> : null}

        <div className={containerClass}>
          {variant !== 'terminal' && (
            <span
              className={cn(
                'pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200',
                hasFocus && 'opacity-100',
                error
                  ? 'bg-[radial-gradient(circle_at_20%_15%,rgba(248,113,113,0.22),transparent_55%)]'
                  : variant === 'glass'
                  ? 'bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.3),transparent_55%),radial-gradient(circle_at_85%_20%,rgba(186,230,253,0.22),transparent_50%)]'
                  : 'bg-[radial-gradient(circle_at_15%_20%,rgba(56,189,248,0.18),transparent_55%),radial-gradient(circle_at_85%_20%,rgba(99,102,241,0.16),transparent_50%)]',
              )}
            />
          )}

          {leftIcon ? (
            <span className={leftIconClass}>
              <FontAwesomeIcon icon={leftIcon} className="h-4 w-4" />
            </span>
          ) : null}

          <input
            id={inputId}
            ref={ref}
            className={cn(
              'h-11 w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 transition focus:outline-none',
              inputPadding[variant],
              leftIcon && 'pl-12',
              rightIcon && 'pr-12',
              error && 'text-rose-100 placeholder:text-rose-300',
              className,
            )}
            onFocus={(event) => {
              setHasFocus(true)
              onFocus?.(event)
            }}
            onBlur={(event) => {
              setHasFocus(false)
              onBlur?.(event)
            }}
            {...cleanInputProps}
          />

          {rightIcon ? (
            <span className={rightIconClass}>
              <FontAwesomeIcon icon={rightIcon} className="h-4 w-4" />
            </span>
          ) : null}
        </div>

        {hint && !error ? <p className="text-xs text-slate-500">{hint}</p> : null}
        {error ? <p className="text-xs font-medium text-rose-400">{error}</p> : null}
      </div>
    )
  },
)

Input.displayName = 'Input'

export type { InputProps, InputVariant }
export default Input

