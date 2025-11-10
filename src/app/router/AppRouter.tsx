import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from '@components'
import { SignInPage, SignUpPage } from '@pages/auth'
import {
  DashboardPage,
  NotificationsPage,
  ProfilePage,
  SettingsPage,
} from '@pages/dashboard'
import { GlobalArenaPage } from '@pages/arena'
import {
  FriendsPage,
  GameDetailPage,
  GamesPage,
  RoomDetailPage,
  TournamentsPage,
} from '@pages/games'
import {
  AboutUsPage,
  CommunityPage,
  ContactPage,
  HomePage,
} from '@pages/marketing'
import { AchievementsPage, LeaderboardPage, ShopPage } from '@pages/progression'
import { PrivacyPage, TermsPage } from '@pages/legal'
import {
  BugReportPage,
  FeedbackPage,
  HelpPage,
  StatusPage,
  SupportPage,
} from '@pages/support'
import { NotFoundPage, NotificationShowcasePage } from '@pages/utility'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/games/:id" element={<GameDetailPage />} />
        <Route path="/tournaments" element={<TournamentsPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/arena" element={<GlobalArenaPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/support/status" element={<StatusPage />} />
        <Route path="/support/feedback" element={<FeedbackPage />} />
        <Route path="/support/report-bug" element={<BugReportPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/dev/notifications" element={<NotificationShowcasePage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/progress/achievements" element={<AchievementsPage />} />
          <Route path="/progress/leaderboard" element={<LeaderboardPage />} />
          <Route path="/progress/shop" element={<ShopPage />} />
          <Route path="/rooms/:roomId" element={<RoomDetailPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter

