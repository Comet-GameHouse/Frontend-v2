import Button from '@components/ui/Button'
import { Card } from '@components/ui/Card'
import { useAOS } from '@hooks'

function SpotlightBanner({ onPlay }: { onPlay: () => void }) {
  const getAOSProps = useAOS()
  
  return (
    <Card variant="cosmic" className="flex flex-col gap-4 bg-slate-900/70 p-6" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '100' })}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">Season spotlight</p>
          <h2 className="text-2xl font-semibold text-white">Nebula Showdown • Eclipse Cycle</h2>
          <p className="text-sm text-slate-300">Limited-time modifiers, new map layouts, and double shard payouts all week.</p>
        </div>
        <Button variant="primary" rightIcon="arrow-right" onClick={onPlay}>
          Queue up now
        </Button>
      </div>
      <div className="grid gap-3 text-xs text-slate-300 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
          <p className="font-semibold text-white">Playlist</p>
          <p className="text-cyan-200">Trios survival • Stage 3</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
          <p className="font-semibold text-white">Reward track</p>
          <p className="text-cyan-200">Unlock Nebula Monarch set</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
          <p className="font-semibold text-white">Expires</p>
          <p className="text-cyan-200">48h remaining</p>
        </div>
      </div>
    </Card>
  )
}

export default SpotlightBanner

