import { useEffect, useMemo, useState } from "react";
import OnboardingContinueButton from "@/components/onboarding/OnboardingContinueButton";
import OnboardingKesherHeader from "@/components/onboarding/OnboardingKesherHeader";
import OnboardingSevenStepProgress from "@/components/onboarding/OnboardingSevenStepProgress";
import { getOnboardingStepTitle } from "@/features/onboarding/onboardingStepTitles";
import { useOnboarding } from "@/features/onboarding/OnboardingContext";
import { useOnboardingStepNav } from "@/features/onboarding/useOnboardingStepNav";
import { usePageMeta } from "@/hooks/usePageMeta";

const STATUSES = [
  { value: "single", label: "Single", icon: "person" },
  { value: "divorced", label: "Divorced", icon: "splitscreen" },
  { value: "widowed", label: "Widowed", icon: "vignette" }
];

/** Values must match DB ENUM children_live_with: yes | no | partially */
const CUSTODY_OPTIONS = [
  { value: "yes", label: "Full Custody" },
  { value: "partially", label: "Shared Custody" },
  { value: "no", label: "Visitation Only" }
];
const STATUS_ERROR_FIELDS = ["relationshipStatus", "childrenCount", "custodyArrangement"];
const ERROR_LABELS = {
  relationshipStatus: "Marital status",
  childrenCount: "Children quantity",
  custodyArrangement: "Custody arrangement"
};

function toChildrenCountValue(raw) {
  if (raw === "" || raw === undefined || raw === null) return 0;
  const n = Number(raw);
  return Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0;
}

export default function OnboardingStatusFemaleStep5() {
  const { values, errors, updateField, updateFields } = useOnboarding();
  const { goNext, goBack, stepNumber } = useOnboardingStepNav("status");
  const childrenCountValue = toChildrenCountValue(values.childrenCount);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [toastErrors, setToastErrors] = useState([]);

  const stepErrorEntries = useMemo(
    () => STATUS_ERROR_FIELDS.filter((field) => Boolean(errors[field])).map((field) => ({ field, message: errors[field] })),
    [errors]
  );

  useEffect(() => {
    if (!attemptedSubmit || stepErrorEntries.length === 0) return;
    setToastErrors(stepErrorEntries);
    const timer = setTimeout(() => {
      setToastErrors([]);
    }, 5000);
    return () => clearTimeout(timer);
  }, [attemptedSubmit, stepErrorEntries]);

  const setHasChildren = (checked) => {
    if (checked) {
      updateFields({
        hasChildren: true,
        childrenCount: childrenCountValue < 1 ? 1 : childrenCountValue
      });
      return;
    }
    updateFields({
      hasChildren: false,
      childrenCount: "",
      custodyArrangement: ""
    });
  };

  const setChildrenCount = (next) => {
    const normalized = Math.max(1, Math.floor(next));
    updateField("childrenCount", normalized);
  };

  usePageMeta({
    title: "Kesher | Register - Step 5",
    bodyClass: "text-on-surface font-body min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary",
    styleId: "page-style-onboarding-status-female-step-5",
    styles: "body { background-color: #0e0e0e !important; }"
  });

  return (
    <div className="onboarding-flow onboarding-flow-page min-h-screen font-body text-on-surface">
      <OnboardingKesherHeader />
      <main className="flex flex-grow items-center justify-center px-4 py-12">
        <div className="flex w-full max-w-[700px] flex-col gap-12">
          <OnboardingSevenStepProgress currentStep={stepNumber} stepTitle={getOnboardingStepTitle("status")} />

          <div className="obi-card relative overflow-hidden p-8 shadow-2xl md:p-12">
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary-container/5 blur-[80px]" />
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary-container/5 blur-3xl" />
            <div className="relative z-10 flex flex-col gap-10">
              <div className="relative space-y-4 overflow-hidden">
                <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface">Status &amp; Children</h1>
                <p className="max-w-md text-lg leading-relaxed text-on-surface-variant">
                  Personal details help us refine your connections within the sanctuary.
                </p>
              </div>

              <form
                className="space-y-12"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setAttemptedSubmit(true);
                  const ok = await goNext();
                  if (ok) {
                    setToastErrors([]);
                    setAttemptedSubmit(false);
                  }
                }}
              >
                <section>
                  <h2 className="mb-6 font-headline text-xs uppercase tracking-[0.15em] text-primary">Marital Status</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {STATUSES.map((s) => (
                      <label key={s.value} className="relative cursor-pointer">
                        <input
                          className="custom-radio sr-only"
                          name="status"
                          type="radio"
                          value={s.value}
                          checked={values.relationshipStatus === s.value}
                          onChange={() => updateField("relationshipStatus", s.value)}
                        />
                        <div className="flex items-center justify-between rounded-xl border border-transparent bg-surface-container-low p-6 transition-all duration-300 hover:bg-surface-container">
                          <div className="flex items-center gap-4">
                            <span className="material-symbols-outlined text-primary" data-icon={s.icon}>
                              {s.icon}
                            </span>
                            <span className="text-lg font-medium">{s.label}</span>
                          </div>
                          <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-outline-variant">
                            <div className="h-2 w-2 rounded-full bg-primary opacity-0 transition-opacity" />
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </section>

                <section className="rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="mb-1 font-headline text-xl">Do you have children?</h2>
                      <p className="text-sm text-on-surface-variant">Include children from all previous relationships.</p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={Boolean(values.hasChildren)}
                      onClick={() => setHasChildren(!Boolean(values.hasChildren))}
                      className={`onboarding-switch ${values.hasChildren ? "onboarding-switch--on" : ""}`}
                    >
                      <span className="onboarding-switch__thumb" />
                    </button>
                  </div>

                  {Boolean(values.hasChildren) ? (
                    <div className="mt-6 space-y-6 border-t border-outline-variant/10 pt-6">
                      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                        <div>
                          <span className="font-label text-xs font-bold uppercase tracking-[0.15em] text-on-surface-variant">Quantity</span>
                          <div className="mt-2 flex items-center gap-4">
                            <button
                              type="button"
                              aria-label="Decrease number of children"
                              className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-container-high text-primary transition-colors hover:bg-surface-container-highest"
                              onClick={() => setChildrenCount(childrenCountValue - 1)}
                              disabled={childrenCountValue <= 1}
                            >
                              <span className="material-symbols-outlined" data-icon="remove">
                                remove
                              </span>
                            </button>
                            <input
                              type="number"
                              min={1}
                              inputMode="numeric"
                              className="obi-input w-24 text-center font-headline text-2xl font-extrabold text-primary"
                              value={values.childrenCount === "" || values.childrenCount == null ? "" : values.childrenCount}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (val === "") {
                                  updateField("childrenCount", "");
                                  return;
                                }
                                const n = parseInt(val, 10);
                                updateField("childrenCount", Number.isFinite(n) ? n : "");
                              }}
                            />
                            <button
                              type="button"
                              aria-label="Increase number of children"
                              className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-container-high text-primary transition-colors hover:bg-surface-container-highest"
                              onClick={() => setChildrenCount(childrenCountValue + 1)}
                            >
                              <span className="material-symbols-outlined" data-icon="add">
                                add
                              </span>
                            </button>
                          </div>
                        </div>

                        <div className="w-full md:max-w-xs">
                          <label className="font-label text-xs font-bold uppercase tracking-[0.15em] text-on-surface-variant">
                            Custody Arrangement
                          </label>
                          <div className="relative mt-2">
                            <select
                              className="obi-select pr-12"
                              value={values.custodyArrangement || ""}
                              onChange={(e) => updateField("custodyArrangement", e.target.value)}
                            >
                              <option value="">Select arrangement</option>
                              {CUSTODY_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                              expand_more
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </section>

                <div className="onboarding-actions pt-2">
                  <button className="onboarding-back-btn" type="button" onClick={goBack}>
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    Back
                  </button>
                  <OnboardingContinueButton type="submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {toastErrors.length > 0 ? (
        <div className="onboarding-toast-stack" aria-live="polite">
          {toastErrors.map((err) => (
            <div key={err.field} className="onboarding-toast">
              <div className="onboarding-toast__title">{ERROR_LABELS[err.field] || "Validation error"}</div>
              <div className="onboarding-toast__message">{err.message}</div>
            </div>
          ))}
        </div>
      ) : null}

      <footer className="pointer-events-none fixed bottom-0 h-8 w-full bg-gradient-to-t from-[#0e0e0e] to-transparent" />
    </div>
  );
}
