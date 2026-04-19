import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getToken } from "@/utils/helpers";
import { store } from "@/store";
import {
  updateField as patchOnboardingField,
  updateFields as patchOnboardingFields,
  setErrors,
  resetOnboarding,
  loadFromSession,
  hydrateOnboarding
} from "@/store/slices/onboardingSlice";
import { ONBOARDING_STEPS } from "./onboardingConfig";
import { getOnboardingStepIndex } from "@/config/onboardingFlow";

const OnboardingContext = createContext(null);

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
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const values = useSelector((s) => s.onboarding.values);
  const errors = useSelector((s) => s.onboarding.errors);
  const saving = useSelector((s) => s.onboarding.saving);
  const loading = useSelector((s) => s.onboarding.loading);

  useEffect(() => {
    const isOnboardingRoute = pathname.startsWith("/onboarding");
    if (!isOnboardingRoute) return;
    if (getToken()) {
      dispatch(hydrateOnboarding());
    } else {
      dispatch(loadFromSession());
    }
  }, [dispatch, pathname]);

  const updateField = useCallback(
    (field, value) => {
      dispatch(patchOnboardingField({ field, value }));
    },
    [dispatch]
  );

  const updateFields = useCallback(
    (updates) => {
      dispatch(patchOnboardingFields(updates));
    },
    [dispatch]
  );

  const validateByPath = async (pathname) => {
    const step = getStepByPath(pathname);
    if (!step?.schema) return true;
    try {
      const v = store.getState().onboarding.values;
      await step.schema.validate(v, { abortEarly: false });
      dispatch(setErrors({}));
      return true;
    } catch (err) {
      const nextErrors = {};
      err.inner?.forEach((issue) => {
        if (issue.path) nextErrors[issue.path] = issue.message;
      });
      dispatch(setErrors(nextErrors));
      return false;
    }
  };

  const validateByStepKey = async (stepKey) => {
    const step = getStepByKey(stepKey);
    if (!step?.schema) return true;
    try {
      const v = store.getState().onboarding.values;
      await step.schema.validate(v, { abortEarly: false });
      dispatch(setErrors({}));
      return true;
    } catch (err) {
      const nextErrors = {};
      err.inner?.forEach((issue) => {
        if (issue.path) nextErrors[issue.path] = issue.message;
      });
      dispatch(setErrors(nextErrors));
      return false;
    }
  };

  const reset = useCallback(() => {
    dispatch(resetOnboarding());
  }, [dispatch]);

  const contextValue = useMemo(
    () => ({
      values,
      errors,
      saving,
      loading,
      updateField,
      updateFields,
      validateByPath,
      validateByStepKey,
      resetOnboarding: reset
    }),
    [values, errors, saving, loading, updateField, updateFields, validateByPath, validateByStepKey, reset]
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
