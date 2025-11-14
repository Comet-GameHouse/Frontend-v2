import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '@components/ui/Button'
import { Card } from '@components/ui/Card'
import { useAOS } from '@hooks'

type Friend = {
  name: string
  status: 'Online' | 'In Match' | 'Away'
  game: string
}

type Invite = {
  squad: string
  mode: string
  slots: string
}

function FriendsPage() {
  const getAOSProps = useAOS()
  const friends: Friend[] = useMemo(
    () => [
      { name: 'NovaStrike', status: 'Online', game: 'Nebula Showdown' },
      { name: 'PhaseRunner', status: 'In Match', game: 'Velocity Rush' },
      { name: 'AstralBloom', status: 'Away', game: 'Void Raid' },
    ],
    [],
  )
  const invites: Invite[] = useMemo(
    () => [
      { squad: 'Eclipse Vanguard', mode: 'Cosmic Conquest scrim', slots: '3/4 filled' },
      { squad: 'Nebula Knights', mode: 'Void Raid expedition', slots: '5/6 filled' },
    ],
    [],
  )

  return (
    <div className="flex flex-col gap-6">
      <Card variant="void" className="space-y-3" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '75' })}>
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Invite friends</h2>
            <p className="text-sm text-slate-300">
              Earn
              <span className="inline-flex items-center gap-1 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-cyan-100">
                <FontAwesomeIcon icon="coins" className="h-3 w-3" aria-hidden="true" />
                <span className="sr-only">coins</span>
              </span>
              when new pilots join Comet GameHouse with your link.
            </p>
          </div>
          <Button asChild variant="primary" size="sm" rightIcon="arrow-right">
            <Link to="/invite">Get referral link</Link>
          </Button>
        </header>
      </Card>

      <Card variant="glass" className="space-y-3" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '100' })}>
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-white">Active invitations</h2>
          <Button variant="primary" rightIcon="arrow-right" onClick={() => window.open('/support', '_self')}>
            Create squad invite
          </Button>
        </header>
        <div className="grid gap-3 md:grid-cols-2">
          {invites.map((invite, idx) => (
            <Card key={invite.squad} variant="void" className="space-y-2" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': String(150 + idx * 50) })}>
              <p className="text-sm font-semibold text-white">{invite.squad}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">{invite.mode}</p>
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>{invite.slots}</span>
                <Button variant="outline" size="sm" rightIcon="arrow-right" onClick={() => window.open('/rooms/sample', '_self')}>
                  Join lobby
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <Card variant="void" className="space-y-3" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '250' })}>
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-white">Friends roster</h2>
          <Button variant="outline" leftIcon="user-plus" onClick={() => window.open('/support', '_self')}>
            Add friend
          </Button>
        </header>
        <ul className="space-y-2">
          {friends.map((friend, idx) => (
            <li key={friend.name} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': String(300 + idx * 50) })}>
              <div>
                <p className="font-semibold text-white">{friend.name}</p>
                <p className="text-xs text-slate-400">{friend.game}</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-cyan-200">
                <span>{friend.status}</span>
                <Button variant="ghost" size="sm" rightIcon="arrow-right" onClick={() => window.open(`/messages/${friend.name}`, '_self')}>
                  Invite
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <Card variant="void" className="space-y-3" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '400' })}>
        <h2 className="text-lg font-semibold text-white">Voice lounges</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {['LFG • Control', 'Scrim Room A', 'Raid Strategy'].map((channel, idx) => (
            <div key={channel} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': String(450 + idx * 50) })}>
              {channel}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default FriendsPage

