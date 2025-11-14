import { useContext } from 'react'
import GameLayoutContext from './GameLayoutContext'

function useGameLayout() {
  const context = useContext(GameLayoutContext)
  if (!context) {
    throw new Error('useGameLayout must be used within GameLayout')
  }
  return context
}

export default useGameLayout

