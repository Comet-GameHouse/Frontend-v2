import { Card, Button } from '@components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const COIN_PACKS = [
  { title: 'Nebula Starter', coins: '1,000', price: '$4.99', bonus: 'No bonus' },
  { title: 'Comet Booster', coins: '5,500', price: '$19.99', bonus: '+10% bonus coins' },
  { title: 'Galactic Vault', coins: '12,500', price: '$39.99', bonus: '+20% bonus coins' },
]

const FEATURE_CARDS = [
  {
    title: 'Bronze Field Card',
    tier: 'Bronze',
    feature: 'Activate once per match to rewind your last 5 seconds.',
    cost: '1,600 coins',
    accent: 'border-amber-500/40 bg-gradient-to-br from-amber-500/10 to-slate-900/40 text-amber-200',
  },
  {
    title: 'Silver Ward Card',
    tier: 'Silver',
    feature: 'Grant allies a temporary shield surge when activated.',
    cost: '2,400 coins',
    accent: 'border-slate-200/40 bg-gradient-to-br from-slate-300/15 to-slate-900/40 text-slate-100',
  },
  {
    title: 'Gold Surge Card',
    tier: 'Gold',
    feature: 'Teleport to a squadmate’s position with invulnerability frames.',
    cost: '3,200 coins',
    accent: 'border-yellow-400/50 bg-gradient-to-br from-yellow-400/12 to-slate-900/40 text-yellow-200',
  },
  {
    title: 'Diamond Flux Card',
    tier: 'Diamond',
    feature: 'Lock in a perfect shard multiplier for one round.',
    cost: '4,500 coins',
    accent: 'border-cyan-300/50 bg-gradient-to-br from-cyan-300/15 to-slate-900/40 text-cyan-100',
  },
  {
    title: 'Enterprise Nexus Card',
    tier: 'Enterprise',
    feature: 'Instantly upgrade squad utilities to max tier for a single match.',
    cost: '6,000 coins',
    accent: 'border-violet-400/50 bg-gradient-to-br from-violet-400/18 to-slate-900/40 text-violet-100',
  },
]

function ShopPage() {
  return (
    <div className="space-y-6">
      <Card variant="glass" className="space-y-3" data-aos="fade-up" data-aos-duration="300" data-aos-delay="150">
        <h2 className="text-lg font-semibold text-white">Buy Game Coins</h2>
        <p className="text-sm text-slate-300">
          Secure coin bundles with real currency to unlock cosmetics, cards, and match boosts.
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
                  <p className="text-2xl font-semibold text-white">{pack.coins}</p>
                  <p className="text-xs text-slate-400">coins</p>
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

      <Card variant="void" className="space-y-3" data-aos="fade-up" data-aos-duration="300" data-aos-delay="250">
        <h2 className="text-lg font-semibold text-white">Special Ability Cards</h2>
        <p className="text-sm text-slate-300">Equip these limited cards for powerful one-match bonuses across arenas.</p>
        <div className="grid gap-3 md:grid-cols-3">
          {FEATURE_CARDS.map((card, idx) => (
            <Card
              key={card.title}
              variant="glass"
              className={`h-full space-y-3 border ${card.accent}`}
              data-aos="fade-up"
              data-aos-duration="300"
              data-aos-delay={String(300 + idx * 50)}
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em]">
                <span>{card.tier}</span>
                <span>{card.cost}</span>
              </div>
              <p className="text-lg font-semibold text-white">{card.title}</p>
              <p className="text-sm text-slate-200">{card.feature}</p>
              <Button variant="outline" size="xs" rightIcon="arrow-right" className="mt-auto self-start">
                Purchase
              </Button>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default ShopPage

