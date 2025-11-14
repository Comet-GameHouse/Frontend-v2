import { useState } from 'react'
import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import { Button, Input } from '@components'
import { useAOS } from '@hooks'

type SupportField = {
  name: string
  label: string
  placeholder?: string
  icon?: IconProp
  type?: string
  multiline?: boolean
}

type SupportFormProps = {
  fields: SupportField[]
  submitLabel: string
  successMessage: string
} & React.FormHTMLAttributes<HTMLFormElement>

function SupportForm({ fields, submitLabel, successMessage, ...formProps }: SupportFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const getAOSProps = useAOS()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.currentTarget.reset()
    setSubmitted(true)
    window.setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit}
      {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300' })}
      {...formProps}
    >
      {fields.map((field, index) =>
        field.multiline ? (
          <label
            key={field.name}
            className="flex flex-col gap-2 text-sm text-slate-300"
            {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': String(150 + index * 50) })}
          >
            <span className="text-xs font-semibold text-slate-300">{field.label}</span>
            <textarea
              name={field.name}
              placeholder={field.placeholder}
              required
              className="min-h-[140px] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
            />
          </label>
        ) : (
          <div
            key={field.name}
            {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': String(150 + index * 50) })}
          >
            <Input
              name={field.name}
              label={field.label}
              placeholder={field.placeholder}
              leftIcon={field.icon}
              type={field.type ?? 'text'}
              required
            />
          </div>
        ),
      )}

      <div {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': String(150 + fields.length * 50) })}>
        <Button type="submit" variant="primary" block rightIcon="arrow-right">
          {submitLabel}
        </Button>
      </div>

      {submitted ? (
        <p
          className="text-xs text-emerald-300"
          {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': String(150 + (fields.length + 1) * 50) })}
        >
          {successMessage}
        </p>
      ) : null}
    </form>
  )
}

export type { SupportField }
export default SupportForm
