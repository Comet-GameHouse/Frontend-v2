import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input } from '@components'

type SignInFormState = {
  identifier: string
  password: string
}

function SignInPage() {
  const [formState, setFormState] = useState<SignInFormState>({
    identifier: '',
    password: '',
  })
  const [error, setError] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field: keyof SignInFormState) => (value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!formState.identifier || !formState.password) {
      setError('Enter your email or username along with your password to continue.')
      return
    }

    setIsSubmitting(true)
    window.setTimeout(() => {
      setIsSubmitting(false)
    }, 650)
  }

  return (
    <>
      <header className="mb-8 space-y-3" data-aos="fade-up" data-aos-duration="300">
        <h1 className="text-3xl font-semibold text-white">Sign In</h1>
        <p className="text-sm text-slate-300">
          Access your Comet GameHouse dashboard, sync achievements, and jump back into the action.
        </p>
      </header>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
        <Input
          label="Email or Username"
          type="text"
          placeholder="you@comet.gg or your-handle"
          value={formState.identifier}
          onChange={(event) => handleChange('identifier')(event.target.value)}
          leftIcon="user"
          required
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="300"
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formState.password}
          onChange={(event) => handleChange('password')(event.target.value)}
          leftIcon="lock"
          required
          error={error ? error : undefined}
          data-aos="fade-up"
          data-aos-delay="250"
          data-aos-duration="300"
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
          block
          leftIcon="arrow-right-to-bracket"
          rightIcon="arrow-right"
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-duration="300"
        >
          Sign in
        </Button>

        <div
          className="relative py-3 text-center text-xs uppercase tracking-[0.38em] text-slate-500"
          data-aos="fade-up"
          data-aos-delay="350"
          data-aos-duration="300"
        >
          <span className="absolute inset-x-0 top-1/2 -z-10 h-px -translate-y-1/2 bg-slate-800" />
          <span className="relative bg-slate-950/80 px-4">or continue with</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2" data-aos="fade-up" data-aos-delay="400" data-aos-duration="300">
          <Button type="button" variant="outline" block leftIcon={['fab', 'google']}>
            Google
          </Button>
          <Button type="button" variant="outline" block leftIcon={['fab', 'discord']}>
            Discord
          </Button>
        </div>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Ready to create your squad?
        <Link to="/auth/signup" className="font-semibold text-cyan-300 transition hover:text-cyan-100">
          {' '}
          Sign up
        </Link>
      </p>
    </>
  )
}

export default SignInPage

