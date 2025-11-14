import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Input } from '@components'
import { useAuth, useAOS } from '@hooks'

export default function VerifyEmailPage() {
  const navigate = useNavigate()
  const { verifyEmail, resendVerificationEmail } = useAuth()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const email = searchParams.get('email')

  const [status, setStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string>('')
  const [resendStatus, setResendStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [resendEmail, setResendEmail] = useState<string>(email || '')
  const getAOSProps = useAOS()

  // Auto-verify if token is present
  useEffect(() => {
    if (token && status === 'idle') {
      handleVerify(token)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const handleVerify = async (verificationToken: string) => {
    setStatus('verifying')
    setError('')

    const result = await verifyEmail(verificationToken)

    if (result.success) {
      setStatus('success')
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/dashboard', { replace: true })
      }, 2000)
    } else {
      setStatus('error')
      setError(result.error || 'Failed to verify email')
    }
  }

  const handleResend = async () => {
    if (!resendEmail) {
      setError('Please enter your email address')
      return
    }

    setResendStatus('sending')
    setError('')

    const result = await resendVerificationEmail(resendEmail)

    if (result.success) {
      setResendStatus('sent')
      setTimeout(() => {
        setResendStatus('idle')
      }, 3000)
    } else {
      setError(result.error || 'Failed to resend verification email')
      setResendStatus('idle')
    }
  }

  const formattedEmail = (email: string) => {
    if (!email) return 'your email'
    const [local, domain] = email.split('@')
    if (!domain) return email
    const obfuscatedLocal = local.length > 2 ? `${local.substring(0, 2)}***` : `${local[0]}***`
    return `${obfuscatedLocal}@${domain}`
  }

  if (status === 'verifying') {
    return (
      <div className="space-y-6">
        <header className="space-y-2" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300' })}>
          <h1 className="text-2xl font-semibold text-white">Verifying your email...</h1>
          <p className="text-sm text-slate-300">Please wait while we verify your email address.</p>
        </header>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="space-y-6">
        <header className="space-y-2" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300' })}>
          <h1 className="text-2xl font-semibold text-white">Email verified!</h1>
          <p className="text-sm text-slate-300">Your email has been successfully verified. Redirecting...</p>
        </header>
      </div>
    )
  }

  // Show "Verify your email" when idle (no token) or error (no token)
  if ((status === 'idle' || status === 'error') && !token) {
    return (
      <div className="space-y-6">
        <header className="space-y-2" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300' })}>
          <h1 className="text-2xl font-semibold text-white">Verify your email</h1>
          <p className="text-sm text-slate-300">
            {email
              ? `We've sent a verification link to ${formattedEmail(resendEmail || email)}. Click the link in the email to verify your account.`
              : 'Please check your email for a verification link. Click the link to verify your account.'}
          </p>
        </header>

        {error && (
          <div className="rounded-lg border border-rose-500/50 bg-rose-500/10 p-4 text-sm text-rose-200" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '100' })}>
            {error}
          </div>
        )}

        <div className="space-y-4" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '150' })}>
          <div>
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={resendEmail}
              onChange={(e) => {
                setResendEmail(e.target.value)
                setError('')
              }}
              leftIcon="envelope"
              disabled={resendStatus === 'sending' || resendStatus === 'sent'}
            />
          </div>

          <Button
            variant="primary"
            block
            leftIcon="paper-plane"
            onClick={handleResend}
            disabled={resendStatus === 'sending' || resendStatus === 'sent' || !resendEmail}
            loading={resendStatus === 'sending'}
          >
            {resendStatus === 'sent' ? 'Email sent!' : 'Resend verification email'}
          </Button>
        </div>

        <div className="space-y-2 text-sm text-slate-300" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '200' })}>
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

  // Error state with token (verification attempt failed)
  return (
    <div className="space-y-6">
      <header className="space-y-2" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300' })}>
        <h1 className="text-2xl font-semibold text-white">Verification failed</h1>
        <p className="text-sm text-slate-300">{error || 'Invalid or expired verification token.'}</p>
      </header>

      <div className="space-y-4" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '100' })}>
        <div>
          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
            value={resendEmail}
            onChange={(e) => {
              setResendEmail(e.target.value)
              setError('')
            }}
            leftIcon="envelope"
            disabled={resendStatus === 'sending' || resendStatus === 'sent'}
          />
        </div>

        <Button
          variant="primary"
          block
          leftIcon="paper-plane"
          onClick={handleResend}
          disabled={resendStatus === 'sending' || resendStatus === 'sent' || !resendEmail}
          loading={resendStatus === 'sending'}
        >
          {resendStatus === 'sent' ? 'Email sent!' : 'Resend verification email'}
        </Button>
      </div>

      <div className="space-y-2 text-sm text-slate-300" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '150' })}>
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
