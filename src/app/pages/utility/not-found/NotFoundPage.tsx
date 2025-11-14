function NotFoundPage() {
  return (
    <div className="space-y-4 text-center">
      <p className="text-sm text-slate-300">
        The page you’re looking for drifted into a black hole. Navigate back to continue exploring Comet GameHouse.
      </p>
      <a
        href="/"
        className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-cyan-400/50 px-5 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-100 transition hover:border-cyan-300 hover:text-cyan-50"
      >
        Return home
      </a>
    </div>
  )
}

export default NotFoundPage

