import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, Button } from '@components'
import { useAuth, useAOS } from '@hooks'

const CoinBadge = ({ amount }: { amount?: string }) => (
  <span className="inline-flex items-center gap-1 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-cyan-100">
    {amount ? <span className="font-semibold">{amount}</span> : null}
    <FontAwesomeIcon icon="coins" className="h-3 w-3" aria-hidden="true" />
    <span className="sr-only">coins</span>
  </span>
)

function InvitePage() {
  const { isAuthenticated, user } = useAuth()
  const [isCopied, setIsCopied] = useState(false)
  const getAOSProps = useAOS()

  const inviteLink = useMemo(() => {
    const base = typeof window !== 'undefined' ? window.location.origin : 'https://comet.game'
    const code = user?.id ?? 'guest'
    return `${base}/auth/signup?ref=${code}`
  }, [user?.id])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink)
      setIsCopied(true)
      window.setTimeout(() => setIsCopied(false), 2000)
    } catch {
      setIsCopied(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card variant="gradient" className="space-y-4" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '150' })}>
        <h1 className="text-2xl font-semibold text-white">Invite Friends</h1>
        <p className="text-sm text-slate-100">
          Share your personal link. When friends join and play their first match, you both earn <CoinBadge /> rewards.
        </p>
      </Card>

      <Card variant="void" className="space-y-6" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '200' })}>
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">Your invite link</h2>
          <p className="text-sm text-slate-300">
            Copy and send this link to friends. Each successful signup grants you <CoinBadge amount="500" /> bonus.
          </p>
          <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:flex-row md:items-center">
            <code className="flex-1 overflow-hidden truncate text-sm text-cyan-100">{inviteLink}</code>
            <Button variant="primary" size="sm" onClick={handleCopy} leftIcon="copy" disabled={!isAuthenticated}>
              {isCopied ? 'Copied!' : 'Copy link'}
            </Button>
          </div>
          {!isAuthenticated ? (
            <p className="text-xs text-amber-300">
              Sign in to generate a personalized referral code and start earning rewards.
            </p>
          ) : null}
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">Reward details</h2>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>
              • <CoinBadge amount="500" /> for you after each friend completes their first match.
            </li>
            <li>
              • <CoinBadge amount="250" /> for your friend as a welcome gift.
            </li>
            <li>• Track all invited players and their status from the friends dashboard.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">Manage your friends</h2>
          <p className="text-sm text-slate-300">
            Browse your roster, check activity, and coordinate squads directly from the friends page.
          </p>
          <Link to="/friends" className="inline-flex">
            <Button variant="outline" size="sm" rightIcon="arrow-right">
              Open friends page
            </Button>
          </Link>
        </section>
      </Card>
    </div>
  )
}

export default InvitePage

