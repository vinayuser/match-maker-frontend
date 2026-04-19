import { NavLink } from "react-router-dom";
import { ROUTE_PATHS } from "@/routes/paths";

const REGISTER_PATH = "/sign-up";

const navItems = [
  { label: "About Us", to: ROUTE_PATHS.ABOUT_US },
  { label: "FAQs", to: ROUTE_PATHS.FAQ },
  { label: "Sign In", to: ROUTE_PATHS.LOGIN },
  { label: "Register", to: REGISTER_PATH }
];

function PublicHeader() {
  return (
    <header className="fixed top-0 z-[70] w-full bg-[#131313]/90 backdrop-blur-xl border-b border-[#F5B41A]/10">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-4 flex items-center justify-between gap-4">
        <NavLink
          to={ROUTE_PATHS.LANDING}
          className="text-xl md:text-2xl font-bold tracking-tighter text-[#F5B41A] font-headline"
        >
          Kesher
        </NavLink>

        <nav className="flex items-center gap-5 md:gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `font-['Manrope'] uppercase tracking-[0.2em] text-[10px] md:text-xs transition-colors ${
                  isActive ? "text-[#FFD58A] border-b border-[#F5B41A]/40 pb-1" : "text-[#D4C4AC] hover:text-[#F5B41A]"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default PublicHeader;
