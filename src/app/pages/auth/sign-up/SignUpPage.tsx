import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input } from '@components'

type SignUpFormState = {
  email: string
  username: string
  password: string
  confirmPassword: string
}

function SignUpPage() {
  const [formState, setFormState] = useState<SignUpFormState>({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field: keyof SignUpFormState) => (value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!formState.email || !formState.username || !formState.password || !formState.confirmPassword) {
      setError('Please fill in every required field before continuing.')
      return
    }

    if (formState.password !== formState.confirmPassword) {
      setError('Passwords must match before you can continue.')
      return
    }

    setIsSubmitting(true)
    window.setTimeout(() => {
      setIsSubmitting(false)
    }, 800)
  }

  const passwordMismatch = error.startsWith('Passwords')

  return (
    <>
      <header className="mb-8 space-y-3" data-aos="fade-up" data-aos-duration="300">
        <h1 className="text-3xl font-semibold text-white">Sign Up</h1>
        <p className="text-sm text-slate-300">
          Create your Comet GameHouse profile to join multiplayer rooms and sync your progress.
        </p>
      </header>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
        <Input
          label="Email"
          type="email"
          placeholder="you@comet.gg"
          value={formState.email}
          onChange={(event) => handleChange('email')(event.target.value)}
          leftIcon="envelope"
          required
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="300"
        />
        <Input
          label="Username"
          type="text"
          placeholder="Choose a unique handle"
          value={formState.username}
          onChange={(event) => handleChange('username')(event.target.value)}
          leftIcon="user"
          required
          data-aos="fade-up"
          data-aos-delay="250"
          data-aos-duration="300"
        />
        <Input
          label="Password"
          type="password"
          placeholder="Create a secure password"
          value={formState.password}
          onChange={(event) => handleChange('password')(event.target.value)}
          leftIcon="lock"
          required
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-duration="300"
        />
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Re-enter your password"
          value={formState.confirmPassword}
          onChange={(event) => handleChange('confirmPassword')(event.target.value)}
          leftIcon="lock"
          required
          error={passwordMismatch ? error : undefined}
          data-aos="fade-up"
          data-aos-delay="350"
          data-aos-duration="300"
        />
        {error && !passwordMismatch ? (
          <p className="text-sm text-rose-400" data-aos="fade-up" data-aos-delay="350" data-aos-duration="300">
            {error}
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
          block
          leftIcon="user-plus"
          rightIcon="arrow-right"
          data-aos="fade-up"
          data-aos-delay="400"
          data-aos-duration="300"
        >
          Create account
        </Button>

        <div
          className="relative py-3 text-center text-xs uppercase tracking-[0.38em] text-slate-500"
          data-aos="fade-up"
          data-aos-delay="450"
          data-aos-duration="300"
        >
          <span className="absolute inset-x-0 top-1/2 -z-10 h-px -translate-y-1/2 bg-slate-800" />
          <span className="relative bg-slate-950/80 px-4">or continue with</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2" data-aos="fade-up" data-aos-delay="500" data-aos-duration="300">
          <Button type="button" variant="outline" block leftIcon={['fab', 'google']}>
            Google
          </Button>
          <Button type="button" variant="outline" block leftIcon={['fab', 'discord']}>
            Discord
          </Button>
        </div>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Already have an account?
        <Link to="/auth/signin" className="font-semibold text-cyan-300 transition hover:text-cyan-100">
          {' '}
          Sign in
        </Link>
      </p>
    </>
  )
}

export default SignUpPage

