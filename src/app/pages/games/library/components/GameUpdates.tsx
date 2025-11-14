import { Card } from '@components/ui/Card'
import type { GameUpdate } from '../libraryData'
import { useAOS } from '@hooks'

type GameUpdatesProps = {
  updates: GameUpdate[]
}

function GameUpdates({ updates }: GameUpdatesProps) {
  const getAOSProps = useAOS()
  
  return (
    <Card variant="void" className="space-y-4" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '300' })}>
      <header className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-white">Latest balance & drops</h2>
        <p className="text-sm text-slate-400">Stay ahead with the freshest patch intel.</p>
      </header>
      <ul className="space-y-3">
        {updates.map((update, idx) => (
          <li key={update.title} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': String(350 + idx * 50) })}>
            <div className="flex items-center justify-between text-xs text-cyan-200">
              <span>{update.timestamp}</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-white">{update.title}</p>
            <p className="text-sm text-slate-300">{update.detail}</p>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default GameUpdates

