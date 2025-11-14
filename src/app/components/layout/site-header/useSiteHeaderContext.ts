import { useContext } from 'react'
import SiteHeaderContext from './SiteHeaderContext'
import type { SiteHeaderContextValue } from './types'

function useSiteHeaderContext(): SiteHeaderContextValue {
  const context = useContext(SiteHeaderContext)
  if (!context) {
    throw new Error('useSiteHeaderContext must be used within a SiteHeaderProvider')
  }
  return context
}

export default useSiteHeaderContext
