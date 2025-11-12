type RouteVisibility = 'public' | 'authenticated' | 'admin'

type RouteDefinition = {
  path: string
  name: string
  icon?: string
  visibility: RouteVisibility
  children?: RouteDefinition[]
}

export type { RouteDefinition, RouteVisibility }

