import { Card } from '@components'
import { SEGMENTS, LEADERBOARD_TIERS, TIERED_RANKINGS } from './data'
import TieredLeaderboard from './components/TieredLeaderboard'
import { useAOS } from '@hooks'

function LeaderboardPage() {
  const getAOSProps = useAOS()
  
  return (
    <>
      <Card variant="glass" className="space-y-3" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '150' })}>
        <h2 className="text-lg font-semibold text-white">Highlights</h2>
        <p className="text-sm text-slate-300">
          Rankings refresh every hour. Secure a top 500 spot to unlock seasonal aurora trophies and profile animations.
        </p>
      </Card>

      <Card variant="glass" className="space-y-4" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '200' })}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Leaderboard</h3>
          <p className="text-xs text-slate-400">Switch between daily, weekly, monthly, and lifetime standings.</p>
        </div>
        <TieredLeaderboard tiers={Array.from(LEADERBOARD_TIERS)} entries={TIERED_RANKINGS} />
      </Card>

      <Card variant="glass" className="space-y-3" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '250' })}>
        <h3 className="text-lg font-semibold text-white">Segments</h3>
        <ul className="space-y-3 text-sm text-slate-300">
          {SEGMENTS.map((segment, index) => (
            <li
              key={segment.label}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': String(250 + index * 50) })}
            >
              <p className="font-semibold text-white">{segment.label}</p>
              <p className="text-xs text-slate-400">{segment.detail}</p>
            </li>
          ))}
        </ul>
      </Card>
    </>
  )
}

export default LeaderboardPage

