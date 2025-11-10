import { useState } from 'react'
import reactLogo from '@/assets/react.svg'
import viteLogo from '/vite.svg'
import { CounterCard, HomeHero } from '@components'

function HomePage() {
  const [count, setCount] = useState(0)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-12 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 py-16">
      <HomeHero reactLogo={reactLogo} viteLogo={viteLogo} />
      <CounterCard
        count={count}
        onIncrement={() => setCount((value) => value + 1)}
        onDecrement={() => setCount((value) => value - 1)}
      />
    </main>
  )
}

export default HomePage

