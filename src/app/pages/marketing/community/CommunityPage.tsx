import { Card } from '@components/ui/Card'
import Button from '@components/ui/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAOS } from '@hooks'

const DISCORD_INVITE = 'https://discord.gg/cometgamehouse'

type ChannelPreview = {
  name: string
  description: string
  badge?: string
}

type ChannelSection = {
  label: string
  channels: ChannelPreview[]
}

const CHANNEL_SECTIONS: ChannelSection[] = [
  {
    label: 'Text Channels',
    channels: [
      { name: 'announcements', description: 'Patch drops, devstreams, and balance notes.', badge: 'NEW' },
      { name: 'matchmaking-lfg', description: 'Queue by role, MMR, or region.' },
      { name: 'room-builders', description: 'Share scripts, prefabs, and lighting setups.' },
      { name: 'creator-hub', description: 'Promote streams, collabs, and highlight reels.' },
    ],
  },
  {
    label: 'Voice Lounges',
    channels: [
      { name: 'scrim-ready-01', description: 'Ranked squads locking strategies.' },
      { name: 'control-ops', description: 'Arena control teams running drills.' },
      { name: 'speedrun-lab', description: 'Velocity Rush pilots perfecting routes.' },
      { name: 'chill-comet', description: 'Open lounge for casual runs.' },
    ],
  },
]

const CREWS = [
  { name: 'Nebula Syndicate', focus: 'Ranked strategy scrims every weekend.', members: '2.1K members' },
  { name: 'Velocity Circuit', focus: 'Time-trial racing ladders with weekly drops.', members: '1.6K members' },
  { name: 'Aurora Forge', focus: 'Room builders sharing custom scripts and mods.', members: '980 members' },
]

const COMMUNITY_BEATS = [
  { title: 'Creator Spotlight', detail: 'Live Q&A with QuantumVex · Friday 20:00 UTC' },
  { title: 'Community Cup', detail: 'Trios showdown · prize pool · registrations open', prizeCoins: '5,000' },
  { title: 'Workshop Live', detail: 'Learn room scripting basics with Forge mentors' },
]

function CommunityPage() {
  const getAOSProps = useAOS()
  
  return (
    <>
      <Card variant="gradient" className="space-y-6" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '150' })}>
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-2xl font-semibold text-white">
            <FontAwesomeIcon icon={['fab', 'discord']} className="h-8 w-8" />
            <span>Join the Comet Discord</span>
          </div>
          <Button variant="primary" rightIcon={['fab', 'discord']} onClick={() => window.open(DISCORD_INVITE, '_blank', 'noopener')}>
            Join server
          </Button>
        </header>

        <div className="space-y-4 rounded-3xl border border-white/15 bg-slate-950/40 p-6 shadow-inner">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <p className="text-sm font-semibold text-white">Comet GameHouse HQ</p>
              <a href={DISCORD_INVITE} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs text-cyan-200 transition hover:text-cyan-100">
                <FontAwesomeIcon icon={['fab', 'discord']} className="h-3.5 w-3.5" />
                discord.gg/cometgamehouse
              </a>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-100">
              24/7 active
            </span>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {CHANNEL_SECTIONS.map((section, idx) => (
              <div key={section.label} {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': String(210 + idx * 60) })}>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">{section.label}</p>
                <ul className="mt-3 space-y-2">
                  {section.channels.map((channel) => (
                    <li key={channel.name} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon="hashtag" className="h-3.5 w-3.5 text-slate-400" />
                        <span className="font-semibold text-white">#{channel.name}</span>
                        {channel.badge ? (
                          <span className="ml-auto inline-flex items-center rounded-full bg-cyan-400/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-200">
                            {channel.badge}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 text-xs text-slate-400">{channel.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <section className="grid gap-4 sm:grid-cols-3" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '350' })}>
        {CREWS.map(({ name, focus, members }, idx) => (
          <Card key={name} variant="glass" className="space-y-2" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': String(350 + idx * 50) })}>
            <p className="text-lg font-semibold text-white">{name}</p>
            <p className="text-sm text-slate-300">{focus}</p>
            <p className="text-xs text-cyan-200">{members}</p>
          </Card>
        ))}
      </section>

      <Card variant="void" className="space-y-3" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '500' })}>
        <h2 className="text-lg font-semibold text-white">Upcoming community beats</h2>
        <ul className="space-y-3 text-sm text-slate-300">
          {COMMUNITY_BEATS.map(({ title, detail, prizeCoins }, idx) => (
            <li key={title} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': String(550 + idx * 50) })}>
              <p className="font-semibold text-white">{title}</p>
              <p className="text-xs text-slate-400">
                {detail}
                {prizeCoins ? (
                  <span className="ml-2 inline-flex items-center gap-1 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-cyan-100">
                    {prizeCoins}
                    <FontAwesomeIcon icon="coins" className="h-3 w-3" aria-hidden="true" />
                    <span className="sr-only">coins</span>
                  </span>
                ) : null}
              </p>
            </li>
          ))}
        </ul>
      </Card>
    </>
  )
}

export default CommunityPage

