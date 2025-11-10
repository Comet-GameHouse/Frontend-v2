import type { Role, User } from './auth'
import type { GameId, GameMode } from './game'

type RoomId = string

type RoomVisibility = 'public' | 'private' | 'invite-only'

type RoomStatus = 'waiting' | 'countdown' | 'in-progress' | 'completed'

type RoomParticipantStatus = 'ready' | 'not-ready' | 'spectator'

type RoomParticipant = {
  id: string
  user: User
  status: RoomParticipantStatus
  joinedAt: string
  role: Role
}

type RoomSettings = {
  visibility: RoomVisibility
  maxPlayers: number
  password?: string
  allowSpectators: boolean
  voiceChatEnabled: boolean
  region: string
  mode: GameMode
}

type Room = {
  id: RoomId
  hostId: string
  gameId: GameId
  name: string
  description?: string
  status: RoomStatus
  settings: RoomSettings
  participants: RoomParticipant[]
  createdAt: string
  startedAt?: string
}

export type {
  Room,
  RoomId,
  RoomParticipant,
  RoomParticipantStatus,
  RoomSettings,
  RoomStatus,
  RoomVisibility,
}

