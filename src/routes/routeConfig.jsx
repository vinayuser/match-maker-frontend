import { Navigate } from "react-router-dom";
import { ROUTE_PATHS } from "./paths";
import {
  AboutUsPage,
  AccountSettingsPage,
  DashboardActiveMatchLockedPage,
  DashboardDiscoveryPage,
  DashboardEmptyStatePage,
  FavoritesPage,
  FaqPage,
  HelpSupportDashboardPage,
  HelpSupportPage,
  LandingPage,
  LikesReceivedPage,
  LoginPage,
  MatchmakerChatPage,
  MatchmakingPendingInvitationsPage,
  MatchReceivedModalPage,
  MyProfilePage,
  NotificationsPage,
  OnboardingAboutPersonalityStep3Page,
  OnboardingBasicInfoPage,
  OnboardingFamilyBackgroundStep4Page,
  OnboardingMatchPreferencesStep6Page,
  OnboardingPhotosReviewPage,
  OnboardingReligiousLifestyleStep2Page,
  OnboardingStatusCohenMalePage,
  OnboardingStatusFemaleStep5Page,
  PreferencesFiltersPage,
  PrivacyPolicyPage,
  PrivacySafetyPage,
  RecentlyViewedPage,
  SentRequestsPage,
  SignUpPage,
  TermsPage,
  VerificationPendingPage
} from "@/pages";

export const publicRoutes = [
  { name: "Landing", path: ROUTE_PATHS.LANDING, element: <LandingPage /> },
  { name: "About Us", path: ROUTE_PATHS.ABOUT_US, element: <AboutUsPage /> },
  { name: "Login", path: ROUTE_PATHS.LOGIN, element: <LoginPage /> },
  {
    name: "Register",
    path: ROUTE_PATHS.REGISTER,
    element: <Navigate to={ROUTE_PATHS.SIGN_UP} replace />
  },
  { name: "Sign Up", path: ROUTE_PATHS.SIGN_UP, element: <SignUpPage /> },
  { name: "FAQ", path: ROUTE_PATHS.FAQ, element: <FaqPage /> },
  { name: "Terms", path: ROUTE_PATHS.TERMS, element: <TermsPage /> },
  { name: "Privacy", path: ROUTE_PATHS.PRIVACY, element: <PrivacyPolicyPage /> },
  { name: "Help Support", path: ROUTE_PATHS.HELP_SUPPORT, element: <HelpSupportPage /> },
  { name: "Onboarding Basic Info", path: ROUTE_PATHS.ONBOARDING_BASIC_INFO, element: <OnboardingBasicInfoPage /> },
  {
    name: "Onboarding Religious Lifestyle",
    path: ROUTE_PATHS.ONBOARDING_RELIGIOUS_LIFESTYLE,
    element: <Navigate to={ROUTE_PATHS.ONBOARDING_RELIGIOUS_LIFESTYLE_STEP_2} replace />
  },
  {
    name: "Onboarding Religious Lifestyle Step 2",
    path: ROUTE_PATHS.ONBOARDING_RELIGIOUS_LIFESTYLE_STEP_2,
    element: <OnboardingReligiousLifestyleStep2Page />
  },
  {
    name: "Onboarding Personality Step 3",
    path: ROUTE_PATHS.ONBOARDING_PERSONALITY_STEP_3,
    element: <OnboardingAboutPersonalityStep3Page />
  },
  {
    name: "Onboarding Family Step 4",
    path: ROUTE_PATHS.ONBOARDING_FAMILY_STEP_4,
    element: <OnboardingFamilyBackgroundStep4Page />
  },
  {
    name: "Onboarding Female Status Step 5",
    path: ROUTE_PATHS.ONBOARDING_STATUS_FEMALE_STEP_5,
    element: <OnboardingStatusFemaleStep5Page />
  },
  {
    name: "Onboarding Match Preferences Step 6",
    path: ROUTE_PATHS.ONBOARDING_MATCH_PREFERENCES_STEP_6,
    element: <OnboardingMatchPreferencesStep6Page />
  },
  { name: "Onboarding Photos Review", path: ROUTE_PATHS.ONBOARDING_PHOTOS_REVIEW, element: <OnboardingPhotosReviewPage /> },
  {
    name: "Onboarding Cohen Male Status",
    path: ROUTE_PATHS.ONBOARDING_STATUS_COHEN_MALE,
    element: <OnboardingStatusCohenMalePage />
  },
  { name: "Verification Pending", path: ROUTE_PATHS.VERIFICATION_PENDING, element: <VerificationPendingPage /> }
];

export const protectedRoutes = [
  { name: "Dashboard Discovery", path: ROUTE_PATHS.DASHBOARD_DISCOVERY, element: <DashboardDiscoveryPage /> },
  { name: "Dashboard Empty State", path: ROUTE_PATHS.DASHBOARD_EMPTY_STATE, element: <DashboardEmptyStatePage /> },
  {
    name: "Dashboard Active Match Locked",
    path: ROUTE_PATHS.DASHBOARD_ACTIVE_MATCH_LOCKED,
    element: <DashboardActiveMatchLockedPage />
  },
  {
    name: "Pending Invitations",
    path: ROUTE_PATHS.MATCHMAKING_PENDING_INVITATIONS,
    element: <MatchmakingPendingInvitationsPage />
  },
  { name: "Likes Received", path: ROUTE_PATHS.DASHBOARD_LIKES_RECEIVED, element: <LikesReceivedPage /> },
  { name: "Sent Requests", path: ROUTE_PATHS.DASHBOARD_SENT_REQUESTS, element: <SentRequestsPage /> },
  { name: "Favorites", path: ROUTE_PATHS.DASHBOARD_FAVORITES, element: <FavoritesPage /> },
  { name: "Recently Viewed", path: ROUTE_PATHS.DASHBOARD_RECENTLY_VIEWED, element: <RecentlyViewedPage /> },
  { name: "Notifications", path: ROUTE_PATHS.DASHBOARD_NOTIFICATIONS, element: <NotificationsPage /> },
  { name: "Preferences Filters", path: ROUTE_PATHS.DASHBOARD_PREFERENCES_FILTERS, element: <PreferencesFiltersPage /> },
  { name: "Help Support (Dashboard)", path: ROUTE_PATHS.DASHBOARD_HELP_SUPPORT, element: <HelpSupportDashboardPage /> },
  { name: "Privacy Safety", path: ROUTE_PATHS.DASHBOARD_PRIVACY_SAFETY, element: <PrivacySafetyPage /> },
  { name: "Match Received Modal", path: ROUTE_PATHS.MATCH_RECEIVED_MODAL, element: <MatchReceivedModalPage /> },
  { name: "Matchmaker Chat", path: ROUTE_PATHS.MATCHMAKER_CHAT, element: <MatchmakerChatPage /> },
  { name: "My Profile", path: ROUTE_PATHS.MY_PROFILE, element: <MyProfilePage /> },
  { name: "Account Settings", path: ROUTE_PATHS.ACCOUNT_SETTINGS, element: <AccountSettingsPage /> }
];
