import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { Button, Card } from '@components'

const ACTIONS: Array<{ title: string; copy: string; href: string; icon: IconProp }> = [
  {
    title: 'Open a Ticket',
    copy: 'Describe an issue and our crew will get back within 24 hours.',
    href: '/support/report-bug',
    icon: 'envelope',
  },
  {
    title: 'Check System Status',
    copy: 'Review current uptime, maintenance windows, and incident notes.',
    href: '/support/status',
    icon: 'satellite',
  },
  {
    title: 'Send Feedback',
    copy: 'Share ideas that could boost the GameHouse experience.',
    href: '/support/feedback',
    icon: 'feather-pointed',
  },
]

const RESOURCES = [
  {
    title: 'Quick Guides',
    points: ['Room setup walkthroughs', 'Cosmetic unlock tips', 'Leaderboard FAQs'],
  },
  {
    title: 'Policy Center',
    points: ['Safety and moderation rules', 'Refund guidelines', 'Data protection FAQ'],
  },
]

function SupportPage() {
  return (
    <>
      <section className="grid gap-6 lg:grid-cols-3">
        {ACTIONS.map((item, index) => (
          <Card
            key={item.title}
            variant="glass"
            className="flex h-full flex-col gap-4"
            data-aos="fade-up"
            data-aos-duration="300"
            data-aos-delay={String(150 + index * 100)}
          >
            <div className="flex items-center gap-3 text-cyan-200">
              <span className="flex size-10 items-center justify-center rounded-xl border border-cyan-400/40 bg-cyan-400/10">
                <FontAwesomeIcon icon={item.icon} className="h-4 w-4" />
              </span>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            </div>
            <p className="text-sm text-slate-300">{item.copy}</p>
            <Link to={item.href} className="mt-auto" data-aos="fade-up" data-aos-duration="300" data-aos-delay="250">
              <Button variant="primary" block rightIcon="arrow-right">
                Continue
              </Button>
            </Link>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        {RESOURCES.map((resource, index) => (
          <Card
            key={resource.title}
            variant="void"
            className="space-y-4"
            data-aos="fade-up"
            data-aos-duration="300"
            data-aos-delay={String(250 + index * 100)}
          >
            <h3 className="text-lg font-semibold text-white">{resource.title}</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {resource.points.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 rounded-full bg-cyan-300" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </section>
    </>
  )
}

export default SupportPage

