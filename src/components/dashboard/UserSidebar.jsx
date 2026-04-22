import { NavLink, useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/routes/paths";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";

const NAV_ITEMS = [
  { key: "discover", label: "Discover", icon: "auto_awesome", to: ROUTE_PATHS.DASHBOARD_DISCOVERY },
  { key: "matches", label: "Matches", icon: "favorite", to: ROUTE_PATHS.MATCHMAKING_PENDING_INVITATIONS },
  { key: "likes", label: "Likes Received", icon: "thumb_up", to: ROUTE_PATHS.DASHBOARD_LIKES_RECEIVED },
  { key: "sent", label: "Sent Requests", icon: "outgoing_mail", to: ROUTE_PATHS.DASHBOARD_SENT_REQUESTS },
  { key: "favorites", label: "Favorites", icon: "star", to: ROUTE_PATHS.DASHBOARD_FAVORITES },
  { key: "recent", label: "Recently Viewed", icon: "history", to: ROUTE_PATHS.DASHBOARD_RECENTLY_VIEWED },
  { key: "notifications", label: "Notifications", icon: "notifications", to: ROUTE_PATHS.DASHBOARD_NOTIFICATIONS },
  { key: "profile", label: "My Profile", icon: "person", to: ROUTE_PATHS.MY_PROFILE },
  { key: "settings", label: "Profile Settings", icon: "settings", to: ROUTE_PATHS.ACCOUNT_SETTINGS },
  { key: "prefs", label: "Preferences / Filters", icon: "tune", to: ROUTE_PATHS.DASHBOARD_PREFERENCES_FILTERS },
  { key: "help", label: "Help & Support", icon: "help", to: ROUTE_PATHS.DASHBOARD_HELP_SUPPORT },
  { key: "privacy", label: "Privacy & Safety", icon: "privacy_tip", to: ROUTE_PATHS.DASHBOARD_PRIVACY_SAFETY },
  { key: "chat", label: "Matchmaker Chat", icon: "chat_bubble", to: ROUTE_PATHS.MATCHMAKER_CHAT }
];

function UserSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <aside className="hidden lg:flex fixed top-0 left-0 z-50 w-64 h-screen border-r border-[#9D8F79]/15 bg-[#0E0E0E]/95 backdrop-blur-xl">
      <div className="w-full h-full px-4 pt-6 pb-6 flex flex-col">
        <div className="px-3 pb-5 border-b border-[#9D8F79]/15 shrink-0">
          <NavLink to={ROUTE_PATHS.DASHBOARD_DISCOVERY} className="text-4xl font-bold tracking-tighter text-[#F5B41A] font-['Manrope']">
            Kesher
          </NavLink>
        </div>
        <p className="px-3 mt-5 text-[10px] font-bold tracking-[0.22em] uppercase text-[#9D8F79] shrink-0">Member Navigation</p>
        <nav className="mt-4 space-y-1 overflow-y-auto pr-1 custom-scrollbar">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.key}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-[#D4C4AC] hover:bg-surface-container-low hover:text-[#FFD58A] border border-transparent"
                }`
              }
            >
              <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
          <button
            type="button"
            onClick={() => {
              dispatch(logout());
              navigate(ROUTE_PATHS.LOGIN);
            }}
            className="w-full mt-3 flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-[#D4C4AC] hover:bg-error/20 hover:text-[#FFB4AB] border border-transparent"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span className="font-medium">Logout</span>
          </button>
        </nav>
      </div>
    </aside>
  );
}

export default UserSidebar;
