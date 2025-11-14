import { Card } from '@components/ui/Card'
import { useAOS } from '@hooks'

const VALUES = [
  { title: 'Player First', copy: 'Balance passes, matchmaking tuning, and roadmap votes come from the community.' },
  { title: 'Create Together', copy: 'Room scripting, spectator tools, and creator payouts empower every squad leader.' },
  { title: 'Move Fast', copy: 'Weekly deployments keep arenas fresh—new rotations, cosmetics, and events.' },
]
const MILESTONES = [
  { year: '2022', event: 'Comet GameHouse launches closed beta with cross-platform rooms.' },
  { year: '2023', event: 'Creator economy rolls out with drops, overlays, and affiliate tools.' },
  { year: '2024', event: 'Global arena ladder surpasses 50K nightly competitors.' },
]

function AboutUsPage() {
  const getAOSProps = useAOS()
  
  return (
    <>
      <section className="grid gap-4 sm:grid-cols-3" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '150' })}>
        {VALUES.map(({ title, copy }, idx) => (
          <Card key={title} variant="glass" className="space-y-2" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': String(150 + idx * 50) })}>
            <p className="text-lg font-semibold text-white">{title}</p>
            <p className="text-sm text-slate-300">{copy}</p>
          </Card>
        ))}
      </section>
      <Card variant="void" className="space-y-3" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '300' })}>
        <h2 className="text-lg font-semibold text-white">Milestones</h2>
        <ul className="space-y-3 text-sm text-slate-300">
          {MILESTONES.map(({ year, event }, idx) => (
            <li key={year} className="flex items-start gap-3" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': String(350 + idx * 50) })}>
              <span className="mt-0.5 text-xs font-semibold uppercase text-cyan-200">{year}</span>
              <span>{event}</span>
            </li>
          ))}
        </ul>
      </Card>
    </>
  )
}

export default AboutUsPage

