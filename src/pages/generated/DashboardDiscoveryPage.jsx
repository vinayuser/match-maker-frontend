import DashboardBottomNav from "@/components/dashboard/DashboardBottomNav";
import DashboardTopBar from "@/components/dashboard/DashboardTopBar";
import { usePageMeta } from "@/hooks/usePageMeta";

function DashboardDiscoveryPage() {
  usePageMeta({
    title: "Kesher Dashboard - Profile Discovery",
    bodyClass: "bg-background text-on-surface selection:bg-primary-container selection:text-on-primary-container",
    styleId: "page-style-dashboard_discovery",
    styles: `.material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        body {
            background-color: #131313;
            color: #e5e2e1;
            font-family: 'Inter', sans-serif;
        }
        .asymmetric-canvas {
            display: grid;
            grid-template-columns: 1fr minmax(0, 500px) 1fr;
            padding-top: 5rem;
            padding-bottom: 8rem;
        }
        @media (max-width: 768px) {
            .asymmetric-canvas {
                grid-template-columns: 1rem 1fr 1rem;
                padding-top: 4rem;
                padding-bottom: 7rem;
            }
        }`
  });

  return (
    <>
<DashboardTopBar
active="discover"
avatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuBC9Zbh4TY0kENOOEPlV2SUidn4oUfnbbSfXZNGnyLdt64UKaJ9yllYhqUhA4KsQfHxAtusLrqS2OKGM1RZNdibX_1qmKCQoYAs2anmkPO1ErG4v3v3a7eppD_S_DoRI17hoQI9R5_I2D-2GjqCvakXGqKSDF58Ma55TGM3lRCH3oaTGMwPenh2gO6Vs7dvYSAC7KRKb_XkTVXeepEDp940-Q2DIYMwa_eHT3HU7O8PkFIM2JuFfrhD0AYArgvtEmVpAgkwKDvSOWU"
/>
<main className="asymmetric-canvas min-h-screen">
<section className="col-start-2 relative">
{/* Main Discovery Card */}
<div className="relative bg-surface-container-lowest rounded-xl overflow-hidden shadow-2xl transition-all duration-500 scale-100 group">
{/* Photo Carousel Area */}
<div className="relative h-[650px] w-full">
<img alt="Tall profile card background image" className="w-full h-full object-cover" data-alt="Elegant portrait of a young woman standing in a hallowed library, warm golden light filtering through dust motes, cinematic atmosphere" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtwEvR4uqPjmlWF0S0EKFaVMFTiMy2Nqtg40ZHlJ1A7MF6QobPnV1HdyckMAm74fTbwHXkAq0btp3rK59dTmSu0KStLXpuCJ4ISRr70XC3F-CGM2KvIUrVL70udmkcWteWF0ZVIuAnuTW61-qTmdqS7FujpR_quboVJPn4Bd9ekhqvHJOFdhgMTwdh6pvnmKayHVJmke9E-bUf1xcVudF1ZJGcn_1AsWrRnUww-8vAf7G2JSdC5AbzSQ31cItxBSHEi4rDT292oNE"/>
{/* Gradient Overlay */}
<div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90"></div>
{/* Carousel Indicators (Gold Dots) */}
<div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
<span className="w-8 h-1 rounded-full bg-primary-container shadow-lg shadow-primary-container/20"></span>
<span className="w-1.5 h-1 rounded-full bg-on-surface-variant/40"></span>
<span className="w-1.5 h-1 rounded-full bg-on-surface-variant/40"></span>
<span className="w-1.5 h-1 rounded-full bg-on-surface-variant/40"></span>
</div>
{/* Religious Status Badge (Gold Pill) */}
<div className="absolute top-8 right-6">
<span className="px-4 py-1.5 rounded-full bg-primary-container/10 border border-primary-container/20 text-primary font-headline text-[10px] tracking-widest uppercase font-bold backdrop-blur-md">
                            Dati Leumi
                        </span>
</div>
{/* Profile Info Overlay */}
<div className="absolute bottom-0 left-0 w-full p-8 space-y-6">
<div className="space-y-1">
<h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight">Avigail, 26</h1>
<p className="font-body text-on-surface-variant/80 text-lg flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-sm">location_on</span>
                                Jerusalem, Israel
                            </p>
</div>
<div className="flex flex-wrap gap-3">
<div className="bg-surface-container-high/60 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-outline-variant/10">
<p className="text-xs text-on-surface-variant font-label uppercase tracking-widest">Occupation</p>
<p className="text-sm font-medium text-on-surface">Art Curator</p>
</div>
<div className="bg-surface-container-high/60 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-outline-variant/10">
<p className="text-xs text-on-surface-variant font-label uppercase tracking-widest">Education</p>
<p className="text-sm font-medium text-on-surface">Masters in Fine Arts</p>
</div>
</div>
{/* Halachic Warning Banner */}
<div className="w-full bg-gradient-to-r from-primary-container/20 to-transparent border-l-2 border-primary-container p-4 rounded-r-lg">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>shrine</span>
<p className="font-headline text-sm font-bold text-primary tracking-wide">Halachic Compatibility: High Match</p>
</div>
</div>
</div>
</div>
</div>
{/* Action Buttons Area */}
<div className="mt-8 flex flex-col md:flex-row items-center gap-4">
<button className="w-full md:flex-1 py-5 rounded-full bg-gradient-to-br from-primary-container to-primary text-on-primary font-headline font-extrabold tracking-widest uppercase text-sm shadow-[0_10px_30px_rgba(245,180,26,0.15)] hover:scale-[1.02] active:scale-95 transition-all">
                    Send Interest
                </button>
<button className="w-full md:w-24 py-5 rounded-full border border-outline-variant/30 text-on-surface-variant hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center group">
<span className="material-symbols-outlined group-hover:rotate-12 transition-transform">close</span>
<span className="md:hidden ml-2 font-headline uppercase text-xs tracking-widest">Pass</span>
</button>
</div>
</section>
</main>
<DashboardBottomNav active="discover" />
    </>
  );
}

export default DashboardDiscoveryPage;
