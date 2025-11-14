import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Card } from '@components/ui/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGameLayout } from '@layouts'
import {
  GAME_DETAIL_MAP,
  DEFAULT_GAME_KEY,
  ROOM_FEE_OPTIONS,
  DEFAULT_LEADERBOARD,
  LEADERBOARD_TIERS,
} from './data'
import OverviewCard from './components/OverviewCard'
import GameInsights from './components/GameInsights'
import RoomEntryGrid from './components/RoomEntryGrid'
import LeaderboardTabs from './components/LeaderboardTabs'

function GameDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { setMeta } = useGameLayout()
  const [matchingFee, setMatchingFee] = useState<number | null>(null)
  const timerRef = useRef<number | null>(null)

  const detail = useMemo(() => GAME_DETAIL_MAP[id ?? DEFAULT_GAME_KEY] ?? GAME_DETAIL_MAP[DEFAULT_GAME_KEY], [id])

  useEffect(() => {
    setMeta({ title: detail.title, description: detail.tagline })
  }, [detail.tagline, detail.title, setMeta])

  const handleJoinRoom = (fee: number) => {
    if (matchingFee !== null) return
    setMatchingFee(fee)
    timerRef.current = window.setTimeout(() => {
      setMatchingFee(null)
      navigate(`/arena?entry=${fee}`)
    }, 1200)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [])

  return (
    <section className="flex flex-col gap-6">
      <OverviewCard detail={detail} onQueue={() => navigate('/arena')} onBack={() => navigate('/games')} />
      <GameInsights detail={detail} />
      <Card variant="glass" className="space-y-4" data-aos="fade-up" data-aos-duration="300" data-aos-delay="275">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Create a Room</h2>
          <p className="text-xs text-slate-400">Pick an entry fee tier to match with ready commanders.</p>
        </div>
        <RoomEntryGrid options={Array.from(ROOM_FEE_OPTIONS)} matchingFee={matchingFee} onJoin={handleJoinRoom} />
        {matchingFee !== null ? (
          <p className="flex items-center gap-2 text-xs text-slate-400">
            We’re aligning a lobby at
            <span className="inline-flex items-center gap-1 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-2 py-0.5 text-cyan-100">
              {matchingFee}
              <FontAwesomeIcon icon="coins" className="h-3 w-3" aria-hidden="true" />
              <span className="sr-only">coins</span>
            </span>
            entry. Hang tight!
          </p>
        ) : null}
      </Card>
      <Card variant="void" className="space-y-4" data-aos="fade-up" data-aos-duration="300" data-aos-delay="325">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Leaderboard Spotlight</h2>
          <p className="text-xs text-slate-400">See who’s dominating {detail.title} across time spans.</p>
        </div>
        <LeaderboardTabs tiers={Array.from(LEADERBOARD_TIERS)} entries={DEFAULT_LEADERBOARD} />
      </Card>
    </section>
  )
}

export default GameDetailPage

