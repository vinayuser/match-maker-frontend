import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/routes/paths";
import { logout } from "@/store/slices/authSlice";

function DashboardTopBar({ active = "discover", avatarUrl = "" }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const linkClass = (key) =>
    key === active
      ? "text-[#FFD58A] font-bold"
      : "text-[#D4C4AC] hover:text-[#FFD58A] transition-colors";

  const displayName = user?.displayName || user?.firstName || user?.email?.split("@")[0] || "Member";
  const resolvedAvatar = user?.avatarUrl || avatarUrl;

  useEffect(() => {
    const closeOnOutside = (event) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutside);
    return () => document.removeEventListener("mousedown", closeOnOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTE_PATHS.LOGIN);
  };

  return (
    <header className="fixed top-0 z-[60] w-full h-20 px-6 md:px-8 lg:pl-[18rem] bg-[#0E0E0E]/90 backdrop-blur-xl border-b border-[#9D8F79]/20 shadow-[0_0_40px_rgba(245,180,26,0.05)] font-['Manrope']">
      <div className="h-full w-full relative flex items-center">
      <div className="absolute left-0 text-2xl font-bold tracking-tighter text-[#F5B41A] lg:hidden">
        <NavLink to={ROUTE_PATHS.DASHBOARD_DISCOVERY}>Kesher</NavLink>
      </div>
      <div className="hidden md:flex w-full items-center justify-center gap-10">
        <NavLink className={`${linkClass("discover")} uppercase tracking-[0.05em] text-xs`} to={ROUTE_PATHS.DASHBOARD_DISCOVERY}>
          Discover
        </NavLink>
        <NavLink className={`${linkClass("vessels")} uppercase tracking-[0.05em] text-xs`} to={ROUTE_PATHS.DASHBOARD_EMPTY_STATE}>
          Vessels
        </NavLink>
        <NavLink className={`${linkClass("counsel")} uppercase tracking-[0.05em] text-xs`} to={ROUTE_PATHS.MATCHMAKER_CHAT}>
          Counsel
        </NavLink>
        <NavLink className={`${linkClass("matches")} uppercase tracking-[0.05em] text-xs`} to={ROUTE_PATHS.MATCHMAKING_PENDING_INVITATIONS}>
          Matches
        </NavLink>
      </div>
      <div ref={dropdownRef} className="ml-auto flex items-center gap-4 relative">
        <button type="button" className="text-[#9D8F79] hover:text-[#FFD58A] transition-all active:scale-95 hidden sm:block">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button type="button" className="text-[#9D8F79] hover:text-[#FFD58A] transition-all active:scale-95 hidden sm:block">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="w-10 h-10 rounded-full border border-primary/30 p-0.5 sigil-glow cursor-pointer hover:border-primary/60 transition-colors"
        >
          <div className="relative w-full h-full">
            {resolvedAvatar ? (
              <img alt="User profile avatar" className="w-full h-full rounded-full object-cover" src={resolvedAvatar} />
            ) : (
              <div className="w-full h-full rounded-full bg-surface-container-highest text-primary-container flex items-center justify-center font-bold text-xs">
                {displayName
                  .split(" ")
                  .slice(0, 2)
                  .map((part) => part[0] || "")
                  .join("")
                  .toUpperCase()}
              </div>
            )}
          </div>
        </button>

        {open ? (
          <div className="absolute top-14 right-0 min-w-48 rounded-xl border border-primary-container/20 bg-[#181818] shadow-2xl overflow-hidden backdrop-blur-xl">
            <div className="px-4 py-3 border-b border-outline-variant/20 normal-case">
              <p className="text-xs text-[#F5E9D8] font-semibold">{displayName}</p>
              <p className="text-[10px] text-[#D4C4AC]/70">{user?.email || ""}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                navigate(ROUTE_PATHS.ACCOUNT_SETTINGS);
              }}
              className="w-full px-4 py-3 text-left text-xs tracking-[0.14em] uppercase text-[#E5D6BE] hover:bg-primary-container/10 hover:text-[#FFD58A]"
            >
              Profile Settings
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full px-4 py-3 text-left text-xs tracking-[0.14em] uppercase text-[#E5D6BE] hover:bg-error/20 hover:text-[#FFB4AB]"
            >
              Logout
            </button>
          </div>
        ) : null}
      </div>
      </div>
    </header>
  );
}

export default DashboardTopBar;
