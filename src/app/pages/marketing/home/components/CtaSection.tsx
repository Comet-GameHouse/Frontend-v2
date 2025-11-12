import Button from '@components/ui/Button'
import { Card } from '@components/ui/Card'

type CtaSectionProps = {
  isAuthenticated: boolean
  onNavigate: (path: string) => void
}

function CtaSection({ isAuthenticated, onNavigate }: CtaSectionProps) {
  const primaryPath = isAuthenticated ? '/dashboard' : '/auth/signup'
  return (
    <section className="mx-auto max-w-5xl px-6" data-aos="fade-up" data-aos-duration="300" data-aos-delay="200">
      <Card variant="gradient" className="space-y-5 text-center">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">Ready to launch?</h2>
        <p className="text-lg text-slate-200">Create a free account and unlock 1,000 bonus coins to outfit your squad.</p>
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

