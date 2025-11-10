import type { ReactNode } from 'react'
import { PageShell } from '@components'

type LayoutProps = {
  title: string
  description?: string
  children?: ReactNode
}

function DashboardLayout({ title, description, children }: LayoutProps) {
  return (
    <main className="min-h-screen bg-slate-950">
      <div className="mx-auto flex w-full max-w-6xl gap-10 px-6 py-16 lg:px-8">
        <nav className="hidden w-64 flex-shrink-0 flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-slate-300 lg:flex">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            Dashboard
          </span>
          <ul className="space-y-2 text-sm">
            <li className="rounded-lg bg-slate-800/60 px-3 py-2 text-slate-100">
              Overview
            </li>
            <li className="rounded-lg px-3 py-2 hover:bg-slate-800/40">Profile</li>
            <li className="rounded-lg px-3 py-2 hover:bg-slate-800/40">Notifications</li>
            <li className="rounded-lg px-3 py-2 hover:bg-slate-800/40">Settings</li>
          </ul>
        </nav>
        <PageShell title={title} description={description}>
          {children}
        </PageShell>
      </div>
    </main>
  )
}

export type { LayoutProps }
export default DashboardLayout

