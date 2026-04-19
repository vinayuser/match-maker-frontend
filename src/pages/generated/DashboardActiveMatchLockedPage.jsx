import DashboardBottomNav from "@/components/dashboard/DashboardBottomNav";
import DashboardTopBar from "@/components/dashboard/DashboardTopBar";
import { usePageMeta } from "@/hooks/usePageMeta";

function DashboardActiveMatchLockedPage() {
  usePageMeta({
    title: "Kesher",
    bodyClass: "bg-background text-on-background font-body min-h-screen selection:bg-primary-container selection:text-on-primary-container",
    styleId: "page-style-dashboard_active_match_locked",
    styles: `.material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .monastic-blur {
            backdrop-filter: blur(40px) brightness(0.3);
        }`
  });

  return (
    <>
<DashboardTopBar
active="discover"
avatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuCdUGjsxKSzMywo8miD4A2hgITcSS-2WUlHwKyBcHxhq0LIT-MWF79fGfPFYqajYuS0y9JdvfMAJKIWLky6uZAOsWOcIwgLdAbSg6qGpBMAB42s5HDcXNjdKT1SUzgPBe396T2IHpfKzhhGn8HPxrmBa53H4rZ3_6_uS1Oxz_L4rE-c04-IpnbgnH_k525Lj02Sy-yHu0sBsppSL7bS8AlzAAWJFhPrkxHJuAtslSaOOcylIZlcjPiwfTJCVh8wHCXNHcddUq20f3w"
/>
{/* Main Background Content (Discover Page - Disabled/Blurred) */}
<main className="px-6 py-8 max-w-7xl mx-auto opacity-50 select-none pointer-events-none">
<div className="flex flex-col gap-12">
<header className="flex flex-col gap-2">
<h1 className="font-headline text-5xl font-extrabold tracking-tighter text-on-surface">Curated For You</h1>
<p className="text-on-surface-variant font-body">Refined selections based on your ancestral heritage and shared values.</p>
</header>
{/* Bento Grid of Profiles (Simulated Background) */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[600px]">
<div className="md:col-span-4 bg-surface-container-lowest rounded-xl overflow-hidden relative group">
<img className="w-full h-full object-cover grayscale opacity-60" data-alt="portrait of a young woman with a serene expression, soft lighting, deep shadows, elegant and modest attire" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTHyN6lXp0svwty50uChw1iqzZpJcSztiSTkJb7IbWB-wFhUTU32F4GDmkCdql0dTfjkm8uN2D-3KSlUqx24wt7QxlDzdI71L1A-ZhGubcBD3-JOUXGM1PADVlk1oYIgV6AdngXafEwpc5aslNSSIsOQJ-CwS4zt_xkSxGnaaNVWQZG0sRZTjFQMZf2YOeLLaNqgdCCPgo5_vvy-2RIQUEOPwCCa6zboVgtYK-gx58N4JHQXjYZOuKqq1nllsbeHHBpHuDI5YUbVU"/>
<div className="absolute bottom-0 left-0 p-6 w-full bg-gradient-to-t from-background to-transparent">
<span className="bg-primary-container/10 text-primary px-3 py-1 rounded-full text-xs font-medium mb-2 inline-block">Cohen</span>
<h3 className="font-headline text-2xl font-bold">Sarah, 26</h3>
</div>
</div>
<div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="bg-surface-container-low rounded-xl p-8 flex flex-col justify-end relative overflow-hidden">
<div className="absolute inset-0 opacity-20">
<img className="w-full h-full object-cover" data-alt="shadowy interior of an old library with dust motes dancing in sunbeams, dark wood and leather" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqDO9UEi_qBgp6UQrslpwIOUIjqUpfYF0pta4Wi-0yeGm31SXMauSOkKClaywwT2Ayyry9joyvh2SiI3gwUI1wWLuqwnLdbX5dMcG45qIi9BsyXX7TzEY0beUmNnZmgYfa3RUI8DtNwYsOJgSXCS-dgMnS7pfJVtAGjLB8RRvGdIsx1-w5UYBMH5e00Gc-_xLwUy0CfdhT9vRfTrzMnN_-W11yK69DLmp6S-PBXS2pzk7Y6hOLRBtVt0mOQbZMMY-Yl6p-ikEqjx0"/>
</div>
<div className="relative z-10">
<h3 className="font-headline text-xl font-bold mb-1">Traditional Values</h3>
<p className="text-on-surface-variant text-sm">Members seeking meaningful, long-term commitment.</p>
</div>
</div>
<div className="bg-surface-container-high rounded-xl p-8 flex flex-col items-center justify-center text-center">
<span className="material-symbols-outlined text-4xl text-primary mb-4">auto_awesome</span>
<p className="text-on-surface font-medium">New Matches Arriving Soon</p>
</div>
</div>
</div>
</div>
</main>
{/* Locked State Overlay (The Core Task) */}
<div className="fixed inset-0 z-50 flex items-center justify-center monastic-blur p-6">
{/* Frosted Glass Card */}
<div className="w-full max-w-md bg-[#353534]/40 backdrop-blur-2xl rounded-xl p-10 flex flex-col items-center text-center shadow-[0_-4px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
{/* Decorative Gradient Pulse */}
<div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-container/20 rounded-full blur-3xl"></div>
{/* Central Lock Iconography */}
<div className="relative mb-8">
{/* Gold Ring/Heart Lock */}
<div className="w-24 h-24 rounded-full border-2 border-primary/30 flex items-center justify-center relative">
<div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary-container to-primary flex items-center justify-center shadow-[0_0_30px_rgba(245,180,26,0.3)]">
<span className="material-symbols-outlined text-on-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
</div>
{/* Heart Ornament */}
<div className="absolute -bottom-1 -right-1 bg-surface-container-highest p-1.5 rounded-full border border-outline-variant/20">
<span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
</div>
</div>
</div>
{/* Content */}
<h2 className="font-headline text-3xl font-extrabold tracking-tight text-primary mb-4">Sanctuary Lock</h2>
<p className="text-on-surface-variant font-body leading-relaxed mb-10 text-balance">
                You are in an active match process. Please wait for your matchmaker to contact you.
            </p>
{/* Status Indicator */}
<div className="flex items-center gap-3 bg-primary-container/10 px-6 py-3 rounded-full border border-primary/20">
<div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
<span className="text-primary text-xs font-bold tracking-widest uppercase">Under Review</span>
</div>
{/* Secondary Action */}
<button className="mt-8 text-on-surface-variant text-xs tracking-widest uppercase font-bold hover:text-primary transition-all">
                Learn About Our Process
            </button>
</div>
</div>
<DashboardBottomNav active="discover" />
    </>
  );
}

export default DashboardActiveMatchLockedPage;
