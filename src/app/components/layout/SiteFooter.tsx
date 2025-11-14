import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const primaryLinks = [
  { label: 'Home', href: '/' },
  { label: 'Games', href: '/games' },
  { label: 'Arena', href: '/arena' },
  { label: 'Tournaments', href: '/tournaments' },
  { label: 'Friends', href: '/friends' },
  { label: 'Invite', href: '/invite' },
  { label: 'Community', href: '/community' },
]

const supportLinks = [
  { label: 'Help Center', href: '/support' },
  { label: 'Help Guides', href: '/support/help' },
  { label: 'Status Page', href: '/support/status' },
  { label: 'Feedback', href: '/support/feedback' },
  { label: 'Report Bug', href: '/support/report-bug' },
]

const progressionLinks = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Profile', href: '/profile' },
  { label: 'Achievements', href: '/progress/achievements' },
  { label: 'Leaderboard', href: '/progress/leaderboard' },
  { label: 'Shop', href: '/progress/shop' },
  { label: 'Notifications', href: '/notifications' },
  { label: 'Settings', href: '/settings' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '/legal/privacy' },
  { label: 'Terms of Use', href: '/legal/terms' },
]

function SiteFooter() {
  return (
    <footer className="border-t border-slate-800/70 bg-slate-950/90">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12 lg:flex-row lg:justify-between lg:px-8">
        <div className="max-w-md space-y-4 text-slate-300">
          <div className="flex items-center gap-3 text-slate-100">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-cyan-200">
              <FontAwesomeIcon icon="meteor" className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight">Comet GameHouse</span>
          </div>
          <p className="text-sm text-slate-400">
            Unite your crew, conquer global arenas, and keep every match in sync. Comet GameHouse is your
            command center for multiplayer adventures.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-400" />
              Live systems
            </span>
            <span>Latency &lt; 40ms</span>
            <span>99.9% uptime</span>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-8 text-sm text-slate-300 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Explore</p>
            <ul className="space-y-2">
              {primaryLinks.map((link) => (
                <li key={link.href}>
                  <Link className="transition hover:text-slate-100" to={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Player Hub</p>
            <ul className="space-y-2">
              {progressionLinks.map((link) => (
                <li key={link.href}>
                  <Link className="transition hover:text-slate-100" to={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Support</p>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link className="transition hover:text-slate-100" to={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Legal</p>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link className="transition hover:text-slate-100" to={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800/70 bg-slate-950/95 py-5">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-slate-500 sm:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} Comet GameHouse. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <Link to="/legal/privacy" className="transition hover:text-slate-100">
              Privacy
            </Link>
            <Link to="/legal/terms" className="transition hover:text-slate-100">
              Terms
            </Link>
            <Link to="/support" className="transition hover:text-slate-100">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
