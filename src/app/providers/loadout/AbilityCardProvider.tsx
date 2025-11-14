import { useCallback, useMemo, useState } from 'react'
import AbilityCardContext from './AbilityCardContext'
import type { AbilityCard, AbilityCardProviderProps, AbilityCardTheme, AbilityCardTier } from './AbilityCardContext'

const CARD_THEMES: Record<AbilityCardTier, AbilityCardTheme> = {
  bronze: {
    panel:
      'border-amber-500/45 bg-[radial-gradient(circle_at_top_left,rgba(217,119,6,0.28),transparent_58%)] bg-gradient-to-br from-slate-950/90 via-amber-900/40 to-slate-900/80 shadow-[0_24px_80px_-48px_rgba(217,119,6,0.65)]',
    badge: 'text-amber-200',
    chip: 'border-amber-300/40 bg-amber-500/15 text-amber-100',
    glow: 'bg-amber-400/30',
  },
  silver: {
    panel:
      'border-slate-300/45 bg-[radial-gradient(circle_at_bottom_right,rgba(203,213,225,0.32),transparent_55%)] bg-gradient-to-br from-slate-100/10 via-slate-600/20 to-slate-950/80 shadow-[0_24px_80px_-48px_rgba(148,163,184,0.65)]',
    badge: 'text-slate-200',
    chip: 'border-slate-200/40 bg-slate-100/15 text-slate-100',
    glow: 'bg-slate-200/25',
  },
  gold: {
    panel:
      'border-yellow-400/50 bg-[radial-gradient(circle_at_top_right,rgba(252,211,77,0.28),transparent_52%)] bg-gradient-to-br from-slate-950/90 via-yellow-900/35 to-slate-900/80 shadow-[0_24px_80px_-48px_rgba(250,204,21,0.65)]',
    badge: 'text-yellow-200',
    chip: 'border-yellow-300/40 bg-yellow-500/15 text-yellow-100',
    glow: 'bg-yellow-300/30',
  },
  diamond: {
    panel:
      'border-cyan-300/55 bg-[radial-gradient(circle_at_top,rgba(165,243,252,0.32),transparent_60%)] bg-gradient-to-br from-slate-950/90 via-cyan-900/35 to-slate-900/75 shadow-[0_24px_80px_-48px_rgba(34,211,238,0.6)]',
    badge: 'text-cyan-200',
    chip: 'border-cyan-300/40 bg-cyan-400/15 text-cyan-100',
    glow: 'bg-cyan-300/30',
  },
  enterprise: {
    panel:
      'border-violet-400/55 bg-[radial-gradient(circle_at_bottom_left,rgba(167,139,250,0.32),transparent_58%)] bg-gradient-to-br from-slate-950/90 via-violet-900/35 to-slate-900/75 shadow-[0_24px_80px_-48px_rgba(139,92,246,0.6)]',
    badge: 'text-violet-200',
    chip: 'border-violet-300/40 bg-violet-500/15 text-violet-100',
    glow: 'bg-violet-300/30',
  },
  mythic: {
    panel:
      'border-fuchsia-400/60 bg-[radial-gradient(circle_at_center,rgba(232,121,249,0.24),transparent_60%)] bg-gradient-to-br from-slate-950/90 via-fuchsia-900/35 to-slate-900/70 shadow-[0_24px_90px_-48px_rgba(192,132,252,0.75)]',
    badge: 'text-fuchsia-200',
    chip: 'border-fuchsia-300/40 bg-fuchsia-500/15 text-fuchsia-100',
    glow: 'bg-fuchsia-300/30',
  },
}

const TIER_ORDER: AbilityCardTier[] = ['bronze', 'silver', 'gold', 'diamond', 'enterprise', 'mythic']

const OWNED_CARDS: AbilityCard[] = [
  {
    id: 'bronze-field-card',
    title: 'Bronze Field Card',
    tier: 'bronze',
    multiplier: 0.78,
    expiresLabel: 'Expires in 15 days',
    details: [
      'Rewind one misplay each match.',
      'Unlocks custom room invites for friends.',
      'Purchased with real currency via the Comet Store.',
    ],
    theme: CARD_THEMES.bronze,
    priceUsd: '$2.99',
    coinCost: '650',
  },
  {
    id: 'silver-ward-card',
    title: 'Silver Ward Card',
    tier: 'silver',
    multiplier: 0.82,
    expiresLabel: 'Expires in 20 days',
    details: [
      'Includes all Bronze perks.',
      'Squad EXP gain × 1.1 while active.',
      'Purchased with real currency via the Comet Store.',
    ],
    theme: CARD_THEMES.silver,
    priceUsd: '$4.99',
    coinCost: '1,100',
  },
  {
    id: 'gold-surge-card',
    title: 'Gold Surge Card',
    tier: 'gold',
    multiplier: 0.86,
    expiresLabel: 'Expires in 25 days',
    details: [
      'Includes all Silver perks.',
      'Squad EXP gain × 1.2 while active.',
      'Purchased with real currency via the Comet Store.',
    ],
    theme: CARD_THEMES.gold,
    priceUsd: '$7.99',
    coinCost: '1,800',
  },
  {
    id: 'diamond-flux-card',
    title: 'Diamond Flux Card',
    tier: 'diamond',
    multiplier: 0.9,
    expiresLabel: 'Expires in 30 days',
    details: [
      'Includes all Gold perks.',
      'Squad EXP gain × 1.3 while active.',
      'Unlocks custom avatar uploads in profile settings.',
      'Purchased with real currency via the Comet Store.',
    ],
    theme: CARD_THEMES.diamond,
    priceUsd: '$12.99',
    coinCost: '2,600',
  },
  {
    id: 'enterprise-nexus-card',
    title: 'Enterprise Nexus Card',
    tier: 'enterprise',
    multiplier: 0.94,
    expiresLabel: 'Expires in 40 days',
    details: [
      'Includes all Diamond perks.',
      'Squad EXP gain × 1.4 while active.',
      'Purchased with real currency via the Comet Store.',
    ],
    theme: CARD_THEMES.enterprise,
    priceUsd: '$16.99',
    coinCost: '3,400',
  },
  {
    id: 'mythic-singularity-card',
    title: 'Mythic Singularity Card',
    tier: 'mythic',
    multiplier: 0.98,
    expiresLabel: 'Expires in 50 days',
    details: [
      'Includes all Enterprise perks.',
      'Squad EXP gain × 1.5 ~ 1.7 while active.',
      'Purchased with real currency via the Comet Store.',
    ],
    theme: CARD_THEMES.mythic,
    priceUsd: '$21.99',
    coinCost: '4,500',
  },
]

function AbilityCardProvider({ children }: AbilityCardProviderProps) {
  const [activeCardId, setActiveCardId] = useState<string>('diamond-flux-card')
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null)

  const highestTier = useMemo<AbilityCardTier>(() => {
    const owned = OWNED_CARDS
    const sorted = owned.reduce<AbilityCardTier>(
      (prev, card) => (TIER_ORDER.indexOf(card.tier) > TIER_ORDER.indexOf(prev) ? card.tier : prev),
      owned[0]?.tier ?? 'bronze',
    )
    return sorted
  }, [])

  const hasTierOrAbove = useCallback(
    (tier: AbilityCardTier) => TIER_ORDER.indexOf(highestTier) >= TIER_ORDER.indexOf(tier),
    [highestTier],
  )

  const value = useMemo(
    () => ({
      cards: OWNED_CARDS,
      activeCardId,
      setActiveCardId,
      selectedCardId,
      selectCard: setSelectedCardId,
      highestTier,
      hasTierOrAbove,
    }),
    [activeCardId, hasTierOrAbove, highestTier, selectedCardId],
  )

  return <AbilityCardContext.Provider value={value}>{children}</AbilityCardContext.Provider>
}

export default AbilityCardProvider

