import { useNavigate } from 'react-router-dom'
import { Card, Button } from '@components'

const STATS = [
  { label: 'Matches Played', value: '486' },
  { label: 'Win Rate', value: '58%' },
  { label: 'Preferred Role', value: 'Support' },
]
const BADGES = [
  {
    title: 'Nebula Champion',
    detail: 'Finish top 1% in ranked season 09.',
    image: 'https://res.cloudinary.com/demo/image/upload/v1439593208/nebula-badge.png',
  },
  {
    title: 'Architect',
    detail: 'Create 50 custom rooms with 90% rating.',
    image: 'https://res.cloudinary.com/demo/image/upload/v1439593208/architect-badge.png',
  },
  {
    title: 'Cosmic Courier',
    detail: 'Deliver 500 assists across arenas.',
    image: 'https://res.cloudinary.com/demo/image/upload/v1439593208/courier-badge.png',
  },
]
const LEVEL = { current: 42, earned: 2650, required: 4000 }
const GLOBAL_RANK = { position: 128, percentile: 'Top 3%', score: 19420 }

function ProfilePage() {
  const navigate = useNavigate()
  const progress = Math.min(Math.round((LEVEL.earned / LEVEL.required) * 100), 100)

  return (
    <>
      <Card variant="glass" className="space-y-5" data-aos="fade-up" data-aos-duration="300" data-aos-delay="150">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="flex size-16 items-center justify-center rounded-2xl border border-cyan-400/40 bg-cyan-400/10 text-2xl font-semibold text-cyan-200">
              CN
            </span>
            <div>
              <h2 className="text-lg font-semibold text-white">Commander Nova</h2>
              <p className="text-sm text-slate-400">@CometCommander · privacy@comet.gg</p>
              <p className="text-xs text-slate-500">Joined Feb 2023</p>
            </div>
          </div>
          <Button variant="outline" size="sm" rightIcon="arrow-right" onClick={() => navigate('/settings')}>
            Edit profile
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card variant="void" className="space-y-3 sm:col-span-2" data-aos="fade-up" data-aos-duration="300" data-aos-delay="200">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Level {LEVEL.current}</span>
              <span>
                {LEVEL.earned.toLocaleString()} XP • Next at {LEVEL.required.toLocaleString()} XP
              </span>
            </div>
            <div className="h-2 rounded-full bg-slate-800">
              <div className="h-full rounded-full bg-cyan-400/80" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs text-slate-400">{100 - progress}% to next level</p>
          </Card>

          <Card variant="void" className="space-y-2" data-aos="fade-up" data-aos-duration="300" data-aos-delay="250">
            <p className="text-xs font-semibold text-cyan-200">Global Rank</p>
            <p className="text-2xl font-semibold text-white">#{GLOBAL_RANK.position}</p>
            <p className="text-xs text-slate-400">{GLOBAL_RANK.percentile} • Score {GLOBAL_RANK.score.toLocaleString()}</p>
          </Card>

          {STATS.map((stat, index) => (
            <Card
              key={stat.label}
              variant="void"
              className="space-y-2"
              data-aos="fade-up"
              data-aos-duration="300"
              data-aos-delay={String(300 + index * 100)}
            >
              <p className="text-xs font-semibold text-cyan-200">{stat.label}</p>
              <p className="text-2xl font-semibold text-white">{stat.value}</p>
            </Card>
          ))}
        </div>

        <p className="text-sm text-slate-300">
          Cosmic strategist and support main. Coordinating late-night squads, experimenting with burst healing builds, and streaming community tournaments each weekend.
        </p>
      </Card>

      <Card variant="glass" className="space-y-3" data-aos="fade-up" data-aos-duration="300" data-aos-delay="400">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Badge Case</h2>
          <Button variant="outline" size="sm" rightIcon="arrow-right" onClick={() => navigate('/progress/achievements')}>
            View all
          </Button>
        </div>
        <ul className="space-y-3 text-sm text-slate-300">
          {BADGES.map((badge, index) => (
            <li
              key={badge.title}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              data-aos="fade-up"
              data-aos-duration="300"
              data-aos-delay={String(450 + index * 100)}
            >
              <img src={badge.image} alt={badge.title} className="size-10 rounded-xl border border-white/10 object-cover" />
              <div>
                <p className="font-semibold text-white">{badge.title}</p>
                <p className="text-xs text-slate-400">{badge.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </>
  )
}

export default ProfilePage

