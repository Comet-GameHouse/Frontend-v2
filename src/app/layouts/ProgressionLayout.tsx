import type { ReactNode } from 'react'
import { PageShell } from '@components'

type LayoutProps = {
  title: string
  description?: string
  children?: ReactNode
}

function ProgressionLayout({ title, description, children }: LayoutProps) {
  return (
    <main className="min-h-screen bg-slate-950">
      <PageShell title={title} description={description}>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {children}
        </div>
      </PageShell>
    </main>
  )
}

export type { LayoutProps }
export default ProgressionLayout

