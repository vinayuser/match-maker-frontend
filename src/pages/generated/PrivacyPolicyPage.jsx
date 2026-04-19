import { useEffect } from "react";
import { Link } from "react-router-dom";
import PublicSiteFooter from "@/components/layout/PublicSiteFooter";
import { ROUTE_PATHS } from "@/routes/paths";
import "@/styles/landing.css";

function PrivacyPolicyPage() {
  useEffect(() => {
    const previousTitle = document.title;
    const previousBodyClass = document.body.className;

    document.title = "Privacy Policy | Kesher";
    document.body.className =
      "selection:bg-primary-container selection:text-on-primary" || "bg-background text-on-background";

    const styleTagId = "page-style-privacy_policy";
    let styleEl = document.getElementById(styleTagId);
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleTagId;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent =
      "body { background-color: #0a0a0a; color: #e5e2e1; font-family: 'Inter', sans-serif; }\n        .headline-font { font-family: 'Manrope', sans-serif; }\n        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24; }\n        ::-webkit-scrollbar { width: 6px; }\n        ::-webkit-scrollbar-track { background: #0a0a0a; }\n        ::-webkit-scrollbar-thumb { background: #504533; border-radius: 10px; }";

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
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ffd58a]">Effective April 2026</span>
          </div>
          <h1 className="headline-font mb-6 text-4xl font-extrabold tracking-tighter text-white md:text-6xl">
            Privacy <span className="bg-gradient-to-br from-[#ffd58a] via-[#f5b41a] to-[#c4890a] bg-clip-text text-transparent">Policy</span>
          </h1>
          <p className="public-doc mx-auto max-w-2xl text-base leading-relaxed text-[#a89a88] md:mx-0 md:text-lg">
            Kesher (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates a serious Jewish matchmaking platform. This policy
            explains what we collect, why we collect it, how we protect it, and the choices you have. We treat personal data as
            sensitive — especially when it relates to religious practice, family, marital history, and photographs used for
            verification.
          </p>
        </header>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-16 px-6 py-16 lg:grid-cols-12 lg:px-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="kesher-aside sticky top-28 space-y-4 p-5">
              <h4 className="headline-font mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#f5b41a]">On this page</h4>
              <nav className="space-y-1 text-sm">
                {[
                  ["#scope", "Scope & who we are"],
                  ["#collect", "Data we collect"],
                  ["#use", "How we use data"],
                  ["#legal", "Legal bases"],
                  ["#share", "Sharing & processors"],
                  ["#retention", "Retention"],
                  ["#security", "Security"],
                  ["#rights", "Your rights"],
                  ["#intl", "International transfers"],
                  ["#children", "Children"],
                  ["#changes", "Changes"],
                  ["#contact", "Contact"]
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
              <div className="kesher-card mt-6 p-4 text-xs text-[#8a7d6d]">
                Quick links:{" "}
                <Link className="text-[#f5b41a] underline-offset-4 hover:underline" to={ROUTE_PATHS.TERMS}>
                  Terms
                </Link>
                {" · "}
                <Link className="text-[#f5b41a] underline-offset-4 hover:underline" to={ROUTE_PATHS.FAQ}>
                  FAQ
                </Link>
                {" · "}
                <Link className="text-[#f5b41a] underline-offset-4 hover:underline" to={ROUTE_PATHS.HELP_SUPPORT}>
                  Support
                </Link>
              </div>
            </div>
          </aside>

          <article className="public-doc lg:col-span-9 space-y-16 text-[#c4b8a8] md:space-y-20">
            <section className="scroll-mt-28" id="scope">
              <div className="mb-6 flex items-center gap-4">
                <span className="material-symbols-outlined text-3xl text-[#f5b41a]">badge</span>
                <h2 className="headline-font text-2xl font-bold tracking-tight text-[#f5b41a] md:text-3xl">Scope</h2>
              </div>
              <p>
                This policy applies to information collected through our website, web application, mobile experiences, onboarding
                flows, customer support channels, and any email or SMS communications we send in connection with the service. If you
                do not agree with this policy, please do not use Kesher.
              </p>
              <p>
                Depending on your region, additional rights may apply (for example, access or deletion requests). We respond to
                verifiable requests as described below and as required by applicable law.
              </p>
            </section>

            <section className="scroll-mt-28" id="collect">
              <div className="mb-6 flex items-center gap-4">
                <span className="material-symbols-outlined text-3xl text-[#f5b41a]">inventory_2</span>
                <h2 className="headline-font text-2xl font-bold tracking-tight text-[#f5b41a] md:text-3xl">Data we collect</h2>
              </div>
              <p>We collect information in three broad categories: account & profile, usage & device, and communications.</p>
              <div className="kesher-card mt-6 space-y-4 p-6 md:p-8">
                <h3 className="headline-font text-sm font-bold uppercase tracking-widest text-[#f5b41a]">Account & profile</h3>
                <ul>
                  <li>
                    <strong>Identity & contact:</strong> name, email, phone (if provided), date of birth, location, photos, and
                    verification materials you submit.
                  </li>
                  <li>
                    <strong>Religious & lifestyle:</strong> self-described observance, Shabbat and kashrut preferences, community
                    context, and narrative fields you choose to share for matching.
                  </li>
                  <li>
                    <strong>Family & status:</strong> siblings, birth order, heritage fields, relationship status, children,
                    custody notes where applicable — used to represent you accurately and to apply matching rules.
                  </li>
                  <li>
                    <strong>Match preferences:</strong> age range, religious preferences, and deal-breaker toggles you set in the
                    product.
                  </li>
                </ul>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="kesher-card p-5">
                  <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-[#f5b41a]">Usage & device</h3>
                  <p className="text-sm">
                    Log data such as approximate timestamps, pages viewed, device type, browser language, and diagnostic events
                    needed to secure the service and fix bugs. We minimize collection to operational necessity.
                  </p>
                </div>
                <div className="kesher-card p-5">
                  <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-[#f5b41a]">Support & matchmaking</h3>
                  <p className="text-sm">
                    Messages you send to support, notes required for verification or safety reviews, and matchmaker coordination
                    metadata needed to operate the guided process described in our{" "}
                    <Link className="text-[#f5b41a] hover:underline" to={ROUTE_PATHS.TERMS}>
                      Terms
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </section>

            <section className="scroll-mt-28" id="use">
              <div className="mb-6 flex items-center gap-4">
                <span className="material-symbols-outlined text-3xl text-[#f5b41a]">track_changes</span>
                <h2 className="headline-font text-2xl font-bold tracking-tight text-[#f5b41a] md:text-3xl">How we use information</h2>
              </div>
              <ul>
                <li>Provide onboarding, profile editing, matching logic, invitations, and match lifecycle features.</li>
                <li>Apply halachic and preference-based rules you configure (for example, lineage-related constraints).</li>
                <li>Review profiles for authenticity, safety, and alignment with our community standards.</li>
                <li>Operate customer support, send service-related notices, and respond to legal requests when required.</li>
                <li>Monitor for fraud, abuse, and security incidents; improve reliability and performance.</li>
                <li>Send optional product education or community updates where permitted — you can opt out of non-essential email.</li>
              </ul>
            </section>

            <section className="scroll-mt-28" id="legal">
              <h2 className="headline-font mb-4 text-2xl font-bold text-[#f5b41a] md:text-3xl">Legal bases (summary)</h2>
              <p>
                Where GDPR-style frameworks apply, we rely on appropriate bases such as performance of a contract (providing the
                matchmaking service), legitimate interests (security, product improvement balanced against your rights), and consent
                where required (for example, certain communications or optional analytics). Where consent is the basis, you may
                withdraw it without affecting prior processing that was lawful.
              </p>
            </section>

            <section className="scroll-mt-28" id="share">
              <h2 className="headline-font mb-4 text-2xl font-bold text-[#f5b41a] md:text-3xl">Sharing & subprocessors</h2>
              <p>
                We do not sell your personal information. We share data only with service providers who help us run Kesher under
                strict confidentiality — for example, hosting, email delivery, customer support tooling, and security monitoring.
                Those providers may only process data on our instructions.
              </p>
              <p>
                We may disclose information if required by law, to protect the rights and safety of users, or as part of a merger or
                acquisition subject to appropriate safeguards and notice where required.
              </p>
            </section>

            <section className="scroll-mt-28" id="retention">
              <h2 className="headline-font mb-4 text-2xl font-bold text-[#f5b41a] md:text-3xl">Retention</h2>
              <p>
                We retain profile and account data for as long as your account is active and for a limited period afterward to
                resolve disputes, enforce agreements, and comply with law. Server logs and security telemetry may be kept for shorter
                rolling windows. Backup systems may retain residual copies for a limited time before overwrite.
              </p>
            </section>

            <section className="scroll-mt-28" id="security">
              <h2 className="headline-font mb-4 text-2xl font-bold text-[#f5b41a] md:text-3xl">Security</h2>
              <p>
                We use administrative, technical, and organizational measures designed to protect data — including access
                controls, encryption in transit where applicable, monitoring, and staff training. No method of transmission over the
                Internet is completely secure; we work continuously to reduce risk.
              </p>
            </section>

            <section className="scroll-mt-28" id="rights">
              <h2 className="headline-font mb-4 text-2xl font-bold text-[#f5b41a] md:text-3xl">Your rights & choices</h2>
              <p>
                Depending on where you live, you may have rights to access, correct, delete, or export certain data, and to object
                to or restrict certain processing. You may also have the right to lodge a complaint with a supervisory authority.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  ["Access & portability", "Request a copy of the personal data we hold in structured, common form where feasible."],
                  ["Correction", "Ask us to fix inaccurate profile fields that affect your experience or safety."],
                  ["Deletion", "Request account deletion subject to legal exceptions (e.g., fraud prevention logs)."]
                ].map(([title, body]) => (
                  <div key={title} className="kesher-card p-5">
                    <h3 className="mb-2 font-bold text-[#f5b41a]">{title}</h3>
                    <p className="text-xs leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6">
                To exercise rights, contact{" "}
                <a className="text-[#f5b41a] hover:underline" href="mailto:privacy@kesher.app">
                  privacy@kesher.app
                </a>
                . We may need to verify your identity before fulfilling a request.
              </p>
            </section>

            <section className="scroll-mt-28" id="intl">
              <h2 className="headline-font mb-4 text-2xl font-bold text-[#f5b41a] md:text-3xl">International transfers</h2>
              <p>
                If you access Kesher from outside the country where our servers or vendors are located, your information may be
                transferred and processed across borders. Where required, we implement safeguards such as standard contractual
                clauses or equivalent mechanisms.
              </p>
            </section>

            <section className="scroll-mt-28" id="children">
              <h2 className="headline-font mb-4 text-2xl font-bold text-[#f5b41a] md:text-3xl">Children</h2>
              <p>
                Kesher is intended for adults 18+. We do not knowingly collect personal information from children. If you believe a
                minor has provided data, contact us and we will take appropriate steps to delete it.
              </p>
            </section>

            <section className="scroll-mt-28" id="changes">
              <h2 className="headline-font mb-4 text-2xl font-bold text-[#f5b41a] md:text-3xl">Changes to this policy</h2>
              <p>
                We may update this policy to reflect product, legal, or operational changes. We will post the revised version on
                this page and adjust the effective date. For material changes, we will provide additional notice as appropriate (for
                example, email or in-product banner).
              </p>
            </section>

            <section className="landing-cta-shell scroll-mt-28 rounded-2xl p-8 md:p-10" id="contact">
              <h2 className="headline-font mb-3 text-2xl font-bold text-[#f5b41a]">Contact</h2>
              <p className="mb-6 text-[#c4b8a8]">
                Questions about privacy or data protection? Reach our team at{" "}
                <a className="text-[#f5b41a] hover:underline" href="mailto:privacy@kesher.app">
                  privacy@kesher.app
                </a>{" "}
                or via{" "}
                <Link className="text-[#f5b41a] hover:underline" to={ROUTE_PATHS.HELP_SUPPORT}>
                  Contact Support
                </Link>
                .
              </p>
              <Link
                to={ROUTE_PATHS.LANDING}
                className="kesher-btn-primary inline-flex items-center gap-2 rounded-full px-8 py-4 text-xs font-bold uppercase tracking-widest"
              >
                Back to home
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </section>
          </article>
        </div>
      </main>
      <PublicSiteFooter />
    </>
  );
}

export default PrivacyPolicyPage;
