import { useNavigate } from 'react-router-dom'
import { Card, Button } from '@components'

const SUMMARY = [
  { label: 'Rank Points', value: '2,430', change: '+120 this week' },
  { label: 'Active Sessions', value: '3', change: 'Rooms synced across NA/EU' },
  { label: 'Daily Streak', value: '7 days', change: 'Keep playing for bonus shards' },
]

const ACTIVITIES = [
  { title: 'Squad victory in Nebula Showdown', detail: 'Final score 24-18 · +65 RP · MVP as Support', time: '19 minutes ago' },
  { title: 'Season challenge unlocked', detail: 'Earn 10 plasma assists in ranked arena matches', time: '2 hours ago' },
  { title: 'Creator pass payout processed', detail: '14,500 credits sent to linked wallet', time: 'Yesterday' },
]

function DashboardPage() {
  const navigate = useNavigate()

  return (
    <>
      <section className="grid gap-4 sm:grid-cols-3" data-aos="fade-up" data-aos-duration="300" data-aos-delay="150">
        {SUMMARY.map((item, index) => (
          <Card
            key={item.label}
            variant="glass"
            className="space-y-2"
            data-aos="fade-up"
            data-aos-duration="300"
            data-aos-delay={String(150 + index * 100)}
          >
            <p className="text-xs font-semibold text-cyan-200">{item.label}</p>
            <p className="text-2xl font-semibold text-white">{item.value}</p>
            <p className="text-xs text-slate-400">{item.change}</p>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]" data-aos="fade-up" data-aos-duration="300" data-aos-delay="250">
        <Card variant="void" className="space-y-4">
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
              <p className="text-sm text-slate-400">Match outcomes, rewards, and system updates</p>
            </div>
            <Button variant="outline" size="sm" rightIcon="arrow-right" onClick={() => navigate('/notifications')}>
              View log
            </Button>
          </header>
          <ul className="space-y-3 text-sm text-slate-300">
            {ACTIVITIES.map((event, index) => (
              <li key={event.title} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" data-aos="fade-up" data-aos-duration="300" data-aos-delay={String(300 + index * 100)}>
                <p className="font-semibold text-white">{event.title}</p>
                <p className="text-xs text-slate-400">{event.detail}</p>
                <p className="text-xs text-slate-500">{event.time}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card variant="glass" className="space-y-4" data-aos="fade-up" data-aos-duration="300" data-aos-delay="300">
          <h2 className="text-lg font-semibold text-white">Upcoming</h2>
          <p className="text-sm text-slate-300">Join scheduled scrims or track seasonal resets.</p>
          <ul className="space-y-3 text-xs text-slate-400">
            <li className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-slate-100">
              Tournament qualifier · Tomorrow 18:00 UTC
            </li>
            <li className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              Rank reset reminder · 3 days remaining
            </li>
            <li className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              Creator AMA · Friday 21:00 UTC
            </li>
          </ul>
        </Card>
      </section>
    </>
  )
}

export default DashboardPage

