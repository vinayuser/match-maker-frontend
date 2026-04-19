import { createContext, useContext, useMemo, useState } from "react";
import { ONBOARDING_DEFAULT_VALUES, ONBOARDING_STEPS } from "./onboardingConfig";
import { getOnboardingStepIndex } from "@/config/onboardingFlow";

const OnboardingContext = createContext(null);

function loadMergedOnboardingValues() {
  const stored = sessionStorage.getItem("onboardingData");
  if (!stored) return ONBOARDING_DEFAULT_VALUES;
  try {
    const parsed = JSON.parse(stored);
    return { ...ONBOARDING_DEFAULT_VALUES, ...parsed };
  } catch {
    return ONBOARDING_DEFAULT_VALUES;
  }
}

function getStepByPath(pathname) {
  const directMatch = ONBOARDING_STEPS.find((step) => step.route === pathname);
  if (directMatch) return directMatch;
  const stepIndex = getOnboardingStepIndex(pathname);
  return stepIndex >= 0 ? ONBOARDING_STEPS[stepIndex] : null;
}

function getStepByKey(stepKey) {
  return ONBOARDING_STEPS.find((step) => step.key === stepKey) ?? null;
}

export function OnboardingProvider({ children }) {
  const [values, setValues] = useState(loadMergedOnboardingValues);
  const [errors, setErrors] = useState({});

  const persist = (nextValues) => {
    setValues(nextValues);
    sessionStorage.setItem("onboardingData", JSON.stringify(nextValues));
  };

  const updateField = (field, value) => {
    const nextValues = { ...values, [field]: value };
    persist(nextValues);
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const updateFields = (updates) => {
    const nextValues = { ...values, ...updates };
    persist(nextValues);
    const touchedKeys = Object.keys(updates);
    if (touchedKeys.length > 0) {
      setErrors((prev) => {
        const next = { ...prev };
        touchedKeys.forEach((key) => {
          if (next[key]) next[key] = "";
        });
        return next;
      });
    }
  };

  const validateByPath = async (pathname) => {
    const step = getStepByPath(pathname);
    if (!step?.schema) return true;
    try {
      await step.schema.validate(values, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const nextErrors = {};
      err.inner?.forEach((issue) => {
        if (issue.path) nextErrors[issue.path] = issue.message;
      });
      setErrors(nextErrors);
      return false;
    }
  };

  const validateByStepKey = async (stepKey) => {
    const step = getStepByKey(stepKey);
    if (!step?.schema) return true;
    try {
      await step.schema.validate(values, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const nextErrors = {};
      err.inner?.forEach((issue) => {
        if (issue.path) nextErrors[issue.path] = issue.message;
      });
      setErrors(nextErrors);
      return false;
    }
  };

  const resetOnboarding = () => {
    persist(ONBOARDING_DEFAULT_VALUES);
    setErrors({});
  };

  const contextValue = useMemo(
    () => ({
      values,
      errors,
      updateField,
      updateFields,
      validateByPath,
      validateByStepKey,
      resetOnboarding
    }),
    [values, errors]
  );

  return <OnboardingContext.Provider value={contextValue}>{children}</OnboardingContext.Provider>;
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider.");
  }
  return context;
}
