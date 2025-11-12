import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '@components/ui/Button'
import { Card } from '@components/ui/Card'
import type { GameLibraryEntry } from '../libraryData'

type GamesGridProps = {
  games: GameLibraryEntry[]
  onSelect: (slug: string) => void
}

function GamesGrid({ games, onSelect }: GamesGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {games.map((game, idx) => (
        <Card
          key={game.slug}
          variant="glass"
          className="space-y-4 border border-slate-800/60 bg-slate-900/60"
          data-aos="fade-up"
          data-aos-duration="300"
          data-aos-delay={String(200 + idx * 50)}
        >
          <div className={`flex h-40 flex-col justify-between rounded-xl border bg-gradient-to-br ${game.gradient} p-5 text-white`}>
            <div className="flex items-center gap-3 text-lg font-semibold">
              <FontAwesomeIcon icon={game.icon} className="h-6 w-6 text-white/90" />
              <span>{game.title}</span>
            </div>
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/70">
              <span>{game.mode}</span>
              <span>{game.players}</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-slate-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">
              {game.status}
            </span>
            <Button variant="outline" size="sm" rightIcon="arrow-right" onClick={() => onSelect(game.slug)}>
              View details
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default GamesGrid

