import DashboardBottomNav from "@/components/dashboard/DashboardBottomNav";
import DashboardTopBar from "@/components/dashboard/DashboardTopBar";
import { usePageMeta } from "@/hooks/usePageMeta";

function MatchmakingPendingInvitationsPage() {
  usePageMeta({
    title: "Kesher",
    bodyClass: "bg-background text-on-background font-body selection:bg-primary-container selection:text-on-primary-container",
    styleId: "page-style-matchmaking_pending_invitations",
    styles: `.material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }
    .glass-nav {
      background: rgba(53, 53, 52, 0.6);
      backdrop-filter: blur(20px);
    }
    .asymmetric-shadow {
      box-shadow: 20px 20px 60px #0e0e0e, -20px -20px 60px #1c1b1b;
    }
    .monastic-gradient {
      background: linear-gradient(135deg, #F5B41A 0%, #FFD58A 100%);
    }`
  });

  return (
    <>
<DashboardTopBar
active="matches"
avatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuC4ERUym7ivqPBNqGYQ-UYsMNdR0G5acjJZoxtqMJH-BOCQ45KQ_OouB9OcuhwGv0qyR6zoFgUPnVXVFq12rn50opx8n_dQeUqs9Pgr2a4xVsTLdiztJVS-g2xKgslywa_BEjNzugPZ6qCAs8NS4AgcHMSE4bJdT3Ryw8YDulTo5T5Typjt8C6TrSQiLnZms-k_fpsnsdqAx6mice0IOYCkQKeOb0MzMZw-x5HMPrHrta-MgutZmcoWKavJ1D9fX-D1w9dspc2n2TQ"
/>
<main className="pt-24 pb-32 px-6 max-w-lg mx-auto min-h-screen">
{/* Header Section */}
<div className="mb-10">
<h1 className="font-headline text-[2.5rem] font-extrabold leading-tight tracking-tight text-on-surface">
        Pending Invitations
      </h1>
<p className="text-on-surface-variant font-body mt-2 tracking-wide">
        Intentional connections awaiting your grace.
      </p>
</div>
{/* Asymmetric Invitation Card */}
<div className="relative group">
<div className="absolute -inset-1 monastic-gradient rounded-[2rem] blur opacity-10 transition duration-1000 group-hover:opacity-20"></div>
<div className="relative bg-surface-container-lowest rounded-[2rem] overflow-hidden asymmetric-shadow">
{/* Slightly Blurred Profile Image */}
<div className="relative h-[480px] w-full overflow-hidden">
<img alt="Blurred portrait of a potential match" className="w-full h-full object-cover scale-105 blur-[2px]" data-alt="Dreamy portrait of a woman in elegant attire, golden hour lighting, slight artistic lens blur for privacy" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_EyqLXcExt1gv6AFVS_52vqYRl76TWA3K9UplbAX2M5-8PEQV1zqouqVG-OJC8Als3Tt0GM3_BPr_TzhMebfKjyxYixcyuhdnYGta1P8DX-s3eYnQb7LXbTuteqsrzYCiJ_RuUVxdiSVycgfpQ-2Ae5zGvUZnstW-adPsASx_pLnHrzgqJ6aAiYM2PTdKyMzhX8cPiuNeVithIC3nMtnvsfqkXfFFwSsVZjt8fabTyLFhjqnVI_o_BYudKU0UZw0EaELbanFYB4I"/>
{/* Scrim for readability */}
<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
{/* Overlay Content */}
<div className="absolute bottom-0 left-0 p-8 w-full">
<div className="flex items-center gap-2 mb-3">
<span className="bg-primary-container/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase border border-primary/20">
                Premium
              </span>
<span className="bg-surface-container-high/60 backdrop-blur-md text-on-surface px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase">
                2.4 miles away
              </span>
</div>
<h2 className="font-headline text-3xl font-bold text-white mb-2">Sarah, 28</h2>
<p className="text-[#FFD58A] font-body text-sm leading-relaxed max-w-[280px]">
              This connection is one step away. Review details before accepting.
            </p>
</div>
</div>
{/* Detail Peek Section */}
<div className="p-8 bg-surface-container-low border-t border-outline-variant/10">
<div className="flex flex-wrap gap-6">
<div>
<p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Heritage</p>
<p className="text-sm font-medium text-on-surface">Ashkenazi</p>
</div>
<div>
<p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Education</p>
<p className="text-sm font-medium text-on-surface">Masters in Philosophy</p>
</div>
</div>
</div>
</div>
</div>
{/* Action Buttons */}
<div className="mt-10 flex flex-col gap-4">
<button className="monastic-gradient text-on-primary font-headline font-bold py-5 rounded-full text-lg tracking-tight transition-transform active:scale-95 shadow-lg shadow-primary-container/20">
        Accept Match
      </button>
<button className="text-on-surface-variant hover:text-on-surface font-label font-medium py-3 rounded-full text-sm tracking-[0.15em] uppercase transition-colors">
        Decline
      </button>
</div>
{/* Privacy Disclaimer */}
<div className="mt-12 text-center px-8">
<p className="text-xs text-on-surface-variant/50 leading-relaxed font-body">
        All invitations expire within 48 hours to maintain the sanctity of time and focus.
      </p>
</div>
</main>
<DashboardBottomNav active="matches" />
    </>
  );
}

export default MatchmakingPendingInvitationsPage;
