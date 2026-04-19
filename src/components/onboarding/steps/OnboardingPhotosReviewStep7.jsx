import { useMemo, useRef, useState } from "react";
import OnboardingContinueButton from "@/components/onboarding/OnboardingContinueButton";
import OnboardingKesherHeader from "@/components/onboarding/OnboardingKesherHeader";
import OnboardingSevenStepProgress from "@/components/onboarding/OnboardingSevenStepProgress";
import OnboardingValidationToasts from "@/components/onboarding/OnboardingValidationToasts";
import { getOnboardingStepTitle } from "@/features/onboarding/onboardingStepTitles";
import { useOnboarding } from "@/features/onboarding/OnboardingContext";
import { useOnboardingStepNav } from "@/features/onboarding/useOnboardingStepNav";
import { usePageMeta } from "@/hooks/usePageMeta";

function formatDob(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
}

function prettyText(value, fallback = "—") {
  const txt = String(value ?? "").trim();
  return txt || fallback;
}

function formatStatus(status) {
  if (status === "single") return "Single";
  if (status === "divorced") return "Divorced";
  if (status === "widowed") return "Widowed";
  return "—";
}

const EXTRA_PHOTO_LABELS = ["Photo 2", "Photo 3", "Photo 4", "Photo 5"];

export default function OnboardingPhotosReviewStep7() {
  const { values, errors, updateField } = useOnboarding();
  const { goNext, goBack, stepNumber } = useOnboardingStepNav("photosReview");
  const [submitAttempt, setSubmitAttempt] = useState(0);

  const primaryInputRef = useRef(null);
  const extraInputRefs = useRef([]);

  usePageMeta({
    title: "Kesher | Photos & Review",
    bodyClass: "text-on-surface font-body min-h-screen flex flex-col selection:bg-primary/30",
    styleId: "page-style-onboarding-photos-review",
    styles: "body { background-color: #0e0e0e !important; }"
  });

  const fullName = useMemo(() => {
    const fn = values.firstName?.trim();
    const ln = values.lastName?.trim();
    if (!fn && !ln) return "—";
    return [fn, ln].filter(Boolean).join(" ");
  }, [values.firstName, values.lastName]);

  const photos = values.photos || [];
  const primary = photos[0] || "";
  const extras = photos.slice(1, 5);
  const childrenSummary = values.hasChildren
    ? `${values.childrenCount || "—"} (${prettyText(values.custodyArrangement, "custody not set")})`
    : "No";

  const setPhotoAt = (index, file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const next = [...(values.photos || [])];
    next[index] = url;
    while (next.length < 5) next.push("");
    updateField("photos", next.slice(0, 5));
  };
  const handleContinue = async () => {
    setSubmitAttempt((prev) => prev + 1);
    await goNext();
  };

  return (
    <div className="onboarding-flow onboarding-flow-page relative min-h-screen font-body text-on-surface">
      <OnboardingKesherHeader />

      <main className="flex flex-grow flex-col items-center px-4 py-12">
        <div className="flex w-full max-w-5xl flex-col gap-12">
          <div className="mx-auto w-full max-w-[700px]">
            <OnboardingSevenStepProgress currentStep={stepNumber} stepTitle={getOnboardingStepTitle("photosReview")} />
          </div>

          <div className="obi-card relative overflow-hidden p-8 shadow-2xl md:p-12">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary-container/5 blur-3xl" />
            <div className="relative z-10 flex flex-col gap-10">
              <div className="grid grid-cols-1 items-start gap-12 lg:asymmetric-layout">
                <section>
                  <div className="mb-8">
                    <h1 className="mb-4 font-headline text-4xl font-extrabold tracking-tight lg:text-5xl">Your Visual Soul.</h1>
                    <p className="max-w-md text-lg leading-relaxed text-on-surface-variant">
                      Choose images that reflect your character. A monastic aesthetic thrives on authenticity.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    <button
                      type="button"
                      onClick={() => primaryInputRef.current?.click()}
                      className="group relative col-span-2 flex aspect-[4/5] cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-[#3A3A3A] bg-surface-container-lowest transition-colors hover:border-primary/50"
                    >
                      {primary ? (
                        <img alt="" src={primary} className="absolute inset-0 h-full w-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-container-high text-primary">
                            <span className="material-symbols-outlined text-3xl">add</span>
                          </div>
                          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Main Photo</span>
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3 rounded-full border border-[rgba(245,180,26,0.35)] bg-[rgba(19,19,19,0.82)] px-2.5 py-1">
                        <span className="font-label text-[10px] font-semibold uppercase tracking-[0.16em] text-[#ffd58a]">Main photo</span>
                      </div>
                    </button>
                    <input
                      ref={primaryInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setPhotoAt(0, e.target.files?.[0])}
                    />

                    {[0, 1, 2, 3].map((slotIdx) => {
                      const absoluteIndex = slotIdx + 1;
                      const src = extras[slotIdx] || "";
                      return (
                        <div key={slotIdx} className="space-y-2">
                          <button
                            type="button"
                            onClick={() => extraInputRefs.current[slotIdx]?.click()}
                            className="group relative flex aspect-[4/5] w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-[#3A3A3A] bg-surface-container-lowest transition-colors hover:border-primary/50"
                          >
                            {src ? (
                              <img alt="" src={src} className="absolute inset-0 h-full w-full object-cover" />
                            ) : (
                              <span className="material-symbols-outlined text-on-surface-variant transition-colors group-hover:text-primary">
                                add
                              </span>
                            )}
                          </button>
                          <input
                            ref={(el) => {
                              extraInputRefs.current[slotIdx] = el;
                            }}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => setPhotoAt(absoluteIndex, e.target.files?.[0])}
                          />
                          <p className="text-center font-label text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/70">
                            {EXTRA_PHOTO_LABELS[slotIdx]}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-5 rounded-xl border border-outline-variant/20 bg-surface-container-low p-4">
                    <p className="font-label text-[11px] uppercase tracking-[0.16em] text-primary">Photo guidance</p>
                    <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                      Your first image is your main profile photo. Add 2-5 clear photos with good lighting and avoid heavy filters or group-only shots.
                    </p>
                  </div>
                </section>

                <aside className="lg:sticky lg:top-28">
                  <div className="relative overflow-hidden rounded-[2rem] bg-surface-container-low p-8">
                    <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-primary/5 blur-3xl" />
                    <h2 className="mb-2 font-headline text-2xl font-bold text-on-surface">
                      Almost there{values.firstName ? `, ${values.firstName}` : ""}
                    </h2>
                    <p className="mb-6 text-xs uppercase tracking-[0.16em] text-on-surface-variant/80">Cross-check before register</p>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-3">
                        <p className="font-label text-[10px] uppercase tracking-[0.16em] text-on-surface-variant">Full Name</p>
                        <p className="mt-1 font-headline text-sm font-semibold text-primary">{fullName}</p>
                      </div>
                      <div className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-3">
                        <p className="font-label text-[10px] uppercase tracking-[0.16em] text-on-surface-variant">Date of Birth</p>
                        <p className="mt-1 text-sm text-on-surface">{formatDob(values.dateOfBirth)}</p>
                      </div>
                      <div className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-3">
                        <p className="font-label text-[10px] uppercase tracking-[0.16em] text-on-surface-variant">Location</p>
                        <p className="mt-1 text-sm text-on-surface">{prettyText(values.location)}</p>
                      </div>
                      <div className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-3">
                        <p className="font-label text-[10px] uppercase tracking-[0.16em] text-on-surface-variant">Marital Status</p>
                        <p className="mt-1 text-sm text-on-surface">{formatStatus(values.relationshipStatus)}</p>
                      </div>
                      <div className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-3">
                        <p className="font-label text-[10px] uppercase tracking-[0.16em] text-on-surface-variant">Religious Level</p>
                        <p className="mt-1 text-sm text-on-surface">{prettyText(values.religiousLevel)}</p>
                      </div>
                      <div className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-3">
                        <p className="font-label text-[10px] uppercase tracking-[0.16em] text-on-surface-variant">Shabbat / Kashrut</p>
                        <p className="mt-1 text-sm text-on-surface">
                          {prettyText(values.shabbatObservance)} / {prettyText(values.kashrutLevel)}
                        </p>
                      </div>
                      <div className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-3">
                        <p className="font-label text-[10px] uppercase tracking-[0.16em] text-on-surface-variant">Family Style</p>
                        <p className="mt-1 text-sm text-on-surface">{prettyText(values.familyStyle)}</p>
                      </div>
                      <div className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-3">
                        <p className="font-label text-[10px] uppercase tracking-[0.16em] text-on-surface-variant">Children</p>
                        <p className="mt-1 text-sm text-on-surface">{childrenSummary}</p>
                      </div>
                      <div className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-3">
                        <p className="font-label text-[10px] uppercase tracking-[0.16em] text-on-surface-variant">Preferred Age</p>
                        <p className="mt-1 text-sm text-on-surface">
                          {values.preferredAgeMin || "—"} - {values.preferredAgeMax || "—"}
                        </p>
                      </div>
                      <div className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-3">
                        <p className="font-label text-[10px] uppercase tracking-[0.16em] text-on-surface-variant">Lineage</p>
                        <p className="mt-1 text-sm text-on-surface">{prettyText(values.lineageTag)}</p>
                      </div>
                    </div>

                      <div className="mt-5 flex gap-4 border-t border-outline-variant/15 pt-5">
                        <span className="material-symbols-outlined text-xl text-primary-container">info</span>
                        <p className="text-xs leading-relaxed text-on-surface-variant">
                          Your profile will be reviewed by our community curators. This ensures the sanctity and quality of the Kesher network.
                        </p>
                      </div>
                    </div>

                  <div className="mt-8 space-y-4">
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 accent-primary-container"
                        checked={values.agreementAccepted}
                        onChange={(e) => updateField("agreementAccepted", e.target.checked)}
                      />
                      <span className="text-xs leading-relaxed text-on-surface-variant">
                        I confirm that my profile information is accurate to the best of my knowledge.
                      </span>
                    </label>
                    <div>
                      <div className="onboarding-actions">
                        <button type="button" onClick={goBack} className="onboarding-back-btn">
                          <span className="material-symbols-outlined text-sm">arrow_back</span>
                          Back
                        </button>
                        <OnboardingContinueButton onClick={handleContinue} label="Register" />
                      </div>
                      <p className="onboarding-actions-meta">Estimated review time: 24-48 hours</p>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="pointer-events-none fixed inset-0 -z-10 opacity-20">
        <div className="absolute -left-20 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[800px] w-[800px] rounded-full bg-surface-container-high/20 blur-[150px]" />
      </div>
      <OnboardingValidationToasts
        errors={errors}
        submitAttempt={submitAttempt}
        fieldLabels={{
          photos: "Photos",
          agreementAccepted: "Confirmation"
        }}
      />

      <div className="pointer-events-none fixed left-0 top-0 h-full w-full opacity-[0.03] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" type="fractalNoise" />
          </filter>
          <rect filter="url(#noise)" height="100%" width="100%" />
        </svg>
      </div>
    </div>
  );
}
