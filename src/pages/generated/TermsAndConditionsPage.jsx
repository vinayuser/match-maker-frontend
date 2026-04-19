import { useEffect } from "react";
import { Link } from "react-router-dom";
import PublicSiteFooter from "@/components/layout/PublicSiteFooter";
import { ROUTE_PATHS } from "@/routes/paths";
import "@/styles/landing.css";

function TermsAndConditionsPage() {
  useEffect(() => {
    const previousTitle = document.title;
    const previousBodyClass = document.body.className;

    document.title = "Terms and Conditions | Kesher";
    document.body.className =
      "selection:bg-primary-container selection:text-on-primary" || "bg-background text-on-background";

    const styleTagId = "page-style-terms_and_conditions";
    let styleEl = document.getElementById(styleTagId);
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleTagId;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent =
      "body { background-color: #0a0a0a; color: #e5e2e1; font-family: 'Inter', sans-serif; }\n    .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24; }\n    ::-webkit-scrollbar { width: 6px; }\n    ::-webkit-scrollbar-track { background: #0a0a0a; }\n    ::-webkit-scrollbar-thumb { background: #504533; border-radius: 10px; }\n    .legal-content p { margin-bottom: 1.5rem; line-height: 1.8; color: #c4b8a8; }\n    .legal-content h3 { color: #ffd58a; font-family: Manrope, sans-serif; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem; }\n    .legal-content ul { margin-bottom: 1.5rem; padding-left: 1.25rem; color: #c4b8a8; }\n    .legal-content li { margin-bottom: 0.5rem; }";

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
        <div className="relative overflow-hidden border-b border-white/[0.06] pb-16 pt-28">
          <div className="kesher-hero-glow pointer-events-none absolute inset-0 opacity-100" />
          <header className="relative mx-auto max-w-5xl px-6 text-center md:px-12 md:text-left">
            <div className="mx-auto mb-8 h-px w-16 bg-gradient-to-r from-transparent via-[#f5b41a] to-transparent md:mx-0 md:w-20" />
            <div className="mb-6 inline-flex rounded-full border border-[#f5b41a]/20 bg-[#f5b41a]/[0.07] px-4 py-1.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ffd58a]">Last updated April 2026</span>
            </div>
            <h1 className="mb-6 font-headline text-4xl font-extrabold tracking-tighter text-white md:text-6xl">
              Terms{" "}
              <span className="bg-gradient-to-br from-[#ffd58a] via-[#f5b41a] to-[#c4890a] bg-clip-text text-transparent">
                &amp; Conditions
              </span>
            </h1>
            <p className="font-body mx-auto max-w-2xl text-base leading-relaxed text-[#a89a88] md:mx-0 md:text-lg">
              These Terms govern your use of Kesher&apos;s Jewish matchmaking platform, including onboarding, profiles,
              invitations, matching rules, and matchmaker-guided communication. By creating an account or continuing to use the
              service, you agree to these Terms and our{" "}
              <Link className="text-[#f5b41a] underline-offset-4 hover:underline" to={ROUTE_PATHS.PRIVACY}>
                Privacy Policy
              </Link>
              .
            </p>
          </header>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-12 md:px-12">
          <aside className="hidden md:col-span-3 md:block">
            <div className="kesher-aside sticky top-28 space-y-4 p-5">
              <h4 className="mb-2 font-headline text-xs font-bold uppercase tracking-[0.3em] text-[#f5b41a]">Contents</h4>
              <nav className="flex flex-col gap-1 text-sm font-label">
                {[
                  ["#definitions", "1. Definitions"],
                  ["#agreement", "2. The agreement"],
                  ["#eligibility", "3. Eligibility"],
                  ["#account", "4. Accounts & profiles"],
                  ["#conduct", "5. Conduct"],
                  ["#matching", "6. Matching & halachic logic"],
                  ["#ip", "7. Intellectual property"],
                  ["#disclaimers", "8. Disclaimers"],
                  ["#liability", "9. Limitation of liability"],
                  ["#indemnity", "10. Indemnity"],
                  ["#suspension", "11. Suspension & termination"],
                  ["#law", "12. Governing law"],
                  ["#contact", "13. Contact"]
                ].map(([href, label]) => (
                  <a
                    key={href}
                    href={href}
                    className="block rounded-lg py-2 pl-3 text-[#a89a88] transition-colors hover:bg-white/[0.04] hover:text-[#f5b41a]"
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="legal-content md:col-span-9">
              <section className="mb-14 scroll-mt-28" id="definitions">
                <div className="mb-6 flex items-baseline gap-4">
                  <span className="font-headline text-4xl font-light text-[#f5b41a]/30">1</span>
                  <h2 className="font-headline text-2xl font-bold text-[#f5b41a]">Definitions</h2>
                </div>
                <p>
                  <strong>&quot;Service&quot;</strong> means the Kesher website, applications, onboarding flows, and related support.
                  <strong> &quot;User,&quot; &quot;you,&quot; or &quot;your&quot;</strong> means the individual who registers.
                  <strong> &quot;Profile&quot;</strong> means the information you submit, including religious, family, and
                  preference fields. <strong>&quot;Match&quot;</strong> means a mutual connection created after aligned invitations,
                  as described in product documentation and FAQ.
                </p>
              </section>

              <section className="mb-14 scroll-mt-28" id="agreement">
                <div className="mb-6 flex items-baseline gap-4">
                  <span className="font-headline text-4xl font-light text-[#f5b41a]/30">2</span>
                  <h2 className="font-headline text-2xl font-bold text-[#f5b41a]">The agreement</h2>
                </div>
                <p>
                  These Terms form a binding agreement between you and Kesher. We may modify the Terms; we will post updates and
                  indicate the effective date. Continued use after changes constitutes acceptance, except where your explicit consent
                  is required by law. If you do not agree, discontinue use and contact support to close your account.
                </p>
                <p>
                  The Service is provided for personal, non-commercial matchmaking purposes unless otherwise agreed in writing for
                  authorized partners.
                </p>
              </section>

              <section className="mb-14 scroll-mt-28" id="eligibility">
                <div className="mb-6 flex items-baseline gap-4">
                  <span className="font-headline text-4xl font-light text-[#f5b41a]/30">3</span>
                  <h2 className="font-headline text-2xl font-bold text-[#f5b41a]">Eligibility</h2>
                </div>
                <div className="kesher-card mb-6 border-l-4 border-[#f5b41a]/30 p-8">
                  <p className="mb-0 italic text-[#c4b8a8]">
                    You must be at least eighteen (18) years old and legally able to enter a contract in your jurisdiction.
                  </p>
                </div>
                <ul>
                  <li>One account per person; impersonation or duplicate identities are prohibited.</li>
                  <li>You may not register if you are legally barred from using matchmaking services in your region.</li>
                  <li>
                    You represent that profile information — including marital status, children, and religious identifiers — is
                    truthful to the best of your knowledge.
                  </li>
                </ul>
              </section>

              <section className="mb-14 scroll-mt-28" id="account">
                <div className="mb-6 flex items-baseline gap-4">
                  <span className="font-headline text-4xl font-light text-[#f5b41a]/30">4</span>
                  <h2 className="font-headline text-2xl font-bold text-[#f5b41a]">Accounts &amp; profiles</h2>
                </div>
                <p>
                  You are responsible for safeguarding login credentials and for all activity under your account. You agree to notify
                  us promptly of unauthorized access. Profiles must be maintained accurately; material changes (e.g., engagement,
                  relocation, change in observance) should be updated to preserve fair matching.
                </p>
                <p>
                  Certain fields may be reviewed by Kesher staff or automated checks for completeness and authenticity before full
                  participation in matching. We may request additional documentation where appropriate for verification.
                </p>
              </section>

              <section className="mb-14 scroll-mt-28" id="conduct">
                <div className="mb-6 flex items-baseline gap-4">
                  <span className="font-headline text-4xl font-light text-[#f5b41a]/30">5</span>
                  <h2 className="font-headline text-2xl font-bold text-[#f5b41a]">Conduct</h2>
                </div>
                <p>You agree not to:</p>
                <ul>
                  <li>Harass, threaten, defame, or discriminate against users, staff, or matchmakers.</li>
                  <li>Share sexually explicit content, hate speech, or illegal material through the Service.</li>
                  <li>Circumvent platform rules — including attempting to contact users outside approved flows to evade safety rules.</li>
                  <li>Scrape, reverse engineer, or overload the Service; use bots except as we expressly permit.</li>
                  <li>Misrepresent eligibility for matching (including halachic status fields).</li>
                </ul>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="kesher-card p-6">
                    <h3>Enforcement</h3>
                    <p className="text-sm">
                      Violations may lead to warnings, suspension, or permanent termination. We may preserve records as needed for
                      safety or legal compliance.
                    </p>
                  </div>
                  <div className="kesher-card p-6">
                    <h3>Reporting</h3>
                    <p className="text-sm">
                      Report concerns via{" "}
                      <Link className="text-[#f5b41a] hover:underline" to={ROUTE_PATHS.HELP_SUPPORT}>
                        Contact Support
                      </Link>
                      . We review reports in good faith but cannot guarantee specific outcomes.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-14 scroll-mt-28" id="matching">
                <div className="mb-6 flex items-baseline gap-4">
                  <span className="font-headline text-4xl font-light text-[#f5b41a]/30">6</span>
                  <h2 className="font-headline text-2xl font-bold text-[#f5b41a]">Matching &amp; halachic logic</h2>
                </div>
                <p>
                  Kesher facilitates structured interest invitations rather than open-ended chat feeds. When two members mutually
                  accept, a single active match may be created; product rules may lock further browsing or invitations as described
                  in our FAQ.
                </p>
                <p>
                  Where you provide information relevant to halachic pairing (for example, Cohen lineage or marital history), the
                  Service may filter suggestions accordingly. You are responsible for accuracy; Kesher does not provide rabbinic
                  determinations — consult your own halachic authority for personal questions.
                </p>
                <p>
                  Matchmakers or staff may assist with next steps as described in-product. Kesher does not guarantee marriage or any
                  particular outcome.
                </p>
              </section>

              <section className="mb-14 scroll-mt-28" id="ip">
                <div className="mb-6 flex items-baseline gap-4">
                  <span className="font-headline text-4xl font-light text-[#f5b41a]/30">7</span>
                  <h2 className="font-headline text-2xl font-bold text-[#f5b41a]">Intellectual property</h2>
                </div>
                <p>
                  The Service, including software, branding, text, and design, is owned by Kesher or its licensors. We grant you a
                  limited, revocable, non-exclusive license to access the Service for personal use. You may not copy, modify, or
                  distribute our materials except as allowed by law or with written permission.
                </p>
                <p>
                  You retain rights to content you submit; you grant Kesher a worldwide license to host, display, and process your
                  content to operate, promote, and improve the Service, subject to our Privacy Policy.
                </p>
              </section>

              <section className="mb-14 scroll-mt-28" id="disclaimers">
                <div className="mb-6 flex items-baseline gap-4">
                  <span className="font-headline text-4xl font-light text-[#f5b41a]/30">8</span>
                  <h2 className="font-headline text-2xl font-bold text-[#f5b41a]">Disclaimers</h2>
                </div>
                <p>
                  THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE.&quot; TO THE MAXIMUM EXTENT PERMITTED BY LAW,
                  WE DISCLAIM WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT
                  WARRANT UNINTERRUPTED OR ERROR-FREE OPERATION.
                </p>
              </section>

              <section className="mb-14 scroll-mt-28" id="liability">
                <div className="mb-6 flex items-baseline gap-4">
                  <span className="font-headline text-4xl font-light text-[#f5b41a]/30">9</span>
                  <h2 className="font-headline text-2xl font-bold text-[#f5b41a]">Limitation of liability</h2>
                </div>
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, KESHER AND ITS AFFILIATES WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL,
                  SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR LOSS OF PROFITS, DATA, OR GOODWILL. OUR AGGREGATE LIABILITY FOR
                  CLAIMS ARISING OUT OF THE SERVICE SHALL NOT EXCEED THE GREATER OF (A) THE AMOUNTS YOU PAID US FOR THE SERVICE IN
                  THE TWELVE MONTHS BEFORE THE CLAIM OR (B) ONE HUNDRED DOLLARS (USD $100), EXCEPT WHERE PROHIBITED BY LAW.
                </p>
              </section>

              <section className="mb-14 scroll-mt-28" id="indemnity">
                <div className="mb-6 flex items-baseline gap-4">
                  <span className="font-headline text-4xl font-light text-[#f5b41a]/30">10</span>
                  <h2 className="font-headline text-2xl font-bold text-[#f5b41a]">Indemnity</h2>
                </div>
                <p>
                  You will indemnify and hold harmless Kesher and its directors, employees, and partners from claims, damages, and
                  expenses (including reasonable attorneys&apos; fees) arising from your use of the Service, your content, or your
                  violation of these Terms or applicable law.
                </p>
              </section>

              <section className="mb-14 scroll-mt-28" id="suspension">
                <div className="mb-6 flex items-baseline gap-4">
                  <span className="font-headline text-4xl font-light text-[#f5b41a]/30">11</span>
                  <h2 className="font-headline text-2xl font-bold text-[#f5b41a]">Suspension &amp; termination</h2>
                </div>
                <p>
                  We may suspend or terminate access for conduct violations, risk to community safety, legal requirements, or extended
                  inactivity as permitted by law. You may close your account at any time through available settings or support.
                  Provisions that by nature should survive (e.g., liability limits, indemnity) will survive termination.
                </p>
              </section>

              <section className="mb-14 scroll-mt-28" id="law">
                <div className="mb-6 flex items-baseline gap-4">
                  <span className="font-headline text-4xl font-light text-[#f5b41a]/30">12</span>
                  <h2 className="font-headline text-2xl font-bold text-[#f5b41a]">Governing law &amp; disputes</h2>
                </div>
                <p>
                  These Terms are governed by the laws of the jurisdiction specified in a future addendum or, if none, the laws
                  applicable where Kesher primarily operates, without regard to conflict-of-law rules. You agree to personal
                  jurisdiction in those courts, except where consumer protections require otherwise.
                </p>
              </section>

              <section className="landing-cta-shell scroll-mt-28 rounded-2xl p-8" id="contact">
                <div className="mb-6 flex items-baseline gap-4">
                  <span className="font-headline text-4xl font-light text-[#f5b41a]/30">13</span>
                  <h2 className="font-headline text-2xl font-bold text-[#f5b41a]">Contact</h2>
                </div>
                <p className="text-[#c4b8a8]">
                  Legal notices and general inquiries:{" "}
                  <a className="text-[#f5b41a] hover:underline" href="mailto:legal@kesher.app">
                    legal@kesher.app
                  </a>
                  . Product support:{" "}
                  <Link className="text-[#f5b41a] hover:underline" to={ROUTE_PATHS.HELP_SUPPORT}>
                    Contact Support
                  </Link>
                  .
                </p>
                <Link
                  to={ROUTE_PATHS.LANDING}
                  className="kesher-btn-primary mt-6 inline-flex items-center gap-2 rounded-full px-8 py-3 font-headline text-xs font-bold uppercase tracking-widest"
                >
                  Return home
                </Link>
              </section>
          </div>
        </div>
      </main>
      <PublicSiteFooter />
    </>
  );
}

export default TermsAndConditionsPage;
