import { useContext } from 'react'
import AbilityCardContext from './AbilityCardContext'

function useAbilityCards() {
  const context = useContext(AbilityCardContext)
  if (!context) {
    throw new Error('useAbilityCards must be used within an AbilityCardProvider')
  }
  const {
    cards,
    activeCardId,
    setActiveCardId,
    selectedCardId,
    selectCard,
    hasTierOrAbove,
    highestTier,
  } = context
  const activeCard = cards.find((card) => card.id === activeCardId) ?? cards[0]
  const selectedCard = selectedCardId ? cards.find((card) => card.id === selectedCardId) ?? activeCard : activeCard

  return {
    cards,
    activeCard,
    activeCardId,
    selectedCard,
    selectedCardId,
    selectCard,
    setActiveCardId,
    hasTierOrAbove,
    highestTier,
  }
}

export default useAbilityCards

