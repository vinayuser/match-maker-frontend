import { useEffect } from "react";
import { Link } from "react-router-dom";
import PublicSiteFooter from "@/components/layout/PublicSiteFooter";
import { ROUTE_PATHS } from "@/routes/paths";
import "@/styles/landing.css";
import heroImg from "@/assets/landing-slider/2.png";
import workImg from "@/assets/landing-slider/5.png";

function AboutUsOurPhilosophyPage() {
  useEffect(() => {
    const previousTitle = document.title;
    const previousBodyClass = document.body.className;

    document.title = "About Us | Kesher";
    document.body.className = "bg-background text-on-surface selection:bg-primary/30" || "bg-background text-on-background";

    const styleTagId = "page-style-about_us_our_philosophy";
    let styleEl = document.getElementById(styleTagId);
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleTagId;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent =
      "body { background-color: #0a0a0a; color: #e5e2e1; font-family: 'Inter', sans-serif; }\n        .font-manrope { font-family: 'Manrope', sans-serif; }\n        ::-webkit-scrollbar { width: 6px; }\n        ::-webkit-scrollbar-track { background: #0a0a0a; }\n        ::-webkit-scrollbar-thumb { background: #504533; border-radius: 10px; }\n        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }";

    return () => {
      document.title = previousTitle;
      document.body.className = previousBodyClass;
      const current = document.getElementById(styleTagId);
      if (current) current.remove();
    };
  }, []);

  const pillars = [
    {
      title: "Marriage-minded by design",
      body: "Kesher is not optimized for endless browsing. Every screen in onboarding exists to help you articulate who you are, what you value, and what you need in a spouse — so introductions can be serious from the first conversation."
    },
    {
      title: "Breadth across observance",
      body: "We serve Haredi, Dati, Traditional, and strengthening communities — and everyone in between who wants a structured, respectful process. The product captures nuance so you are not reduced to a single label."
    },
    {
      title: "Halachic awareness in software",
      body: "Where profile fields affect pairing under common halachic frameworks — for example, certain lineage considerations — we encode those rules in matching logic. For personal psak, we always point members to their own rabbinic guidance."
    },
    {
      title: "Privacy as a default posture",
      body: "Sensitive details stay out of public directories. Verification and matchmaker notes are visible only to people who need them to do their jobs. Read more in our Privacy Policy."
    },
    {
      title: "Human judgment + structure",
      body: "Algorithms suggest compatibility; people review authenticity. Matchmakers help when a mutual match forms, so momentum does not collapse into ghosting or ambiguity."
    },
    {
      title: "One relationship arc at a time",
      body: "The product discourages parallel casual threads. When two members align, the experience is designed to protect focus — including locking outbound invitations when a match is active, as described in our FAQ."
    }
  ];

  return (
    <>
      <main className="kesher-public-bg min-h-screen">
        <div className="relative overflow-hidden border-b border-white/[0.06] pb-16 pt-28">
          <div className="kesher-hero-glow pointer-events-none absolute inset-0 opacity-100" />
          <section className="relative mx-auto grid max-w-7xl items-end gap-12 px-6 md:grid-cols-12 md:px-12">
            <div className="md:col-span-7">
              <div className="mx-auto mb-8 h-px w-16 bg-gradient-to-r from-transparent via-[#f5b41a] to-transparent md:mx-0 md:w-20" />
              <span className="mb-6 block font-manrope text-xs uppercase tracking-[0.4em] text-[#f5b41a]">About Kesher</span>
              <h1 className="mb-8 font-manrope text-5xl font-extrabold leading-none tracking-tighter text-white md:text-7xl">
                Jewish matchmaking
                <br />{" "}
                <span className="bg-gradient-to-br from-[#ffd58a] via-[#f5b41a] to-[#c4890a] bg-clip-text font-light italic text-transparent">
                  with weight and warmth.
                </span>
              </h1>
              <p className="font-inter max-w-xl text-lg leading-relaxed text-[#a89a88]">
                Kesher exists because Orthodox and traditional singles deserve more than algorithms that reward volume. We combine
                detailed profiles, careful review, halachic sensitivity where members request it, and matchmaker support when two
                people step forward together.
              </p>
              <p className="font-inter mt-6 max-w-xl text-lg leading-relaxed text-[#a89a88]">
                Our team builds product, policy, and community standards as one system: the app should feel calm, the expectations
                clear, and the path toward marriage unmistakable.
              </p>
            </div>
            <div className="relative md:col-span-5">
              <div className="landing-img-ring aspect-[4/5] overflow-hidden rounded-xl bg-[#141414]">
                <img alt="" className="h-full w-full object-cover opacity-80 grayscale" src={heroImg} />
              </div>
              <div className="kesher-card absolute -bottom-6 -left-6 max-w-[260px] p-8">
                <span className="material-symbols-outlined mb-4 text-[#f5b41a]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  auto_awesome
                </span>
                <p className="font-inter text-xs uppercase leading-loose tracking-widest text-[#8a7d6d]">
                  We publish clear Terms and Privacy policies, and we train support staff to handle sensitive cases with discretion.
                </p>
              </div>
            </div>
          </section>
        </div>

        <section className="border-t border-white/[0.06] bg-[#0a0a0a] px-6 py-24 md:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 max-w-3xl">
              <h2 className="font-manrope text-3xl font-bold tracking-tight text-white md:text-4xl">What we believe</h2>
              <p className="font-inter mt-4 leading-relaxed text-[#a89a88]">
                Shidduchim and serious dating require context: family, community, religious practice, emotional readiness, and
                sometimes complex life chapters. Kesher&apos;s product roadmap starts from that reality — not from vanity metrics or
                advertising impressions.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pillars.map((p) => (
                <div key={p.title} className="kesher-card kesher-card-hover flex flex-col p-8">
                  <h3 className="font-manrope text-xl font-bold text-[#f5b41a]">{p.title}</h3>
                  <p className="font-inter mt-4 flex-1 text-sm leading-relaxed text-[#a89a88]">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-24 text-center md:px-12">
          <span
            className="material-symbols-outlined mb-10 block text-4xl text-[#f5b41a]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            format_quote
          </span>
          <blockquote className="font-manrope text-3xl font-light leading-tight tracking-tight text-white md:text-5xl">
            &quot;We do not optimize for volume. We optimize for clarity, compatibility, and readiness for marriage — with room for
            rabbinic guidance in real life.&quot;
          </blockquote>
          <cite className="font-inter mt-10 block text-xs uppercase tracking-[0.3em] text-[#8a7d6d]">— Kesher principles</cite>
        </section>

        <section className="mx-auto mb-24 max-w-7xl px-6 md:px-12">
          <div className="grid items-center gap-16 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <h2 className="font-manrope text-4xl font-bold tracking-tight text-white">How we work day to day</h2>
              <div className="mt-10 space-y-10">
                <div>
                  <h4 className="font-manrope mb-3 text-xs uppercase tracking-[0.2em] text-[#f5b41a]">Product &amp; trust</h4>
                  <p className="font-inter leading-relaxed text-[#a89a88]">
                    Engineers and designers partner with community advisors to ship features that reinforce seriousness — from
                    onboarding questions to match states and support tooling.
                  </p>
                </div>
                <div>
                  <h4 className="font-manrope mb-3 text-xs uppercase tracking-[0.2em] text-[#f5b41a]">Safety &amp; review</h4>
                  <p className="font-inter leading-relaxed text-[#a89a88]">
                    Automated checks and trained reviewers look for inconsistencies, policy violations, and fraud signals. We may
                    pause accounts when safety is uncertain.
                  </p>
                </div>
                <div>
                  <h4 className="font-manrope mb-3 text-xs uppercase tracking-[0.2em] text-[#f5b41a]">Support</h4>
                  <p className="font-inter leading-relaxed text-[#a89a88]">
                    Members can reach us for onboarding help, verification questions, and matchmaker coordination. We aim for
                    respectful, timely responses.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative order-1 md:order-2">
              <img alt="" className="landing-img-ring rounded-xl grayscale" src={workImg} />
              <div className="absolute -right-8 -top-8 hidden h-48 w-48 rounded-full border border-[#f5b41a]/20 md:block" />
            </div>
          </div>
        </section>

        <section className="mb-32 px-6 md:px-12">
          <div className="landing-cta-shell relative mx-auto max-w-5xl overflow-hidden rounded-3xl p-12 text-center md:p-20">
            <div className="relative z-10">
              <h2 className="font-manrope text-3xl font-bold text-white md:text-4xl">Begin with intention</h2>
              <p className="font-inter mx-auto mb-10 mt-6 max-w-lg leading-loose text-[#a89a88]">
                Create your account, complete onboarding at the pace your schedule allows, and move into review. If you have
                questions first, read our FAQ or reach out — we would rather answer upfront than rush anyone into the wrong fit.
              </p>
              <div className="flex flex-col justify-center gap-4 md:flex-row">
                <Link
                  to={ROUTE_PATHS.SIGN_UP}
                  className="kesher-btn-primary rounded-full px-10 py-4 font-manrope text-sm font-bold uppercase tracking-widest transition-transform hover:scale-[1.02]"
                >
                  Start registration
                </Link>
                <Link
                  to={ROUTE_PATHS.FAQ}
                  className="rounded-full border border-[#f5b41a]/30 px-10 py-4 font-manrope text-sm font-bold uppercase tracking-widest text-[#f5b41a] transition-colors hover:bg-[#f5b41a]/10"
                >
                  Read the FAQ
                </Link>
              </div>
              <p className="font-inter mt-8 text-xs text-[#8a7d6d]">
                By continuing you agree to our{" "}
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
          </div>
        </section>
      </main>
      <PublicSiteFooter />
    </>
  );
}

export default AboutUsOurPhilosophyPage;
