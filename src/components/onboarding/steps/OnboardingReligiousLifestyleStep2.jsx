import { useState } from "react";
import OnboardingContinueButton from "@/components/onboarding/OnboardingContinueButton";
import OnboardingKesherHeader from "@/components/onboarding/OnboardingKesherHeader";
import OnboardingSevenStepProgress from "@/components/onboarding/OnboardingSevenStepProgress";
import OnboardingValidationToasts from "@/components/onboarding/OnboardingValidationToasts";
import { getOnboardingStepTitle } from "@/features/onboarding/onboardingStepTitles";
import { RELIGIOUS_LEVEL_OPTIONS, SHABBAT_OPTIONS } from "@/features/onboarding/preferenceOptions";
import { useOnboarding } from "@/features/onboarding/OnboardingContext";
import { useOnboardingStepNav } from "@/features/onboarding/useOnboardingStepNav";
import { usePageMeta } from "@/hooks/usePageMeta";

const KASHRUT_OPTIONS = ["Strict (Glatt)", "Standard Kosher", "Kosher at Home", "Not Observed"];

export default function OnboardingReligiousLifestyleStep2() {
  const { values, errors, updateField } = useOnboarding();
  const { goNext, goBack, stepNumber } = useOnboardingStepNav("religiousLifestyle");
  const [submitAttempt, setSubmitAttempt] = useState(0);

  const handleContinue = async () => {
    setSubmitAttempt((prev) => prev + 1);
    await goNext();
  };

  usePageMeta({
    title: "Kesher | Register - Step 2",
    bodyClass: "text-on-surface font-body min-h-screen flex flex-col",
    styleId: "page-style-onboarding-religious-step-2",
    styles: "body { background-color: #0e0e0e !important; }"
  });

  return (
    <div className="onboarding-flow onboarding-flow-page flex min-h-screen flex-col font-body text-on-surface">
      <OnboardingKesherHeader />
      <main className="flex flex-grow items-center justify-center px-4 py-12">
        <div className="flex w-full max-w-[700px] flex-col gap-12">
          <OnboardingSevenStepProgress
            currentStep={stepNumber}
            stepTitle={getOnboardingStepTitle("religiousLifestyle")}
          />

          <div className="obi-card relative overflow-hidden p-8 shadow-2xl md:p-12">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary-container/5 blur-3xl" />
            <div className="relative z-10 flex flex-col gap-10">
              <div className="space-y-2">
                <h1 className="font-headline text-4xl font-extrabold tracking-tighter text-on-surface md:text-5xl">
                  Religious &amp; <br />
                  <span className="text-primary-container italic">Lifestyle</span>
                </h1>
                <p className="max-w-md font-body leading-relaxed text-on-surface-variant opacity-80">
                  Alignment in spirit and practice is the foundation of a lasting union. Share your path with us.
                </p>
              </div>

              <div className="space-y-10">
                <section className="space-y-4">
                  <label className="text-xs font-headline font-bold uppercase tracking-[0.2em] text-primary opacity-70">
                    Religious Level
                  </label>
                  <div className="-mx-2 flex gap-3 overflow-x-auto px-2 pb-2 hide-scrollbar">
                    {RELIGIOUS_LEVEL_OPTIONS.map((level) => {
                      const active = values.religiousLevel === level;
                      return (
                        <button
                          key={level}
                          type="button"
                          onClick={() => updateField("religiousLevel", level)}
                          className={active ? "onboarding-choice-pill onboarding-choice-pill--selected" : "onboarding-choice-pill"}
                        >
                          {level}
                        </button>
                      );
                    })}
                  </div>
                </section>

                <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <label className="text-xs font-headline font-bold uppercase tracking-[0.2em] text-primary opacity-70">
                      Shabbat Observance
                    </label>
                    <div className="relative">
                      <select
                        className="obi-select pr-12"
                        value={values.shabbatObservance}
                        onChange={(e) => updateField("shabbatObservance", e.target.value)}
                      >
                        <option value="">Select</option>
                        {SHABBAT_OPTIONS.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                      <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                        expand_more
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-headline font-bold uppercase tracking-[0.2em] text-primary opacity-70">
                      Kashrut Level
                    </label>
                    <div className="relative">
                      <select
                        className="obi-select pr-12"
                        value={values.kashrutLevel}
                        onChange={(e) => updateField("kashrutLevel", e.target.value)}
                      >
                        <option value="">Select</option>
                        {KASHRUT_OPTIONS.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                      <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                        expand_more
                      </span>
                    </div>
                  </div>
                </section>

                <section className="relative space-y-3">
                  <div className="flex items-end justify-between">
                    <label className="text-xs font-headline font-bold uppercase tracking-[0.2em] text-primary opacity-70">
                      Describe your religious lifestyle
                    </label>
                    <span
                      className="material-symbols-outlined pointer-events-none absolute -top-8 right-0 text-6xl text-primary/10"
                      style={{ fontVariationSettings: "'FILL' 0" }}
                    >
                      star
                    </span>
                  </div>
                  <textarea
                    className="obi-input min-h-[7rem] rounded-2xl"
                    placeholder="What does your spiritual journey look like daily?"
                    rows={4}
                    value={values.lifestyleDescription}
                    onChange={(e) => updateField("lifestyleDescription", e.target.value)}
                  />
                </section>

                <div className="onboarding-actions pt-2">
                  <button type="button" onClick={goBack} className="onboarding-back-btn">
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    Back
                  </button>
                  <OnboardingContinueButton onClick={handleContinue} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <OnboardingValidationToasts
        errors={errors}
        submitAttempt={submitAttempt}
        fieldLabels={{
          religiousLevel: "Religious level",
          shabbatObservance: "Shabbat observance",
          kashrutLevel: "Kashrut level",
          lifestyleDescription: "Lifestyle description"
        }}
      />
    </div>
  );
}
