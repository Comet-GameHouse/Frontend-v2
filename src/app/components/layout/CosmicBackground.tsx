import type { HTMLAttributes } from 'react'
import cn from '@lib/cn'

type CosmicBackgroundProps = HTMLAttributes<HTMLDivElement>

const SHOOTING_STARS: Array<{
  top: string
  left: string
  delay: string
  duration: string
  width: string
  timing?: string
}> = [
  { top: '12%', left: '82%', delay: '0s', duration: '9s', width: '180px' },
  { top: '28%', left: '78%', delay: '2.6s', duration: '10s', width: '160px', timing: 'ease-in-out' },
  { top: '44%', left: '88%', delay: '4.2s', duration: '11s', width: '200px' },
  { top: '58%', left: '76%', delay: '6.4s', duration: '9.5s', width: '170px', timing: 'ease-in' },
  { top: '68%', left: '92%', delay: '1.4s', duration: '12s', width: '210px', timing: 'ease-out' },
  { top: '36%', left: '70%', delay: '8.1s', duration: '10.8s', width: '150px', timing: 'ease-in-out' },
  { top: '22%', left: '64%', delay: '11.6s', duration: '13s', width: '190px' },
  { top: '52%', left: '86%', delay: '13.8s', duration: '12.6s', width: '175px', timing: 'cubic-bezier(0.55, 0.02, 0.46, 0.99)' },
]

function CosmicBackground({ className, ...props }: CosmicBackgroundProps) {
  return (
    <div
      aria-hidden
      {...props}
      className={cn(
        'pointer-events-none fixed inset-0 z-0 overflow-hidden bg-slate-950',
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.14),transparent_55%),radial-gradient(circle_at_80%_25%,rgba(91,33,182,0.18),transparent_55%),radial-gradient(circle_at_50%_80%,rgba(244,114,182,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.92)_0%,rgba(2,6,23,0.96)_45%,rgba(2,6,23,1)_100%)]" />
      <div className="absolute inset-0 bg-comet-haze" />
      <div className="absolute inset-0 bg-comet-twinkle" />
      <div className="absolute inset-0 bg-comet-sparkle" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.12),transparent_60%)] opacity-70 mix-blend-screen animate-comet-pulse" />
      <div className="absolute left-1/2 top-1/2 h-[140vh] w-[140vw] -translate-x-1/2 -translate-y-1/2 rounded-[45%] bg-[conic-gradient(from_120deg,rgba(14,165,233,0.14),rgba(99,102,241,0.14),rgba(190,24,93,0.18),rgba(14,165,233,0.14))] opacity-65 blur-3xl animate-comet-orbit" />
      <div className="absolute inset-0 bg-comet-stars opacity-80" />
      <div className="absolute inset-0 bg-comet-axis" />
      <div className="absolute -left-[15%] top-[12%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(240,171,252,0.32),transparent_65%)] blur-3xl animate-comet-drift" />
      <div className="absolute right-[-18%] bottom-[-12%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.28),transparent_62%)] blur-[140px] animate-comet-drift [animation-delay:6s]" />
      <div className="absolute inset-0 overflow-hidden [mask-image:radial-gradient(circle_at_center,rgba(0,0,0,0.9),transparent_88%)]">
        {SHOOTING_STARS.map(({ top, left, delay, duration, width, timing }, index) => (
          <span
            key={`shooting-star-${index}`}
            className="comet-shooting-star"
            style={{
              top,
              left,
              width,
              animationDelay: delay,
              animationDuration: duration,
              animationTimingFunction: timing,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[45vh] bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
    </div>
  )
}

export default CosmicBackground
