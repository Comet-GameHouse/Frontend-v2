import { useMemo } from 'react'
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Paper } from '@components'
import { useNotifications } from '@hooks'

const buttonVariants = [
  'primary',
  'secondary',
  'outline',
  'ghost',
  'success',
  'danger',
  'warning',
  'plasma',
  'void',
  'link',
] as const
const buttonSizes = ['xs', 'sm', 'md', 'lg'] as const
const inputVariants = ['default', 'subtle', 'glass', 'terminal'] as const

function UIKitShowcasePage() {
  const { notify } = useNotifications()

  const handleNotify = useMemo(
    () => () =>
      notify({
        title: 'Command Acknowledged',
        message: 'Your request streak triggered a showcase toast.',
        intent: 'info',
        type: 'system',
        icon: 'satellite',
      }),
    [notify],
  )

  return (
    <div className="flex flex-col gap-10">
      <section>
        <h2 className="text-xl font-semibold tracking-tight text-slate-100">Buttons</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          Cosmic gradients, plasma bursts, and stealth void buttons cover every interaction state.
        </p>
        <div className="mt-6 grid gap-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {buttonVariants.map((variant) => (
              <Paper key={variant} className="space-y-4" elevation="sm">
                <h3 className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-500">
                  {variant}
                </h3>
                <div className="flex flex-wrap items-center gap-3">
                  {buttonSizes.map((size) => (
                    <Button
                      key={`${variant}-${size}`}
                      variant={variant}
                      size={size}
                      rightIcon={variant === 'link' ? undefined : 'arrow-right'}
                    >
                      {variant} · {size}
                    </Button>
                  ))}
                </div>
              </Paper>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight text-slate-100">Inputs</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          Tailored fields with icon slots, glass skins, and terminal styling tuned to Comet colors.
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {inputVariants.map((variant) => (
            <Paper key={variant} className="space-y-4" elevation="sm">
              <h3 className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-500">
                {variant}
              </h3>
              <Input
                variant={variant}
                label="Commander ID"
                placeholder="Enter your handle"
                leftIcon="shield-halved"
                rightIcon="chevron-right"
              />
              <Input
                variant={variant}
                label="Error State"
                placeholder="Invalid example"
                leftIcon="triangle-exclamation"
                error="Please verify your credentials."
              />
            </Paper>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight text-slate-100">Cards</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          Display mission briefings, reward previews, or game summaries in elevated surfaces.
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="p-0">
            <CardHeader>
              <CardTitle>Galactic Mission</CardTitle>
              <CardDescription>Reach the top 5% in the global arena to earn the Nova badge.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Join the next cycle, complete ten streak wins, and synchronize with two rooms to unlock extra shards.
              </p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Accept Mission</Button>
              <Button size="sm" variant="ghost">
                View Details
              </Button>
            </CardFooter>
          </Card>

          <Card className="p-0" variant="outline">
            <CardHeader>
              <CardTitle>Reward Capsule</CardTitle>
              <CardDescription>Cosmic cosmetics ready for pickup.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Paper elevation="none" className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-100">Nebula Trail</p>
                  <p className="text-xs text-slate-400">Dynamic comet tail</p>
                </div>
                <Button size="sm" variant="outline">
                  Equip
                </Button>
              </Paper>
              <Paper elevation="none" className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-100">Aurora Shell</p>
                  <p className="text-xs text-slate-400">Reactive damage shield</p>
                </div>
                <Button size="sm" variant="outline">
                  Equip
                </Button>
              </Paper>
            </CardContent>
          </Card>

          <Card className="p-0" variant="translucent">
            <CardHeader>
              <CardTitle>Compression Log</CardTitle>
              <CardDescription>Fused metrics from recent matches.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Paper elevation="none" className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-300">Win Ratio</p>
                  <p className="text-xl font-semibold text-slate-100">67%</p>
                </div>
                <span className="text-xs text-emerald-400">+8%</span>
              </Paper>
              <Paper elevation="none" className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-300">Critical Hits</p>
                  <p className="text-xl font-semibold text-slate-100">1.3k</p>
                </div>
                <span className="text-xs text-cyan-400">+12%</span>
              </Paper>
            </CardContent>
          </Card>

          <Card className="p-0" variant="gradient">
            <CardHeader>
              <CardTitle>Hyperlane Spotlight</CardTitle>
              <CardDescription>Featured room rotations and upcoming arena boosts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-100">Global Relay</p>
                  <p className="text-xs text-slate-300">Next sync in 12m</p>
                </div>
                <Button size="xs" variant="ghost">
                  View
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-100">Nebula Nodes</p>
                  <p className="text-xs text-slate-300">Players online · 4.3k</p>
                </div>
                <span className="text-xs font-semibold text-emerald-200">+12%</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="plasma" size="sm" rightIcon="arrow-right">
                Explore Hyperlanes
              </Button>
            </CardFooter>
          </Card>

          <Card className="p-0" variant="void">
            <CardHeader>
              <CardTitle>Blacksite Cache</CardTitle>
              <CardDescription>Encrypted drops for squads with top secrecy clearance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Paper elevation="none" className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.32em] text-slate-500">Artifact</span>
                <span className="text-sm text-slate-300">Singularity Prism</span>
              </Paper>
              <Paper elevation="none" className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.32em] text-slate-500">Status</span>
                <span className="text-sm text-amber-300">Locked</span>
              </Paper>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                Request Access
              </Button>
              <Button variant="ghost" size="sm">
                Learn More
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800/70 bg-slate-950/60 px-6 py-8 shadow-[0_20px_60px_-48px_rgba(56,189,248,0.5)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-100">Interactive Demo</h3>
            <p className="text-sm text-slate-400">
              Test notifications and see how the UI kit feels in motion.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" size="sm" onClick={handleNotify} leftIcon="satellite">
              Trigger Notification
            </Button>
            <Button variant="outline" size="sm" rightIcon="arrow-right">
              Explore Docs
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default UIKitShowcasePage

