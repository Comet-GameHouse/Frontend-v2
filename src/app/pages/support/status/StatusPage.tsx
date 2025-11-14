import { useMemo } from 'react'
import { Card } from '@components'
import { useAOS } from '@hooks'

const SERVICES = [
  {
    name: 'API Core',
    status: 'Operational',
    detail: 'All REST endpoints responding within target latency.',
  },
  {
    name: 'Realtime Socket',
    status: 'Degraded',
    detail: 'Occasional packet retries detected in EU-West cluster.',
  },
  {
    name: 'Database Cluster',
    status: 'Operational',
    detail: 'Primary + replicas healthy. Nightly backups completed.',
  },
]

type StatusType = 'ok' | 'minor' | 'major'

const STATUS_COLORS: Record<StatusType, string> = {
  ok: 'bg-emerald-400/70 hover:bg-emerald-400/90',
  minor: 'bg-amber-300/70 hover:bg-amber-300/90',
  major: 'bg-rose-400/80 hover:bg-rose-400/100',
}

const STATUS_LABELS: Record<StatusType, string> = {
  ok: 'Operational',
  minor: 'Minor Issues',
  major: 'Major Outage',
}

// Generate 90 days of mock data
function generateHistory() {
  const days: Array<{ date: Date; api: StatusType; socket: StatusType; db: StatusType }> = []
  const today = new Date()
  
  for (let i = 89; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    // Simulate realistic patterns: mostly operational with occasional issues
    const rand = Math.random()
    const api: StatusType = rand > 0.95 ? 'minor' : rand > 0.98 ? 'major' : 'ok'
    const socket: StatusType = rand > 0.92 ? 'minor' : rand > 0.97 ? 'major' : 'ok'
    const db: StatusType = rand > 0.97 ? 'minor' : rand > 0.99 ? 'major' : 'ok'
    
    days.push({ date, api, socket, db })
  }
  
  return days
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function StatusHeatmap({ serviceKey, data, serviceName }: { serviceKey: 'api' | 'socket' | 'db'; data: ReturnType<typeof generateHistory>; serviceName: string }) {
  const weeks = useMemo(() => {
    const weekGroups: Array<Array<typeof data[0]>> = []
    let currentWeek: typeof data = []
    
    data.forEach((day, index) => {
      currentWeek.push(day)
      // Start new week on Sunday (day 0) or every 7 days
      if (day.date.getDay() === 0 || currentWeek.length === 7 || index === data.length - 1) {
        weekGroups.push([...currentWeek])
        currentWeek = []
      }
    })
    
    return weekGroups
  }, [data])

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-white">{serviceName}</h4>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-emerald-400/70" />
            Operational
          </span>
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-amber-300/70" />
            Minor
          </span>
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-rose-400/80" />
            Major
          </span>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <div className="inline-flex gap-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day, dayIndex) => {
                const status = day[serviceKey]
                return (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`size-3 rounded-sm transition ${STATUS_COLORS[status]}`}
                    title={`${formatDate(day.date)}: ${STATUS_LABELS[status]}`}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between text-[10px] text-slate-500">
        <span>{formatDate(data[0].date)}</span>
        <span>{formatDate(data[data.length - 1].date)}</span>
      </div>
    </div>
  )
}

function StatusPage() {
  const history = useMemo(() => generateHistory(), [])
  const getAOSProps = useAOS()

  return (
    <div className="space-y-6">
      <Card variant="glass" className="space-y-4" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '150' })}>
        <h2 className="text-lg font-semibold text-white">Live Service Health</h2>
        <ul className="space-y-3 text-sm text-slate-300">
          {SERVICES.map((service, index) => (
            <li
              key={service.name}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': String(200 + index * 50) })}
            >
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">
                <span>{service.name}</span>
                <span>{service.status}</span>
              </div>
              <p className="mt-2 text-sm text-slate-300">{service.detail}</p>
            </li>
          ))}
        </ul>
        <p className="text-xs text-slate-500">Last updated {new Date().toLocaleTimeString()}.</p>
      </Card>

      <Card variant="void" className="space-y-6" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '250' })}>
        <header className="flex flex-col gap-1">
          <h3 className="text-base font-semibold text-white">90-Day Status History</h3>
          <p className="text-xs text-slate-400">Heatmap visualization showing daily health for each service. Hover over squares for details.</p>
        </header>

        <div className="space-y-6">
          <StatusHeatmap serviceKey="api" data={history} serviceName="API Core" />
          <StatusHeatmap serviceKey="socket" data={history} serviceName="Realtime Socket" />
          <StatusHeatmap serviceKey="db" data={history} serviceName="Database Cluster" />
        </div>
      </Card>
    </div>
  )
}

export default StatusPage
