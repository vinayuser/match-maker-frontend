import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useOnboarding } from "@/features/onboarding/OnboardingContext";
import { ROUTE_PATHS } from "@/routes/paths";
import "@/styles/login-sign-in.css";
import "@/styles/sign-up.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function SignUpCreateAccountPage() {
  const navigate = useNavigate();
  const { values, updateFields } = useOnboarding();
  const navigateTimerRef = useRef(null);

  const [email, setEmail] = useState(() => values.accountEmail || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const previousTitle = document.title;
    const previousBodyClass = document.body.className;

    document.title = "Kesher | Begin Your Lineage";
    document.body.className = "bg-black text-[#e5e2e1]";

    const styleTagId = "page-style-sign_up_create_account";
    let styleEl = document.getElementById(styleTagId);
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleTagId;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent =
      ".material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }";

    return () => {
      document.title = previousTitle;
      document.body.className = previousBodyClass;
      const current = document.getElementById(styleTagId);
      if (current) current.remove();
      if (navigateTimerRef.current) {
        clearTimeout(navigateTimerRef.current);
      }
    };
  }, []);

  const validate = () => {
    const next = {};
    const trimmed = email.trim();
    if (!trimmed) next.email = "Email is required.";
    else if (!EMAIL_RE.test(trimmed)) next.email = "Enter a valid email address.";
    if (!password) next.password = "Password is required.";
    else if (password.length < 8) next.password = "Use at least 8 characters.";
    if (!confirmPassword) next.confirmPassword = "Confirm your identity key.";
    else if (confirmPassword !== password) next.confirmPassword = "Passwords must match.";
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    updateFields({
      accountEmail: email.trim(),
      accountPassword: password
    });

    setShowLoader(true);
    navigateTimerRef.current = window.setTimeout(() => {
      navigateTimerRef.current = null;
      navigate(ROUTE_PATHS.ONBOARDING_BASIC_INFO);
    }, 2000);
  };

  return (
    <div className="sign-up-page login-sign-in-page relative">
      {showLoader ? (
        <div className="sign-up-loader" role="status" aria-live="polite" aria-busy="true">
          <div className="sign-up-loader-spinner" aria-hidden />
          <p className="sign-up-loader-text">Preparing your profile</p>
        </div>
      ) : null}

      <header className="sign-up-top-bar">
        <Link
          to={ROUTE_PATHS.LANDING}
          className="font-headline text-xl font-bold tracking-tighter text-[#f5b41a] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f5b41a]/50"
        >
          Kesher
        </Link>
        <div className="flex items-center gap-4 md:gap-8">
          <button
            type="button"
            onClick={() => navigate(ROUTE_PATHS.LOGIN)}
            className="font-['Inter'] text-xs font-light text-[#d4c4ac] transition-colors hover:text-white sm:text-sm"
          >
            Already a member?
          </button>
          <button
            type="button"
            onClick={() => navigate(ROUTE_PATHS.LOGIN)}
            className="rounded-full border border-[#f5b41a]/35 px-5 py-2 font-['Manrope'] text-xs uppercase tracking-[0.2em] text-[#f5b41a] transition-all duration-300 hover:bg-white/5"
          >
            Sign In
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-16 pt-24 md:px-12 md:pt-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-8 lg:pr-8">
            <div>
              <p className="sign-up-initiation font-headline font-semibold">The Initiation</p>
              <h1 className="sign-up-headline font-headline mt-4">
                <span className="sign-up-headline-line">Begin Your </span>
                <span className="sign-up-headline-accent">Lineage</span>
              </h1>
              <div className="sign-up-rule" />
            </div>
            <p className="sign-up-lede font-body">
              Membership is an invitation into a legacy of distinction. We curate connections that transcend the
              ephemeral.
            </p>
            <div className="sign-up-badge">
              <span className="material-symbols-outlined" aria-hidden>
                shield
              </span>
              <span>Curated Community</span>
            </div>
          </div>

          <div className="login-card p-8 md:p-10">
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div className="space-y-2">
                <label className="login-label block pl-1" htmlFor="sign-up-email">
                  Email Address
                </label>
                <input
                  id="sign-up-email"
                  name="email"
                  className="login-input"
                  type="email"
                  autoComplete="email"
                  placeholder="concierge@example.com"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                />
                {fieldErrors.email ? <p className="sign-up-field-error">{fieldErrors.email}</p> : null}
              </div>

              <div className="space-y-2">
                <label className="login-label block pl-1" htmlFor="sign-up-password">
                  Secure Password
                </label>
                <input
                  id="sign-up-password"
                  name="password"
                  className="login-input"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                />
                {fieldErrors.password ? <p className="sign-up-field-error">{fieldErrors.password}</p> : null}
              </div>

              <div className="space-y-2">
                <label className="login-label block pl-1" htmlFor="sign-up-confirm">
                  Confirm Identity Key
                </label>
                <input
                  id="sign-up-confirm"
                  name="confirmPassword"
                  className="login-input"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••••••"
                  value={confirmPassword}
                  onChange={(ev) => setConfirmPassword(ev.target.value)}
                />
                {fieldErrors.confirmPassword ? (
                  <p className="sign-up-field-error">{fieldErrors.confirmPassword}</p>
                ) : null}
              </div>

              <div className="sign-up-info">
                <span className="sign-up-info-icon material-symbols-outlined" aria-hidden>
                  info
                </span>
                <p>
                  Every profile undergoes a rigorous review process by our Cohen council to ensure the integrity of
                  the Sanctuary. Please allow 48 hours for initial verification.
                </p>
              </div>

              <button className="login-cta" type="submit" disabled={showLoader}>
                Create Account &amp; Begin Onboarding
              </button>

              <button
                type="button"
                className="sign-up-philosophy"
                onClick={() => navigate(ROUTE_PATHS.ABOUT_US)}
              >
                View Philosophy of Conduct
              </button>
            </form>
          </div>
        </div>

        <p className="mt-14 text-center font-['Inter'] text-[10px] uppercase tracking-[0.2em] text-[#d4c4ac]/40">
          © 2026 Kesher • Private access only
        </p>
      </main>
    </div>
  );
}

export default SignUpCreateAccountPage;
