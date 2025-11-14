import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SpotlightBanner from './components/SpotlightBanner'
import GamesFilterBar from './components/GamesFilterBar'
import GamesGrid from './components/GamesGrid'
import GameUpdates from './components/GameUpdates'
import { GAME_TAGS, GAME_LIBRARY, RECENT_UPDATES } from './libraryData'

function GamesPage() {
  const navigate = useNavigate()
  const [activeTag, setActiveTag] = useState(GAME_TAGS[0])
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return GAME_LIBRARY.filter((game) => {
      const matchesTag = activeTag === 'Trending' || game.mode.toLowerCase().includes(activeTag.toLowerCase())
      if (!normalized) return matchesTag
      return matchesTag && `${game.title} ${game.mode}`.toLowerCase().includes(normalized)
    })
  }, [activeTag, query])

  return (
    <div className="flex flex-col gap-6">
      <SpotlightBanner onPlay={() => navigate('/arena')} />
      <GamesFilterBar
        tags={GAME_TAGS}
        activeTag={activeTag}
        onTagChange={setActiveTag}
        query={query}
        onQueryChange={setQuery}
      />
      <GamesGrid games={filtered} onSelect={(slug) => navigate(`/games/${slug}`)} />
      <GameUpdates updates={RECENT_UPDATES} />
    </div>
  )
}

export default GamesPage

