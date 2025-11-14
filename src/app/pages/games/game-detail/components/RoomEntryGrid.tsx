import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { RoomFeeOption } from '../data'
import { useAOS } from '@hooks'

type RoomEntryGridProps = {
  options: RoomFeeOption[]
  matchingFee: number | null
  onJoin: (fee: number) => void
}

function RoomEntryGrid({ options, matchingFee, onJoin }: RoomEntryGridProps) {
  const getAOSProps = useAOS()

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {options.map(({ fee, playing, waiting }, idx) => {
        const isActive = matchingFee === fee
        const total = playing + waiting
        const playingPercent = total > 0 ? Math.round((playing / total) * 100) : 0
        const waitingPercent = total > 0 ? 100 - playingPercent : 0
        return (
          <button
            key={fee}
            type="button"
            onClick={() => onJoin(fee)}
            disabled={matchingFee !== null && !isActive}
            {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': String(300 + idx * 50) })}
            className={[
              'group flex flex-col gap-4 rounded-3xl border border-white/5 bg-white/5 p-5 text-left transition',
              'hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:shadow-[0_20px_60px_-40px_rgba(34,211,238,0.35)]',
              'disabled:cursor-not-allowed disabled:opacity-70',
              isActive ? 'border-cyan-400 bg-cyan-400/15 shadow-[0_20px_60px_-40px_rgba(34,211,238,0.45)]' : '',
            ].join(' ')}
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-cyan-200">
              <span className="flex items-center gap-2">
                {fee}
                <FontAwesomeIcon icon="coins" className="h-3 w-3 text-cyan-200" aria-hidden="true" />
                <span className="sr-only">coins</span>
              </span>
              <span>{isActive ? 'Matching…' : 'Tap to match'}</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-semibold text-white">{playing}</p>
                    <span className="text-xs uppercase tracking-[0.3em] text-cyan-200">Playing</span>
                  </div>
                  <p className="text-xs text-slate-400">Live squads in the arena</p>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline gap-2 justify-end">
                    <p className="text-2xl font-semibold text-purple-200">{waiting}</p>
                    <span className="text-xs uppercase tracking-[0.3em] text-purple-200/80">Waiting</span>
                  </div>
                  <p className="text-xs text-slate-400">Ready to launch</p>
                </div>
              </div>
              <div className="space-y-2 rounded-2xl border border-white/5 bg-slate-950/40 p-3">
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  <span className="flex items-center gap-2 text-cyan-200">
                    <span className="inline-flex size-2 rounded-full bg-cyan-300" />
                    {playingPercent}% active
                  </span>
                  <span className="flex items-center gap-2 text-purple-200">
                    <span className="inline-flex size-2 rounded-full bg-purple-400" />
                    {waitingPercent}% queued
                  </span>
                </div>
                <div className="relative h-2 overflow-hidden rounded-full bg-slate-900/70">
                  <span
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-400/90 to-cyan-500/70 transition-all duration-300"
                    style={{ width: `${playingPercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Total commanders: {total}</span>
                  <span>Updated moments ago</span>
                </div>
              </div>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-100">
              <FontAwesomeIcon icon="arrow-right" className="h-4 w-4 transition group-hover:translate-x-1" />
              {isActive ? 'Finding squad…' : 'Enter room'}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default RoomEntryGrid

