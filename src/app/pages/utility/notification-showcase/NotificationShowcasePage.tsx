import { UtilityLayout } from '@layouts'
import { useNotifications } from '@hooks'

const demoNotifications = [
  {
    title: 'Cosmic Broadcast',
    message: 'Global Arena match entering sudden-death overtime. Brace for impact!',
    intent: 'info',
    type: 'system',
    icon: 'satellite',
  },
  {
    title: 'Victory Capsule',
    message: 'You secured the daily streak bonus. Claim 500 Comet Shards now.',
    intent: 'success',
    type: 'reward',
    icon: 'circle-check',
  },
  {
    title: 'Storm Warning',
    message: 'Room “Nebula-42” is nearing capacity. Join before launch in 30 seconds.',
    intent: 'warning',
    type: 'room-update',
    icon: 'meteor',
  },
  {
    title: 'System Alert',
    message: 'Connection hiccup detected. We’re recalibrating your relay.',
    intent: 'error',
    type: 'system',
    icon: 'explosion',
  },
] as const

function NotificationShowcasePage() {
  const { notify, clearAll } = useNotifications()

  return (
    <UtilityLayout
      title="Notification Showcase"
      description="Trigger Comet-styled toasts to preview intents and content patterns."
    >
      <p className="text-sm text-slate-400">
        Use these sample payloads as inspiration for gameplay events, rewards, or system messages.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {demoNotifications.map((item) => (
          <button
            key={item.title}
            type="button"
            onClick={() =>
              notify({
                title: item.title,
                message: item.message,
                intent: item.intent,
                type: item.type,
                icon: item.icon,
              })
            }
            className="cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/50 px-4 py-5 text-left text-slate-200 transition hover:border-slate-700 hover:bg-slate-900"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{item.intent}</p>
            <h3 className="mt-2 text-lg font-semibold text-slate-100">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{item.message}</p>
            <span className="mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-[0.35em] text-indigo-300">
              Trigger
            </span>
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={clearAll}
        className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-700 px-5 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-slate-300 transition hover:border-slate-500 hover:text-slate-100"
      >
        Clear All
      </button>
    </UtilityLayout>
  )
}

export default NotificationShowcasePage

