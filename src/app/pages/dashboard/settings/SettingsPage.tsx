import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button } from '@components'
import cn from '@lib/cn'
import { useAOS } from '@hooks'

const PREFERENCES = [
  { title: 'Privacy Controls', detail: 'Hide online status, restrict room invites, manage blocked players.', action: 'Adjust privacy' },
  { title: 'Security', detail: 'Reset password, enable 2FA, review trusted devices.', action: 'Review security' },
  { title: 'Integrations', detail: 'Link Discord, Twitch drops, or third-party stat trackers.', action: 'Manage links' },
]
const SWITCHES = [
  { label: 'Email summaries', description: 'Weekly digest of matches and seasonal news.' },
  { label: 'Push notifications', description: 'Real-time alerts for queues and social requests.' },
  { label: 'Experimental features', description: 'Opt-in to preview upcoming UI and room tools.' },
]

function SettingsPage() {
  const navigate = useNavigate()
  const [activePreference, setActivePreference] = useState<string | null>(null)
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    'Email summaries': true,
    'Push notifications': true,
    'Experimental features': false,
  })
  const getAOSProps = useAOS()

  return (
    <>
      <Card variant="glass" className="flex flex-col gap-3" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '100' })}>
        <div>
          <h2 className="text-lg font-semibold text-white">Profile Identity</h2>
          <p className="text-sm text-slate-300">Update your display name, contact email, bio, and social links.</p>
        </div>
        <Button variant="primary" size="sm" rightIcon="arrow-right" onClick={() => navigate('/settings/profile')}>
          Edit profile
        </Button>
      </Card>

      <section className="grid gap-4 lg:grid-cols-2" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '150' })}>
        {PREFERENCES.map((pref, index) => (
          <Card key={pref.title} variant="glass" className="space-y-3" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': String(150 + index * 100) })}>
            <div>
              <h3 className="text-lg font-semibold text-white">{pref.title}</h3>
              <p className="text-sm text-slate-300">{pref.detail}</p>
            </div>
            <Button variant="outline" size="sm" rightIcon="arrow-right" onClick={() => setActivePreference(pref.title)}>
              {pref.action}
            </Button>
            {activePreference === pref.title ? (
              <p className="text-xs text-emerald-300">{`Updated ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`}</p>
            ) : null}
          </Card>
        ))}
      </section>

      <Card variant="void" className="space-y-3" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '250' })}>
        <h2 className="text-lg font-semibold text-white">Communication Preferences</h2>
        <ul className="space-y-3 text-sm text-slate-300">
          {SWITCHES.map((option, index) => (
            <li key={option.label} className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': String(300 + index * 100) })}>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">{option.label}</span>
                <button
                  type="button"
                  onClick={() => setEnabled((prev) => ({ ...prev, [option.label]: !prev[option.label] }))}
                  className={cn(
                    'rounded-full border px-3 py-1 text-xs transition',
                    enabled[option.label]
                      ? 'border-emerald-400/60 bg-emerald-400/10 text-emerald-200'
                      : 'border-white/20 text-slate-400 hover:border-cyan-400/40 hover:text-cyan-100',
                  )}
                >
                  {enabled[option.label] ? 'Enabled' : 'Disabled'}
                </button>
              </div>
              <span className="text-xs text-slate-400">{option.description}</span>
            </li>
          ))}
        </ul>
      </Card>
    </>
  )
}

export default SettingsPage

