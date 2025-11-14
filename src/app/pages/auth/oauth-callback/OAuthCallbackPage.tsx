import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '@hooks'

function OAuthCallbackPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { handleOAuthCallback } = useAuth()

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get('token')
      const refreshToken = searchParams.get('refreshToken')
      const error = searchParams.get('error')

      if (error) {
        console.error('OAuth error:', error)
        navigate('/auth/signin?error=oauth_failed', { replace: true })
        return
      }

      if (!token || !refreshToken) {
        console.error('Missing tokens in OAuth callback')
        navigate('/auth/signin?error=oauth_failed', { replace: true })
        return
      }

      const result = await handleOAuthCallback(token, refreshToken)

      if (result.success) {
        navigate('/dashboard', { replace: true })
      } else {
        navigate('/auth/signin?error=oauth_failed', { replace: true })
      }
    }

    handleCallback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-white mb-4">Completing sign in...</h1>
        <p className="text-slate-400">Please wait while we redirect you.</p>
      </div>
    </div>
  )
}

export default OAuthCallbackPage

