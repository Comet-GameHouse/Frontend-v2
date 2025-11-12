import { useMemo, useEffect } from 'react'
import Input from '@components/ui/Input'
import Button from '@components/ui/Button'
import AOS from 'aos'

type GamesFilterBarProps = {
  tags: string[]
  activeTag: string
  onTagChange: (value: string) => void
  query: string
  onQueryChange: (value: string) => void
}

function GamesFilterBar({ tags, activeTag, onTagChange, query, onQueryChange }: GamesFilterBarProps) {
  const displayTags = useMemo(() => tags.slice(0, 6), [tags])

  useEffect(() => {
    AOS.refresh()
  }, [activeTag])

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6" data-aos="fade-up" data-aos-duration="300" data-aos-delay="150">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-white">Browse the library</h2>
        <Input
          variant="glass"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search modes, tags, or creators"
          leftIcon="magnifying-glass"
          data-aos="fade-up"
          data-aos-duration="300"
          data-aos-delay="200"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {displayTags.map((tag, idx) => (
          <Button
            key={tag}
            variant={tag === activeTag ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => onTagChange(tag)}
            data-aos="fade-up"
            data-aos-duration="300"
            data-aos-delay={String(200 + idx * 50)}
          >
            {tag}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default GamesFilterBar

