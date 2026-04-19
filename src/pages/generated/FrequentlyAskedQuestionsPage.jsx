import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PublicSiteFooter from "@/components/layout/PublicSiteFooter";
import { ROUTE_PATHS } from "@/routes/paths";
import "@/styles/landing.css";
import faqImgA from "@/assets/landing-slider/3.png";
import faqImgB from "@/assets/landing-slider/6.png";

const FAQ_ITEMS = [
  {
    q: "What is Kesher and who is it for?",
    a: "Kesher is a serious Jewish matchmaking platform for adults who want marriage-minded introductions — not casual dating. We serve a wide range of observance levels and communities. You should be ready to invest time in a detailed profile and to interact respectfully when matches and matchmakers are involved."
  },
  {
    q: "How does matching work?",
    a: "There is no public chat feed. Members send structured interest invitations. When both sides approve, a mutual match may be created. Depending on product rules, further browsing or sending invitations can pause so both people can focus. A matchmaker may then help coordinate next steps outside of endless app messaging."
  },
  {
    q: "Why is there no swiping?",
    a: "Swiping optimizes for volume and snap judgments. Kesher optimizes for compatibility signals that only emerge when someone explains their lifestyle, family context, religious practice, and goals in writing. That takes longer upfront and saves pain later."
  },
  {
    q: "What do you ask during onboarding?",
    a: "We collect identity basics, religious lifestyle, family background, marital history, children (if applicable), photos for verification, and match preferences including age range and deal-breakers. The exact fields evolve as we improve the product, but the goal is always the same: informed introductions."
  },
  {
    q: "How are halachic rules reflected in the app?",
    a: "Members enter information such as lineage or marital history where relevant. The platform can apply pairing rules consistent with the data you provide — for example, constraints involving Cohen status. Kesher does not replace your rabbi; for personal halachic questions, seek qualified guidance."
  },
  {
    q: "What happens after I submit my profile?",
    a: "Profiles may go through review for completeness and authenticity. Timelines depend on volume and verification needs. You will see status updates in product or email where configured. Incomplete or inconsistent information can delay activation."
  },
  {
    q: "Can I edit my profile later?",
    a: "Yes. Major life changes — location, observance, marital status, children — should be updated promptly so matching stays fair for everyone."
  },
  {
    q: "How do you handle privacy?",
    a: "We collect only what we need to run matchmaking, secure the service, and comply with law. Sensitive fields are not shown on public directories. Read the full detail in our Privacy Policy, including retention and rights requests."
  },
  {
    q: "What if I feel unsafe or harassed?",
    a: "Contact support immediately with specifics. We investigate reports seriously and may suspend or remove accounts for abusive behavior, threats, stalking, or attempts to circumvent platform safety rules."
  },
  {
    q: "Do you guarantee a match or marriage?",
    a: "No. We provide structure, review, and tools to improve the odds of compatibility. Chemistry and commitment remain deeply personal. We do not promise timelines or outcomes."
  },
  {
    q: "Are there fees?",
    a: "Pricing may vary by region, cohort, or promotional policy. Any fees will be disclosed clearly before you commit to a paid tier. Free trials or partial access may exist during rollout — check in-app messaging."
  },
  {
    q: "How do I delete my account?",
    a: "Use account settings where available or email support from your registered address. Some records may be retained where required for legal, fraud-prevention, or safety reasons as described in our Privacy Policy."
  }
];

function FrequentlyAskedQuestionsPage() {
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    const previousTitle = document.title;
    const previousBodyClass = document.body.className;

    document.title = "FAQ | Kesher";
    document.body.className =
      "text-on-surface selection:bg-primary-container selection:text-on-primary-container" || "bg-background text-on-background";

    const styleTagId = "page-style-frequently_asked_questions";
    let styleEl = document.getElementById(styleTagId);
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleTagId;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent =
      "body { background-color: #0a0a0a; color: #e5e2e1; font-family: 'Inter', sans-serif; }\n        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24; }\n        ::-webkit-scrollbar { width: 6px; }\n        ::-webkit-scrollbar-track { background: #0a0a0a; }\n        ::-webkit-scrollbar-thumb { background: #504533; border-radius: 10px; }";

    return () => {
      document.title = previousTitle;
      document.body.className = previousBodyClass;
      const current = document.getElementById(styleTagId);
      if (current) current.remove();
    };
  }, []);

  return (
    <>
      <main className="kesher-public-bg min-h-screen">
        <div className="relative overflow-hidden border-b border-white/[0.06] pb-12 pt-28">
          <div className="kesher-hero-glow pointer-events-none absolute inset-0 opacity-100" />
          <section className="relative mx-auto flex max-w-6xl flex-col gap-8 px-6 lg:grid lg:grid-cols-12 lg:px-12">
            <div className="lg:col-span-8">
              <div className="mx-auto mb-8 h-px w-16 bg-gradient-to-r from-transparent via-[#f5b41a] to-transparent md:mx-0 md:w-20" />
              <div className="mb-6 inline-flex rounded-full border border-[#f5b41a]/20 bg-[#f5b41a]/[0.07] px-4 py-1.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ffd58a]">Help center</span>
              </div>
              <h1 className="font-headline text-5xl font-extrabold leading-tight tracking-tighter text-white md:text-7xl">
                Questions{" "}
                <span className="bg-gradient-to-br from-[#ffd58a] via-[#f5b41a] to-[#c4890a] bg-clip-text text-transparent">
                  &amp; answers
                </span>
              </h1>
              <p className="font-body mt-6 max-w-2xl text-xl leading-relaxed text-[#a89a88]">
                Practical guidance on onboarding, halachic filters, matching mechanics, privacy, and support. For legal wording, see
                our{" "}
                <Link className="text-[#f5b41a] underline-offset-4 hover:underline" to={ROUTE_PATHS.TERMS}>
                  Terms
                </Link>{" "}
                and{" "}
                <Link className="text-[#f5b41a] underline-offset-4 hover:underline" to={ROUTE_PATHS.PRIVACY}>
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
            <div className="hidden items-end justify-end pb-4 lg:col-span-4 lg:flex">
              <span
                className="material-symbols-outlined text-8xl text-[#f5b41a]/15"
                style={{ fontVariationSettings: "'wght' 100" }}
              >
                help
              </span>
            </div>
          </section>
        </div>

        <div className="mx-auto max-w-6xl px-6 pb-24 pt-12 lg:px-12">
          <p className="mb-10 font-body text-sm text-[#8a7d6d]">
            Showing {FAQ_ITEMS.length} topics. Tap a question to expand or collapse the answer.
          </p>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => {
              const open = openIndex === idx;
              return (
                <div key={item.q} className="kesher-card kesher-card-hover overflow-hidden transition-colors">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? -1 : idx)}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left"
                    aria-expanded={open}
                  >
                    <span className="font-headline text-lg font-bold tracking-tight text-white md:text-xl">{item.q}</span>
                    <span
                      className={`material-symbols-outlined shrink-0 text-[#f5b41a] transition-transform ${open ? "rotate-180" : ""}`}
                    >
                      expand_more
                    </span>
                  </button>
                  {open ? (
                    <div className="border-t border-white/[0.06] px-6 pb-6 pt-2">
                      <p className="font-body leading-relaxed text-[#a89a88]">{item.a}</p>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <section className="landing-cta-shell mt-20 rounded-2xl p-8 md:p-10">
            <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="mb-4 inline-flex items-center rounded-full border border-[#f5b41a]/20 bg-[#f5b41a]/[0.07] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#ffd58a]">
                  Still need help?
                </div>
                <h2 className="font-headline text-2xl font-bold text-white">Talk to our team</h2>
                <p className="mt-2 max-w-md text-sm text-[#a89a88]">
                  Onboarding, verification status, billing, or safety — open a ticket and we will route it to the right person.
                </p>
              </div>
              <Link
                to={ROUTE_PATHS.HELP_SUPPORT}
                className="kesher-btn-primary inline-flex shrink-0 items-center justify-center rounded-full px-8 py-4 text-sm font-bold uppercase tracking-widest transition-transform active:scale-95"
              >
                Contact support
              </Link>
            </div>
          </section>

          <section className="mt-24">
            <h2 className="font-headline mb-10 text-center text-xs uppercase tracking-[0.4em] text-[#8a7d6d]">At a glance</h2>
            <div className="grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-4 md:grid-cols-12">
              <div className="landing-img-ring relative overflow-hidden rounded-xl md:col-span-8">
                <img
                  className="h-full min-h-[220px] w-full object-cover opacity-70 grayscale transition-all duration-700 hover:scale-105 hover:grayscale-0"
                  alt=""
                  src={faqImgA}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 max-w-md">
                  <h3 className="font-headline text-2xl font-bold text-white">Intentional pace</h3>
                  <p className="mt-2 text-sm text-[#a89a88]">One serious path — with clarity at every step.</p>
                </div>
              </div>
              <div className="kesher-card flex flex-col justify-between p-8 md:col-span-4">
                <span className="material-symbols-outlined text-4xl text-[#f5b41a]">verified</span>
                <div>
                  <h3 className="font-headline text-xl font-bold text-white">Reviewed profiles</h3>
                  <p className="mt-2 text-sm text-[#a89a88]">Authenticity and seriousness checks before full matching.</p>
                </div>
              </div>
              <div className="kesher-card flex flex-col items-center justify-center p-8 text-center md:col-span-4">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#f5b41a]/20 bg-[#f5b41a]/[0.07]">
                  <span className="material-symbols-outlined text-3xl text-[#f5b41a]">lock</span>
                </div>
                <h3 className="font-headline text-xl font-bold text-white">Protected fields</h3>
                <p className="mt-2 text-sm text-[#a89a88]">Sensitive data stays out of public views — see Privacy Policy.</p>
              </div>
              <div className="landing-img-ring relative overflow-hidden rounded-xl md:col-span-8">
                <img
                  className="h-full min-h-[220px] w-full object-cover opacity-70 grayscale transition-all duration-700 hover:scale-105 hover:grayscale-0"
                  alt=""
                  src={faqImgB}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <h3 className="font-headline text-2xl font-bold text-white">Marriage-focused</h3>
                  <p className="mt-2 text-sm text-[#a89a88]">Built for couples planning a shared future, not a weekend.</p>
                </div>
              </div>
            </div>
          </section>

          <div className="mt-16 text-center">
            <Link
              to={ROUTE_PATHS.ABOUT_US}
              className="font-headline text-sm font-bold uppercase tracking-widest text-[#f5b41a] hover:underline"
            >
              Learn more about Kesher →
            </Link>
          </div>
        </div>
      </main>
      <PublicSiteFooter />
    </>
  );
}

export default FrequentlyAskedQuestionsPage;
