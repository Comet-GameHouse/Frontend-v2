import { createContext } from 'react'
import type { LayoutMeta } from '@app-types'

type GameLayoutContextValue = {
  meta: LayoutMeta
  setMeta: (value: LayoutMeta) => void
}

const GameLayoutContext = createContext<GameLayoutContextValue | null>(null)

export type { GameLayoutContextValue }
export default GameLayoutContext

