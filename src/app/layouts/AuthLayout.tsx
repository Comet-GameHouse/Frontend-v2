import type { ReactNode } from 'react'
import { PageShell } from '@components'

type LayoutProps = {
  title: string
  description?: string
  children?: ReactNode
}

function AuthLayout({ title, description, children }: LayoutProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900/70 shadow-2xl shadow-slate-900/40">
        <PageShell title={title} description={description}>
          {children}
        </PageShell>
      </div>
    </main>
  )
}

export type { LayoutProps }
export default AuthLayout

