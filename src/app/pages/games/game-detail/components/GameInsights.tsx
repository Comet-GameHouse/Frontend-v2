import { Card } from '@components/ui/Card'
import type { GameDetail } from '../data'
import { useAOS } from '@hooks'

type GameInsightsProps = {
  detail: GameDetail
}

function GameInsights({ detail }: GameInsightsProps) {
  const getAOSProps = useAOS()
  
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card variant="void" className="space-y-3" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '150' })}>
        <h2 className="text-lg font-semibold text-white">Recommended loadout</h2>
        <ul className="space-y-2 text-sm text-slate-300">
          {detail.loadout.map((item, idx) => (
            <li
              key={item}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2"
              {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': String(200 + idx * 50) })}
            >
              {item}
            </li>
          ))}
        </ul>
      </Card>
      <Card variant="void" className="space-y-3" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '200' })}>
        <h2 className="text-lg font-semibold text-white">Match objectives</h2>
        <ul className="space-y-2 text-sm text-slate-300">
          {detail.objectives.map((objective, idx) => (
            <li
              key={objective}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2"
              {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': String(250 + idx * 50) })}
            >
              {objective}
            </li>
          ))}
        </ul>
      </Card>
      <Card variant="void" className="space-y-3" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '250' })}>
        <h2 className="text-lg font-semibold text-white">Pro tips</h2>
        <ul className="space-y-2 text-sm text-slate-300">
          {detail.tips.map((tip, idx) => (
            <li
              key={tip}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2"
              {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': String(300 + idx * 50) })}
            >
              {tip}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}

export default GameInsights

