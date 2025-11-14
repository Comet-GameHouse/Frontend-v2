import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '@components/ui/Button'
import { Card } from '@components/ui/Card'
import { useAOS } from '@hooks'

type CtaSectionProps = {
  isAuthenticated: boolean
  onNavigate: (path: string) => void
}

function CtaSection({ isAuthenticated, onNavigate }: CtaSectionProps) {
  const getAOSProps = useAOS()
  const primaryPath = isAuthenticated ? '/dashboard' : '/auth/signup'
  return (
    <section className="mx-auto max-w-5xl px-6" {...getAOSProps({ 'data-aos': 'fade-up', 'data-aos-duration': '300', 'data-aos-delay': '200' })}>
      <Card variant="gradient" className="space-y-5 text-center">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">Ready to launch?</h2>
        <p className="text-lg text-slate-200">
          Create a free account and unlock
          <span className="mx-1 inline-flex items-center gap-1 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-cyan-100">
            1,000
            <FontAwesomeIcon icon="coins" className="h-3 w-3" aria-hidden="true" />
            <span className="sr-only">coins</span>
          </span>
          to outfit your squad.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" size="lg" rightIcon="arrow-right" onClick={() => onNavigate(primaryPath)}>
            {isAuthenticated ? 'Open dashboard' : 'Create account'}
          </Button>
          {!isAuthenticated && (
            <Button variant="ghost" size="lg" onClick={() => onNavigate('/auth/signin')}>
              Sign in
            </Button>
          )}
        </div>
      </Card>
    </section>
  )
}

export default CtaSection

