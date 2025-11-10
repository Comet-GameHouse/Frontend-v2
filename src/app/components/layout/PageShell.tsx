import type { ReactNode } from 'react'

type PageShellProps = {
  title: string
  description?: string
  children?: ReactNode
}

function PageShell({ title, description, children }: PageShellProps) {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-16 text-slate-100">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
        {description ? (
          <p className="text-lg text-slate-300">{description}</p>
        ) : null}
      </header>
      {children ?? (
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-8">
          <p className="text-slate-400">
            This section is coming soon. Check back later for more details.
          </p>
        </div>
      )}
    </section>
  )
}

export default PageShell

