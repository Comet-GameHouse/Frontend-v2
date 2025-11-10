import ProgressionLayout from '@layouts/ProgressionLayout'

function ShopPage() {
  return (
    <ProgressionLayout
      title="Galaxy Shop"
      description="Spend earned shards or unlock premium cosmetics tailored to your Comet GameHouse profile."
    >
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <p className="text-slate-300">
          Featured bundles and seasonal offers will rotate through this space.
        </p>
      </div>
    </ProgressionLayout>
  )
}

export default ShopPage

