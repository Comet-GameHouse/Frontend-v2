import type { ReactNode } from 'react'
import { PageShell } from '@components'

type LayoutProps = {
  title: string
  description?: string
  children?: ReactNode
}

function SupportLayout({ title, description, children }: LayoutProps) {
  return (
    <main className="min-h-screen bg-slate-950">
      <div className="bg-slate-900/40">
        <PageShell title={title} description={description}>
          {children}
        </PageShell>
      </div>
    </main>
  )
}

export type { LayoutProps }
export default SupportLayout

