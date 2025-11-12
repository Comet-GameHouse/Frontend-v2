import type { GameId, GameMode } from './game'
import type { RoomId, RoomParticipantStatus } from './room'
import type { User } from './auth'

type MatchId = string

type MatchStage = 'lobby' | 'loading' | 'in-progress' | 'sudden-death' | 'finished'

type MatchResult = {
  placement: number
  score: number
  rewards: number
  outcome: 'win' | 'lose' | 'draw'
}

type MatchParticipant = {
  id: string
  user: User
  joinedAt: string
  leftAt?: string
  result?: MatchResult
  status?: RoomParticipantStatus
}

type MatchSummary = {
  id: MatchId
  gameId: GameId
  mode: GameMode
  roomId?: RoomId
  stage: MatchStage
  startedAt: string
  endedAt?: string
  participants: MatchParticipant[]
}

export type {
  MatchId,
  MatchParticipant,
  MatchResult,
  MatchStage,
  MatchSummary,
}

