import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ROUTE_PATHS } from "@/routes/paths";
import { loginUser } from "@/store/slices/authThunks";
import "@/styles/login-sign-in.css";

function LoginSignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fieldError, setFieldError] = useState({});
  const [statusMessage, setStatusMessage] = useState("");

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

  const validate = () => {
    const next = {};
    if (!email.trim()) next.email = "Email is required.";
    if (!password) next.password = "Password is required.";
    setFieldError(next);
    return Object.keys(next).length === 0;
  };

  const humanizeLoginError = (err) => {
    const code = typeof err === "string" ? err : err?.message;
    if (code === "ACCOUNT_PENDING_ADMIN_VERIFICATION") {
      return "Your profile is pending admin verification. Please wait for approval before signing in.";
    }
    if (code === "ACCOUNT_REJECTED_BY_ADMIN") {
      return "Your profile verification was rejected by admin. Please contact support to continue.";
    }
    if (code === "INVALID_CREDENTIALS") {
      return "Invalid email or password.";
    }
    return "Login failed. Please try again.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setStatusMessage("");
    try {
      const result = await dispatch(loginUser({ email: email.trim(), password })).unwrap();
      const verificationStatus = result?.user?.verificationStatus;
      const profileStatus = result?.user?.profileStatus;
      if (profileStatus === "draft") {
        navigate(ROUTE_PATHS.ONBOARDING_BASIC_INFO);
        return;
      }
      if (verificationStatus === "verified" || profileStatus === "active") {
        navigate(ROUTE_PATHS.DASHBOARD_DISCOVERY);
        return;
      }
      navigate(ROUTE_PATHS.VERIFICATION_PENDING);
    } catch (err) {
      setStatusMessage(humanizeLoginError(err));
    } finally {
      setSubmitting(false);
    }
  };

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

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div className="space-y-2">
                <label className="login-label block pl-1">
                  Email
                </label>
                <input
                  className="login-input"
                  placeholder="your@email.com"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldError.email) setFieldError((prev) => ({ ...prev, email: undefined }));
                  }}
                />
                {fieldError.email ? <p className="login-field-error">{fieldError.email}</p> : null}
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
                <div className="login-password-wrap">
                  <input
                    className="login-input login-input--password"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (fieldError.password) setFieldError((prev) => ({ ...prev, password: undefined }));
                    }}
                  />
                  <button
                    type="button"
                    className="login-password-toggle"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    <span className="material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span>
                  </button>
                </div>
                {fieldError.password ? <p className="login-field-error">{fieldError.password}</p> : null}
              </div>

              {statusMessage ? <div className="login-status-message">{statusMessage}</div> : null}

              <button className="login-cta" type="submit" disabled={submitting}>
                {submitting ? "Entering..." : "Enter the Sanctuary"}
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
