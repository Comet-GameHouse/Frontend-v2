import { Outlet } from 'react-router-dom'

function RoomLayout() {
  return (
    <main className="relative min-h-screen">
      <div className="mx-auto w-full max-w-[1680px] px-4 py-6 sm:px-6 lg:px-10">
        <Outlet />
      </div>
    </main>
  )
}

export default RoomLayout

