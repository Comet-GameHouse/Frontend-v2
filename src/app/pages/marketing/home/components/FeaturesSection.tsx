import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card } from '@components/ui/Card'
import { FEATURES } from '../homeData'
import { useAOS } from '@hooks'

function FeaturesSection() {
  const getAOSProps = useAOS()
  
  return (
    <section className="mx-auto max-w-6xl space-y-6 px-6" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300' })}>
      <h2 className="text-3xl font-semibold text-white sm:text-4xl">Why crews choose GameHouse</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ icon, title, copy }, idx) => (
          <Card key={title} variant="glass" className="space-y-3" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': String(150 + idx * 50) })}>
            <FontAwesomeIcon icon={icon} className="h-6 w-6 text-cyan-300" />
            <p className="text-lg font-semibold text-white">{title}</p>
            <p className="text-sm text-slate-400">{copy}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default FeaturesSection

