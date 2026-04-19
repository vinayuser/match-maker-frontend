import { useMemo, useState } from "react";
import OnboardingContinueButton from "@/components/onboarding/OnboardingContinueButton";
import OnboardingKesherHeader from "@/components/onboarding/OnboardingKesherHeader";
import OnboardingSevenStepProgress from "@/components/onboarding/OnboardingSevenStepProgress";
import OnboardingValidationToasts from "@/components/onboarding/OnboardingValidationToasts";
import { getOnboardingStepTitle } from "@/features/onboarding/onboardingStepTitles";
import { useOnboarding } from "@/features/onboarding/OnboardingContext";
import { useOnboardingStepNav } from "@/features/onboarding/useOnboardingStepNav";
import { usePageMeta } from "@/hooks/usePageMeta";

function computeAgeLabel(dateStr) {
  if (!dateStr) return "ADD DOB";
  const dob = new Date(dateStr);
  if (Number.isNaN(dob.getTime())) return "ADD DOB";
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const m = now.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age -= 1;
  return `${age} YEARS OLD`;
}

export default function OnboardingBasicInfoStep() {
  const { values, errors, updateField } = useOnboarding();
  const { goNext, stepNumber } = useOnboardingStepNav("basicInfo");
  const [submitAttempt, setSubmitAttempt] = useState(0);

  usePageMeta({
    title: "Kesher | Register - Step 1",
    bodyClass: "text-on-surface font-body min-h-screen flex flex-col",
    styleId: "page-style-onboarding-basic-info",
    styles: `body { background-color: #0e0e0e !important; }`
  });

  const ageLabel = useMemo(() => computeAgeLabel(values.dateOfBirth), [values.dateOfBirth]);
  const handleContinue = async () => {
    setSubmitAttempt((prev) => prev + 1);
    await goNext();
  };

  return (
    <div className="onboarding-flow onboarding-basic-info onboarding-basic-info-page flex min-h-screen flex-col">
      <OnboardingKesherHeader />
      <main className="flex flex-grow items-center justify-center px-4 py-12">
        <div className="flex w-full max-w-[700px] flex-col gap-12">
          <OnboardingSevenStepProgress currentStep={stepNumber} stepTitle={getOnboardingStepTitle("basicInfo")} />

          <div className="obi-card relative overflow-hidden p-8 shadow-2xl md:p-12">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary-container/5 blur-3xl" />
            <div className="relative z-10 flex flex-col gap-10">
              <div className="flex flex-col gap-2">
                <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface">Begin your journey.</h1>
                <p className="text-lg text-on-surface-variant">Every great connection starts with a name.</p>
              </div>

              <div className="flex flex-col gap-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="flex flex-col gap-2.5">
                    <label className="px-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant/80">First Name</label>
                    <input
                      className="obi-input"
                      placeholder="Ari"
                      type="text"
                      autoComplete="given-name"
                      value={values.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <label className="px-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant/80">Last Name</label>
                    <input
                      className="obi-input"
                      placeholder="Levine"
                      type="text"
                      autoComplete="family-name"
                      value={values.lastName}
                      onChange={(e) => updateField("lastName", e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-8">
                  <div className="relative flex flex-col gap-2.5">
                    <label className="px-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant/80">Date of Birth</label>
                    <div className="relative flex items-center">
                      <input
                        className="obi-input"
                        type="date"
                        value={values.dateOfBirth}
                        onChange={(e) => updateField("dateOfBirth", e.target.value)}
                      />
                      <div className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1.5 rounded-full border border-primary/20 bg-primary-container/10 px-2.5 py-1.5">
                        <span className="text-[10px] font-bold tracking-tighter text-primary">{ageLabel}</span>
                        <span className="material-symbols-outlined text-base text-primary" style={{ fontSize: "16px" }}>
                          calendar_month
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <label className="px-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant/80">Current Location</label>
                    <div className="group relative flex items-center">
                      <span className="material-symbols-outlined pointer-events-none absolute left-4 text-primary" data-icon="location_on">
                        location_on
                      </span>
                      <input
                        className="obi-input obi-input--with-pin"
                        placeholder="Tel Aviv, Israel"
                        type="text"
                        autoComplete="address-level1"
                        value={values.location}
                        onChange={(e) => updateField("location", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-6 pt-4">
                  <OnboardingContinueButton onClick={handleContinue} />
                  <p className="text-[11px] font-medium tracking-wide text-on-surface-variant/50">Step 1: Identity Profile</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="font-headline text-sm italic tracking-wide text-on-surface-variant/40">
              &quot;Authenticity is the foundation of sanctuary.&quot;
            </p>
          </div>
        </div>
      </main>
      <OnboardingValidationToasts
        errors={errors}
        submitAttempt={submitAttempt}
        fieldLabels={{
          firstName: "First name",
          lastName: "Last name",
          dateOfBirth: "Date of birth",
          location: "Current location"
        }}
      />
    </div>
  );
}
