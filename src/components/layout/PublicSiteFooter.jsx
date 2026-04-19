import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "@/routes/paths";

export default function PublicSiteFooter() {
  return (
    <footer className="w-full border-t border-[#504533]/15 bg-[#0E0E0E] py-12 px-6 md:px-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex flex-col gap-3 text-center md:text-left">
          <div className="font-headline text-lg font-semibold text-[#F5B41A]">Kesher</div>
          <p className="max-w-xs font-['Inter'] text-sm font-light tracking-wide text-[#D4C4AC]">
            Serious Jewish matchmaking built around values, family, and long-term compatibility.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-7">
          <Link className="font-['Inter'] text-sm font-light tracking-wide text-[#D4C4AC] transition-colors hover:text-white" to={ROUTE_PATHS.TERMS}>
            Terms and Conditions
          </Link>
          <Link className="font-['Inter'] text-sm font-light tracking-wide text-[#D4C4AC] transition-colors hover:text-white" to={ROUTE_PATHS.PRIVACY}>
            Privacy Policy
          </Link>
          <Link className="font-['Inter'] text-sm font-light tracking-wide text-[#D4C4AC] transition-colors hover:text-white" to={ROUTE_PATHS.HELP_SUPPORT}>
            Contact Support
          </Link>
        </div>

        <div className="font-['Inter'] text-sm font-light tracking-wide text-[#D4C4AC] opacity-60">© 2026 Kesher. All rights reserved.</div>
      </div>
    </footer>
  );
}
