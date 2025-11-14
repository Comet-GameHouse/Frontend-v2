import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input } from '@components'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending'>('idle')
  const navigate = useNavigate()

  const handleSubmit = () => {
    if (!email) return
    setStatus('sending')
    window.setTimeout(() => {
      navigate('/auth/verify-code', { state: { email } })
    }, 800)
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2" data-aos="fade-up" data-aos-duration="300">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">Reset access</p>
        <h1 className="text-2xl font-semibold text-white">Forgot password</h1>
        <p className="text-sm text-slate-300">
          Enter the email tied to your Comet GameHouse account. We’ll send a six-digit verification code to confirm it’s you.
        </p>
      </header>

      <div className="space-y-4">
        <Input
          label="Account email"
          type="email"
          placeholder="you@comet.gg"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          leftIcon="envelope"
          data-aos="fade-up"
          data-aos-duration="300"
          data-aos-delay="100"
        />

        <Button
          variant="primary"
          rightIcon="arrow-right"
          disabled={!email || status === 'sending'}
          onClick={handleSubmit}
          data-aos="fade-up"
          data-aos-duration="300"
          data-aos-delay="150"
        >
          {status === 'sending' ? 'Sending code…' : 'Send verification code'}
        </Button>
      </div>

      <div className="space-y-2 text-sm text-slate-300" data-aos="fade-up" data-aos-duration="300" data-aos-delay="200">
        <p>
          Remembered your password?{' '}
          <Link to="/auth/signin" className="text-cyan-200 hover:text-cyan-100">
            Sign in
          </Link>
        </p>
        <p>
          Need to create an account?{' '}
          <Link to="/auth/signup" className="text-cyan-200 hover:text-cyan-100">
            Sign up instead
          </Link>
        </p>
      </div>
    </div>
  )
}

