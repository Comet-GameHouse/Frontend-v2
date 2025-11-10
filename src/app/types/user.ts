import type { Role } from './auth'

type PlayerStats = {
  totalMatches: number
  wins: number
  losses: number
  winRate: number
  experience: number
  level: number
  favoriteGameId?: string
}

type PlayerSocial = {
  bio?: string
  location?: string
  website?: string
  pronouns?: string
  tags: string[]
}

type PlayerBadge = {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt?: string
}

type PlayerProfile = {
  id: string
  handle: string
  displayName: string
  avatarUrl?: string
  role: Role
  createdAt: string
  stats: PlayerStats
  social: PlayerSocial
  badges: PlayerBadge[]
}

export type { PlayerBadge, PlayerProfile, PlayerSocial, PlayerStats }

