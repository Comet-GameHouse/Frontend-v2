import type { ReactNode } from 'react'
import { PageShell } from '@components'

type LayoutProps = {
  title: string
  description?: string
  children?: ReactNode
}

function UtilityLayout({ title, description, children }: LayoutProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="max-w-2xl">
        <PageShell title={title} description={description}>
          {children}
        </PageShell>
      </div>
    </main>
  )
}

export type { LayoutProps }
export default UtilityLayout

