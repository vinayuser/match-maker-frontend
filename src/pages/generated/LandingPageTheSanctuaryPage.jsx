import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PublicSiteFooter from "@/components/layout/PublicSiteFooter";
import { ROUTE_PATHS } from "@/routes/paths";
import "@/styles/landing.css";
import slide1 from "@/assets/landing-slider/1.png";
import slide2 from "@/assets/landing-slider/2.png";
import slide3 from "@/assets/landing-slider/3.png";
import slide4 from "@/assets/landing-slider/4.png";
import slide5 from "@/assets/landing-slider/5.png";
import slide6 from "@/assets/landing-slider/6.png";
import slide7 from "@/assets/landing-slider/7.png";
import slide8 from "@/assets/landing-slider/8.png";
import slide9 from "@/assets/landing-slider/9.png";
import slide10 from "@/assets/landing-slider/10.png";

const TRUST_PILLARS = [
  {
    icon: "diversity_3",
    title: "Many communities",
    copy: "From Haredi to Traditional — one serious process."
  },
  {
    icon: "rule",
    title: "No endless feed",
    copy: "Structured profiles instead of swipes and noise."
  },
  {
    icon: "verified_user",
    title: "Reviewed intake",
    copy: "Verification before full participation in matching."
  },
  {
    icon: "handshake",
    title: "Guided next steps",
    copy: "Matchmaker support when both sides align."
  }
];

const AUDIENCE_POINTS = [
  "You want marriage-minded introductions, not casual chat.",
  "You will invest in an honest, detailed profile.",
  "You value clarity on kashrut, Shabbat, family, and life stage.",
  "You may need sensitive fields for status, children, or lineage.",
  "You accept that halachic filters apply when you provide that data."
];

const PROCESS_STEPS = [
  {
    n: "01",
    title: "Profile",
    body: "Lifestyle, family, history, preferences, and photos — captured in structured steps.",
    icon: "fingerprint"
  },
  {
    n: "02",
    title: "Review",
    body: "We check for authenticity and seriousness so the pool stays aligned with our standards.",
    icon: "visibility"
  },
  {
    n: "03",
    title: "Match",
    body: "Invitations, mutual approval, then focus — with matchmaker help when you move forward.",
    icon: "favorite"
  }
];

function LandingPageTheSanctuaryPage() {
  const heroSlides = useMemo(
    () => [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8, slide9, slide10],
    []
  );
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  useEffect(() => {
    const previousTitle = document.title;
    const previousBodyClass = document.body.className;

    document.title = "Kesher | Jewish Matchmaking";
    document.body.className =
      "bg-background text-on-background selection:bg-primary-container selection:text-on-primary" ||
      "bg-background text-on-background";

    const styleTagId = "page-style-landing_page_the_sanctuary";
    let styleEl = document.getElementById(styleTagId);
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleTagId;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = `body { background-color: #0a0a0a; color: #e5e2e1; font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }
      .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24; }`;

    return () => {
      document.title = previousTitle;
      document.body.className = previousBodyClass;
      const current = document.getElementById(styleTagId);
      if (current) current.remove();
    };
  }, []);

  useEffect(() => {
    if (heroSlides.length < 2) return undefined;
    const intervalId = window.setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => window.clearInterval(intervalId);
  }, [heroSlides]);

  return (
    <>
      <main className="landing-page bg-[#0a0a0a]">
        {/* Hero */}
        <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            {heroSlides.map((src, idx) => (
              <img
                key={src}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-out ${
                  idx === activeHeroSlide ? "opacity-100" : "opacity-0"
                }`}
                alt=""
                src={src}
              />
            ))}
            <div className="landing-hero-vignette absolute inset-0 z-[1]" />
            <div className="landing-hero-shine absolute inset-0 z-[2]" />
          </div>

          <div className="relative z-20 mx-auto max-w-4xl px-5 pt-20 text-center md:max-w-5xl md:px-8">
            <p className="mb-6 font-headline text-[11px] font-semibold uppercase tracking-[0.45em] text-[#f5b41a]/90 md:text-xs">
              Serious Jewish matchmaking
            </p>
            <div className="mx-auto mb-8 h-px w-16 bg-gradient-to-r from-transparent via-[#f5b41a] to-transparent md:w-24" />
            <h1 className="landing-hero-title font-headline text-[2.35rem] font-extrabold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
              A profile built for
              <span className="mt-2 block bg-gradient-to-br from-[#ffd58a] via-[#f5b41a] to-[#c4890a] bg-clip-text text-transparent md:mt-3">
                a life together.
              </span>
            </h1>
            <p className="landing-hero-sub mx-auto mt-8 max-w-xl font-body text-base font-light leading-relaxed text-[#d4c4ac] md:text-lg">
              No swiping. No noisy chat feeds. Kesher is for marriage-minded Jewish singles who want depth, discretion, and a
              path that respects your values — including halachic context when you share it.
            </p>
            <div className="mt-12 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center sm:justify-center">
              <Link
                to={ROUTE_PATHS.SIGN_UP}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#f5b41a] to-[#e8a917] px-10 py-4 font-headline text-xs font-bold uppercase tracking-[0.22em] text-[#2a1f08] shadow-[0_12px_40px_-8px_rgba(245,180,26,0.45)] transition hover:brightness-105 md:px-12 md:py-5"
              >
                Begin onboarding
              </Link>
              <a
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-10 py-4 font-headline text-xs font-bold uppercase tracking-[0.22em] text-[#e5e2e1] backdrop-blur-sm transition hover:border-[#f5b41a]/40 hover:text-white md:px-12 md:py-5"
                href="#process"
              >
                How it works
              </a>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-5 md:bottom-10">
            <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/35">Explore</span>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2 backdrop-blur-md">
              {heroSlides.map((src, idx) => (
                <button
                  key={`dot-${src}`}
                  type="button"
                  aria-label={`Slide ${idx + 1}`}
                  onClick={() => setActiveHeroSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    idx === activeHeroSlide ? "w-8 bg-[#f5b41a]" : "w-1.5 bg-white/25 hover:bg-white/45"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Trust */}
        <section className="border-y border-white/[0.06] bg-[#0e0e0e] py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:px-10">
            {TRUST_PILLARS.map((item) => (
              <div key={item.title} className="flex gap-4">
                <span className="material-symbols-outlined shrink-0 text-3xl text-[#f5b41a]/90">{item.icon}</span>
                <div>
                  <p className="font-headline text-sm font-bold text-white md:text-base">{item.title}</p>
                  <p className="mt-1.5 font-body text-sm font-light leading-relaxed text-[#a89a88]">{item.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Audience — editorial split */}
        <section className="relative py-20 md:py-28">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(245,180,26,0.07),transparent)]" />
          <div className="relative mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-12 lg:items-start lg:gap-16 lg:px-10">
            <div className="lg:col-span-5">
              <span className="inline-flex rounded-full border border-[#f5b41a]/20 bg-[#f5b41a]/[0.07] px-3 py-1 font-headline text-[10px] font-bold uppercase tracking-[0.2em] text-[#ffd58a]">
                Who it is for
              </span>
              <h2 className="mt-6 font-headline text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-[2.75rem]">
                Clarity <span className="text-[#a89a88]">before</span> the first hello.
              </h2>
              <p className="mt-6 font-body text-base font-light leading-relaxed text-[#c4b8a8]">
                Kesher asks more upfront so introductions mean something. Family, observance, and life stage are part of the
                conversation — not an afterthought.
              </p>
            </div>
            <ul className="space-y-4 lg:col-span-7">
              {AUDIENCE_POINTS.map((text) => (
                <li
                  key={text}
                  className="flex gap-4 rounded-2xl border border-white/[0.06] bg-[#141414] p-5 transition hover:border-[#f5b41a]/15"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f5b41a]/15 text-xs text-[#f5b41a]">
                    ✓
                  </span>
                  <span className="font-body text-sm font-light leading-relaxed text-[#d4c4ac]">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Philosophy */}
        <section className="bg-[#121212] py-20 md:py-28" id="philosophy">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 lg:items-center">
              <div className="relative lg:col-span-6">
                <div className="landing-img-ring overflow-hidden rounded-2xl">
                  <img alt="" className="aspect-[4/5] w-full object-cover" src={slide2} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>
                <div className="landing-quote-card relative z-10 mx-4 -mt-16 rounded-2xl border border-white/[0.08] bg-[#1a1a1a] p-6 md:mx-8 md:-mt-20 md:p-8">
                  <p className="font-headline text-lg font-semibold text-[#ffd58a] md:text-xl">Depth over volume.</p>
                  <p className="mt-3 font-body text-sm font-light leading-relaxed text-[#a89a88]">
                    Every field exists so your match — and your matchmaker — can see the full picture.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-6 lg:pl-4">
                <h2 className="font-headline text-3xl font-bold tracking-tight text-white md:text-5xl">
                  Built for <span className="text-[#f5b41a]">intention.</span>
                </h2>
                <p className="mt-6 font-body text-base font-light leading-relaxed text-[#c4b8a8]">
                  We combine careful onboarding with rules that protect focus. When halachic data matters for pairing, the product
                  reflects it — so you are not left guessing whether the basics align.
                </p>
                <div className="mt-10 space-y-8 border-t border-white/[0.06] pt-10">
                  <div className="flex gap-5">
                    <span className="material-symbols-outlined text-3xl text-[#f5b41a]">auto_awesome</span>
                    <div>
                      <h3 className="font-headline text-lg font-bold text-white">Curated, not chaotic</h3>
                      <p className="mt-1 font-body text-sm font-light text-[#a89a88]">
                        Profiles are reviewed to keep the community aligned with serious intent.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <span className="material-symbols-outlined text-3xl text-[#f5b41a]">history_edu</span>
                    <div>
                      <h3 className="font-headline text-lg font-bold text-white">Tradition, modern tools</h3>
                      <p className="mt-1 font-body text-sm font-light text-[#a89a88]">
                        Courtship with dignity — supported by structure, not gimmicks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="border-t border-white/[0.04] bg-[#0a0a0a] py-20 md:py-28" id="process">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
              <span className="font-headline text-[10px] font-bold uppercase tracking-[0.35em] text-[#f5b41a]/80">The path</span>
              <h2 className="mt-4 font-headline text-3xl font-bold tracking-tight text-white md:text-5xl">Three movements</h2>
              <p className="mt-5 font-body text-base font-light leading-relaxed text-[#8a7d6d]">
                One thorough profile. One careful review. One focused match arc — with help when you need it.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {PROCESS_STEPS.map((step) => (
                <div
                  key={step.n}
                  className="group relative flex flex-col rounded-2xl border border-white/[0.06] bg-[#141414] p-8 transition hover:border-[#f5b41a]/25 hover:shadow-[0_24px_60px_-30px_rgba(245,180,26,0.2)]"
                >
                  <span className="font-headline text-5xl font-extrabold text-[#f5b41a]/[0.15] transition group-hover:text-[#f5b41a]/30">
                    {step.n}
                  </span>
                  <h3 className="mt-4 font-headline text-xl font-bold text-white">{step.title}</h3>
                  <p className="mt-3 flex-1 font-body text-sm font-light leading-relaxed text-[#a89a88]">{step.body}</p>
                  <span className="material-symbols-outlined mt-8 text-3xl text-[#f5b41a]/60">{step.icon}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stories */}
        <section className="bg-[#0e0e0e] py-20 md:py-28" id="stories">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <div className="mb-12 md:mb-16">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-white md:text-5xl">
                Voices from <span className="text-[#f5b41a]">the community</span>
              </h2>
              <p className="mt-4 max-w-xl font-body text-sm text-[#8a7d6d]">
                Illustrative experiences — every journey is unique.
              </p>
            </div>
            <div className="grid gap-10 md:grid-cols-2 md:gap-8">
              <article className="group">
                <div className="landing-img-ring overflow-hidden rounded-2xl">
                  <img alt="" className="aspect-video w-full object-cover transition duration-700 group-hover:scale-[1.02]" src={slide3} />
                </div>
                <div className="mt-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-[#f5b41a]/10 px-2 py-0.5 font-headline text-[10px] font-bold uppercase tracking-wider text-[#ffd58a]">
                      Matchmaker guided
                    </span>
                  </div>
                  <p className="mt-4 font-headline text-xl font-semibold text-white md:text-2xl">Aligned before we met</p>
                  <p className="mt-3 border-l-2 border-[#f5b41a]/40 pl-4 font-body text-sm font-light italic leading-relaxed text-[#a89a88]">
                    &ldquo;The profile forced the conversations we would have needed months to surface elsewhere.&rdquo;
                  </p>
                </div>
              </article>
              <article className="group">
                <div className="landing-img-ring overflow-hidden rounded-2xl">
                  <img alt="" className="aspect-video w-full object-cover transition duration-700 group-hover:scale-[1.02]" src={slide4} />
                </div>
                <div className="mt-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-[#f5b41a]/10 px-2 py-0.5 font-headline text-[10px] font-bold uppercase tracking-wider text-[#ffd58a]">
                      Focused match
                    </span>
                  </div>
                  <p className="mt-4 font-headline text-xl font-semibold text-white md:text-2xl">Room to be serious</p>
                  <p className="mt-3 border-l-2 border-[#f5b41a]/40 pl-4 font-body text-sm font-light italic leading-relaxed text-[#a89a88]">
                    &ldquo;Once we matched, the noise stopped. That alone changed how we showed up for each other.&rdquo;
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Policies */}
        <section className="border-t border-white/[0.06] bg-[#121212] py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-stretch lg:gap-16 lg:px-10">
            <div>
              <h2 className="font-headline text-2xl font-bold text-white md:text-3xl">Policies &amp; transparency</h2>
              <p className="mt-4 font-body text-sm font-light leading-relaxed text-[#8a7d6d]">
                The same seriousness in the app is reflected in how we describe data use, conduct, and matching rules.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to={ROUTE_PATHS.ABOUT_US}
                  className="rounded-full border border-white/10 px-5 py-2.5 font-headline text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4c4ac] transition hover:border-[#f5b41a]/40 hover:text-white"
                >
                  About
                </Link>
                <Link
                  to={ROUTE_PATHS.FAQ}
                  className="rounded-full border border-white/10 px-5 py-2.5 font-headline text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4c4ac] transition hover:border-[#f5b41a]/40 hover:text-white"
                >
                  FAQ
                </Link>
                <Link
                  to={ROUTE_PATHS.PRIVACY}
                  className="rounded-full border border-white/10 px-5 py-2.5 font-headline text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4c4ac] transition hover:border-[#f5b41a]/40 hover:text-white"
                >
                  Privacy
                </Link>
                <Link
                  to={ROUTE_PATHS.TERMS}
                  className="rounded-full border border-white/10 px-5 py-2.5 font-headline text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4c4ac] transition hover:border-[#f5b41a]/40 hover:text-white"
                >
                  Terms
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-white/[0.06] bg-[#161616] p-8">
              <h3 className="font-headline text-sm font-bold uppercase tracking-widest text-[#f5b41a]/90">Member commitments</h3>
              <ul className="mt-5 space-y-3 font-body text-sm font-light text-[#a89a88]">
                <li className="flex gap-2">
                  <span className="text-[#f5b41a]">·</span> Accurate representation of status, children, and observance.
                </li>
                <li className="flex gap-2">
                  <span className="text-[#f5b41a]">·</span> Respectful behavior in every interaction.
                </li>
                <li className="flex gap-2">
                  <span className="text-[#f5b41a]">·</span> No harassment, impersonation, or attempts to bypass safety rules.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="pb-24 pt-4 md:pb-32">
          <div className="mx-auto max-w-3xl px-6">
            <div className="landing-cta-shell rounded-[2rem] px-8 py-14 text-center md:px-12 md:py-16">
              <h2 className="font-headline text-3xl font-bold leading-tight text-white md:text-4xl">Start with intention.</h2>
              <p className="mx-auto mt-5 max-w-md font-body text-sm font-light leading-relaxed text-[#8a7d6d]">
                Create your account and move through onboarding at the pace that fits your life — step by step, with clarity.
              </p>
              <Link
                to={ROUTE_PATHS.SIGN_UP}
                className="mt-10 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#f5b41a] to-[#e8a917] px-12 py-4 font-headline text-xs font-bold uppercase tracking-[0.2em] text-[#2a1f08] shadow-[0_12px_40px_-8px_rgba(245,180,26,0.4)] transition hover:brightness-105"
              >
                Create your profile
              </Link>
            </div>
          </div>
        </section>
      </main>
      <PublicSiteFooter />
    </>
  );
}

export default LandingPageTheSanctuaryPage;
