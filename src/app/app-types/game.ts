type GameId = string

type GameGenre =
  | 'action'
  | 'puzzle'
  | 'strategy'
  | 'party'
  | 'sports'
  | 'arcade'

type GameMode = 'global' | 'room'

type GameDifficulty = 'casual' | 'competitive' | 'hardcore'

type GameMetadata = {
  id: GameId
  slug: string
  name: string
  description: string
  genre: GameGenre
  mode: GameMode
  difficulty: GameDifficulty
  thumbnailUrl?: string
  trailerUrl?: string
  maxPlayers: number
  minPlayers: number
  averageMatchLengthMinutes: number
  isFeatured: boolean
  tags: string[]
}

type GameRule = {
  title: string
  body: string
}

type GameServerConfig = {
  tickRate: number
  region: string
  maxSpectators: number
  voiceChatEnabled: boolean
}

type GameDetail = GameMetadata & {
  rules: GameRule[]
  serverConfig?: GameServerConfig
  patchNotes?: string
}

export type {
  GameDetail,
  GameDifficulty,
  GameGenre,
  GameId,
  GameMetadata,
  GameMode,
  GameRule,
  GameServerConfig,
}

