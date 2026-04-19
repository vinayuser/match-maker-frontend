/**
 * Seven equal segments: first `currentStep` segments use solid gold (Step 1 pattern).
 * Styling uses CSS classes so color is reliable even if Tailwind tokens fail to apply.
 */
export default function OnboardingSevenStepProgress({ currentStep, stepTitle }) {
  const n = Math.min(7, Math.max(1, Number(currentStep) || 1));

  return (
    <div className="onboarding-seven-step flex w-full flex-col gap-6">
      <div className="flex items-center justify-between px-2">
        <span className="font-headline text-xs font-bold uppercase tracking-[0.2em] text-[#ffd58a]">{stepTitle}</span>
        <span className="font-label text-xs text-on-surface-variant">
          Step {n} of 7
        </span>
      </div>
      <div
        className="onboarding-seven-step-bars flex h-1.5 w-full gap-2"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={7}
        aria-valuenow={n}
        aria-label={`Onboarding step ${n} of 7`}
      >
        {Array.from({ length: 7 }, (_, i) => (
          <div
            key={i}
            className={`onboarding-seven-bar flex-1 rounded-full ${i < n ? "onboarding-seven-bar--filled" : "onboarding-seven-bar--track"}`}
          />
        ))}
      </div>
    </div>
  );
}
