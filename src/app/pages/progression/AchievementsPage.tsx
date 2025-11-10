import ProgressionLayout from '@layouts/ProgressionLayout'

function AchievementsPage() {
  return (
    <ProgressionLayout
      title="Achievements"
      description="Review every badge you’ve earned and preview the challenges still locked."
    >
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <p className="text-slate-300">
          Badge showcase and unlock criteria will appear here.
        </p>
      </div>
    </ProgressionLayout>
  )
}

export default AchievementsPage

