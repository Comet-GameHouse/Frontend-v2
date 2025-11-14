import { createContext } from 'react'
import type { ReactNode } from 'react'

type AbilityCardTier = 'bronze' | 'silver' | 'gold' | 'diamond' | 'enterprise' | 'mythic'

type AbilityCardTheme = {
  panel: string
  badge: string
  chip: string
  glow: string
}

type AbilityCard = {
  id: string
  title: string
  multiplier: number
  expiresLabel: string
  details: string[]
  tier: AbilityCardTier
  theme: AbilityCardTheme
  priceUsd: string
  coinCost: string
}

type AbilityCardContextValue = {
  cards: AbilityCard[]
  activeCardId: string
  setActiveCardId: (id: string) => void
  selectCard: (id: string | null) => void
  selectedCardId: string | null
  highestTier: AbilityCardTier
  hasTierOrAbove: (tier: AbilityCardTier) => boolean
}

const AbilityCardContext = createContext<AbilityCardContextValue | undefined>(undefined)

type AbilityCardProviderProps = {
  children: ReactNode
}

export type {
  AbilityCard,
  AbilityCardContextValue,
  AbilityCardProviderProps,
  AbilityCardTheme,
  AbilityCardTier,
}
export default AbilityCardContext

