import { useMemo } from 'react'
import Button from '@components/ui/Button'
import { Card } from '@components/ui/Card'
import GameLayout from '@layouts/GameLayout'

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
    <GameLayout
      title="Friends & Squads"
      description="Manage your party, see who’s online, and jump into rooms together."
    >
      <div className="flex flex-col gap-6">
        <Card variant="glass" className="space-y-3" data-aos="fade-up" data-aos-duration="300" data-aos-delay="100">
          <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-white">Active invitations</h2>
            <Button variant="primary" rightIcon="arrow-right" onClick={() => window.open('/support', '_self')}>
              Create squad invite
            </Button>
          </header>
          <div className="grid gap-3 md:grid-cols-2">
            {invites.map((invite, idx) => (
              <Card key={invite.squad} variant="void" className="space-y-2" data-aos="fade-up" data-aos-duration="300" data-aos-delay={String(150 + idx * 50)}>
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

        <Card variant="void" className="space-y-3" data-aos="fade-up" data-aos-duration="300" data-aos-delay="250">
          <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-white">Friends roster</h2>
            <Button variant="outline" leftIcon="user-plus" onClick={() => window.open('/support', '_self')}>
              Add friend
            </Button>
          </header>
          <ul className="space-y-2">
            {friends.map((friend, idx) => (
              <li key={friend.name} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3" data-aos="fade-up" data-aos-duration="300" data-aos-delay={String(300 + idx * 50)}>
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

        <Card variant="void" className="space-y-3" data-aos="fade-up" data-aos-duration="300" data-aos-delay="400">
          <h2 className="text-lg font-semibold text-white">Voice lounges</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {['LFG • Control', 'Scrim Room A', 'Raid Strategy'].map((channel, idx) => (
              <div key={channel} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300" data-aos="fade-up" data-aos-duration="300" data-aos-delay={String(450 + idx * 50)}>
                {channel}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </GameLayout>
  )
}

export default FriendsPage

