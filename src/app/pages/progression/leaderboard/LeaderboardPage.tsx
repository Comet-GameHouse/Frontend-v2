import { Card } from '@components'
import { RANKINGS, SEGMENTS } from './data'

function LeaderboardPage() {
  return (
    <>
      <Card variant="glass" className="space-y-3" data-aos="fade-up" data-aos-duration="300" data-aos-delay="150">
        <h2 className="text-lg font-semibold text-white">Highlights</h2>
        <p className="text-sm text-slate-300">
          Rankings refresh every hour. Secure a top 500 spot to unlock seasonal aurora trophies and profile animations.
        </p>
      </Card>

      <section className="grid gap-4 lg:grid-cols-[2fr,1fr]" data-aos="fade-up" data-aos-duration="300" data-aos-delay="200">
        <Card variant="void" className="space-y-3">
          <header className="flex items-center justify-between text-sm text-slate-400">
            <span>Top contenders</span>
            <span>Change vs previous hour</span>
          </header>
          <ul className="max-h-[480px] space-y-2 overflow-y-auto pr-1 text-sm text-slate-300">
            {RANKINGS.map((entry, index) => (
              <li
                key={entry.name}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                data-aos="fade-up"
                data-aos-duration="300"
                data-aos-delay={String(250 + index * 50)}
              >
                <span className="font-semibold text-white">
                  #{entry.place} {entry.name}
                </span>
                <span className="text-xs text-cyan-200">
                  {entry.rating} ({entry.trend})
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card variant="glass" className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Segments</h3>
          <ul className="space-y-3 text-sm text-slate-300">
            {SEGMENTS.map((segment, index) => (
              <li
                key={segment.label}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                data-aos="fade-up"
                data-aos-duration="300"
                data-aos-delay={String(250 + index * 50)}
              >
                <p className="font-semibold text-white">{segment.label}</p>
                <p className="text-xs text-slate-400">{segment.detail}</p>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </>
  )
}

export default LeaderboardPage

