import { Link } from 'react-router-dom'
import cn from '@lib/cn'
import useSiteHeaderContext from './useSiteHeaderContext'
import { useAOS } from '@hooks'

function SiteHeaderNav() {
  const { navItems, currentPath } = useSiteHeaderContext()
  const getAOSProps = useAOS()

  return (
    <nav className="hidden items-center gap-1 text-sm lg:flex">
      {navItems.map((item, index) => {
        const isActive = currentPath === item.href || currentPath.startsWith(`${item.href}/`)
        const delay = 50 + index * 50
        return (
          <Link
            key={item.href}
            to={item.href}
            {...getAOSProps({ 'data-aos': 'fade-down', 'data-aos-duration': '300', 'data-aos-delay': String(delay) })}
            className={cn(
              'relative rounded-xl px-3 py-2 text-sm font-medium text-slate-300 transition hover:text-slate-50',
              'after:absolute after:left-1/2 after:top-full after:-translate-x-1/2 after:rounded-full after:transition-all after:duration-200 after:content-[""]',
              isActive
                ? 'text-cyan-100 after:mt-1 after:h-1 after:w-5 after:bg-cyan-400'
                : 'after:mt-1 after:h-1 after:w-0 after:bg-cyan-400',
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

export default SiteHeaderNav
