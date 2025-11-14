import { useEffect, useMemo, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { PageShell } from '@components'
import type { LayoutMeta } from '@app-types'
import GameLayoutContext, { type GameLayoutContextValue } from './GameLayoutContext'

const DEFAULT_META: LayoutMeta = {
  title: 'Game Experiences',
  description: 'Browse competitive arenas, manage squads, and drop directly into matches.',
}

function resolveMeta(pathname: string): LayoutMeta {
  if (pathname === '/games') {
    return {
      title: 'Game Library',
      description: 'Browse every experience available on Comet GameHouse, from global showdowns to small-room favorites.',
    }
  }
  if (pathname.startsWith('/games/')) {
    return {
      title: 'Game Overview',
      description: 'Dive into loadouts, leaderboards, and room activity tailored to each title.',
    }
  }
  if (pathname === '/tournaments') {
    return {
      title: 'Tournaments & Events',
      description: 'Lock in your squad for seasonal cups, partner showcases, and community spotlights.',
    }
  }
  if (pathname === '/friends') {
    return {
      title: 'Friends & Squads',
      description: 'Manage your party, see who’s online, and jump into rooms together.',
    }
  }
  if (pathname === '/arena') {
    return {
      title: 'Global Arena',
      description: 'All commanders clash in one colossal match. Join the queue to fight for the daily title.',
    }
  }
  if (pathname === '/invite') {
    return {
      title: 'Invite Friends',
      description: 'Share your referral link, earn bonus rewards, and bring new squadmates into Comet GameHouse.',
    }
  }
  if (pathname.startsWith('/rooms/')) {
    return {
      title: 'Room Lobby',
      description: 'Coordinate with teammates, review rules, and get ready before launch.',
    }
  }
  return DEFAULT_META
}

function GameLayout() {
  const { pathname } = useLocation()
  const matchedMeta = useMemo(() => resolveMeta(pathname), [pathname])
  const [meta, setMeta] = useState<LayoutMeta>(matchedMeta)

  useEffect(() => {
    setMeta((current) =>
      current.title === matchedMeta.title && current.description === matchedMeta.description ? current : matchedMeta,
    )
  }, [matchedMeta])

  const value = useMemo<GameLayoutContextValue>(
    () => ({
      meta,
      setMeta,
    }),
    [meta],
  )

  return (
    <GameLayoutContext.Provider value={value}>
      <main className="min-h-screen">
        <PageShell title={meta.title} description={meta.description}>
          <Outlet />
        </PageShell>
      </main>
    </GameLayoutContext.Provider>
  )
}

export default GameLayout

