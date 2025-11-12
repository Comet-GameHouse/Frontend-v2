import { useMemo } from 'react'
import Button from '@components/ui/Button'
import { Card } from '@components/ui/Card'
import GameLayout from '@layouts/GameLayout'

function RoomDetailPage() {
  const participants = useMemo(
    () => [
      { name: 'NovaStrike', role: 'Captain', status: 'Ready' },
      { name: 'PhaseRunner', role: 'Strategist', status: 'Ready' },
      { name: 'AstroBloom', role: 'Support', status: 'Ready' },
      { name: 'MeteorMage', role: 'Flex', status: 'Not Ready' },
    ],
    [],
  )
  const chatFeed = useMemo(
    () => [
      { author: 'NovaStrike', message: 'Remember to cover B node first rotation.', time: '19:32' },
      { author: 'PhaseRunner', message: 'Copy. Saving ult for third push.', time: '19:33' },
      { author: 'MeteorMage', message: 'One minute, adjusting loadout.', time: '19:34' },
    ],
    [],
  )

  return (
    <GameLayout
      title="Room Lobby"
      description="Coordinate with teammates, review rules, and get ready before launch."
    >
      <div className="flex flex-col gap-6">
        <Card variant="cosmic" className="space-y-4" data-aos="fade-up" data-aos-duration="300" data-aos-delay="100">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">Match ID • 9824-AX</p>
              <h2 className="text-2xl font-semibold text-white">Cosmic Conquest • Control</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" rightIcon="arrow-right">
                Ready up
              </Button>
              <Button variant="outline" rightIcon="triangle-exclamation">
                Report issue
              </Button>
            </div>
          </div>
          <p className="text-sm text-slate-300">
            Draft phase closes in 03:12. Double-check loadouts and voice comms before the server locks.
          </p>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card variant="void" className="space-y-3" data-aos="fade-up" data-aos-duration="300" data-aos-delay="150">
            <h3 className="text-lg font-semibold text-white">Roster</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {participants.map((participant, idx) => (
                <li key={participant.name} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3" data-aos="fade-up" data-aos-duration="300" data-aos-delay={String(200 + idx * 50)}>
                  <div>
                    <p className="font-semibold text-white">{participant.name}</p>
                    <p className="text-xs text-slate-400">{participant.role}</p>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">{participant.status}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card variant="void" className="space-y-3" data-aos="fade-up" data-aos-duration="300" data-aos-delay="200">
            <h3 className="text-lg font-semibold text-white">Strategy & comms</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {chatFeed.map((entry, idx) => (
                <li key={entry.time} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3" data-aos="fade-up" data-aos-duration="300" data-aos-delay={String(250 + idx * 50)}>
                  <div className="flex items-center justify-between text-xs text-cyan-200">
                    <span>{entry.author}</span>
                    <span>{entry.time}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-200">{entry.message}</p>
                </li>
              ))}
            </ul>
            <Button variant="ghost" size="sm" onClick={() => window.open('https://discord.gg/cometgamehouse', '_blank', 'noopener')}>
              Open Discord channel
            </Button>
          </Card>
        </div>

        <Card variant="void" className="space-y-3" data-aos="fade-up" data-aos-duration="300" data-aos-delay="300">
          <h3 className="text-lg font-semibold text-white">Rules of engagement</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            {['No duplicate ultimates', 'Pause limit: 2 per team', 'Disconnect grace: 90 seconds'].map((rule, idx) => (
              <div key={rule} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300" data-aos="fade-up" data-aos-duration="300" data-aos-delay={String(350 + idx * 50)}>
                {rule}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </GameLayout>
  )
}

export default RoomDetailPage

