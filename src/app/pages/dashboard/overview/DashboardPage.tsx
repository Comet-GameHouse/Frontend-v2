import { useNavigate } from 'react-router-dom'
import { Card, Button } from '@components'
import { useAbilityCards } from '@providers'
import cn from '@lib/cn'

const SUMMARY = [
  { label: 'Rank Points', value: '2,430', change: '+120 this week' },
  { label: 'Active Sessions', value: '3', change: 'Rooms synced across NA/EU' },
  { label: 'Daily Streak', value: '7 days', change: 'Keep playing for bonus shards' },
]

const ACTIVITIES = [
  { title: 'Squad victory in Nebula Showdown', detail: 'Final score 24-18 · +65 RP · MVP as Support', time: '19 minutes ago' },
  { title: 'Season challenge unlocked', detail: 'Earn 10 plasma assists in ranked arena matches', time: '2 hours ago' },
  { title: 'Creator pass payout processed', detail: '14,500 credits sent to linked wallet', time: 'Yesterday' },
]

function DashboardPage() {
  const navigate = useNavigate()
  const { activeCard, cards, activeCardId, selectedCard, selectedCardId, selectCard, setActiveCardId } = useAbilityCards()

  const getRemainingDays = (label: string) => {
    const match = label.match(/(\d+)/g)
    if (!match || match.length === 0) return null
    const value = Number(match[match.length - 1])
    return Number.isNaN(value) ? null : value
  }

  return (
    <>
      <section className="grid gap-4 sm:grid-cols-3" data-aos="fade-up" data-aos-duration="300" data-aos-delay="150">
        {SUMMARY.map((item, index) => (
          <Card
            key={item.label}
            variant="glass"
            className="space-y-2"
            data-aos="fade-up"
            data-aos-duration="300"
            data-aos-delay={String(150 + index * 100)}
          >
            <p className="text-xs font-semibold text-cyan-200">{item.label}</p>
            <p className="text-2xl font-semibold text-white">{item.value}</p>
            <p className="text-xs text-slate-400">{item.change}</p>
          </Card>
        ))}
      </section>

      <Card variant="void" className="space-y-4" data-aos="fade-up" data-aos-duration="300" data-aos-delay="220">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Active Ability Card</h2>
            <p className="text-sm text-slate-400">This multiplier applies to every room entry until the card expires.</p>
            <p className="text-xs text-slate-500">
              Ability cards are purchased with real currency. Bronze unlocks private-room friend invites; Diamond and above lift
              avatar upload restrictions in profile settings.
            </p>
          </div>
          <Button variant="outline" size="sm" rightIcon="arrow-right" onClick={() => navigate('/progress/shop')}>
            Manage cards
          </Button>
        </div>
        <div className="grid gap-4 lg:grid-cols-[1fr,1fr]">
          <div
            className={cn(
              'relative overflow-hidden rounded-3xl border px-5 py-4 text-sm transition',
              activeCard.theme.panel,
              'backdrop-blur-xl',
            )}
          >
            <span
              className={cn(
                'pointer-events-none absolute -top-24 right-0 size-52 rounded-full blur-3xl opacity-70',
                activeCard.theme.glow,
              )}
              aria-hidden="true"
            />
            <div className="relative flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className={cn('text-xs uppercase tracking-[0.3em]', activeCard.theme.badge)}>{activeCard.tier}</p>
                <p className="text-lg font-semibold text-white">{activeCard.title}</p>
              </div>
              <div className={cn('inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs', activeCard.theme.chip)}>
                entry cost × 2 × {activeCard.multiplier.toFixed(2)}
              </div>
            </div>
            <p className="relative mt-2 text-xs text-slate-200">Active • {activeCard.expiresLabel}</p>
            <ul className="relative mt-3 space-y-2 text-sm text-slate-200">
              <li className="flex items-start gap-2">
                <span className="mt-1 size-1.5 flex-none rounded-full bg-cyan-300" />
                <span>Purchased with real currency via the Comet Store.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 size-1.5 flex-none rounded-full bg-cyan-300" />
                <span>
                  Winner payout: entry cost × 2 × {activeCard.multiplier.toFixed(2)}
                  {activeCard.tier === 'mythic' ? ' ~ 1.00' : ''}.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 size-1.5 flex-none rounded-full bg-cyan-300" />
                <span>{activeCard.expiresLabel}</span>
              </li>
              {activeCard.details.map((detail) => (
                <li key={detail} className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 flex-none rounded-full bg-cyan-300" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200 backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Selected card</p>
                <p className="text-sm font-semibold text-white">{selectedCard.title}</p>
              </div>
              <div className="text-right text-xs text-slate-300">
                <p>entry cost × 2 × {selectedCard.multiplier.toFixed(2)}{selectedCard.tier === 'mythic' ? ' ~ 1.00' : ''}</p>
                <p>
                  {selectedCard.expiresLabel}{' '}
                  {(() => {
                    const remaining = getRemainingDays(selectedCard.expiresLabel)
                    return remaining !== null ? (
                      <span className="text-emerald-300">
                        ({remaining === 1 ? '1 day remaining' : `${remaining} days remaining`})
                      </span>
                    ) : null
                  })()}
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {cards.map((card) => {
                const isActive = card.id === activeCardId
                const isSelected = card.id === selectedCardId || (!selectedCardId && isActive)
                return (
                  <div
                    key={card.id}
                    className={cn(
                      'relative flex h-full flex-col gap-2 overflow-hidden rounded-2xl border px-4 py-3 text-xs transition',
                      card.theme.panel,
                      'border-white/10 backdrop-blur-lg',
                      isActive && 'ring-2 ring-cyan-300/60',
                      isSelected && !isActive && 'border-cyan-300/50',
                    )}
                  >
                    <span
                      className={cn(
                        'pointer-events-none absolute -top-12 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full blur-2xl opacity-70',
                        card.theme.glow,
                      )}
                      aria-hidden="true"
                    />
                    <div className="relative flex flex-col gap-1">
                      <span className={cn('text-[10px] uppercase tracking-[0.38em]', card.theme.badge)}>{card.tier}</span>
                      <span className="text-sm font-semibold text-white">{card.title}</span>
                      <span className="text-slate-300">
                        {card.expiresLabel}{' '}
                        {(() => {
                          const remaining = getRemainingDays(card.expiresLabel)
                          return remaining !== null ? (
                            <span className="text-emerald-300">
                              ({remaining === 1 ? '1 day left' : `${remaining} days left`})
                            </span>
                          ) : null
                        })()}
                      </span>
                    </div>
                    <p className="relative text-slate-200">
                      entry cost × 2 × {card.multiplier.toFixed(2)}
                      {card.tier === 'mythic' ? ' ~ 1.00' : ''}
                    </p>
                    <ul className="relative space-y-1 text-slate-200">
                      {card.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                    <div className="relative mt-auto flex items-center gap-2 pt-2">
                      <Button
                        variant={isSelected ? 'outline' : 'ghost'}
                        size="xs"
                        disabled={isSelected}
                        onClick={() => selectCard(card.id)}
                      >
                        {isSelected ? 'Selected' : 'Preview'}
                      </Button>
                      <Button
                        variant={isActive ? 'outline' : 'primary'}
                        size="xs"
                        disabled={isActive || !isSelected}
                        onClick={() => {
                          setActiveCardId(card.id)
                          selectCard(null)
                        }}
                      >
                        {isActive ? 'In use' : 'Activate'}
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Card>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]" data-aos="fade-up" data-aos-duration="300" data-aos-delay="250">
        <Card variant="void" className="space-y-4">
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
              <p className="text-sm text-slate-400">Match outcomes, rewards, and system updates</p>
            </div>
            <Button variant="outline" size="sm" rightIcon="arrow-right" onClick={() => navigate('/notifications')}>
              View log
            </Button>
          </header>
          <ul className="space-y-3 text-sm text-slate-300">
            {ACTIVITIES.map((event, index) => (
              <li key={event.title} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" data-aos="fade-up" data-aos-duration="300" data-aos-delay={String(300 + index * 100)}>
                <p className="font-semibold text-white">{event.title}</p>
                <p className="text-xs text-slate-400">{event.detail}</p>
                <p className="text-xs text-slate-500">{event.time}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card variant="glass" className="space-y-4" data-aos="fade-up" data-aos-duration="300" data-aos-delay="300">
          <h2 className="text-lg font-semibold text-white">Upcoming</h2>
          <p className="text-sm text-slate-300">Join scheduled scrims or track seasonal resets.</p>
          <ul className="space-y-3 text-xs text-slate-400">
            <li className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-slate-100">
              Tournament qualifier · Tomorrow 18:00 UTC
            </li>
            <li className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              Rank reset reminder · 3 days remaining
            </li>
            <li className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              Creator AMA · Friday 21:00 UTC
            </li>
          </ul>
        </Card>
      </section>
    </>
  )
}

export default DashboardPage

