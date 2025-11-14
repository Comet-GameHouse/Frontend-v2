import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import type { ChangeEvent, SelectHTMLAttributes } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from '@lib/cn'
import type { InputVariant } from './Input'

type SelectOption = {
  label: string
  value: string
  disabled?: boolean
}

type SelectVariant = InputVariant

type SelectProps = {
  label?: string
  description?: string
  error?: string
  hint?: string
  fullWidth?: boolean
  options: SelectOption[]
  variant?: SelectVariant
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'defaultValue' | 'onChange'>

const containerStyles: Record<SelectVariant, string> = {
  default: 'relative flex items-center rounded-2xl border border-slate-800 bg-slate-950/65 transition duration-200',
  subtle: 'relative flex items-center rounded-2xl border border-slate-800/60 bg-slate-950/30 transition duration-200 hover:border-slate-700',
  glass: 'relative flex items-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl transition duration-200',
  terminal: 'relative flex items-center rounded-2xl border border-emerald-500/70 bg-slate-950 transition duration-200',
}

const getGlowClass = (variant: SelectVariant, error?: boolean) => {
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

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      description,
      error,
      hint,
      className,
      variant = 'default',
      fullWidth = true,
      id,
      options,
      value,
      defaultValue,
      disabled,
      onValueChange,
      ...rest
    },
    ref,
  ) => {
    const selectId = id ?? rest.name ?? undefined
    const [hasFocus, setHasFocus] = useState(false)
    const [open, setOpen] = useState(false)
    const [internalValue, setInternalValue] = useState<string>(
      value ?? defaultValue ?? options.find((option) => !option.disabled)?.value ?? '',
    )
    const rootRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement | null>(null)

    useEffect(() => {
      if (typeof value === 'string') {
        setInternalValue(value)
      }
    }, [value])

    useEffect(() => {
      if (!open) return
      function handleClick(event: MouseEvent) {
        if (!rootRef.current?.contains(event.target as Node)) {
          setOpen(false)
        }
      }
      function handleKey(event: KeyboardEvent) {
        if (event.key === 'Escape') {
          setOpen(false)
          buttonRef.current?.focus()
        }
      }
      window.addEventListener('mousedown', handleClick)
      window.addEventListener('keydown', handleKey)
      return () => {
        window.removeEventListener('mousedown', handleClick)
        window.removeEventListener('keydown', handleKey)
      }
    }, [open])

    const containerClass = useMemo(
      () =>
        cn(
          containerStyles[variant],
          getGlowClass(variant, !!error),
          hasFocus && 'shadow-md',
          'relative transition-colors',
        ),
      [error, hasFocus, variant],
    )

    return (
      <div
        ref={rootRef}
        className={cn(
          'flex flex-col gap-2 text-sm text-slate-300',
          fullWidth && 'w-full',
          open && 'relative z-[70]',
        )}
      >
        {label ? (
          <label htmlFor={selectId} className="text-xs font-semibold uppercase tracking-[0.38em] text-slate-400">
            {label}
          </label>
        ) : null}

        {description ? <p className="text-xs text-slate-500">{description}</p> : null}

        <div className={cn(containerClass, 'relative')}>
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

          <button
            id={selectId}
            ref={(node) => {
              buttonRef.current = node
              if (typeof ref === 'function') {
                ref(node as unknown as HTMLSelectElement)
              } else if (ref) {
                // @ts-expect-error - forwarding ref to button for focus management only
                ref.current = node
              }
            }}
            type="button"
            className={cn(
              'flex h-11 w-full items-center justify-between gap-3 bg-transparent px-4 text-left text-sm text-slate-100 transition focus:outline-none',
              variant === 'terminal' && 'font-mono text-[13px]',
              error && 'text-rose-100',
              disabled && 'cursor-not-allowed opacity-70',
              className,
            )}
            onFocus={(event) => {
              setHasFocus(true)
              // @ts-expect-error – forwarding native button event to HTMLSelectElement signature for compatibility
              rest.onFocus?.(event)
            }}
            onBlur={(event) => {
              setHasFocus(false)
              // @ts-expect-error – forwarding native button event to HTMLSelectElement signature for compatibility
              rest.onBlur?.(event)
            }}
            onClick={() => {
              if (disabled) return
              setOpen((prev) => !prev)
            }}
            aria-haspopup="listbox"
            aria-expanded={open}
            disabled={disabled}
          >
            <span className="truncate">
              {options.find((option) => option.value === internalValue)?.label ?? 'Select option'}
            </span>
            <FontAwesomeIcon
              icon="chevron-down"
              className={cn(
                'h-4 w-4 text-slate-500 transition-transform duration-200',
                open && '-rotate-180 text-cyan-200',
              )}
            />
          </button>

          {open ? (
            <ul
              role="listbox"
              aria-labelledby={selectId}
              className={cn(
                'absolute left-0 right-0 top-[calc(100%+0.375rem)] z-[80] space-y-1 rounded-2xl border border-white/10 bg-slate-950/95 p-2 text-sm shadow-[0_28px_80px_0_rgba(15,23,42,0.65)] backdrop-blur-2xl',
              )}
            >
              {options.map((option) => {
                const isSelected = option.value === internalValue
                return (
                  <li key={option.value}>
                    <button
                      type="button"
                      role="option"
                      disabled={option.disabled}
                      aria-selected={isSelected}
                      className={cn(
                        'flex w-full items-center justify-between rounded-xl border border-transparent px-3 py-2 text-left transition',
                        option.disabled
                          ? 'cursor-not-allowed text-slate-500'
                          : 'hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-100',
                        isSelected && 'border-cyan-400/60 bg-cyan-400/15 text-cyan-100',
                      )}
                      onClick={() => {
                        if (option.disabled) return
                        setInternalValue(option.value)
                        onValueChange?.(option.value)
                          // @ts-expect-error – synthetic event matches select signature
                        if (rest.onChange) {
                          const syntheticEvent = {
                            target: { value: option.value },
                            currentTarget: { value: option.value },
                          } as ChangeEvent<HTMLSelectElement>
                          // @ts-expect-error – synthetic event matches select signature
                          rest.onChange(syntheticEvent)
                        }
                        setOpen(false)
                      }}
                    >
                      <span className="truncate">{option.label}</span>
                      {isSelected ? <FontAwesomeIcon icon="check" className="h-4 w-4" /> : null}
                    </button>
                  </li>
                )
              })}
            </ul>
          ) : null}
        </div>

        {hint && !error ? <p className="text-xs text-slate-500">{hint}</p> : null}
        {error ? <p className="text-xs font-medium text-rose-400">{error}</p> : null}
      </div>
    )
  },
)

Select.displayName = 'Select'

export type { SelectOption, SelectProps, SelectVariant }
export default Select


