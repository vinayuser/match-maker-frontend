import { useState } from "react";
import OnboardingContinueButton from "@/components/onboarding/OnboardingContinueButton";
import OnboardingKesherHeader from "@/components/onboarding/OnboardingKesherHeader";
import OnboardingSevenStepProgress from "@/components/onboarding/OnboardingSevenStepProgress";
import OnboardingValidationToasts from "@/components/onboarding/OnboardingValidationToasts";
import { getOnboardingStepTitle } from "@/features/onboarding/onboardingStepTitles";
import { useOnboarding } from "@/features/onboarding/OnboardingContext";
import { useOnboardingStepNav } from "@/features/onboarding/useOnboardingStepNav";
import { usePageMeta } from "@/hooks/usePageMeta";

function siblingsCountNumber(raw) {
  if (raw === "" || raw === undefined || raw === null) return 0;
  const n = Number(raw);
  return Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0;
}

export default function OnboardingFamilyBackgroundStep4() {
  const { values, errors, updateField } = useOnboarding();
  const { goNext, goSkip, goBack, stepNumber } = useOnboardingStepNav("familyBackground");
  const [parentsOpen, setParentsOpen] = useState(false);
  const [submitAttempt, setSubmitAttempt] = useState(0);
  const siblingsNum = siblingsCountNumber(values.siblingsCount);
  const handleContinue = async () => {
    setSubmitAttempt((prev) => prev + 1);
    await goNext();
  };

  usePageMeta({
    title: "Kesher | Register - Step 4",
    bodyClass: "text-on-surface font-body min-h-screen flex flex-col",
    styleId: "page-style-onboarding-family-step-4",
    styles: "body { background-color: #0e0e0e !important; }"
  });

  return (
    <div className="onboarding-flow onboarding-flow-page relative min-h-screen font-body text-on-surface">
      <OnboardingKesherHeader />
      <main className="flex flex-grow items-center justify-center px-4 py-12">
        <div className="flex w-full max-w-[700px] flex-col gap-12">
          <OnboardingSevenStepProgress currentStep={stepNumber} stepTitle={getOnboardingStepTitle("familyBackground")} />

          <div className="obi-card relative overflow-hidden p-8 shadow-2xl md:p-12">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary-container/5 blur-3xl" />
            <div className="relative z-10 flex flex-col gap-10">
              <div className="space-y-2">
                <h1 className="font-headline text-5xl font-extrabold tracking-tight text-on-surface">Family &amp; Background</h1>
                <p className="max-w-lg font-body leading-relaxed text-on-surface-variant">
                  Honoring the lineage and environment that shaped your path. All details are kept in sacred confidence.
                </p>
              </div>

              <section className="flex flex-col gap-4">
                <div className="flex flex-col justify-between rounded-xl border border-outline-variant/20 bg-surface-container-low p-6">
                  <span className="material-symbols-outlined mb-3 text-3xl text-primary" data-icon="groups">
                    groups
                  </span>
                  <div className="space-y-3">
                    <div>
                      <div className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Siblings</div>
                      <p className="mt-1 text-xs leading-snug text-on-surface-variant/90">
                        How many brothers and sisters? Use + / − or type a number.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Decrease sibling count"
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[rgba(245,180,26,0.35)] bg-[#2a2a2a] text-xl font-semibold leading-none text-[#ffd58a] transition-colors hover:bg-[#353534]"
                        onClick={() => updateField("siblingsCount", Math.max(0, siblingsNum - 1))}
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min={0}
                        inputMode="numeric"
                        className="obi-input min-h-[2.75rem] flex-1 text-center font-headline text-2xl font-bold"
                        value={values.siblingsCount}
                        onChange={(e) => updateField("siblingsCount", e.target.value === "" ? "" : Number(e.target.value))}
                        onBlur={() => {
                          if (values.siblingsCount === "") updateField("siblingsCount", 0);
                        }}
                      />
                      <button
                        type="button"
                        aria-label="Increase sibling count"
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[rgba(245,180,26,0.35)] bg-[#2a2a2a] text-xl font-semibold leading-none text-[#ffd58a] transition-colors hover:bg-[#353534]"
                        onClick={() => updateField("siblingsCount", siblingsNum + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between rounded-xl border border-primary/20 bg-surface-container-high p-6">
                  <span className="material-symbols-outlined mb-3 text-3xl text-primary" data-icon="format_list_numbered">
                    format_list_numbered
                  </span>
                  <div className="space-y-2">
                    <div className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Birth order</div>
                    <input
                      type="text"
                      className="obi-input font-headline text-xl font-bold md:text-2xl"
                      placeholder="e.g. 2nd of 4"
                      value={values.birthOrder}
                      onChange={(e) => updateField("birthOrder", e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-between rounded-xl border border-outline-variant/20 bg-surface-container-low p-6">
                  <span className="material-symbols-outlined mb-3 text-3xl text-primary" data-icon="temple_buddhist">
                    temple_buddhist
                  </span>
                  <div className="space-y-2">
                    <div className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Family style</div>
                    <input
                      type="text"
                      className="obi-input font-headline text-lg font-bold leading-tight md:text-xl"
                      placeholder="e.g. Modern Orthodox"
                      value={values.familyStyle}
                      onChange={(e) => updateField("familyStyle", e.target.value)}
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <label className="font-label text-xs uppercase tracking-widest text-primary">Siblings &amp; household (optional)</label>
                <p className="text-sm text-on-surface-variant">
                  Add names, ages, blended family, or other context — separate from the story below.
                </p>
                <textarea
                  className="obi-input custom-scrollbar min-h-[6rem] text-sm leading-relaxed"
                  placeholder="e.g. Two older brothers; half-sister in another city…"
                  rows={4}
                  value={values.siblingNotes ?? ""}
                  onChange={(e) => updateField("siblingNotes", e.target.value)}
                />
              </section>

              <section>
                <div className="ghost-border overflow-hidden rounded-xl bg-surface-container-low">
                  <button
                    type="button"
                    onClick={() => setParentsOpen((o) => !o)}
                    className="flex w-full cursor-pointer items-center justify-between p-8 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-container/10">
                        <span className="material-symbols-outlined text-primary" data-icon="history_edu">
                          history_edu
                        </span>
                      </div>
                      <div>
                        <h3 className="font-headline text-lg font-bold">Parents Background</h3>
                        <p className="text-sm text-on-surface-variant">Heritage, professions, and lineage notes</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant" data-icon="expand_more">
                      {parentsOpen ? "expand_less" : "expand_more"}
                    </span>
                  </button>

                  {parentsOpen ? (
                    <div className="space-y-6 px-8 pb-8">
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <label className="font-label text-xs uppercase tracking-widest text-primary">Mother&apos;s Heritage</label>
                          <input className="obi-input" value={values.motherHeritage} onChange={(e) => updateField("motherHeritage", e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <label className="font-label text-xs uppercase tracking-widest text-primary">Father&apos;s Heritage</label>
                          <input className="obi-input" value={values.fatherHeritage} onChange={(e) => updateField("fatherHeritage", e.target.value)} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="font-label text-xs uppercase tracking-widest text-primary">Family Narrative</label>
                        <textarea
                          className="obi-input min-h-[8rem] text-sm italic leading-relaxed text-on-surface-variant"
                          rows={5}
                          placeholder='"A home built on the balance of academic pursuit and traditional values..."'
                          value={values.familyNarrative}
                          onChange={(e) => updateField("familyNarrative", e.target.value)}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              </section>

              <div>
                <div className="onboarding-actions">
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
        </div>
      </main>
      <OnboardingValidationToasts
        errors={errors}
        submitAttempt={submitAttempt}
        fieldLabels={{
          siblingsCount: "Siblings",
          birthOrder: "Birth order",
          familyStyle: "Family style",
          motherHeritage: "Mother's heritage",
          fatherHeritage: "Father's heritage",
          familyNarrative: "Family narrative"
        }}
      />

      <div className="pointer-events-none fixed top-1/2 -right-24 -translate-y-1/2 opacity-5">
        <span className="material-symbols-outlined text-[300px]" data-icon="temple_hindu">
          temple_hindu
        </span>
      </div>
    </div>
  );
}
