import SupportForm, { type SupportField } from '../components/SupportForm'
import { useAOS } from '@hooks'

const FIELDS: SupportField[] = [
  {
    name: 'email',
    label: 'Contact Email',
    placeholder: 'you@comet.gg',
    icon: 'envelope',
    type: 'email',
  },
  {
    name: 'platform',
    label: 'Platform',
    placeholder: 'Windows, macOS, Steam Deck…',
    icon: 'gamepad',
  },
  {
    name: 'severity',
    label: 'Impact Level',
    placeholder: 'Critical, Major, Minor…',
    icon: 'triangle-exclamation',
  },
  {
    name: 'summary',
    label: 'Bug Summary',
    placeholder: 'Short title describing the issue',
  },
  {
    name: 'steps',
    label: 'Reproduction Steps',
    placeholder: 'List each action in order to trigger the bug.',
    multiline: true,
  },
]

function BugReportPage() {
  const getAOSProps = useAOS()
  
  return (
    <SupportForm
      fields={FIELDS}
      submitLabel="Submit Bug"
      successMessage="Bug logged! We'll follow up by email when a fix ships."
      {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '150' })}
    />
  )
}

export default BugReportPage

