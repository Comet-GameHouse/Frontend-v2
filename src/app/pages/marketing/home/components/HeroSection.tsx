import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '@components/ui/Button'

type HeroCta = { label: string; icon: IconProp; to: string; variant: 'primary' | 'outline' }

type HeroSectionProps = {
  ctas: HeroCta[]
  onNavigate: (path: string) => void
}

function HeroSection({ ctas, onNavigate }: HeroSectionProps) {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 pt-20 text-center" data-aos="fade-up" data-aos-duration="300">
      <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-1 text-sm text-cyan-200">
        <FontAwesomeIcon icon="meteor" className="h-4 w-4" /> Join 50,000+ players nightly
      </span>
      <h1 className="max-w-3xl text-4xl font-bold sm:text-5xl lg:text-6xl">
        Claim the <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Comet GameHouse</span> arena
      </h1>
      <p className="max-w-2xl text-lg text-slate-400">
        Fast queues, custom rooms, and cross-platform squads. Build your crew and chase the leaderboard glow.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {ctas.map((cta, idx) => (
          <Button key={cta.label} variant={cta.variant} size="lg" rightIcon={cta.icon} onClick={() => onNavigate(cta.to)} data-aos="fade-up" data-aos-duration="300" data-aos-delay={String(150 + idx * 50)}>
            {cta.label}
          </Button>
        ))}
      </div>
    </section>
  )
}

export type { HeroCta }
export default HeroSection

