import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { STATS } from '../homeData'

function StatsSection() {
  return (
    <section className="border-y border-slate-800/70 bg-slate-900/40 px-6 py-12">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4">
        {STATS.map(({ icon, label, value }, idx) => (
          <article key={label} className="flex flex-col items-center gap-1" data-aos="fade-up" data-aos-duration="300" data-aos-delay={String(150 + idx * 50)}>
            <FontAwesomeIcon icon={icon} className="h-8 w-8 text-cyan-300" />
            <span className="text-3xl font-semibold text-white">{value}</span>
            <span className="text-sm text-slate-400">{label}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default StatsSection

