import SupportForm, { type SupportField } from '../components/SupportForm'
import { useAOS } from '@hooks'

const FIELDS: SupportField[] = [
  {
    name: 'name',
    label: 'Display Name',
    placeholder: 'Commander Nova',
    icon: 'user',
  },
  {
    name: 'email',
    label: 'Contact Email',
    placeholder: 'you@comet.gg',
    icon: 'envelope',
    type: 'email',
  },
  {
    name: 'topic',
    label: 'Focus Area',
    placeholder: 'UI polish, matchmaking, rewards…',
    icon: 'feather-pointed',
  },
  {
    name: 'feedback',
    label: 'What would make Comet GameHouse better?',
    placeholder: 'Tell us about features, balance tweaks, or quality-of-life wins.',
    multiline: true,
  },
]

function FeedbackPage() {
  const getAOSProps = useAOS()
  
  return (
    <SupportForm
      fields={FIELDS}
      submitLabel="Send Feedback"
      successMessage="Thanks! Your feedback is now charted for the next planning sync."
      {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '150' })}
    />
  )
}

export default FeedbackPage

