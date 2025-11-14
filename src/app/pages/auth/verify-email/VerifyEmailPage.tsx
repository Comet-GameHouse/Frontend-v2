import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button, Input } from '@components'

const CODE_LENGTH = 6

export default function VerifyEmailPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const email = (location.state as { email?: string } | null)?.email ?? ''
  const [code, setCode] = useState<string[]>(() => Array.from({ length: CODE_LENGTH }, () => ''))
  const [status, setStatus] = useState<'idle' | 'verifying' | 'error'>('idle')
  const [timer, setTimer] = useState(45)

  useEffect(() => {
    if (timer <= 0) return
    const id = window.setTimeout(() => setTimer((prev) => prev - 1), 1000)
    return () => window.clearTimeout(id)
  }, [timer])

  const formattedEmail = useMemo(() => {
    if (!email) return 'your email'
    const [local, domain] = email.split('@')
    if (!domain) return email
    const obfuscatedLocal = local.length > 2 ? `${local.substring(0, 2)}***` : `${local[0]}***`
    return `${obfuscatedLocal}@${domain}`
  }, [email])

  const canSubmit = code.every((digit) => digit.length === 1)

  const handleInput = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return
    setCode((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
  }

  const handleSubmit = () => {
    if (!canSubmit) return
    setStatus('verifying')
    window.setTimeout(() => {
      setStatus('idle')
      navigate('/auth/signin', { replace: true })
    }, 900)
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2" data-aos="fade-up" data-aos-duration="300">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">Secure reset</p>
        <h1 className="text-2xl font-semibold text-white">Enter verification code</h1>
        <p className="text-sm text-slate-300">
          We’ve sent a 6-digit code to <span className="font-semibold text-cyan-200">{formattedEmail}</span>. Enter it below to
          continue resetting your password.
        </p>
      </header>

      <div className="flex justify-between gap-2" data-aos="fade-up" data-aos-duration="300" data-aos-delay="100">
        {code.map((digit, index) => (
          <Input
            key={index}
            value={digit}
            onChange={(event) => handleInput(index, event.target.value)}
            inputMode="numeric"
            maxLength={1}
            pattern="\d*"
            aria-label={`Digit ${index + 1}`}
            className="h-14 w-full text-center text-lg font-semibold"
          />
        ))}
      </div>

      <div className="space-y-3">
        <Button
          variant="primary"
          rightIcon="arrow-right"
          disabled={!canSubmit || status === 'verifying'}
          onClick={handleSubmit}
          data-aos="fade-up"
          data-aos-duration="300"
          data-aos-delay="150"
        >
          {status === 'verifying' ? 'Verifying…' : 'Confirm code'}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          disabled={timer > 0}
          onClick={() => {
            setTimer(45)
            setStatus('idle')
            setCode(() => Array.from({ length: CODE_LENGTH }, () => ''))
          }}
          data-aos="fade-up"
          data-aos-duration="300"
          data-aos-delay="200"
        >
          {timer > 0 ? `Resend code in ${timer}s` : 'Resend code'}
        </Button>
      </div>

      <div className="space-y-2 text-sm text-slate-300" data-aos="fade-up" data-aos-duration="300" data-aos-delay="250">
        <p>
          Wrong email?{' '}
          <Link to="/auth/forgot-password" className="text-cyan-200 hover:text-cyan-100">
            Try another address
          </Link>
        </p>
        <p>
          Head back to{' '}
          <Link to="/auth/signin" className="text-cyan-200 hover:text-cyan-100">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
