import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from '@components'
import { RootLayout, AuthLayout, SupportLayout, LegalLayout, DashboardLayout, ProgressionLayout } from '@layouts'
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
import { NotFoundPage, NotificationShowcasePage, UIKitShowcasePage } from '@pages/utility'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutUsPage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="games" element={<GamesPage />} />
          <Route path="games/:id" element={<GameDetailPage />} />
          <Route path="tournaments" element={<TournamentsPage />} />
          <Route path="friends" element={<FriendsPage />} />
          <Route path="arena" element={<GlobalArenaPage />} />

          <Route path="support" element={<SupportLayout />}>
            <Route index element={<SupportPage />} />
            <Route path="help" element={<HelpPage />} />
            <Route path="status" element={<StatusPage />} />
            <Route path="feedback" element={<FeedbackPage />} />
            <Route path="report-bug" element={<BugReportPage />} />
            <Route path="*" element={<Navigate to="/support" replace />} />
          </Route>

          <Route path="legal" element={<LegalLayout />}>
            <Route index element={<PrivacyPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="*" element={<Navigate to="/legal/privacy" replace />} />
          </Route>
          <Route path="privacy" element={<Navigate to="/legal/privacy" replace />} />
          <Route path="terms" element={<Navigate to="/legal/terms" replace />} />

          <Route path="dev/notifications" element={<NotificationShowcasePage />} />
          <Route path="dev/uikit" element={<UIKitShowcasePage />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="progress" element={<ProgressionLayout />}>
              <Route path="achievements" element={<AchievementsPage />} />
              <Route path="leaderboard" element={<LeaderboardPage />} />
              <Route path="shop" element={<ShopPage />} />
              <Route path="*" element={<Navigate to="/progress/achievements" replace />} />
            </Route>
            <Route path="rooms/:roomId" element={<RoomDetailPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="auth" element={<AuthLayout />}>
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter

