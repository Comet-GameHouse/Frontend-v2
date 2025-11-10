import type { ReactNode } from 'react'
import { PageShell } from '@components'

type LayoutProps = {
  title: string
  description?: string
  children?: ReactNode
}

function GameLayout({ title, description, children }: LayoutProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <PageShell title={title} description={description}>
        {children}
      </PageShell>
    </main>
  )
}

export type { LayoutProps }
export default GameLayout

