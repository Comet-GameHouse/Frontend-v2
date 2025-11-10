type CounterCardProps = {
  count: number
  onIncrement: () => void
  onDecrement: () => void
}

function CounterCard({ count, onIncrement, onDecrement }: CounterCardProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl shadow-slate-900/40">
      <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Counter Demo</p>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onDecrement}
          className="rounded-lg bg-slate-800 px-4 py-2 text-slate-200 transition hover:bg-slate-700"
        >
          -1
        </button>
        <span className="text-3xl font-semibold text-slate-100">{count}</span>
        <button
          type="button"
          onClick={onIncrement}
          className="rounded-lg bg-indigo-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-indigo-400"
        >
          +1
        </button>
      </div>
      <p className="text-sm text-slate-400">Tailwind utilities make rapid iteration a breeze.</p>
    </div>
  )
}

export default CounterCard

