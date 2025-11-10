type HomeHeroProps = {
  reactLogo: string
  viteLogo: string
}

function HomeHero({ reactLogo, viteLogo }: HomeHeroProps) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="flex items-center gap-6">
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img
            src={viteLogo}
            alt="Vite"
            className="size-20 transition-transform duration-500 hover:scale-110"
          />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img
            src={reactLogo}
            alt="React"
            className="size-20 animate-spin [animation-duration:8s]"
          />
        </a>
      </div>
      <h1 className="text-4xl font-semibold tracking-tight text-slate-100 sm:text-5xl">
        Welcome to Comet GameHouse
      </h1>
      <p className="max-w-xl text-lg text-slate-300">
        Spin up global face-offs or private rooms in seconds. React, Vite, and Tailwind CSS v4
        power a fast, dark-first experience. Edit{' '}
        <code className="rounded bg-slate-800 px-1.5 py-0.5">
          src/app/pages/marketing/HomePage.tsx
        </code>{' '}
        to start building.
      </p>
    </div>
  )
}

export default HomeHero

