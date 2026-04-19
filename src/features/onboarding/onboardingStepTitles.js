/** Short labels shown next to the 7-segment progress (match Step 1 pattern). */
export const ONBOARDING_STEP_TITLE_BY_KEY = {
  basicInfo: "Basic Info",
  religiousLifestyle: "Religious & Lifestyle",
  personality: "About & Personality",
  familyBackground: "Family & Background",
  status: "Status & Children",
  matchPreferences: "Match Preferences",
  photosReview: "Photos & Review"
};

export function getOnboardingStepTitle(stepKey) {
  return ONBOARDING_STEP_TITLE_BY_KEY[stepKey] ?? "Onboarding";
}
