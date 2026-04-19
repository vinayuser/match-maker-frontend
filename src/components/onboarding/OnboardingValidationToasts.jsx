import { useEffect, useMemo, useState } from "react";

export default function OnboardingValidationToasts({ errors, submitAttempt = 0, fieldLabels = {} }) {
  const [toastErrors, setToastErrors] = useState([]);

  const currentErrors = useMemo(() => {
    return Object.entries(errors || {})
      .filter(([, message]) => typeof message === "string" && message.trim().length > 0)
      .map(([field, message]) => ({
        field,
        label: fieldLabels[field] || "Validation error",
        message
      }));
  }, [errors, fieldLabels]);

  useEffect(() => {
    if (!submitAttempt) return;
    if (currentErrors.length === 0) {
      setToastErrors([]);
      return;
    }
    setToastErrors(currentErrors);
    const timer = setTimeout(() => {
      setToastErrors([]);
    }, 5000);
    return () => clearTimeout(timer);
  }, [submitAttempt, currentErrors]);

  if (toastErrors.length === 0) return null;

  return (
    <div className="onboarding-toast-stack" aria-live="polite">
      {toastErrors.map((err) => (
        <div key={err.field} className="onboarding-toast">
          <div className="onboarding-toast__title">{err.label}</div>
          <div className="onboarding-toast__message">{err.message}</div>
        </div>
      ))}
    </div>
  );
}
