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

export type { GameDetail }
export { GAME_DETAIL_MAP, DEFAULT_GAME_KEY }

