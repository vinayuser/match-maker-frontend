import { NavLink } from "react-router-dom";
import { ROUTE_PATHS } from "@/routes/paths";

function DashboardBottomNav({ active = "discover" }) {
  const itemClass = (key) =>
    key === active
      ? "flex flex-col items-center justify-center bg-[#F5B41A]/10 text-[#F5B41A] rounded-full p-3 transition-all"
      : "flex flex-col items-center justify-center text-[#D4C4AC] p-3 hover:bg-white/5 rounded-full transition-all";

  const iconStyle = (key) => (key === active ? { fontVariationSettings: "'FILL' 1" } : undefined);

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center h-20 bg-[#353534]/60 backdrop-blur-xl z-50 px-4 pb-6 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] md:hidden">
      <NavLink className={itemClass("discover")} to={ROUTE_PATHS.DASHBOARD_DISCOVERY}>
        <span className="material-symbols-outlined" style={iconStyle("discover")}>
          auto_awesome
        </span>
        <span className="font-['Inter'] text-[10px] font-medium tracking-widest">Discover</span>
      </NavLink>
      <NavLink className={itemClass("matches")} to={ROUTE_PATHS.MATCHMAKING_PENDING_INVITATIONS}>
        <span className="material-symbols-outlined" style={iconStyle("matches")}>
          favorite
        </span>
        <span className="font-['Inter'] text-[10px] font-medium tracking-widest">Matches</span>
      </NavLink>
      <NavLink className={itemClass("messages")} to={ROUTE_PATHS.MATCHMAKER_CHAT}>
        <span className="material-symbols-outlined" style={iconStyle("messages")}>
          chat_bubble
        </span>
        <span className="font-['Inter'] text-[10px] font-medium tracking-widest">Messages</span>
      </NavLink>
      <NavLink className={itemClass("profile")} to={ROUTE_PATHS.ACCOUNT_SETTINGS}>
        <span className="material-symbols-outlined" style={iconStyle("profile")}>
          person
        </span>
        <span className="font-['Inter'] text-[10px] font-medium tracking-widest">Profile</span>
      </NavLink>
    </nav>
  );
}

export default DashboardBottomNav;
