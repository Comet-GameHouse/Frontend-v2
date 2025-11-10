import ProgressionLayout from '@layouts/ProgressionLayout'

function LeaderboardPage() {
  return (
    <ProgressionLayout
      title="Global Leaderboard"
      description="Track top players across global matches, seasonal ladders, and community events."
    >
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <p className="text-slate-300">
          Leaderboard tables and filters will be available soon.
        </p>
      </div>
    </ProgressionLayout>
  )
}

export default LeaderboardPage

