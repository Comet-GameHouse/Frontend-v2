import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '@components/ui/Button'
import { Card } from '@components/ui/Card'
import GameLayout from '@layouts/GameLayout'
import { GAME_DETAIL_MAP, DEFAULT_GAME_KEY } from './data'

function GameDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const detail = useMemo(() => GAME_DETAIL_MAP[id ?? DEFAULT_GAME_KEY] ?? GAME_DETAIL_MAP[DEFAULT_GAME_KEY], [id])

  return (
    <GameLayout title={detail.title} description={detail.tagline}>
      <section className="flex flex-col gap-6">
        <Card variant="glass" className="space-y-4" data-aos="fade-up" data-aos-duration="300" data-aos-delay="100">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-xl font-semibold text-white">
              <FontAwesomeIcon icon={detail.icon} className="h-7 w-7 text-cyan-300" />
              <span>{detail.title}</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" rightIcon="arrow-right" onClick={() => navigate('/arena')}>
                Join featured queue
              </Button>
              <Button variant="outline" onClick={() => navigate('/games')}>
                Back to library
              </Button>
            </div>
          </div>
          <p className="text-sm text-slate-300">{detail.overview}</p>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          <Card variant="void" className="space-y-3" data-aos="fade-up" data-aos-duration="300" data-aos-delay="150">
            <h2 className="text-lg font-semibold text-white">Recommended loadout</h2>
            <ul className="space-y-2 text-sm text-slate-300">
              {detail.loadout.map((item, idx) => (
                <li key={item} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2" data-aos="fade-up" data-aos-duration="300" data-aos-delay={String(200 + idx * 50)}>
                  {item}
                </li>
              ))}
            </ul>
          </Card>
          <Card variant="void" className="space-y-3" data-aos="fade-up" data-aos-duration="300" data-aos-delay="200">
            <h2 className="text-lg font-semibold text-white">Match objectives</h2>
            <ul className="space-y-2 text-sm text-slate-300">
              {detail.objectives.map((objective, idx) => (
                <li key={objective} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2" data-aos="fade-up" data-aos-duration="300" data-aos-delay={String(250 + idx * 50)}>
                  {objective}
                </li>
              ))}
            </ul>
          </Card>
          <Card variant="void" className="space-y-3" data-aos="fade-up" data-aos-duration="300" data-aos-delay="250">
            <h2 className="text-lg font-semibold text-white">Pro tips</h2>
            <ul className="space-y-2 text-sm text-slate-300">
              {detail.tips.map((tip, idx) => (
                <li key={tip} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2" data-aos="fade-up" data-aos-duration="300" data-aos-delay={String(300 + idx * 50)}>
                  {tip}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>
    </GameLayout>
  )
}

export default GameDetailPage

