type BadgeRarity = 'common' | 'rare' | 'epic' | 'legendary'

type Badge = {
  id: string
  name: string
  description: string
  rarity: BadgeRarity
  icon: string
  category: string
  unlockedAt?: string
  requirement?: string
}

type AchievementCategory = 'combat' | 'social' | 'exploration' | 'seasonal'

type Achievement = {
  id: string
  title: string
  summary: string
  category: AchievementCategory
  points: number
  progress: number
  target: number
  isHidden: boolean
}

type BattlePassTier = {
  tier: number
  xpRequired: number
  rewards: string[]
  premiumOnly: boolean
}

type Season = {
  id: string
  name: string
  startsAt: string
  endsAt: string
  tiers: BattlePassTier[]
}

export type {
  Achievement,
  AchievementCategory,
  Badge,
  BadgeRarity,
  BattlePassTier,
  Season,
}

