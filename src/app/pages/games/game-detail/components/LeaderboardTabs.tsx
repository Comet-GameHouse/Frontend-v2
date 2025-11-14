import { useState } from 'react'
import type { LeaderboardEntry, LeaderboardTier } from '../data'

type LeaderboardTabsProps = {
  tiers: LeaderboardTier[]
  entries: Record<string, LeaderboardEntry[]>
}

function LeaderboardTabs({ tiers, entries }: LeaderboardTabsProps) {
  const [activeTier, setActiveTier] = useState<LeaderboardTier>('Daily')
  const activeKey = activeTier.toLowerCase()
  const currentEntries = entries[activeKey] ?? []
  const yourIndex = currentEntries.findIndex((entry) => entry.player.includes('(You)'))
  const yourRank = yourIndex >= 0 ? yourIndex + 1 : null

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {tiers.map((tier) => (
          <button
            key={tier}
            type="button"
            onClick={() => setActiveTier(tier)}
            className={[
              'rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em]',
              activeTier === tier
                ? 'border-cyan-400 bg-cyan-400/10 text-cyan-100'
                : 'border-white/10 text-slate-400 hover:border-cyan-400/40 hover:text-cyan-100',
            ].join(' ')}
          >
            {tier}
          </button>
        ))}
      </div>
      <ul className="space-y-2 text-sm text-slate-300">
        {currentEntries.map((entry, index) => {
          const isSelf = entry.player.includes('(You)')
          return (
            <li
              key={`${activeTier}-${entry.player}`}
              className={[
                'flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3',
                isSelf ? 'bg-cyan-400/15 border-cyan-400/60 shadow-[0_12px_40px_-32px_rgba(34,211,238,0.6)]' : 'bg-white/5',
              ].join(' ')}
            >
              <div>
                <p className="font-semibold text-white">
                  #{index + 1} {entry.player}
                </p>
                <p className="text-xs text-slate-400">{activeTier} standings</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-cyan-200">{entry.score}</p>
                <p className="text-xs text-emerald-300">{entry.change}</p>
              </div>
            </li>
          )
        })}
      </ul>
      <div className="rounded-2xl border border-cyan-400/40 bg-cyan-400/10 px-4 py-3 text-xs text-cyan-100">
        {yourRank ? (
          <p>
            Your rank: <span className="font-semibold text-white">#{yourRank}</span> in the {activeTier.toLowerCase()} ladder.
          </p>
        ) : (
          <p>You haven’t placed in the {activeTier.toLowerCase()} ladder yet. Jump into a room to earn points.</p>
        )}
      </div>
    </div>
  )
}

export default LeaderboardTabs

