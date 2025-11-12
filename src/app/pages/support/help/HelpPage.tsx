import { Card } from '@components'

const FAQ = [
  {
    question: 'How do I report disruptive players?',
    answer: 'Use the in-match report tool or submit a detailed ticket including match ID and timestamps.',
    step: 'Step 01',
  },
  {
    question: 'Where can I watch update previews?',
    answer: 'Follow the Comet Discord announcements or visit the Creator Hub for weekly dev streams.',
    step: 'Step 02',
  },
  {
    question: 'Can I migrate my account?',
    answer: 'Yes—head to settings, link your new platform, and confirm the transfer with two-factor auth.',
    step: 'Step 03',
  },
]

function HelpPage() {
  return (
    <Card variant="glass" className="space-y-4" data-aos="fade-up" data-aos-duration="300" data-aos-delay="150">
      <h2 className="text-lg font-semibold text-white">Frequently Asked Questions</h2>
      <ul className="space-y-3">
        {FAQ.map((item, index) => (
          <li
            key={item.question}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
            data-aos="fade-up"
            data-aos-duration="300"
            data-aos-delay={String(200 + index * 50)}
          >
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">
              <span>{item.step}</span>
              <span>FAQ</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-white">{item.question}</p>
            <p className="text-sm text-slate-300">{item.answer}</p>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default HelpPage

