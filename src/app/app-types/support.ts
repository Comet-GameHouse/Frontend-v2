type SupportCategory = 'account' | 'billing' | 'technical' | 'feedback' | 'abuse'

type SupportTicket = {
  id: string
  title: string
  message: string
  category: SupportCategory
  status: 'open' | 'in-progress' | 'resolved' | 'closed'
  createdAt: string
  updatedAt: string
  playerId: string
  attachments: string[]
}

type FeedbackForm = {
  subject: string
  details: string
  sentiment: 'positive' | 'neutral' | 'negative'
  includeContact: boolean
  email?: string
}

type BugReport = {
  title: string
  stepsToReproduce: string[]
  expectedBehavior: string
  actualBehavior: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  platform: 'web' | 'desktop' | 'mobile'
  attachments: string[]
}

type SystemStatus = {
  service: string
  status: 'operational' | 'degraded' | 'outage' | 'maintenance'
  lastUpdated: string
  message?: string
}

export type {
  BugReport,
  FeedbackForm,
  SupportCategory,
  SupportTicket,
  SystemStatus,
}

