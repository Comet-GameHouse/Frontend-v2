import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '@components/ui/Button'
import { Card } from '@components/ui/Card'
import { UPCOMING_TOURNAMENTS } from './data'

function TournamentsPage() {
  return (
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
            <p className="text-sm text-slate-400">
              {event.coinPrize ? (
                <span className="mr-2 inline-flex items-center gap-1 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-cyan-100">
                  {event.coinPrize}
                  <FontAwesomeIcon icon="coins" className="h-3 w-3" aria-hidden="true" />
                  <span className="sr-only">coins</span>
                </span>
              ) : null}
              {event.prize}
            </p>
            <Button variant="outline" size="sm" rightIcon="arrow-right" onClick={() => window.open('https://events.comet.gg', '_blank', 'noopener')}>
              View bracket details
            </Button>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default TournamentsPage

