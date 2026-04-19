import { useState } from "react";
import OnboardingContinueButton from "@/components/onboarding/OnboardingContinueButton";
import OnboardingKesherHeader from "@/components/onboarding/OnboardingKesherHeader";
import OnboardingSevenStepProgress from "@/components/onboarding/OnboardingSevenStepProgress";
import OnboardingValidationToasts from "@/components/onboarding/OnboardingValidationToasts";
import { getOnboardingStepTitle } from "@/features/onboarding/onboardingStepTitles";
import { useOnboarding } from "@/features/onboarding/OnboardingContext";
import { useOnboardingStepNav } from "@/features/onboarding/useOnboardingStepNav";
import { usePageMeta } from "@/hooks/usePageMeta";

const TRAITS = [
  "Contemplative",
  "Radiant",
  "Stoic",
  "Articulate",
  "Whimsical",
  "Nurturing",
  "Analytical",
  "Empathetic"
];

const HOBBIES = [
  "Meditation",
  "Classical Literature",
  "Archery",
  "Astronomy",
  "Garden Arts",
  "Tea Ceremony",
  "Vinyl Collecting"
];

function toggleInList(list, item) {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}

export default function OnboardingAboutPersonalityStep3() {
  const { values, errors, updateField } = useOnboarding();
  const { goNext, goBack, stepNumber } = useOnboardingStepNav("personality");
  const [submitAttempt, setSubmitAttempt] = useState(0);

  usePageMeta({
    title: "Kesher Onboarding - Step 3",
    bodyClass: "text-on-surface font-body min-h-screen flex flex-col",
    styleId: "page-style-onboarding-personality-step-3",
    styles: "body { background-color: #0e0e0e !important; }"
  });

  const toggleTrait = (item) => updateField("personalityTraits", toggleInList(values.personalityTraits || [], item));
  const toggleHobby = (item) => updateField("hobbies", toggleInList(values.hobbies || [], item));
  const handleContinue = async () => {
    setSubmitAttempt((prev) => prev + 1);
    await goNext();
  };

  return (
    <div className="onboarding-flow onboarding-flow-page relative flex min-h-screen flex-col pb-32 font-body text-on-surface">
      <OnboardingKesherHeader />
      <main className="flex flex-grow items-center justify-center px-4 py-12">
        <div className="flex w-full max-w-[700px] flex-col gap-12">
          <OnboardingSevenStepProgress currentStep={stepNumber} stepTitle={getOnboardingStepTitle("personality")} />

          <div className="obi-card relative overflow-hidden p-8 shadow-2xl md:p-12">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary-container/5 blur-3xl" />
            <div className="relative z-10 flex flex-col gap-10">
              <div className="space-y-2">
                <h1 className="font-headline text-5xl font-extrabold tracking-tight text-on-surface">About &amp; Personality</h1>
                <p className="max-w-md font-body text-lg leading-relaxed text-on-surface-variant opacity-80">
                  Let your soul speak through the silence. Share the essence of your character and the path you walk.
                </p>
              </div>

              <div className="space-y-16">
                <section>
                  <div className="mb-6 flex items-center gap-3">
                    <span className="material-symbols-outlined text-sm text-primary">auto_awesome</span>
                    <h2 className="font-headline text-xs uppercase tracking-[0.2em] text-primary-fixed-dim">Traits of Spirit</h2>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {TRAITS.map((trait) => {
                      const selected = (values.personalityTraits || []).includes(trait);
                      return (
                        <button
                          key={trait}
                          type="button"
                          onClick={() => toggleTrait(trait)}
                          className={selected ? "onboarding-chip onboarding-chip--selected" : "onboarding-chip"}
                        >
                          {trait}
                        </button>
                      );
                    })}
                  </div>
                </section>

                <section>
                  <div className="mb-6 flex items-center gap-3">
                    <span className="material-symbols-outlined text-sm text-primary">temple_hindu</span>
                    <h2 className="font-headline text-xs uppercase tracking-[0.2em] text-primary-fixed-dim">Rituals &amp; Pleasures</h2>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {HOBBIES.map((hobby) => {
                      const selected = (values.hobbies || []).includes(hobby);
                      return (
                        <button
                          key={hobby}
                          type="button"
                          onClick={() => toggleHobby(hobby)}
                          className={selected ? "onboarding-chip onboarding-chip--selected" : "onboarding-chip"}
                        >
                          {hobby}
                        </button>
                      );
                    })}
                  </div>
                </section>

                <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="space-y-4">
                    <label className="ml-1 block font-headline text-xs uppercase tracking-[0.2em] text-primary-fixed-dim">About Me</label>
                    <textarea
                      className="obi-input custom-scrollbar h-48 rounded-xl"
                      placeholder="Describe your inner architecture..."
                      value={values.aboutMe}
                      onChange={(e) => updateField("aboutMe", e.target.value)}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="ml-1 block font-headline text-xs uppercase tracking-[0.2em] text-primary-fixed-dim">
                      What I&apos;m looking for
                    </label>
                    <textarea
                      className="obi-input custom-scrollbar h-48 rounded-xl"
                      placeholder="Define the resonance you seek..."
                      value={values.lookingFor}
                      onChange={(e) => updateField("lookingFor", e.target.value)}
                    />
                  </div>
                </section>

                <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="group relative h-48 overflow-hidden rounded-2xl md:col-span-2">
                    <img
                      className="h-full w-full object-cover brightness-50 filter transition-transform duration-700 group-hover:scale-105"
                      alt=""
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHrK_0hsiIVG4Vj8SIFgMuxV0y7Sia9lPK9ilRPuPZ08erU2FVtSBKco5AXgOyEcbA1uO4u5hGXXT0pPkfqiKoSuS_XiAbFTpryMoQuDB-KmGimcuoiJaBMLIVRY6QP4FAHgkAWu4P_JQl0wi3MaAaIbGiVaekblEy5HmGJKTbqsq9QRbvdlQZAqHXACssxl76r6a0OFG89NjBaHGJrpu1zFABSrOncQTkixTfu81T75cV1mQGc38L306Lv90VLghcJp3wwmIWtYo"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <span className="font-headline text-xs font-bold uppercase tracking-widest text-primary">The Vibe</span>
                      <p className="mt-1 text-sm text-on-surface opacity-80">Silence is the highest form of connection.</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-3 rounded-2xl bg-surface-container-low p-6 text-center">
                    <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      verified
                    </span>
                    <h3 className="font-headline text-sm font-bold tracking-tight">Authenticity First</h3>
                    <p className="text-xs leading-relaxed text-on-surface-variant">
                      Profiles in the Sanctuary are curated for depth, not volume.
                    </p>
                  </div>
                </section>

                <div className="onboarding-actions onboarding-actions--bordered">
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
          personalityTraits: "Traits of spirit",
          hobbies: "Rituals and pleasures",
          aboutMe: "About me",
          lookingFor: "What I'm looking for"
        }}
      />

      <div className="pointer-events-none fixed bottom-0 left-0 z-10 h-24 w-full bg-gradient-to-t from-[#0e0e0e] to-transparent" />
    </div>
  );
}
