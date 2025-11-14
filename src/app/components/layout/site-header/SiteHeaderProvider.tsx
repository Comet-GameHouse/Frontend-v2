import type { ReactNode } from 'react'
import SiteHeaderContext from './SiteHeaderContext'
import type { SiteHeaderContextValue } from './types'

type SiteHeaderProviderProps = {
  value: SiteHeaderContextValue
  children: ReactNode
}

function SiteHeaderProvider({ value, children }: SiteHeaderProviderProps) {
  return <SiteHeaderContext.Provider value={value}>{children}</SiteHeaderContext.Provider>
}

export default SiteHeaderProvider
