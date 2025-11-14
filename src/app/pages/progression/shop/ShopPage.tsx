import { Card, Button } from '@components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMemo, useState } from 'react'
import cn from '@lib/cn'
import { useAbilityCards } from '@providers'

const COIN_PACKS = [
  { title: 'Nebula Starter', amount: '1,000', price: '$4.99', bonus: 'No bonus' },
  { title: 'Comet Booster', amount: '5,500', price: '$19.99', bonus: '+10% bonus' },
  { title: 'Galactic Vault', amount: '12,500', price: '$39.99', bonus: '+20% bonus' },
]

const AVATAR_ITEMS = [
  {
    id: 'nebula-sigil',
    name: 'Nebula Sigil',
    rarity: 'Epic',
    price: '580',
    description: 'Animated starfield emblem forged for veteran captains.',
    preview:
      'bg-[radial-gradient(circle_at_top,rgba(14,116,144,0.65),transparent_55%)] bg-gradient-to-br from-slate-950 via-slate-900/70 to-slate-950',
  },
  {
    id: 'aurora-veiled',
    name: 'Aurora Veiled',
    rarity: 'Legendary',
    price: '920',
    description: 'Shifting aurora veils that react to match outcomes.',
    preview:
      'bg-[radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.6),transparent_60%)] bg-gradient-to-br from-slate-950 via-violet-900/60 to-slate-950',
  },
  {
    id: 'prism-warden',
    name: 'Prism Warden',
    rarity: 'Rare',
    price: '320',
    description: 'Crystal prism badge reflecting squad colors in realtime.',
    preview:
      'bg-[radial-gradient(circle_at_center,rgba(253,224,71,0.5),transparent_60%)] bg-gradient-to-br from-slate-950 via-amber-900/50 to-slate-950',
  },
  {
    id: 'quantum-wisp',
    name: 'Quantum Wisp',
    rarity: 'Mythic',
    price: '1,200',
    description: 'Cosmic plume that leaves streaks during highlight reels.',
    preview:
      'bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.6),transparent_60%)] bg-gradient-to-br from-slate-950 via-rose-900/55 to-slate-950',
  },
]

function ShopPage() {
  const [activeTab, setActiveTab] = useState<'cards' | 'avatars'>('cards')
  const { cards } = useAbilityCards()
  const catalog = useMemo(
    () =>
      cards.map((card) => ({
        id: card.id,
        title: card.title,
        tier: card.tier,
        details: card.details,
        multiplier: card.multiplier,
        expiresLabel: card.expiresLabel,
        theme: card.theme,
        priceUsd: card.priceUsd,
        coinCost: card.coinCost,
      })),
    [cards],
  )

  return (
    <div className="space-y-6">
      <Card
        variant="void"
        className="flex flex-wrap justify-between gap-6"
        data-aos="fade-up"
        data-aos-duration="300"
        data-aos-delay="100"
      >
        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant={activeTab === 'cards' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('cards')}
          >
            Ability Cards
          </Button>
          <Button
            type="button"
            variant={activeTab === 'avatars' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('avatars')}
          >
            Avatar Shop
          </Button>
        </div>
        <button
          type="button"
          className="text-xs text-slate-400 transition hover:text-cyan-100"
          onClick={() => setActiveTab('cards')}
          aria-label="Scroll to ability cards"
        >
          Jump to latest releases
        </button>
      </Card>

      <Card variant="glass" className="space-y-3" data-aos="fade-up" data-aos-duration="300" data-aos-delay="150">
        <h2 className="text-lg font-semibold text-white">Buy Game Coins</h2>
        <p className="text-sm text-slate-300">
          Secure
          <span className="mx-1 inline-flex items-center gap-1 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-cyan-100">
            <FontAwesomeIcon icon="coins" className="h-3 w-3" aria-hidden="true" />
            <span className="sr-only">coins</span>
          </span>
          bundles with real currency to unlock cosmetics, cards, and match boosts.
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          {COIN_PACKS.map((pack, idx) => (
            <Card
              key={pack.title}
              variant="void"
              className="space-y-3"
              data-aos="fade-up"
              data-aos-duration="300"
              data-aos-delay={String(200 + idx * 50)}
            >
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">{pack.title}</p>
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-200">
                  <FontAwesomeIcon icon="coins" className="h-6 w-6" />
                </span>
                <div>
                  <p className="flex items-center gap-2 text-2xl font-semibold text-white">
                    {pack.amount}
                    <FontAwesomeIcon icon="coins" className="h-4 w-4 text-cyan-200" aria-hidden="true" />
                    <span className="sr-only">coins</span>
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-400">{pack.bonus}</p>
              <Button variant="primary" size="sm" rightIcon="arrow-right">
                {pack.price}
              </Button>
            </Card>
          ))}
        </div>
      </Card>

      {activeTab === 'cards' ? (
        <Card variant="void" className="space-y-3" data-aos="fade-up" data-aos-duration="300" data-aos-delay="250">
          <h2 className="text-lg font-semibold text-white">Special Ability Cards</h2>
          <p className="text-sm text-slate-300">Equip these limited cards for powerful one-match bonuses across arenas.</p>
          <p className="text-xs text-slate-400">
            Ability cards are premium unlocks. Bronze lets you invite friends to private rooms; Diamond and above unlock custom
            avatar uploads. Purchase with real currency or use savings of game coins.
          </p>
          <p className="text-xs text-slate-500">
            Base reward: the 2-player winner receives{' '}
            <span className="font-semibold text-cyan-200">entry cost × 2 × 0.70</span> coins (loser gets none). Equip cards to
            raise the multiplier before the match begins.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {catalog.map((card, idx) => (
              <div
                key={card.id}
                className={cn(
                  'relative flex h-full flex-col overflow-hidden rounded-3xl border px-5 py-4 text-sm transition',
                  card.theme.panel,
                  'backdrop-blur-xl',
                )}
                data-aos="fade-up"
                data-aos-duration="300"
                data-aos-delay={String(300 + idx * 50)}
              >
                <span
                  className={cn(
                    'pointer-events-none absolute -top-16 right-0 size-48 rounded-full blur-3xl opacity-70',
                    card.theme.glow,
                  )}
                  aria-hidden="true"
                />

                <header className="relative flex items-center justify-between text-xs uppercase tracking-[0.3em]">
                  <span className={card.theme.badge}>{card.tier}</span>
                </header>

                <h3 className="relative text-lg font-semibold text-white">{card.title}</h3>
                <p className="relative text-xs text-slate-200">entry cost × 2 × {card.multiplier.toFixed(2)}</p>
                <p className="relative text-xs text-slate-200">{card.expiresLabel}</p>

                <ul className="relative mt-3 space-y-2 text-sm text-slate-200">
                  {card.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2 text-left">
                      <span className="mt-1 size-1.5 flex-none rounded-full bg-cyan-300" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                <div className="relative mt-auto flex items-center justify-start pt-4">
                  <Button variant="primary" size="sm" rightIcon="arrow-right">
                    Buy for {card.priceUsd}
                  </Button>
                  <Button variant="ghost" size="sm" className="ml-2">
                    or {card.coinCost}
                    <FontAwesomeIcon icon="coins" className="ml-2 h-3 w-3 text-cyan-200" aria-hidden="true" />
                    <span className="sr-only">coins</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <Card variant="glass" className="space-y-3" data-aos="fade-up" data-aos-duration="300" data-aos-delay="250">
          <h2 className="text-lg font-semibold text-white">Avatar Marketplace</h2>
          <p className="text-sm text-slate-300">
            Unlock animated profile emblems using game coins. Uploading custom avatars becomes available once you own at least
            a Diamond card.
          </p>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {AVATAR_ITEMS.map((avatar, idx) => (
              <div
                key={avatar.id}
                className={cn(
                  'relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 px-5 py-4',
                  avatar.preview,
                  'backdrop-blur-xl',
                )}
                data-aos="fade-up"
                data-aos-duration="300"
                data-aos-delay={String(300 + idx * 40)}
              >
                <header className="relative flex flex-col gap-1 text-white">
                  <span className="text-xs uppercase tracking-[0.3em] text-slate-200">{avatar.rarity}</span>
                  <h3 className="text-lg font-semibold">{avatar.name}</h3>
                  <p className="text-xs text-slate-200/85">{avatar.description}</p>
                </header>
                <Button variant="outline" size="xs" className="relative mt-6 self-start">
                  {avatar.price}
                  <FontAwesomeIcon icon="coins" className="ml-2 h-3 w-3 text-cyan-200" aria-hidden="true" />
                  <span className="sr-only">coins</span>
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}

export default ShopPage

