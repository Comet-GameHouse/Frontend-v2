import type { IconProp } from '@fortawesome/fontawesome-svg-core'

type GameLibraryEntry = {
  slug: string
  title: string
  mode: string
  players: string
  status: 'Featured' | 'Hot' | 'New'
  icon: IconProp
  gradient: string
}

type GameUpdate = {
  title: string
  detail: string
  timestamp: string
}

const GAME_TAGS = ['Trending', 'Strategy', 'Racing', 'Party', 'Puzzle', 'Hardcore']

const GAME_LIBRARY: GameLibraryEntry[] = [
  { slug: 'cosmic-conquest', title: 'Cosmic Conquest', mode: '4v4 Control', players: '2.4K online', status: 'Featured', icon: 'chess', gradient: 'from-cyan-500/20 to-purple-500/20 border-cyan-400/30' },
  { slug: 'velocity-rush', title: 'Velocity Rush', mode: '16-player Circuit', players: '1.8K online', status: 'Hot', icon: 'rocket', gradient: 'from-orange-500/20 to-pink-500/20 border-orange-400/30' },
  { slug: 'nebula-showdown', title: 'Nebula Showdown', mode: 'Battle Royale', players: '3.2K online', status: 'Featured', icon: 'bolt', gradient: 'from-indigo-500/20 to-sky-500/20 border-indigo-400/30' },
  { slug: 'starfield-puzzle', title: 'Starfield Puzzle', mode: 'Co-op Brainstorms', players: '980 online', status: 'New', icon: 'puzzle-piece', gradient: 'from-emerald-500/20 to-teal-500/20 border-emerald-400/30' },
  { slug: 'void-raid', title: 'Void Raid', mode: 'Hardcore PvE', players: '640 online', status: 'Hot', icon: 'door-open', gradient: 'from-slate-500/20 via-slate-800/20 to-black/40 border-slate-500/40' },
  { slug: 'comet-clash', title: 'Comet Clash', mode: 'Party Royale', players: '2.1K online', status: 'New', icon: 'users', gradient: 'from-fuchsia-500/20 to-violet-500/20 border-fuchsia-400/30' },
]

const RECENT_UPDATES: GameUpdate[] = [
  { title: 'Patch 2.9 boosts velocity physics', detail: 'Velocity Rush now features adaptive drift assists and weekly championship ladders.', timestamp: '2 hours ago' },
  { title: 'Void Raid unlocks tier VIII relics', detail: 'New boss modifiers, artifact sets, and clan progression unlocks are live.', timestamp: 'Yesterday' },
  { title: 'Cosmic Conquest playoff season', detail: 'Earn double shards while climbing the Galactic League placements.', timestamp: 'This week' },
]

export type { GameLibraryEntry, GameUpdate }
export { GAME_TAGS, GAME_LIBRARY, RECENT_UPDATES }

