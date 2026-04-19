import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
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

const AGE_MIN = 18;
const AGE_MAX = 99;

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function parseAge(v, fallback) {
  if (typeof v === "number" && Number.isFinite(v)) return clamp(v, AGE_MIN, AGE_MAX);
  if (v === "" || v == null) return fallback;
  const n = parseInt(String(v), 10);
  return Number.isFinite(n) ? clamp(n, AGE_MIN, AGE_MAX) : fallback;
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
  const trackRef = useRef(null);
  const agesRef = useRef({ min: 24, max: 36 });
  const [dragging, setDragging] = useState(null);

  usePageMeta({
    title: "Kesher | Match Preferences",
    bodyClass: "text-on-surface font-body flex min-h-screen flex-col",
    styleId: "page-style-onboarding-match-preferences-step-6",
    styles: "body { background-color: #0e0e0e !important; }"
  });

  const minAge = parseAge(values.preferredAgeMin, 24);
  const maxAge = parseAge(values.preferredAgeMax, 36);

  useLayoutEffect(() => {
    if (!dragging) {
      agesRef.current = { min: minAge, max: maxAge };
    }
  }, [minAge, maxAge, dragging]);

  const progressStyle = useMemo(() => {
    const minP = ((minAge - AGE_MIN) / (AGE_MAX - AGE_MIN)) * 100;
    const maxP = ((maxAge - AGE_MIN) / (AGE_MAX - AGE_MIN)) * 100;
    const left = Math.min(minP, maxP);
    const right = 100 - Math.max(minP, maxP);
    return { left: `${left}%`, right: `${right}%` };
  }, [minAge, maxAge]);

  const minThumbLeft = `${((minAge - AGE_MIN) / (AGE_MAX - AGE_MIN)) * 100}%`;
  const maxThumbLeft = `${((maxAge - AGE_MIN) / (AGE_MAX - AGE_MIN)) * 100}%`;

  const ageFromClientX = useCallback((clientX) => {
    const el = trackRef.current;
    if (!el) return AGE_MIN;
    const rect = el.getBoundingClientRect();
    const w = rect.width || 1;
    const t = clamp((clientX - rect.left) / w, 0, 1);
    return Math.round(AGE_MIN + t * (AGE_MAX - AGE_MIN));
  }, []);

  const applyAgeAt = useCallback(
    (clientX, which) => {
      const n = ageFromClientX(clientX);
      const { min, max } = agesRef.current;
      if (which === "min") {
        const next = Math.min(n, max);
        agesRef.current = { min: next, max };
        updateField("preferredAgeMin", next);
      } else {
        const next = Math.max(n, min);
        agesRef.current = { min, max: next };
        updateField("preferredAgeMax", next);
      }
    },
    [ageFromClientX, updateField]
  );

  const onTrackPointerDown = useCallback(
    (e) => {
      if (e.button !== 0) return;
      if (e.target.closest?.("[data-age-thumb]")) return;
      const track = trackRef.current;
      if (!track || !track.contains(e.target)) return;
      const age = ageFromClientX(e.clientX);
      const { min, max } = agesRef.current;
      const distMin = Math.abs(age - min);
      const distMax = Math.abs(age - max);
      if (distMin <= distMax) {
        applyAgeAt(e.clientX, "min");
      } else {
        applyAgeAt(e.clientX, "max");
      }
    },
    [ageFromClientX, applyAgeAt]
  );

  const onMinThumbPointerDown = useCallback((e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    setDragging("min");
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const onMaxThumbPointerDown = useCallback((e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    setDragging("max");
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const onMinThumbPointerMove = useCallback(
    (e) => {
      if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
      applyAgeAt(e.clientX, "min");
    },
    [applyAgeAt]
  );

  const onMaxThumbPointerMove = useCallback(
    (e) => {
      if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
      applyAgeAt(e.clientX, "max");
    },
    [applyAgeAt]
  );

  const onThumbPointerUp = useCallback((e) => {
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setDragging(null);
  }, []);

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
              <div
                ref={trackRef}
                className="dual-slider-track relative min-h-[44px] cursor-pointer py-2"
                onPointerDown={onTrackPointerDown}
              >
                <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-[2px] bg-[#2a2a2a]" />
                <div className="dual-slider-progress pointer-events-none z-[1]" style={progressStyle} />
                <button
                  type="button"
                  data-age-thumb="min"
                  className={`slider-thumb slider-thumb--interactive z-[3] ${dragging === "min" ? "z-[6]" : ""}`}
                  style={{ left: minThumbLeft }}
                  aria-label="Minimum age in range"
                  role="slider"
                  aria-valuemin={AGE_MIN}
                  aria-valuemax={maxAge}
                  aria-valuenow={minAge}
                  aria-orientation="horizontal"
                  onPointerDown={onMinThumbPointerDown}
                  onPointerMove={onMinThumbPointerMove}
                  onPointerUp={onThumbPointerUp}
                  onPointerCancel={onThumbPointerUp}
                  onLostPointerCapture={onThumbPointerUp}
                />
                <button
                  type="button"
                  data-age-thumb="max"
                  className={`slider-thumb slider-thumb--interactive z-[3] ${dragging === "max" ? "z-[6]" : ""}`}
                  style={{ left: maxThumbLeft }}
                  aria-label="Maximum age in range"
                  role="slider"
                  aria-valuemin={minAge}
                  aria-valuemax={AGE_MAX}
                  aria-valuenow={maxAge}
                  aria-orientation="horizontal"
                  onPointerDown={onMaxThumbPointerDown}
                  onPointerMove={onMaxThumbPointerMove}
                  onPointerUp={onThumbPointerUp}
                  onPointerCancel={onThumbPointerUp}
                  onLostPointerCapture={onThumbPointerUp}
                />
              </div>
            </div>
            <div className="flex justify-between text-[10px] uppercase tracking-widest text-on-surface-variant/40 font-bold">
              <span>{AGE_MIN}</span>
              <span>{AGE_MAX}</span>
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
