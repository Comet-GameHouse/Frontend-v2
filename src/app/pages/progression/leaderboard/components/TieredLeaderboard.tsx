import { useState } from 'react'
import type { RankingEntry } from '../data'

type TieredLeaderboardProps = {
  tiers: string[]
  entries: Record<string, RankingEntry[]>
}

function TieredLeaderboard({ tiers, entries }: TieredLeaderboardProps) {
  const [activeTier, setActiveTier] = useState<string>(tiers[0])
  const activeKey = activeTier.toLowerCase()
  const rows = entries[activeKey] ?? []

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
        {rows.map((entry) => (
          <li
            key={entry.name}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          >
            <span className="font-semibold text-white">
              #{entry.place} {entry.name}
            </span>
            <span className="text-xs text-cyan-200">
              {entry.rating} ({entry.trend})
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TieredLeaderboard

