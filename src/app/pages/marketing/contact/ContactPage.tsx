import MarketingLayout from '@layouts/MarketingLayout'
import { Card } from '@components/ui/Card'
import Button from '@components/ui/Button'

const CONTACTS = [
  { heading: 'Player Support', detail: 'Need technical help or room moderation assistance? Open a ticket via the Support Center.', action: 'support' },
  { heading: 'Partnerships', detail: 'Creators, brands, and esports leagues can reach us for collaborations and sponsor slots.', action: 'partners@comet.gg' },
  { heading: 'Press', detail: 'Request media assets or interviews with the Comet GameHouse team.', action: 'press@comet.gg' },
]

function ContactPage() {
  return (
    <MarketingLayout title="Contact Us" description="Reach the Comet GameHouse crew for support, partnerships, or press requests.">
      <section className="grid gap-4 sm:grid-cols-3" data-aos="fade-up" data-aos-duration="300" data-aos-delay="150">
        {CONTACTS.map(({ heading, detail, action }, idx) => (
          <Card key={heading} variant="glass" className="space-y-3" data-aos="fade-up" data-aos-duration="300" data-aos-delay={String(150 + idx * 50)}>
            <p className="text-lg font-semibold text-white">{heading}</p>
            <p className="text-sm text-slate-300">{detail}</p>
            {action === 'support' ? (
              <Button variant="outline" size="sm" rightIcon="arrow-right" onClick={() => window.location.assign('/support')}>
                Visit Support Center
              </Button>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => (window.location.href = `mailto:${action}`)}>
                {action}
              </Button>
            )}
          </Card>
        ))}
      </section>
      <Card variant="void" className="space-y-3" data-aos="fade-up" data-aos-duration="300" data-aos-delay="300">
        <h2 className="text-lg font-semibold text-white">Headquarters</h2>
        <p className="text-sm text-slate-300">Comet GameHouse · 88 Orbit Street · Remote-first across NA & EU · business@comet.gg</p>
      </Card>
    </MarketingLayout>
  )
}

export default ContactPage

