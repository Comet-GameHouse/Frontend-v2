import Button from '@components/ui/Button'
import { Card } from '@components/ui/Card'
import GameLayout from '@layouts/GameLayout'
import { UPCOMING_TOURNAMENTS } from './data'

function TournamentsPage() {
  return (
    <GameLayout
      title="Tournaments & Events"
      description="Lock in your squad for seasonal cups, partner showcases, and community spotlights."
    >
      <section className="flex flex-col gap-6">
        <Card variant="cosmic" className="space-y-4" data-aos="fade-up" data-aos-duration="300" data-aos-delay="100">
          <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">On deck</p>
              <h2 className="text-2xl font-semibold text-white">Upcoming brackets</h2>
            </div>
            <Button variant="primary" rightIcon="arrow-right" onClick={() => window.open('https://discord.gg/cometgamehouse', '_blank', 'noopener')}>
              Register via Discord
            </Button>
          </header>
          <p className="text-sm text-slate-300">Check-in opens one hour before start. Captains must confirm rosters to secure slots.</p>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {UPCOMING_TOURNAMENTS.map((event, idx) => (
            <Card key={event.title} variant="glass" className="space-y-3" data-aos="fade-up" data-aos-duration="300" data-aos-delay={String(150 + idx * 50)}>
              <div className="flex items-center justify-between text-xs text-cyan-200">
                <span>{event.startsIn}</span>
                <span>{event.slots}</span>
              </div>
              <h3 className="text-lg font-semibold text-white">{event.title}</h3>
              <p className="text-sm text-slate-300">{event.format}</p>
              <p className="text-sm text-slate-400">{event.prize}</p>
              <Button variant="outline" size="sm" rightIcon="arrow-right" onClick={() => window.open('https://events.comet.gg', '_blank', 'noopener')}>
                View bracket details
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </GameLayout>
  )
}

export default TournamentsPage

