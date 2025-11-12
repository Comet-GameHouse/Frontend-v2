import type { ReactNode } from 'react'
import { PageShell } from '@components'

type LayoutProps = {
  title: string
  description?: string
  children?: ReactNode
}

function MarketingLayout({ title, description, children }: LayoutProps) {
  return (
    <main className="min-h-screen">
      <PageShell title={title} description={description}>
        {children}
      </PageShell>
    </main>
  )
}

export type { LayoutProps }
export default MarketingLayout

