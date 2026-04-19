import DashboardBottomNav from "@/components/dashboard/DashboardBottomNav";
import DashboardTopBar from "@/components/dashboard/DashboardTopBar";
import { usePageMeta } from "@/hooks/usePageMeta";

function MyProfilePage() {
  usePageMeta({
    title: "Kesher | Member Profile",
    bodyClass: "font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container",
    styleId: "page-style-my_profile",
    styles: `body { background-color: #0A0A0A; }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .glass-nav {
            background: rgba(53, 53, 52, 0.6);
            backdrop-filter: blur(20px);
        }
        /* Custom scrollbar for a clean look */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0e0e0e; }
        ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 10px; }`
  });

  return (
    <>
<DashboardTopBar
active="profile"
avatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuD67ZYiEApITyohe-N6XDObq7OedzBYTt0X5IpWBNCNE_FeH_skyN4Xf22cQa0g_b0Iy52LZZQXoHzv9pUqm2UH114-MosuHSme1RNlRu5JlHgPiypmvBMDwrAEQ7ivqWSJApUfAvY6KDvvL8NlOk9yzwUi5tC1xcguII_hwXRRmGp8Y9HsRmEIXzv9xksgj6P7EXm1zTZToiwR0t0oxs-mQYVO8o80lSq_dnFFYbKLr721j56-UtDVbAozXfB1DVyvhAlv3n06t_E"
/>
<main className="pt-24 pb-32 max-w-5xl mx-auto px-6">
{/* Hero Profile Section */}
<section className="relative mb-12">
<div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
{/* Large Profile Photo */}
<div className="md:col-span-5 relative group">
<div className="aspect-[4/5] overflow-hidden rounded-3xl bg-surface-container-low shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
<img alt="User profile photo" className="w-full h-full object-cover" data-alt="dignified young man in dark suit against soft grey background, soft studio lighting, professional and calm expression, premium portrait style" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD67ZYiEApITyohe-N6XDObq7OedzBYTt0X5IpWBNCNE_FeH_skyN4Xf22cQa0g_b0Iy52LZZQXoHzv9pUqm2UH114-MosuHSme1RNlRu5JlHgPiypmvBMDwrAEQ7ivqWSJApUfAvY6KDvvL8NlOk9yzwUi5tC1xcguII_hwXRRmGp8Y9HsRmEIXzv9xksgj6P7EXm1zTZToiwR0t0oxs-mQYVO8o80lSq_dnFFYbKLr721j56-UtDVbAozXfB1DVyvhAlv3n06t_E"/>
</div>
{/* Signature Status Badge */}
<div className="absolute top-6 left-6 flex items-center gap-2 bg-primary-container/10 backdrop-blur-md px-4 py-2 rounded-full border border-primary/20">
<span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
<span className="text-primary text-[10px] font-bold tracking-[0.15em] uppercase">Verified Member</span>
</div>
</div>
{/* Identity Summary */}
<div className="md:col-span-7 pb-4 md:pl-8">
<h1 className="font-headline text-5xl font-extrabold text-on-surface mb-2 tracking-tight">Benjamin Cohen</h1>
<div className="flex flex-wrap gap-4 mb-6">
<span className="text-on-surface-variant font-medium tracking-wide">Age 29 • New York, NY</span>
<span className="bg-primary/10 text-primary text-[11px] px-3 py-1 rounded-full uppercase font-bold tracking-widest border border-primary/10">Cohen</span>
</div>
<p className="text-lg text-on-surface-variant leading-relaxed max-w-xl italic">
                        "Seeking a partnership rooted in shared values, intellectual curiosity, and a deep commitment to building a Jewish home filled with warmth and purpose."
                    </p>
</div>
</div>
</section>
{/* Profile Detail Bento Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
{/* About Me Card */}
<div className="bg-surface-container-low rounded-3xl p-8 transition-all hover:bg-surface-container-high">
<div className="flex items-center gap-3 mb-6">
<span className="material-symbols-outlined text-primary text-2xl">person_2</span>
<h2 className="font-headline text-xl font-bold tracking-wide uppercase text-primary">About Me</h2>
</div>
<div className="space-y-4">
<p className="text-on-surface-variant leading-relaxed">
                        Software architect by day, avid reader and amateur violinist by night. I value deep conversations over small talk and find peace in long walks through Central Park.
                    </p>
<div className="grid grid-cols-2 gap-4 mt-6">
<div className="bg-surface-container-lowest p-4 rounded-2xl">
<span className="text-[10px] text-outline uppercase tracking-widest block mb-1">Education</span>
<span className="text-sm font-medium">M.S. Computer Science, Columbia</span>
</div>
<div className="bg-surface-container-lowest p-4 rounded-2xl">
<span className="text-[10px] text-outline uppercase tracking-widest block mb-1">Occupation</span>
<span className="text-sm font-medium">VP of Engineering</span>
</div>
</div>
</div>
</div>
{/* Religious Lifestyle Card */}
<div className="bg-surface-container-low rounded-3xl p-8 transition-all hover:bg-surface-container-high">
<div className="flex items-center gap-3 mb-6">
<span className="material-symbols-outlined text-primary text-2xl">auto_awesome</span>
<h2 className="font-headline text-xl font-bold tracking-wide uppercase text-primary">Religious Lifestyle</h2>
</div>
<ul className="space-y-4">
<li className="flex justify-between items-center py-2 border-b border-outline-variant/10">
<span className="text-on-surface-variant text-sm">Affiliation</span>
<span className="font-medium text-sm">Modern Orthodox</span>
</li>
<li className="flex justify-between items-center py-2 border-b border-outline-variant/10">
<span className="text-on-surface-variant text-sm">Shabbat Observance</span>
<span className="font-medium text-sm">Shomer Shabbat</span>
</li>
<li className="flex justify-between items-center py-2 border-b border-outline-variant/10">
<span className="text-on-surface-variant text-sm">Kashrut Level</span>
<span className="font-medium text-sm">Glatt Kosher / Cholov Yisroel</span>
</li>
<li className="flex justify-between items-center py-2 border-b border-outline-variant/10">
<span className="text-on-surface-variant text-sm">Daily Learning</span>
<span className="font-medium text-sm">Daf Yomi Participant</span>
</li>
</ul>
</div>
{/* Family Background Card */}
<div className="bg-surface-container-low rounded-3xl p-8 transition-all hover:bg-surface-container-high">
<div className="flex items-center gap-3 mb-6">
<span className="material-symbols-outlined text-primary text-2xl">family_history</span>
<h2 className="font-headline text-xl font-bold tracking-wide uppercase text-primary">Family Background</h2>
</div>
<div className="space-y-4">
<div className="p-4 bg-surface-container-lowest rounded-2xl border-l-4 border-primary/40">
<p className="text-sm text-on-surface-variant italic">"Raised in a close-knit community in Teaneck. Second of four siblings. Family values are the cornerstone of my identity."</p>
</div>
<div className="flex flex-wrap gap-2 pt-2">
<span className="px-4 py-2 bg-secondary-container/30 rounded-full text-xs text-on-surface-variant">Ashkenazi</span>
<span className="px-4 py-2 bg-secondary-container/30 rounded-full text-xs text-on-surface-variant">Siblings: 3</span>
<span className="px-4 py-2 bg-secondary-container/30 rounded-full text-xs text-on-surface-variant">Hometown: Teaneck, NJ</span>
</div>
</div>
</div>
{/* Preferences Card */}
<div className="bg-surface-container-low rounded-3xl p-8 transition-all hover:bg-surface-container-high">
<div className="flex items-center gap-3 mb-6">
<span className="material-symbols-outlined text-primary text-2xl">favorite</span>
<h2 className="font-headline text-xl font-bold tracking-wide uppercase text-primary">Preferences</h2>
</div>
<div className="grid grid-cols-2 gap-3">
<div className="p-3 bg-surface-container-lowest rounded-xl flex flex-col">
<span className="text-[9px] text-outline uppercase tracking-widest mb-1">Age Range</span>
<span className="text-sm font-semibold">24 — 32</span>
</div>
<div className="p-3 bg-surface-container-lowest rounded-xl flex flex-col">
<span className="text-[9px] text-outline uppercase tracking-widest mb-1">Location</span>
<span className="text-sm font-semibold">Tri-state Area</span>
<div className="p-3 bg-surface-container-lowest rounded-xl flex flex-col">
<span className="text-[9px] text-outline uppercase tracking-widest mb-1">Religious Level</span>
<span className="text-sm font-semibold">Modern / Machmir</span>
</div>
<div className="p-3 bg-surface-container-lowest rounded-xl flex flex-col">
<span className="text-[9px] text-outline uppercase tracking-widest mb-1">Education</span>
<span className="text-sm font-semibold">Degree Preferred</span>
</div>
</div>
</div>
</div>
</div></main>
<DashboardBottomNav active="profile" />
    </>
  );
}

export default MyProfilePage;
