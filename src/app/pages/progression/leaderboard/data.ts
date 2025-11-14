type RankingEntry = {
  place: number
  name: string
  rating: string
  trend: string
}

const RANKINGS: RankingEntry[] = [
  { place: 1, name: 'NovaRift', rating: '3,250', trend: '+32' },
  { place: 2, name: 'AuroraPulse', rating: '3,190', trend: '+15' },
  { place: 3, name: 'QuantumVex', rating: '3,140', trend: '+12' },
  { place: 4, name: 'NebulaScout', rating: '3,110', trend: '+8' },
  { place: 5, name: 'CometCourier', rating: '3,080', trend: '+4' },
  { place: 6, name: 'Voidshift', rating: '3,045', trend: '+2' },
  { place: 7, name: 'EclipseRunner', rating: '3,022', trend: '+1' },
  { place: 8, name: 'SolarLyric', rating: '3,010', trend: '±0' },
  { place: 9, name: 'StellarMender', rating: '2,998', trend: '-3' },
  { place: 10, name: 'Gravitas', rating: '2,984', trend: '+6' },
  { place: 11, name: 'HalcyonX', rating: '2,973', trend: '+8' },
  { place: 12, name: 'OrbitSage', rating: '2,968', trend: '+5' },
  { place: 13, name: 'IonParagon', rating: '2,956', trend: '-2' },
  { place: 14, name: 'LumenDash', rating: '2,949', trend: '+4' },
  { place: 15, name: 'MeteorMage', rating: '2,938', trend: '+7' },
  { place: 16, name: 'PhaseRunner', rating: '2,926', trend: '-1' },
  { place: 17, name: 'NebulaNova', rating: '2,915', trend: '+5' },
  { place: 18, name: 'CosmoCipher', rating: '2,904', trend: '+3' },
  { place: 19, name: 'OrbitMuse', rating: '2,890', trend: '-4' },
  { place: 20, name: 'VortexVirtue', rating: '2,876', trend: '+6' },
]

const SEGMENTS = [
  { label: 'Global ladder', detail: 'Top 500 ranked players across all arenas.' },
  { label: 'Squad standings', detail: 'Track your team’s composite rating and win streak.' },
  { label: 'Creator circuit', detail: 'Exclusive events for broadcast partners and community leads.' },
]

const LEADERBOARD_TIERS = ['Daily', 'Weekly', 'Monthly', 'Total'] as const

const formatRating = (value: number) => new Intl.NumberFormat('en-US').format(value)

const buildTier = (multiplier: number, bonus: number, trendBase: number) =>
  RANKINGS.map((entry, index) => {
    const baseScore = (RANKINGS.length - index) * multiplier + bonus
    const change = Math.max(10, trendBase - index * 6)
    return {
      place: index + 1,
      name: entry.name,
      rating: formatRating(baseScore),
      trend: `+${change}`,
    }
  })

const TIERED_RANKINGS: Record<string, RankingEntry[]> = {
  daily: buildTier(120, 860, 140),
  weekly: buildTier(420, 3600, 420),
  monthly: buildTier(980, 6200, 980),
  total: RANKINGS,
}

export type { RankingEntry }
export { RANKINGS, SEGMENTS, LEADERBOARD_TIERS, TIERED_RANKINGS }

