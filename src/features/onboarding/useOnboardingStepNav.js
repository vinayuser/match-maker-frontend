import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ROUTE_PATHS } from "@/routes/paths";
import { ONBOARDING_STEPS } from "./onboardingConfig";
import { useOnboarding } from "./OnboardingContext";
import { saveOnboardingStep, submitOnboarding } from "@/store/slices/onboardingSlice";

export function useOnboardingStepNav(stepKey) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { validateByStepKey } = useOnboarding();

  const stepIndex = ONBOARDING_STEPS.findIndex((step) => step.key === stepKey);
  const totalSteps = ONBOARDING_STEPS.length;

  const previousRoute = stepIndex <= 0 ? ROUTE_PATHS.LOGIN : ONBOARDING_STEPS[stepIndex - 1].route;
  const nextRoute =
    stepIndex < 0 || stepIndex >= totalSteps - 1 ? ROUTE_PATHS.VERIFICATION_PENDING : ONBOARDING_STEPS[stepIndex + 1].route;

  const goNext = async () => {
    const ok = await validateByStepKey(stepKey);
    if (!ok) return false;
    try {
      if (stepKey === "photosReview") {
        await dispatch(submitOnboarding()).unwrap();
      } else {
        await dispatch(saveOnboardingStep({ stepKey })).unwrap();
      }
      navigate(nextRoute);
      return true;
    } catch {
      return false;
    }
  };

  const goSkip = () => {
    navigate(nextRoute);
  };

  const goBack = () => {
    navigate(previousRoute);
  };

  const stepNumber = stepIndex >= 0 ? stepIndex + 1 : 0;

  return { stepIndex, stepNumber, totalSteps, goNext, goSkip, goBack };
}
