import { useNavigate } from 'react-router-dom'
import { Card, Button } from '@components'
import { useAbilityCards } from '@providers'
import cn from '@lib/cn'

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
  const { activeCard } = useAbilityCards()
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
          <Button variant="outline" size="sm" rightIcon="arrow-right" onClick={() => navigate('/settings/profile')}>
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

        <div
          className={cn(
            'relative space-y-3 overflow-hidden rounded-3xl border px-5 py-4 text-sm transition',
            activeCard.theme.panel,
            'backdrop-blur-xl',
          )}
        >
          <span
            className={cn(
              'pointer-events-none absolute -top-16 right-0 size-48 rounded-full blur-3xl opacity-70',
              activeCard.theme.glow,
            )}
            aria-hidden="true"
          />
          <div className="relative flex flex-wrap items-center justify-between gap-3 text-slate-100">
            <div>
              <p className={cn('text-xs uppercase tracking-[0.3em]', activeCard.theme.badge)}>Active ability card</p>
              <p className="text-sm font-semibold text-white">{activeCard.title}</p>
            </div>
            <div className={cn('inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs', activeCard.theme.chip)}>
              entry cost × 2 × {activeCard.multiplier.toFixed(2)}
            </div>
          </div>
          <p className="relative text-xs text-slate-200">{activeCard.expiresLabel}</p>
          <p className="relative text-xs text-slate-400">
            Ability cards are premium purchases. Bronze unlocks friend invites to custom rooms, while Diamond and higher allow
            custom avatar uploads in profile settings.
          </p>
                <ul className="relative space-y-2 text-sm text-slate-200">
                  {activeCard.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2">
                      <span className="mt-1 size-1.5 flex-none rounded-full bg-cyan-300" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
          <Button variant="outline" size="xs" rightIcon="arrow-right" onClick={() => navigate('/progress/shop')}>
            Browse ability cards
          </Button>
        </div>
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

