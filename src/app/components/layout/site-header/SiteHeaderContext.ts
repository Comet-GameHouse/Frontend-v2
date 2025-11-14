import { createContext } from 'react'
import type { SiteHeaderContextValue } from './types'

const SiteHeaderContext = createContext<SiteHeaderContextValue | undefined>(undefined)

export default SiteHeaderContext
