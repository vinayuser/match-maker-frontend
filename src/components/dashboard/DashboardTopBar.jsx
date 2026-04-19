function DashboardTopBar({ active = "discover", avatarUrl = "" }) {
  const linkClass = (key) =>
    key === active
      ? "text-[#FFD58A] font-bold"
      : "text-[#D4C4AC] hover:text-[#FFD58A] transition-colors";

  return (
    <header className="bg-[#131313] font-['Manrope'] tracking-wider uppercase text-sm docked full-width top-0 z-[60] flex justify-between items-center w-full px-6 py-4 fixed">
      <div className="text-2xl font-bold tracking-tighter text-[#F5B41A]">Kesher</div>
      <div className="hidden md:flex items-center gap-8">
        <a className={linkClass("discover")} href="#">
          Discover
        </a>
        <a className={linkClass("matches")} href="#">
          Matches
        </a>
        <a className={linkClass("messages")} href="#">
          Messages
        </a>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            alt="User profile avatar with verification checkmark"
            className="w-10 h-10 rounded-full border-2 border-primary-container object-cover"
            src={avatarUrl}
          />
          <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-0.5 flex items-center justify-center">
            <span className="material-symbols-outlined text-[14px] text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified_user
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashboardTopBar;
