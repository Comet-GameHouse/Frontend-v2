import { Card } from '@components'
import { useAOS } from '@hooks'

const SECTIONS = [
  {
    title: 'Using Comet GameHouse',
    items: [
      'You must be at least 13 or have guardian approval to create an account.',
      'Respect match rules, anti-cheat policies, and fellow players at all times.',
      'Virtual goods are licensed, not sold, and may change during balance updates.',
    ],
  },
  {
    title: 'Purchases & Subscriptions',
    items: [
      'All transactions are processed through trusted payment partners.',
      'Recurring passes renew automatically unless cancelled 24 hours in advance.',
      'Charge disputes may suspend access while we review the request.',
    ],
  },
  {
    title: 'Content & Ownership',
    items: [
      'You retain rights to original content but grant us permission to display it in-game.',
      'Feedback may be used to improve the service without additional compensation.',
      'We may remove any materials that violate law, policy, or third-party rights.',
    ],
  },
]

function TermsPage() {
  const getAOSProps = useAOS()
  
  return (
    <>
      {SECTIONS.map((section, index) => (
        <Card
          key={section.title}
          variant="void"
          className="space-y-3"
          {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': String(150 + index * 100) })}
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

      <p className="text-sm text-slate-400" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '300' })}>
        By continuing to play you agree to these rules. Contact terms@comet.gg for clarifications or partnership requests.
      </p>
    </>
  )
}

export default TermsPage

