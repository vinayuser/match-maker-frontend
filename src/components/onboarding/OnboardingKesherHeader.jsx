import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "@/routes/paths";

/** Same top bar as Step 1 (Basic Info) — used on every onboarding screen for consistency. */
export default function OnboardingKesherHeader() {
  return (
    <header className="w-full bg-[#131313] font-['Manrope'] text-sm uppercase tracking-wider">
      <div className="flex w-full items-center justify-between px-6 py-4">
        <Link
          to={ROUTE_PATHS.LANDING}
          className="text-2xl font-bold tracking-tighter text-[#F5B41A] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5B41A]/50"
        >
          Kesher
        </Link>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-[#F5B41A]" aria-hidden>
            verified_user
          </span>
        </div>
      </div>
    </header>
  );
}
