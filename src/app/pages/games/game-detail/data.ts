import type { IconProp } from '@fortawesome/fontawesome-svg-core'

type GameDetail = {
  title: string
  tagline: string
  overview: string
  loadout: string[]
  objectives: string[]
  tips: string[]
  icon: IconProp
}

const ROOM_FEE_OPTIONS = [
  { fee: 5, playing: 28, waiting: 3 },
  { fee: 10, playing: 24, waiting: 3 },
  { fee: 25, playing: 18, waiting: 3 },
  { fee: 50, playing: 16, waiting: 3 },
  { fee: 100, playing: 12, waiting: 3 },
  { fee: 200, playing: 9, waiting: 2 },
  { fee: 500, playing: 6, waiting: 2 },
  { fee: 1000, playing: 5, waiting: 2 },
  { fee: 2000, playing: 4, waiting: 2 },
  { fee: 5000, playing: 3, waiting: 2 },
  { fee: 10000, playing: 0, waiting: 0 },
] as const

type RoomFeeOption = (typeof ROOM_FEE_OPTIONS)[number]

const GAME_DETAIL_MAP: Record<string, GameDetail> = {
  'cosmic-conquest': {
    title: 'Cosmic Conquest',
    tagline: 'Coordinate control points and bend gravity to lock the arena.',
    overview: 'Teams fight to align cosmic pylons while navigating shifting gravity wells and roaming hazards.',
    loadout: ['Gravity Anchor • Stabilize capture zones', 'Solar Lance • Burst damage for shield breakers', 'Stellar Ward • Deployable cover dome'],
    objectives: ['Capture three pylons to trigger the Conquest core', 'Hold zones for 45 seconds to bank shards', 'Prevent enemy overcharge by interrupting sync'],
    tips: ['Rotate early when gravity flips to secure high ground.', 'Save Solar Lance for shielded carriers.', 'Coordinate ultimates to deny final sync phases.'],
    icon: 'chess',
  },
  'velocity-rush': {
    title: 'Velocity Rush',
    tagline: 'Perfect the drift to conquer neon speedways.',
    overview: 'Sixteen pilots sprint through anti-grav circuits featuring boost pads, hazard tunnels, and destructible shortcuts.',
    loadout: ['Ion Drift • Regain control on sharp turns', 'Pulse Mine • Deny drafting opponents', 'Slipstream Burst • Temporary speed surge'],
    objectives: ['Complete five laps while maintaining gate sync', 'Collect boost spheres to charge Slipstream', 'Disrupt rivals with mines before finish lines'],
    tips: ['Chain boosts exiting corners for maximum velocity.', 'Pulse Mine placement wins tight packs.', 'Manage slipstream to avoid overheating thrusters.'],
    icon: 'rocket',
  },
}

const DEFAULT_GAME_KEY = 'cosmic-conquest'

const LEADERBOARD_TIERS = ['Daily', 'Weekly', 'Monthly', 'Total'] as const

const BASE_NAMES = [
  'NovaRift',
  'AuroraPulse',
  'QuantumVex',
  'NebulaScout',
  'CometCourier',
  'Voidshift',
  'EclipseRunner',
  'SolarLyric',
  'StellarMender',
  'Gravitas',
  'HalcyonX',
  'OrbitSage',
  'IonParagon',
  'LumenDash',
  'MeteorMage',
  'PhaseRunner',
  'NebulaNova',
  'CosmoCipher',
  'OrbitMuse',
  'VortexVirtue',
]

const formatNumber = (value: number) => new Intl.NumberFormat('en-US').format(value)

const buildLeaderboard = (multiplier: number, bonus: number, selfIndex: number) =>
  BASE_NAMES.map((name, index) => {
    const adjustedName = index === selfIndex ? `${name} (You)` : name
    const baseScore = (BASE_NAMES.length - index) * multiplier + bonus
    const changeValue = Math.max(7, Math.round((BASE_NAMES.length - index) * multiplier * 0.05))

    return {
      player: adjustedName,
      score: formatNumber(baseScore),
      change: `+${changeValue}`,
    }
  })

const DEFAULT_LEADERBOARD = {
  daily: buildLeaderboard(75, 420, 6),
  weekly: buildLeaderboard(320, 2200, 8),
  monthly: buildLeaderboard(980, 5600, 10),
  total: buildLeaderboard(2400, 9800, 12),
} as const

type LeaderboardTier = typeof LEADERBOARD_TIERS[number]
type LeaderboardEntry = {
  player: string
  score: string
  change: string
}

export type { GameDetail, RoomFeeOption, LeaderboardTier, LeaderboardEntry }
export {
  GAME_DETAIL_MAP,
  DEFAULT_GAME_KEY,
  ROOM_FEE_OPTIONS,
  LEADERBOARD_TIERS,
  DEFAULT_LEADERBOARD,
}

