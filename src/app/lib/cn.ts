type ClassInput =
  | string
  | number
  | null
  | undefined
  | boolean
  | ClassInput[]
  | Record<string, boolean | null | undefined>

const resolve = (value: ClassInput): string => {
  if (!value) return ''
  if (typeof value === 'string' || typeof value === 'number') return String(value)
  if (Array.isArray(value)) return value.map(resolve).filter(Boolean).join(' ')

  return Object.entries(value)
    .filter(([, condition]) => Boolean(condition))
    .map(([className]) => className)
    .join(' ')
}

export const cn = (...inputs: ClassInput[]): string =>
  inputs.map(resolve).filter(Boolean).join(' ').replace(/\s+/g, ' ').trim()

export default cn

