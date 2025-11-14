import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@components/ui/Button'
import { Card } from '@components/ui/Card'
import { useAbilityCards } from '@providers'
import { useAOS } from '@hooks'

const CHAT_COLORS = ['text-cyan-200', 'text-amber-200', 'text-emerald-200'] as const

function RoomDetailPage() {
  const navigate = useNavigate()
  const { hasTierOrAbove } = useAbilityCards()
  const canInviteFriends = hasTierOrAbove('bronze')
  const participants = useMemo(
    () => [
      { name: 'NovaStrike', role: 'Captain' },
      { name: 'PhaseRunner', role: 'Strategist' },
      { name: 'AstroBloom', role: 'Support' },
      { name: 'MeteorMage', role: 'Flex' },
    ],
    [],
  )
  const chatFeed = useMemo(
    () => [
      { author: 'NovaStrike', message: 'Cover B node on first rotation.', time: '19:32' },
      { author: 'PhaseRunner', message: 'Saving ult for third push.', time: '19:33' },
      { author: 'MeteorMage', message: 'Adjusting loadout, 30 seconds.', time: '19:34' },
    ],
    [],
  )
  const [draft, setDraft] = useState('')
  const getAOSProps = useAOS()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setDraft('')
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300' })}>
      <Card
        variant="cosmic"
        className="relative overflow-hidden rounded-3xl border-white/10 bg-gradient-to-br from-slate-950 via-slate-900/80 to-slate-900/40 p-0"
        {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '150' })}
      >
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">Match ID • 9824-AX</p>
            <h1 className="text-2xl font-semibold text-white">Cosmic Conquest · Control</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="sm" rightIcon="bolt">
              Ready up
            </Button>
            <Button
              variant="outline"
              size="sm"
              rightIcon="user-plus"
              disabled={!canInviteFriends}
              title={
                canInviteFriends
                  ? 'Invite a squadmate to this private room.'
                  : 'Purchase at least a Bronze ability card to unlock friend invites.'
              }
            >
              {canInviteFriends ? 'Invite friend' : 'Invite locked'}
            </Button>
            <Button variant="outline" size="sm" rightIcon="triangle-exclamation" onClick={() => navigate('/support/report-bug')}>
              Report issue
            </Button>
          </div>
        </header>
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-purple-500/30 blur-3xl" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
            <div className="rounded-full border border-white/25 bg-slate-950/70 px-6 py-2 text-xs uppercase tracking-[0.35em] text-cyan-200">
              Live canvas
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-center text-white">
              {participants.map((player) => (
                <div key={player.name} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm">
                  <p className="font-semibold text-white">{player.name}</p>
                  <p className="text-xs text-slate-200">{player.role}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(148,163,184,0.08)_0%,rgba(15,23,42,0.9)_100%)]" />
        </div>
      </Card>

      <aside className="flex flex-col gap-4" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '200' })}>
        <Card variant="void" className="flex-1 space-y-4">
          <header className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Quick chat</h2>
            <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Team only</span>
          </header>
          <ul className="space-y-3 text-sm text-slate-200">
            {chatFeed.map((entry, index) => (
              <li key={entry.time} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className={CHAT_COLORS[index % CHAT_COLORS.length]}>{entry.author}</span>
                  <span>{entry.time}</span>
                </div>
                <p className="mt-1 text-slate-200">{entry.message}</p>
              </li>
            ))}
          </ul>
          <form className="rounded-2xl border border-white/15 bg-white/5 px-3 py-3" onSubmit={handleSubmit}>
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Type a message..."
              className="h-10 w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 text-sm text-slate-100 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
            />
          </form>
        </Card>
        {!canInviteFriends ? (
          <p className="text-xs text-amber-300">
            Custom room invites require a Bronze card or higher. Visit the shop to upgrade your loadout before inviting
            teammates.
          </p>
        ) : null}
        <Button variant="danger" rightIcon="arrow-right" onClick={() => window.history.back()}>
          Leave room
        </Button>
      </aside>
    </div>
  )
}

export default RoomDetailPage

