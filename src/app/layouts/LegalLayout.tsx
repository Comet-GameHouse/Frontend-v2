import type { ReactNode } from 'react'
import { PageShell } from '@components'

type LayoutProps = {
  title: string
  description?: string
  children?: ReactNode
}

function LegalLayout({ title, description, children }: LayoutProps) {
  return (
    <main className="min-h-screen bg-slate-950">
      <PageShell title={title} description={description}>
        <article className="prose prose-invert max-w-none">{children}</article>
      </PageShell>
    </main>
  )
}

export type { LayoutProps }
export default LegalLayout

