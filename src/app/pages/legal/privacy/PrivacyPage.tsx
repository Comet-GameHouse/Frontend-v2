import { Card } from '@components'

const SECTIONS = [
  {
    title: 'Data We Collect',
    items: [
      'Account details such as email, display name, and linked social IDs.',
      'Match telemetry used to balance gameplay and monitor performance.',
      'Optional analytics that help us understand device and network health.',
    ],
  },
  {
    title: 'How We Use Data',
    items: [
      'Deliver matchmaking, leaderboards, and persistent progression.',
      'Detect fraud, safeguard accounts, and enforce community guidelines.',
      'Provide updates about events, rewards, and service changes when opted in.',
    ],
  },
  {
    title: 'Your Controls',
    items: [
      'Download an export of your data through the account dashboard.',
      'Request deletion or corrections by contacting privacy@comet.gg.',
      'Adjust marketing or analytics preferences at any time in settings.',
    ],
  },
]

function PrivacyPage() {
  return (
    <>
      {SECTIONS.map((section, index) => (
        <Card
          key={section.title}
          variant="glass"
          className="space-y-3"
          data-aos="fade-up"
          data-aos-duration="300"
          data-aos-delay={String(150 + index * 100)}
        >
          <h2 className="text-xl font-semibold text-white">{section.title}</h2>
          <ul className="space-y-2 text-sm text-slate-300">
            {section.items.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 size-1.5 rounded-full bg-cyan-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      ))}

      <p className="text-sm text-slate-400" data-aos="fade-up" data-aos-duration="300" data-aos-delay="300">
        Have questions? Reach our data protection team at privacy@comet.gg and we’ll respond within five business days.
      </p>
    </>
  )
}

export default PrivacyPage

