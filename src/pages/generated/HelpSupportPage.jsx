import { useEffect } from "react";
import { Link } from "react-router-dom";
import PublicSiteFooter from "@/components/layout/PublicSiteFooter";
import { ROUTE_PATHS } from "@/routes/paths";
import "@/styles/landing.css";

function HelpSupportPage() {
  useEffect(() => {
    const previousTitle = document.title;
    const previousBodyClass = document.body.className;

    document.title = "Support | Kesher";
    document.body.className =
      "selection:bg-primary-container selection:text-on-primary" || "bg-background text-on-background";

    const styleTagId = "page-style-help_support";
    let styleEl = document.getElementById(styleTagId);
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleTagId;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent =
      "body { background-color: #0a0a0a; color: #e5e2e1; font-family: 'Inter', sans-serif; }\n        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }\n        ::-webkit-scrollbar { width: 6px; }\n        ::-webkit-scrollbar-track { background: #0a0a0a; }\n        ::-webkit-scrollbar-thumb { background: #504533; border-radius: 10px; }";

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
          <section className="relative mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mx-auto mb-8 h-px w-16 bg-gradient-to-r from-transparent via-[#f5b41a] to-transparent md:mx-0 md:w-20" />
            <div className="mb-6 inline-flex rounded-full border border-[#f5b41a]/20 bg-[#f5b41a]/[0.07] px-4 py-1.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ffd58a]">We&apos;re here for you</span>
            </div>
            <h1 className="font-headline text-5xl font-extrabold tracking-tighter text-white md:text-7xl">
              Sanctuary{" "}
              <span className="bg-gradient-to-br from-[#ffd58a] via-[#f5b41a] to-[#c4890a] bg-clip-text text-transparent">
                Support
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#a89a88] md:text-xl">
              Find clarity in your journey. Our matchmakers and technical guides are here to help with onboarding, matching, and
              account questions — calmly and discreetly.
            </p>
          </section>
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-24 pt-12 lg:px-12">
          <section className="mb-16">
            <div className="kesher-card relative overflow-hidden p-2">
              <div className="absolute inset-y-0 left-6 flex items-center text-[#f5b41a]/70">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input
                className="w-full rounded-[0.75rem] border-0 bg-transparent py-5 pl-14 pr-6 text-[#e5e2e1] placeholder:text-[#8a7d6d]/80 focus:outline-none focus:ring-2 focus:ring-[#f5b41a]/25"
                placeholder="How can we assist you today?"
                type="search"
                aria-label="Search support topics"
              />
            </div>
          </section>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="space-y-12 lg:col-span-7">
              <div>
                <h2 className="font-headline mb-6 flex items-center gap-3 text-2xl font-bold text-[#f5b41a]">
                  <span className="material-symbols-outlined">auto_awesome</span>
                  Matchmaking process
                </h2>
                <ul className="space-y-3">
                  {[
                    ["The art of the match", ROUTE_PATHS.FAQ],
                    ["Working with your matchmaker", ROUTE_PATHS.FAQ],
                    ["First date etiquette & best practices", ROUTE_PATHS.FAQ]
                  ].map(([label, to]) => (
                    <li key={label}>
                      <Link
                        className="group kesher-card kesher-card-hover flex items-center justify-between gap-4 p-4 text-[#c4b8a8] transition-colors hover:text-[#f5b41a]"
                        to={to}
                      >
                        <span>{label}</span>
                        <span className="material-symbols-outlined text-[#8a7d6d] transition-transform group-hover:translate-x-1">
                          chevron_right
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="kesher-card p-8">
                <h2 className="font-headline mb-6 flex items-center gap-3 text-2xl font-bold text-white">
                  <span className="material-symbols-outlined text-[#f5b41a]">settings</span>
                  Technical help
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Link
                    className="rounded-xl border border-white/[0.06] bg-[#0e0e0e] p-6 transition-colors hover:border-[#f5b41a]/25"
                    to={ROUTE_PATHS.LOGIN}
                  >
                    <p className="mb-1 font-bold text-white">Account access</p>
                    <p className="text-sm text-[#a89a88]">Sign in, passwords, and recovery</p>
                  </Link>
                  <Link
                    className="rounded-xl border border-white/[0.06] bg-[#0e0e0e] p-6 transition-colors hover:border-[#f5b41a]/25"
                    to={ROUTE_PATHS.FAQ}
                  >
                    <p className="mb-1 font-bold text-white">Billing &amp; tiers</p>
                    <p className="text-sm text-[#a89a88]">Plans and membership questions</p>
                  </Link>
                </div>
              </div>

              <div>
                <h2 className="font-headline mb-6 flex items-center gap-3 text-2xl font-bold text-white">
                  <span className="material-symbols-outlined text-[#f5b41a]">verified_user</span>
                  Privacy &amp; safety
                </h2>
                <div className="space-y-3">
                  <div className="kesher-card flex items-start gap-4 p-5">
                    <span className="material-symbols-outlined mt-0.5 text-[#f5b41a]">security</span>
                    <div>
                      <h3 className="font-bold text-white">Data &amp; discretion</h3>
                      <p className="text-sm text-[#a89a88]">
                        How we protect sensitive profile fields — see our{" "}
                        <Link className="text-[#f5b41a] underline-offset-4 hover:underline" to={ROUTE_PATHS.PRIVACY}>
                          Privacy Policy
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                  <div className="kesher-card flex items-start gap-4 p-5">
                    <span className="material-symbols-outlined mt-0.5 text-[#f5b41a]">gpp_maybe</span>
                    <div>
                      <h3 className="font-bold text-white">Report a concern</h3>
                      <p className="text-sm text-[#a89a88]">
                        Use the contact options on this page or email{" "}
                        <a className="text-[#f5b41a] hover:underline" href="mailto:support@kesher.app">
                          support@kesher.app
                        </a>{" "}
                        with details.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="landing-cta-shell sticky top-28 overflow-hidden rounded-[1.5rem] p-8 md:p-10">
                <h3 className="font-headline mb-4 text-2xl font-bold leading-tight text-white md:text-3xl">
                  Direct guidance when you need it
                </h3>
                <p className="mb-8 leading-relaxed text-[#a89a88]">
                  If articles do not answer your question, reach our team — we route onboarding, verification, and safety issues
                  to the right people.
                </p>
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#f5b41a]/25 bg-[#f5b41a]/[0.08]">
                    <span className="material-symbols-outlined text-2xl text-[#f5b41a]">support_agent</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#f5b41a]">Member support</p>
                    <p className="text-lg font-bold text-white">Kesher care team</p>
                  </div>
                </div>
                <a
                  className="kesher-btn-primary flex w-full items-center justify-center gap-3 rounded-full py-5 text-sm font-bold uppercase tracking-widest transition-transform hover:brightness-105 active:scale-[0.99]"
                  href="mailto:support@kesher.app"
                >
                  <span className="material-symbols-outlined text-xl">mail</span>
                  Email support
                </a>
                <p className="mt-8 border-t border-white/[0.06] pt-6 text-center text-sm italic text-[#8a7d6d]">
                  We aim to respond within one business day.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-sm text-[#8a7d6d]">
            <Link className="text-[#f5b41a] underline-offset-4 hover:underline" to={ROUTE_PATHS.FAQ}>
              Browse FAQ
            </Link>
            <span aria-hidden="true">
              ·
            </span>
            <Link className="text-[#f5b41a] underline-offset-4 hover:underline" to={ROUTE_PATHS.TERMS}>
              Terms
            </Link>
            <span aria-hidden="true">
              ·
            </span>
            <Link className="text-[#f5b41a] underline-offset-4 hover:underline" to={ROUTE_PATHS.LANDING}>
              Home
            </Link>
          </div>
        </div>
      </main>
      <PublicSiteFooter />
    </>
  );
}

export default HelpSupportPage;
