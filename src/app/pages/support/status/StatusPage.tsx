import { Card } from '@components'

const SERVICES = [
  { name: 'Global Arena', status: 'Operational', detail: 'All matchmaking clusters online and responsive.' },
  { name: 'Custom Rooms', status: 'Degraded', detail: 'Publishing new rooms may take up to 5 minutes.' },
  { name: 'Creator Hub', status: 'Maintenance', detail: 'Scheduled upgrade. Expected back 02:30 UTC.' },
]

function StatusPage() {
  return (
    <Card variant="glass" className="space-y-4" data-aos="fade-up" data-aos-duration="300" data-aos-delay="150">
      <h2 className="text-lg font-semibold text-white">Service Health</h2>
      <ul className="space-y-3 text-sm text-slate-300">
        {SERVICES.map((service, index) => (
          <li
            key={service.name}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            data-aos="fade-up"
            data-aos-duration="300"
            data-aos-delay={String(200 + index * 50)}
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
  )
}

export default StatusPage

