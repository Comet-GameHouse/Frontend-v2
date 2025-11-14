import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '@components/ui/Button'
import { Card } from '@components/ui/Card'
import type { GameDetail } from '../data'

type OverviewCardProps = {
  detail: GameDetail
  onQueue: () => void
  onBack: () => void
}

function OverviewCard({ detail, onQueue, onBack }: OverviewCardProps) {
  return (
    <Card variant="glass" className="space-y-4" data-aos="fade-up" data-aos-duration="300" data-aos-delay="100">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 text-xl font-semibold text-white">
          <FontAwesomeIcon icon={detail.icon} className="h-7 w-7 text-cyan-300" />
          <span>{detail.title}</span>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" rightIcon="arrow-right" onClick={onQueue}>
            Join featured queue
          </Button>
          <Button variant="outline" onClick={onBack}>
            Back to library
          </Button>
        </div>
      </div>
      <p className="text-sm text-slate-300">{detail.overview}</p>
    </Card>
  )
}

export default OverviewCard

