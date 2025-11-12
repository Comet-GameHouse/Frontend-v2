type CurrencyCode = 'COMET_SHARD' | 'LUNAR_TOKEN' | 'USD'

type Price = {
  amount: number
  currency: CurrencyCode
}

type StoreItemType = 'cosmetic' | 'booster' | 'bundle' | 'season-pass'

type StoreItem = {
  id: string
  name: string
  description: string
  type: StoreItemType
  price: Price
  salePrice?: Price
  imageUrl?: string
  rarity?: 'common' | 'rare' | 'epic' | 'legendary'
  limitedUntil?: string
  includes: string[]
}

type PurchaseReceipt = {
  id: string
  itemId: string
  purchasedAt: string
  pricePaid: Price
  paymentMethod: 'wallet' | 'credit-card' | 'promo'
  delivered: boolean
}

export type {
  CurrencyCode,
  Price,
  PurchaseReceipt,
  StoreItem,
  StoreItemType,
}

