import DashboardBottomNav from "@/components/dashboard/DashboardBottomNav";
import DashboardTopBar from "@/components/dashboard/DashboardTopBar";
import { usePageMeta } from "@/hooks/usePageMeta";

function AccountSettingsPage() {
  usePageMeta({
    title: "Account Settings | Kesher",
    bodyClass: "bg-background text-on-background min-h-screen pb-32",
    styleId: "page-style-account_settings",
    styles: `.material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        }
        body {
            font-family: 'Inter', sans-serif;
            background-color: #131313;
        }
        .font-headline {
            font-family: 'Manrope', sans-serif;
        }`
  });

  return (
    <>
<DashboardTopBar
active="profile"
avatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDtnGB718XBRq07coyWjjevbG3S5jO9D_L6iVfgljYx8LVcrqKnX-sX-L7A-pJbp1z6es7WxiUw9YQOrAuqcICTLgPNGlkTJ1uCVng4-VzktkOSr6e0MW5BLZ-fQRgaQyAuhCIxwcLkz1Ufeeca_y8fchKvYMYHgs1KARUdJip6y1rzrJ9PRWWXJ6MNiskv9ZNleTEWcUM8ehuz81CQFLZpW1_0K4ZepMGtjjJBzvuLiduqov51TCh34e0BPIYQDp_V72ZrUzcw1bk"
/>
<main className="max-w-3xl mx-auto pt-32 px-6">
{/* Header Section */}
<section className="mb-16">
<h1 className="text-5xl font-headline font-extrabold tracking-tight text-on-surface mb-2">Settings</h1>
<p className="text-on-surface-variant font-body tracking-wide opacity-80">Manage your private sanctuary and account preferences.</p>
</section>
<div className="space-y-12">
{/* Account Essentials */}
<section>
<div className="flex items-center gap-4 mb-8">
<span className="h-px flex-1 bg-outline-variant/20"></span>
<h2 className="font-headline text-xs font-bold tracking-[0.3em] uppercase text-primary">Account Essentials</h2>
<span className="h-px flex-1 bg-outline-variant/20"></span>
</div>
<div className="space-y-4">
{/* Email Address */}
<div className="group flex items-center justify-between p-6 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-all duration-500 border border-transparent hover:border-outline-variant/10">
<div className="flex items-center gap-6">
<div className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-lowest text-primary">
<span className="material-symbols-outlined">mail</span>
</div>
<div>
<p className="text-[10px] font-bold tracking-[0.2em] uppercase text-on-surface-variant mb-1">Email Address</p>
<p className="text-lg font-medium text-on-surface">j.stern@sanctuary.com</p>
</div>
</div>
<button className="text-primary hover:text-primary-container transition-colors p-2">
<span className="material-symbols-outlined">chevron_right</span>
</button>
</div>
{/* Phone Number */}
<div className="group flex items-center justify-between p-6 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-all duration-500 border border-transparent hover:border-outline-variant/10">
<div className="flex items-center gap-6">
<div className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-lowest text-primary">
<span className="material-symbols-outlined">smartphone</span>
</div>
<div>
<p className="text-[10px] font-bold tracking-[0.2em] uppercase text-on-surface-variant mb-1">Phone Number</p>
<p className="text-lg font-medium text-on-surface">+1 ••• ••• 4492</p>
</div>
</div>
<button className="text-primary hover:text-primary-container transition-colors p-2">
<span className="material-symbols-outlined">chevron_right</span>
</button>
</div>
{/* Change Password */}
<div className="group flex items-center justify-between p-6 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-all duration-500 border border-transparent hover:border-outline-variant/10">
<div className="flex items-center gap-6">
<div className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-lowest text-primary">
<span className="material-symbols-outlined">lock</span>
</div>
<div>
<p className="text-[10px] font-bold tracking-[0.2em] uppercase text-on-surface-variant mb-1">Security</p>
<p className="text-lg font-medium text-on-surface">Change Password</p>
</div>
</div>
<button className="text-primary hover:text-primary-container transition-colors p-2">
<span className="material-symbols-outlined">chevron_right</span>
</button>
</div>
</div>
</section>
{/* Preferences */}
<section>
<div className="flex items-center gap-4 mb-8">
<span className="h-px flex-1 bg-outline-variant/20"></span>
<h2 className="font-headline text-xs font-bold tracking-[0.3em] uppercase text-primary">Preferences</h2>
<span className="h-px flex-1 bg-outline-variant/20"></span>
</div>
{/* Notification Preferences Card */}
<div className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/10 shadow-2xl">
<div className="p-8 border-b border-outline-variant/10 flex justify-between items-center">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>notifications_active</span>
<h3 className="font-headline text-xl font-bold">Notification Preferences</h3>
</div>
<span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold tracking-widest uppercase">Push Active</span>
</div>
<div className="p-8 space-y-8">
<div className="flex items-center justify-between">
<div>
<p className="font-bold text-on-surface">New Matches</p>
<p className="text-sm text-on-surface-variant opacity-70">Notify me when a new kindred spirit is found</p>
</div>
<div className="w-12 h-6 bg-primary-container rounded-full relative cursor-pointer">
<div className="absolute right-1 top-1 w-4 h-4 bg-on-primary rounded-full"></div>
</div>
</div>
<div className="flex items-center justify-between">
<div>
<p className="font-bold text-on-surface">Counsel Guidance</p>
<p className="text-sm text-on-surface-variant opacity-70">Insights from our spiritual advisors</p>
</div>
<div className="w-12 h-6 bg-surface-container-high rounded-full relative cursor-pointer">
<div className="absolute left-1 top-1 w-4 h-4 bg-on-surface-variant/40 rounded-full"></div>
</div>
</div>
</div>
</div>
</section>
{/* Account Status */}
<section className="pt-8">
<div className="flex items-center gap-4 mb-8">
<span className="h-px flex-1 bg-outline-variant/20"></span>
<h2 className="font-headline text-xs font-bold tracking-[0.3em] uppercase text-error">Account Status</h2>
<span className="h-px flex-1 bg-outline-variant/20"></span>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<button className="flex flex-col items-start p-8 rounded-2xl bg-surface-container-low border border-outline-variant/10 hover:bg-surface-container-high transition-all group">
<span className="material-symbols-outlined text-primary mb-4 group-hover:scale-110 transition-transform">pause_circle</span>
<p className="font-headline text-lg font-bold mb-1">Pause Membership</p>
<p className="text-xs text-on-surface-variant opacity-60 text-left">Hide your profile temporarily while you focus inward.</p>
</button>
<button className="flex flex-col items-start p-8 rounded-2xl bg-surface-container-low border border-outline-variant/10 hover:bg-error-container/20 transition-all group">
<span className="material-symbols-outlined text-error mb-4 group-hover:scale-110 transition-transform">cancel</span>
<p className="font-headline text-lg font-bold mb-1 text-on-background">Close Account</p>
<p className="text-xs text-on-surface-variant opacity-60 text-left">Permanently delete your profile and all connections.</p>
</button>
</div>
</section>
</div>
{/* Logout CTA */}
<div className="mt-20 flex justify-center">
<button className="px-12 py-4 rounded-full border border-outline-variant/20 text-on-surface-variant hover:text-primary hover:border-primary/40 transition-all font-headline text-xs font-bold tracking-[0.4em] uppercase">
                Sign Out of Kesher
            </button>
</div>
</main>
<DashboardBottomNav active="profile" />
    </>
  );
}

export default AccountSettingsPage;
