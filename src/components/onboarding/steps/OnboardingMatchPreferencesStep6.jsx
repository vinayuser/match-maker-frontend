import { useMemo, useState } from "react";
import OnboardingContinueButton from "@/components/onboarding/OnboardingContinueButton";
import OnboardingKesherHeader from "@/components/onboarding/OnboardingKesherHeader";
import OnboardingSevenStepProgress from "@/components/onboarding/OnboardingSevenStepProgress";
import OnboardingValidationToasts from "@/components/onboarding/OnboardingValidationToasts";
import { getOnboardingStepTitle } from "@/features/onboarding/onboardingStepTitles";
import { useOnboarding } from "@/features/onboarding/OnboardingContext";
import { useOnboardingStepNav } from "@/features/onboarding/useOnboardingStepNav";
import { usePageMeta } from "@/hooks/usePageMeta";

const RELIGIOUS_CARDS = [
  {
    value: "Modern Orthodox",
    icon: "temple_hindu",
    subtitle: "Balanced lifestyle",
    filled: true
  },
  { value: "Traditional", icon: "auto_awesome", subtitle: "Observant roots", filled: false },
  { value: "Conservative", icon: "church", subtitle: "Values & Tradition", filled: false },
  { value: "Spiritual", icon: "spa", subtitle: "Connection first", filled: false },
  { value: "Reform", icon: "balance", subtitle: "Modern values", filled: false },
  { value: "Any", icon: "all_inclusive", subtitle: "Open to journey", filled: false }
];

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function DealBreakerToggleVisual({ on, variant = "gold" }) {
  return (
    <span
      className={`onboarding-deal-toggle ${on ? "onboarding-deal-toggle--on" : ""} ${variant === "smoker" ? "onboarding-deal-toggle--smoker" : ""}`}
      aria-hidden={true}
    >
      <span className="onboarding-deal-toggle__thumb" />
    </span>
  );
}

export default function OnboardingMatchPreferencesStep6() {
  const { values, errors, updateField } = useOnboarding();
  const { goNext, goSkip, goBack, stepNumber } = useOnboardingStepNav("matchPreferences");
  const [submitAttempt, setSubmitAttempt] = useState(0);

  usePageMeta({
    title: "Kesher | Match Preferences",
    bodyClass: "text-on-surface font-body flex min-h-screen flex-col",
    styleId: "page-style-onboarding-match-preferences-step-6",
    styles: "body { background-color: #0e0e0e !important; }"
  });

  const minAge = typeof values.preferredAgeMin === "number" ? values.preferredAgeMin : 24;
  const maxAge = typeof values.preferredAgeMax === "number" ? values.preferredAgeMax : 36;

  const progressStyle = useMemo(() => {
    const minP = ((minAge - 18) / (99 - 18)) * 100;
    const maxP = ((maxAge - 18) / (99 - 18)) * 100;
    const left = Math.min(minP, maxP);
    const right = 100 - Math.max(minP, maxP);
    return { left: `${left}%`, right: `${right}%` };
  }, [minAge, maxAge]);

  const minThumbLeft = `${((minAge - 18) / (99 - 18)) * 100}%`;
  const maxThumbLeft = `${((maxAge - 18) / (99 - 18)) * 100}%`;

  const setMinAge = (next) => {
    const n = clamp(next, 18, 99);
    const hi = typeof values.preferredAgeMax === "number" ? values.preferredAgeMax : 99;
    updateField("preferredAgeMin", Math.min(n, hi));
  };

  const setMaxAge = (next) => {
    const n = clamp(next, 18, 99);
    const lo = typeof values.preferredAgeMin === "number" ? values.preferredAgeMin : 18;
    updateField("preferredAgeMax", Math.max(n, lo));
  };

  const toggleBool = (key) => updateField(key, !values[key]);
  const handleContinue = async () => {
    setSubmitAttempt((prev) => prev + 1);
    await goNext();
  };

  return (
    <div className="onboarding-flow onboarding-flow-page min-h-screen font-body text-on-surface">
      <OnboardingKesherHeader />
      <main className="flex flex-grow items-center justify-center px-4 py-12 pb-24">
        <div className="flex w-full max-w-[700px] flex-col gap-12">
          <OnboardingSevenStepProgress currentStep={stepNumber} stepTitle={getOnboardingStepTitle("matchPreferences")} />

          <div className="obi-card relative overflow-hidden p-8 shadow-2xl md:p-12">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary-container/5 blur-3xl" />
            <div className="relative z-10 flex flex-col gap-10">
              <header className="text-left">
                <h1 className="mb-4 font-headline text-4xl font-extrabold tracking-tighter text-on-surface md:text-5xl">Match Preferences</h1>
                <p className="max-w-md text-on-surface-variant">
                  Refine your circle. The Sanctuary curates connections based on your spiritual alignment and lifestyle boundaries.
                </p>
              </header>

              <div className="space-y-12">
          <section className="space-y-6">
            <div className="flex justify-between items-end">
              <h2 className="text-xs font-headline font-bold uppercase tracking-[0.2em] text-primary">Age Range</h2>
              <span className="text-2xl font-headline font-bold text-on-surface">
                {minAge} — {maxAge}
              </span>
            </div>
            <div className="pt-4 pb-2">
              <div className="dual-slider-track">
                <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-[2px] bg-[#2a2a2a]" />
                <div className="dual-slider-progress z-[1]" style={progressStyle} />
                <div className="slider-thumb z-[3] pointer-events-none" style={{ left: minThumbLeft }} />
                <div className="slider-thumb z-[3] pointer-events-none" style={{ left: maxThumbLeft }} />
                <input
                  aria-label="Minimum age"
                  className="absolute inset-0 z-[4] w-full opacity-0 cursor-pointer"
                  type="range"
                  min={18}
                  max={99}
                  value={minAge}
                  onChange={(e) => setMinAge(Number(e.target.value))}
                />
                <input
                  aria-label="Maximum age"
                  className="absolute inset-0 z-[5] w-full opacity-0 cursor-pointer"
                  type="range"
                  min={18}
                  max={99}
                  value={maxAge}
                  onChange={(e) => setMaxAge(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="flex justify-between text-[10px] uppercase tracking-widest text-on-surface-variant/40 font-bold">
              <span>18</span>
              <span>99</span>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xs font-headline font-bold uppercase tracking-[0.2em] text-primary">Religious Level</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {RELIGIOUS_CARDS.map((card) => {
                const selected = values.matchReligiousPreference === card.value;
                return (
                  <button
                    key={card.value}
                    type="button"
                    onClick={() => updateField("matchReligiousPreference", card.value)}
                    className={
                      selected
                        ? "flex flex-col items-start p-5 rounded-xl bg-surface-container-high border-2 border-primary transition-all text-left"
                        : "flex flex-col items-start p-5 rounded-xl bg-surface-container-low border-2 border-transparent hover:border-outline-variant transition-all text-left"
                    }
                  >
                    <span
                      className={`material-symbols-outlined ${selected ? "text-primary mb-3" : "text-on-surface-variant mb-3"}`}
                      style={card.filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      {card.icon}
                    </span>
                    <span className="text-sm font-bold text-on-surface mb-1">{card.value}</span>
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-tighter">{card.subtitle}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="space-y-6 pt-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-headline font-bold uppercase tracking-[0.2em] text-error">Deal Breakers</h2>
              <div className="h-[1px] flex-grow bg-error/10" />
            </div>
            <div className="space-y-3">
              <button
                type="button"
                aria-pressed={Boolean(values.dealBreakerSmoker)}
                onClick={() => toggleBool("dealBreakerSmoker")}
                className="flex w-full items-center justify-between rounded-xl border border-outline-variant/15 bg-surface-container-lowest p-4 text-left"
              >
                <div className="flex flex-col pr-3">
                  <span className="text-sm font-semibold text-on-surface">Smoker</span>
                  <span className="text-xs text-on-surface-variant">Will never show matches who smoke</span>
                </div>
                <DealBreakerToggleVisual on={Boolean(values.dealBreakerSmoker)} variant="smoker" />
              </button>

              <button
                type="button"
                aria-pressed={Boolean(values.dealBreakerDifferentReligiousLevel)}
                onClick={() => toggleBool("dealBreakerDifferentReligiousLevel")}
                className="flex w-full items-center justify-between rounded-xl border border-outline-variant/15 bg-surface-container-lowest p-4 text-left"
              >
                <div className="flex flex-col pr-3">
                  <span className="text-sm font-semibold text-on-surface">Different Religious Level</span>
                  <span className="text-xs text-on-surface-variant">Only show my selected level</span>
                </div>
                <DealBreakerToggleVisual on={Boolean(values.dealBreakerDifferentReligiousLevel)} />
              </button>

              <button
                type="button"
                aria-pressed={Boolean(values.dealBreakerHasChildren)}
                onClick={() => toggleBool("dealBreakerHasChildren")}
                className="flex w-full items-center justify-between rounded-xl border border-outline-variant/15 bg-surface-container-lowest p-4 text-left"
              >
                <div className="flex flex-col pr-3">
                  <span className="text-sm font-semibold text-on-surface">Has Children</span>
                  <span className="text-xs text-on-surface-variant">Exclude parents from matches</span>
                </div>
                <DealBreakerToggleVisual on={Boolean(values.dealBreakerHasChildren)} />
              </button>
            </div>
          </section>
              </div>

              <div className="onboarding-actions onboarding-actions--bordered">
                <button type="button" onClick={goBack} className="onboarding-back-btn">
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                  Back
                </button>
                <OnboardingContinueButton onClick={handleContinue} />
              </div>
              <div className="onboarding-actions-meta">
                <button type="button" onClick={goSkip} className="onboarding-back-btn">
                  Skip for now
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <OnboardingValidationToasts
        errors={errors}
        submitAttempt={submitAttempt}
        fieldLabels={{
          preferredAgeMin: "Minimum age",
          preferredAgeMax: "Maximum age",
          matchReligiousPreference: "Religious level preference"
        }}
      />

      <div className="pointer-events-none fixed top-[20%] -right-20 h-64 w-64 rounded-full bg-primary/5 blur-[120px]" />
      <div className="pointer-events-none fixed bottom-[10%] -left-20 h-80 w-80 rounded-full bg-error/5 blur-[150px]" />
    </div>
  );
}
