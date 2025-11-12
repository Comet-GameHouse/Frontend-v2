import { useMemo } from 'react'
import { GameLayout } from '@layouts'
import type { MatchSummary, RoomParticipant } from '@app-types'

const mockParticipants: RoomParticipant[] = [
  {
    id: 'player-1',
    user: {
      id: 'player-1',
      displayName: 'NovaStrike',
      role: 'player',
      isVerified: true,
    },
    status: 'ready',
    joinedAt: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    role: 'player',
  },
  {
    id: 'player-2',
    user: {
      id: 'player-2',
      displayName: 'CosmicClash',
      role: 'player',
      isVerified: true,
    },
    status: 'ready',
    joinedAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    role: 'player',
  },
  {
    id: 'player-3',
    user: {
      id: 'player-3',
      displayName: 'MeteorMage',
      role: 'player',
      isVerified: false,
    },
    status: 'not-ready',
    joinedAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    role: 'player',
  },
]

function GlobalArenaPage() {
  const matchSummary: MatchSummary = useMemo(
    () => ({
      id: 'match-global',
      gameId: 'global-blitz',
      mode: 'global',
      stage: 'in-progress',
      startedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      participants: mockParticipants.map((participant, index) => ({
        id: participant.id,
        user: participant.user,
        joinedAt: participant.joinedAt,
        status: participant.status,
        result:
          participant.status === 'ready'
            ? {
                placement: index + 1,
                score: 100 - index * 12,
                rewards: 20 - index * 5,
                outcome: index === 0 ? 'win' : 'lose',
              }
            : undefined,
      })),
    }),
    [],
  )

  const activePlayers = matchSummary.participants.length
  const readyPlayers = matchSummary.participants.filter((participant) => participant.status === 'ready').length

  return (
    <GameLayout
      title="Global Arena"
      description="All commanders clash in one colossal match. Join the queue to fight for the daily title."
    >
      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-lg font-semibold text-slate-100">Match Status</h2>
          <p className="mt-2 text-sm uppercase tracking-[0.3em] text-slate-500">{matchSummary.stage}</p>
          <div className="mt-4 grid gap-4 text-sm text-slate-300 sm:grid-cols-2">
            <div>
              <p className="text-slate-500">Active Players</p>
              <p className="text-2xl font-semibold text-slate-100">{activePlayers}</p>
            </div>
            <div>
              <p className="text-slate-500">Ready</p>
              <p className="text-2xl font-semibold text-slate-100">{readyPlayers}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              className="cursor-pointer rounded-lg bg-indigo-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-indigo-400"
            >
              Join Queue
            </button>
            <button
              type="button"
              className="cursor-pointer rounded-lg border border-slate-700 px-4 py-2 text-slate-300 transition hover:border-slate-600 hover:text-slate-100"
            >
              Watch Live
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-lg font-semibold text-slate-100">Leaderboard Snapshot</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            {matchSummary.participants.map((participant) => (
              <li
                key={participant.id}
                className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/60 px-4 py-3"
              >
                <div>
                  <p className="font-semibold text-slate-100">{participant.user.displayName}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{participant.status}</p>
                </div>
                {participant.result ? (
                  <div className="text-right">
                    <p className="text-slate-100">{participant.result.score} pts</p>
                    <p className="text-xs text-slate-500">
                      {participant.result.outcome === 'win' ? 'Leading' : 'Competing'}
                    </p>
                  </div>
                ) : (
                  <span className="text-xs text-slate-500">Awaiting score…</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-slate-300">
        <h2 className="text-lg font-semibold text-slate-100">Arena Briefing</h2>
        <p className="mt-3">
          Every hour, the arena spins up a fresh rule set. This session rewards aggressive play with extra shard drops.
          Jump in solo or bring a squad to dominate the global stage.
        </p>
      </section>
    </GameLayout>
  )
}

export default GlobalArenaPage

