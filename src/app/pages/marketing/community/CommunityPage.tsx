import MarketingLayout from '@layouts/MarketingLayout'
import { Card } from '@components/ui/Card'
import Button from '@components/ui/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconProp } from '@fortawesome/fontawesome-svg-core'

type Crew = {
  name: string
  focus: string
  members: string
}

type Event = {
  title: string
  detail: string
}

type Channel = {
  name: string
  summary: string
  icon: IconProp
}

const CREWS: Crew[] = [
  { name: 'Nebula Syndicate', focus: 'Ranked strategy scrims every weekend.', members: '2.1K members' },
  { name: 'Velocity Circuit', focus: 'Time-trial racing ladders with weekly drops.', members: '1.6K members' },
  { name: 'Aurora Forge', focus: 'Room builders sharing custom scripts and mods.', members: '980 members' },
]
const EVENTS: Event[] = [
  { title: 'Creator Spotlight', detail: 'Live Q&A with QuantumVex · Friday 20:00 UTC' },
  { title: 'Community Cup', detail: 'Trios showdown · 5,000 coin prize pool · registrations open' },
  { title: 'Workshop Live', detail: 'Learn room scripting basics with Forge mentors' },
]
const DISCORD_HIGHLIGHTS = [
  'Live match-finder and LFG voice lounges',
  'Hosted scrims, coaching pods, and VOD reviews',
  'Creator announcements, patch previews, and drops',
]
const CHANNELS: Channel[] = [
  { name: '#comet-news', summary: 'Patch notes, devstreams, and partnered drops.', icon: 'satellite' },
  { name: '#lfg-arena', summary: 'Queue instantly with squads by rank or role.', icon: 'gamepad' },
  { name: '#mod-support', summary: 'Moderation help, safety tools, and escalation.', icon: 'shield-halved' },
]

function CommunityPage() {
  return (
    <MarketingLayout title="Community Highlights" description="Discover featured creators, spotlight squads, and our brand-new Discord hub.">
      <Card variant="gradient" className="space-y-5" data-aos="fade-up" data-aos-duration="300" data-aos-delay="150">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-2xl font-semibold text-white">
            <FontAwesomeIcon icon={['fab', 'discord']} className="h-8 w-8" />
            <span>Join the Comet Discord</span>
          </div>
          <Button
            variant="primary"
            rightIcon={['fab', 'discord']}
            onClick={() => window.open('https://discord.gg/cometgamehouse', '_blank', 'noopener')}
          >
            Enter community server
          </Button>
        </div>
        <ul className="grid gap-3 text-sm text-slate-200 sm:grid-cols-3">
          {DISCORD_HIGHLIGHTS.map((item, idx) => (
            <li key={item} className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3" data-aos="fade-up" data-aos-duration="300" data-aos-delay={String(200 + idx * 50)}>
              {item}
            </li>
          ))}
        </ul>
        <div className="grid gap-3 text-left sm:grid-cols-3">
          {CHANNELS.map(({ name, summary, icon }, idx) => (
            <div key={name} className="rounded-2xl border border-white/25 bg-slate-950/40 px-4 py-4" data-aos="fade-up" data-aos-duration="300" data-aos-delay={String(300 + idx * 50)}>
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                <FontAwesomeIcon icon={icon} className="h-4 w-4 text-cyan-200" />
                <span>{name}</span>
              </div>
              <p className="text-xs text-slate-200">{summary}</p>
            </div>
          ))}
        </div>
      </Card>

      <section className="grid gap-4 sm:grid-cols-3" data-aos="fade-up" data-aos-duration="300" data-aos-delay="350">
        {CREWS.map(({ name, focus, members }, idx) => (
          <Card key={name} variant="glass" className="space-y-2" data-aos="fade-up" data-aos-duration="300" data-aos-delay={String(350 + idx * 50)}>
            <p className="text-lg font-semibold text-white">{name}</p>
            <p className="text-sm text-slate-300">{focus}</p>
            <p className="text-xs text-cyan-200">{members}</p>
          </Card>
        ))}
      </section>

      <Card variant="void" className="space-y-3" data-aos="fade-up" data-aos-duration="300" data-aos-delay="500">
        <h2 className="text-lg font-semibold text-white">Upcoming community beats</h2>
        <ul className="space-y-3 text-sm text-slate-300">
          {EVENTS.map(({ title, detail }, idx) => (
            <li key={title} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" data-aos="fade-up" data-aos-duration="300" data-aos-delay={String(550 + idx * 50)}>
              <p className="font-semibold text-white">{title}</p>
              <p className="text-xs text-slate-400">{detail}</p>
            </li>
          ))}
        </ul>
      </Card>
    </MarketingLayout>
  )
}

export default CommunityPage

