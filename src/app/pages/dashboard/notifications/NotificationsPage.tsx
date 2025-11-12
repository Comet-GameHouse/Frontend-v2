import { useMemo } from 'react'
import { Card } from '@components'
import type { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const HISTORY: Array<{ icon: IconName; title: string; detail: string; time: string }> = [
  { icon: 'meteor', title: 'Ranked queue ready', detail: 'Join your Nebula Showdown lobby within 40 seconds.', time: '2m ago' },
  { icon: 'gift', title: 'Squad sent you a drop', detail: 'Aurora cosmetics unlocked from NovaRift.', time: '28m ago' },
  { icon: 'bell', title: 'Maintenance scheduled', detail: 'Creator tools offline 02:00-02:30 UTC.', time: '1h ago' },
  { icon: 'users', title: 'Friend request accepted', detail: 'AuroraPulse joined your crew.', time: '3h ago' },
]

function NotificationsPage() {
  const groupedHistory = useMemo(() => HISTORY.slice(0, 20), [])

  return (
    <Card variant="void" className="space-y-4" data-aos="fade-up" data-aos-duration="300" data-aos-delay="150">
      <h2 className="text-lg font-semibold text-white">All Notifications</h2>
      <p className="text-sm text-slate-300">Chronological list of alerts delivered across every channel.</p>
      <ul className="space-y-3 text-sm text-slate-300">
        {groupedHistory.map((entry, index) => (
          <li
            key={`${entry.title}-${index}`}
            className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            data-aos="fade-up"
            data-aos-duration="300"
            data-aos-delay={String(200 + index * 50)}
          >
            <span className="flex size-9 items-center justify-center rounded-xl border border-cyan-400/40 bg-cyan-400/10 text-cyan-200">
              <FontAwesomeIcon icon={entry.icon} className="h-4 w-4" />
            </span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-white">{entry.title}</p>
                <span className="text-xs text-slate-500">{entry.time}</span>
              </div>
              <p className="text-xs text-slate-400">{entry.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default NotificationsPage

