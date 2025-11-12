import { Card, Button } from '@components'

type Achievement = {
  title: string
  detail: string
  image: string
  upgradeImage: string
  achieved: boolean
  claimed: boolean
  progressText: string
  completion: number
}

const ACHIEVEMENTS: Achievement[] = [
  {
    title: 'Celestial MVP',
    detail: 'Finish 25 matches with top-score streaks.',
    image: 'https://res.cloudinary.com/demo/image/upload/v1439593208/nebula-badge.png',
    upgradeImage: 'https://res.cloudinary.com/demo/image/upload/v1439593208/nebula-badge-legendary.png',
    achieved: true,
    claimed: false,
    progressText: '25 / 25 matches complete',
    completion: 100,
  },
  {
    title: 'Aurora Medic',
    detail: 'Deliver 500 support assists across ranked arenas.',
    image: 'https://res.cloudinary.com/demo/image/upload/v1439593208/architect-badge.png',
    upgradeImage: 'https://res.cloudinary.com/demo/image/upload/v1439593208/architect-badge-legendary.png',
    achieved: true,
    claimed: true,
    progressText: 'Claimed • +750 support XP',
    completion: 100,
  },
  {
    title: 'Darkstar Strategist',
    detail: 'Win 10 matches using custom room rule sets.',
    image: 'https://res.cloudinary.com/demo/image/upload/v1439593208/courier-badge.png',
    upgradeImage: 'https://res.cloudinary.com/demo/image/upload/v1439593208/courier-badge-legendary.png',
    achieved: false,
    claimed: false,
    progressText: '6 / 10 wins',
    completion: 60,
  },
]

const PATH = [
  { step: 'Complete placement matches', status: 'Done' },
  { step: 'Unlock platinum-tier badge', status: 'In progress' },
  { step: 'Hit top 500 leaderboard', status: 'Locked' },
]

const SECTIONS = [
  {
    label: 'Ready to claim',
    filter: (achievement: Achievement) => achievement.achieved && !achievement.claimed,
    empty: 'Keep grinding to unlock more legendary tiers.',
  },
  {
    label: 'Equipped badges',
    filter: (achievement: Achievement) => achievement.claimed,
    empty: 'Claim rewards to populate your case.',
  },
  {
    label: 'In progress',
    filter: (achievement: Achievement) => !achievement.achieved,
    empty: 'All set—queue up and chase fresh objectives.',
  },
]

function AchievementsPage() {
  return (
    <div className="space-y-6">
      {SECTIONS.map((section, sectionIndex) => {
        const items = ACHIEVEMENTS.filter(section.filter)

        return (
          <Card
            key={section.label}
            variant="void"
            className="space-y-3"
            data-aos="fade-up"
            data-aos-duration="300"
            data-aos-delay={String(150 + sectionIndex * 100)}
          >
            <header className="flex items-center justify-between text-sm text-slate-400">
              <span>{section.label}</span>
              <span>
                {items.length} achievement{items.length === 1 ? '' : 's'}
              </span>
            </header>

            {items.length === 0 ? (
              <div className="rounded-2xl border border-white/5 bg-white/5 px-4 py-5 text-sm text-slate-400">
                {section.empty}
              </div>
            ) : (
              <ul className="space-y-2">
                {items.map((achievement, achievementIndex) => {
                  const isUpgraded = achievement.achieved
                  const imageSrc = isUpgraded ? achievement.upgradeImage : achievement.image
                  const buttonLabel = achievement.achieved
                    ? achievement.claimed
                      ? 'Equipped'
                      : 'Claim reward'
                    : 'View goal'
                  const buttonVariant = achievement.achieved && !achievement.claimed ? 'primary' : 'outline'

                  return (
                    <li
                      key={achievement.title}
                      className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:gap-6"
                      data-aos="fade-up"
                      data-aos-duration="300"
                      data-aos-delay={String(200 + achievementIndex * 50)}
                    >
                      <div className="flex flex-1 items-start gap-3">
                        <img
                          src={imageSrc}
                          alt={achievement.title}
                          className={`h-16 w-16 rounded-2xl object-contain p-2 ${
                            isUpgraded
                              ? 'bg-gradient-to-br from-cyan-400/20 via-purple-500/20 to-fuchsia-400/20 ring-2 ring-cyan-300/60'
                              : 'bg-white/10'
                          }`}
                        />
                        <div className="space-y-1">
                          <p className="text-base font-semibold text-white">{achievement.title}</p>
                          <p className="text-sm text-slate-400">{achievement.detail}</p>
                          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">{achievement.progressText}</p>
                        </div>
                      </div>

                      <div className="flex w-full flex-col gap-4 sm:max-w-xs">
                        <div className="h-1.5 rounded-full bg-slate-800">
                          <div
                            className={`h-full rounded-full ${
                              achievement.completion === 100 ? 'bg-emerald-400' : 'bg-cyan-400'
                            }`}
                            style={{ width: `${achievement.completion}%` }}
                          />
                        </div>
                        {achievement.achieved && (
                          <span className="text-xs font-medium text-emerald-300">Legendary badge unlocked</span>
                        )}
                        <Button
                          variant={buttonVariant}
                          size="sm"
                          rightIcon={achievement.achieved && !achievement.claimed ? 'arrow-right' : undefined}
                          className="sm:w-40 whitespace-nowrap"
                          disabled={achievement.claimed}
                        >
                          {buttonLabel}
                        </Button>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </Card>
        )
      })}

      <Card
        variant="void"
        className="space-y-3"
        data-aos="fade-up"
        data-aos-duration="300"
        data-aos-delay="450"
      >
        <h2 className="text-lg font-semibold text-white">Progression Path</h2>
        <ul className="space-y-3 text-sm text-slate-300">
          {PATH.map((node, index) => (
            <li
              key={node.step}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              data-aos="fade-up"
              data-aos-duration="300"
              data-aos-delay={String(500 + index * 50)}
            >
              <span>{node.step}</span>
              <span className="text-xs text-cyan-200">{node.status}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}

export default AchievementsPage

