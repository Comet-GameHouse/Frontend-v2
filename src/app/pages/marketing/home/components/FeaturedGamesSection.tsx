import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '@components/ui/Button'
import { Card } from '@components/ui/Card'
import { GAMES } from '../homeData'
import { useAOS } from '@hooks'

type FeaturedGamesProps = {
  onNavigate: (path: string) => void
}

function FeaturedGamesSection({ onNavigate }: FeaturedGamesProps) {
  const getAOSProps = useAOS()
  
  return (
    <section className="mx-auto max-w-6xl space-y-6 px-6" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '150' })}>
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Featured rotations</h2>
          <p className="text-sm text-slate-400">Jump in solo or bring your squad—matchmaking is instant.</p>
        </div>
        <Button variant="outline" rightIcon="arrow-right" onClick={() => onNavigate('/games')}>
          View full library
        </Button>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {GAMES.map(({ title, meta, icon }, idx) => (
          <Card key={title} variant="cosmic" className="space-y-3" onClick={() => onNavigate('/games')} {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': String(200 + idx * 50) })}>
            <div className="flex h-28 items-center justify-center rounded-xl border border-white/10 bg-slate-900/60">
              <FontAwesomeIcon icon={icon} className="h-10 w-10 text-white" />
            </div>
            <p className="text-lg font-semibold text-white">{title}</p>
            <p className="text-xs text-slate-400">{meta}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default FeaturedGamesSection

