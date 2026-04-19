import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/routes/paths";
import "@/styles/login-sign-in.css";

function LoginSignInPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const previousTitle = document.title;
    const previousBodyClass = document.body.className;

    document.title = "Kesher | Enter The Sanctuary";
    document.body.className = "bg-black text-[#e5e2e1]";

    const styleTagId = "page-style-login_sign_in";
    let styleEl = document.getElementById(styleTagId);
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleTagId;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent =
      ".material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24; }";

    return () => {
      document.title = previousTitle;
      document.body.className = previousBodyClass;
      const current = document.getElementById(styleTagId);
      if (current) current.remove();
    };
  }, []);

  return (
    <div className="login-sign-in-page relative z-10 flex min-h-screen flex-col">
      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Link
            to={ROUTE_PATHS.LANDING}
            className="login-brand-link group mb-12 block text-center"
          >
            <div className="mb-4 inline-block">
              <span
                className="material-symbols-outlined login-brand-icon text-4xl transition-opacity group-hover:opacity-90"
                data-icon="lock_open"
              >
                lock_open
              </span>
            </div>
            <h1 className="login-brand-title font-headline text-4xl font-extrabold transition-opacity group-hover:opacity-90">
              KESHER
            </h1>
            <p className="login-brand-tagline font-label mt-2 uppercase">
              The Monastic Sanctuary
            </p>
          </Link>

          <div className="login-card p-8 md:p-10">
            <header className="mb-8">
              <h2 className="font-headline text-2xl font-bold text-[#e5e2e1]">
                Welcome Back
              </h2>
              <p className="mt-1 text-sm text-[#d4c4ac]/90">
                Please enter your credentials to return to the silence.
              </p>
            </header>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="login-label block pl-1">
                  Email or Username
                </label>
                <input
                  className="login-input"
                  placeholder="Your identification"
                  type="text"
                  autoComplete="username"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-end justify-between">
                  <label className="login-label block pl-1">Password</label>
                  <button
                    type="button"
                    onClick={() => navigate(ROUTE_PATHS.HELP_SUPPORT)}
                    className="login-forgot"
                  >
                    Forgot Password?
                  </button>
                </div>
                <input
                  className="login-input"
                  placeholder="••••••••"
                  type="password"
                  autoComplete="current-password"
                />
              </div>

              <button className="login-cta" type="submit">
                Enter the Sanctuary
              </button>
            </form>

            <div className="mt-10 border-t border-white/10 pt-8 text-center">
              <p className="text-sm text-[#d4c4ac]">
                Don&apos;t have an account?
                <button
                  type="button"
                  onClick={() => navigate(ROUTE_PATHS.SIGN_UP)}
                  className="login-apply"
                >
                  Apply Now
                </button>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="login-footer-note">
              © 2026 The Cohen Lineage • Private Access Only
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LoginSignInPage;
