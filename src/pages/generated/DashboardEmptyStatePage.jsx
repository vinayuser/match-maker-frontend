import DashboardBottomNav from "@/components/dashboard/DashboardBottomNav";
import DashboardTopBar from "@/components/dashboard/DashboardTopBar";
import { usePageMeta } from "@/hooks/usePageMeta";

function DashboardEmptyStatePage() {
  usePageMeta({
    title: "Kesher",
    bodyClass: "min-h-screen flex flex-col overflow-hidden",
    styleId: "page-style-dashboard_empty_state",
    styles: `body {
      background-color: #0A0A0A;
      color: #e5e2e1;
      font-family: 'Inter', sans-serif;
    }
    .monastic-gradient {
      background: linear-gradient(135deg, #f5b41a 0%, #ffd58a 100%);
    }
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
    }
    .glass-nav {
      background: rgba(53, 53, 52, 0.6);
      backdrop-filter: blur(20px);
    }
    .asymmetric-offset {
      transform: translateX(40px);
    }`
  });

  return (
    <>
<DashboardTopBar
active="matches"
avatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuBXQ_tSe2SQCWQTjinaiXKCMawfmN89qEYTzcZifXbGKBGiNTTkTllgoLJhy6PjrDztMETG850NgNrYT-TbME7Dkh0NKVQHGvvG9aTo3ulqAeQfITLPn-gd-vCLCzHiDAZjtYtRQcmXPUASHkIC0mjHzsX1qEIr3GI21Frj0Q9qk46tNq8ZgouDuMhYkgwmCnOYHwYv5TZ5ByOt6P7y_In8QF8cQeuBoslG6rGeEfSH6GpB0NGsUhzndylVQB2FLdveM6wJNxz5zaM"
/>
{/* Main Canvas / Empty State */}
<main className="flex-grow flex flex-col items-center justify-center px-8 relative">
{/* Background Texture/Atmosphere */}
<div className="absolute inset-0 pointer-events-none overflow-hidden">
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]"></div>
</div>
{/* Empty State Content */}
<div className="relative z-10 flex flex-col items-center max-w-lg text-center">
{/* Center Illustration: Modern Line-art Shabbat Candles */}
<div className="mb-12 relative">
<svg className="text-primary-container" fill="none" height="240" viewbox="0 0 180 240" width="180" xmlns="http://www.w3.org/2000/svg">
{/* Left Candle */}
<path d="M60 220V100C60 90 70 80 80 80C90 80 100 90 100 100V220" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"></path>
<path d="M80 80V60" stroke="currentColor" stroke-dasharray="4 4" stroke-width="1.5"></path>
<path className="opacity-80" d="M80 50C85 50 88 45 80 30C72 45 75 50 80 50Z" fill="currentColor"></path>
{/* Right Candle */}
<path d="M120 220V120C120 110 130 100 140 100C150 100 160 110 160 120V220" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"></path>
<path d="M140 100V80" stroke="currentColor" stroke-dasharray="4 4" stroke-width="1.5"></path>
<path className="opacity-80" d="M140 70C145 70 148 65 140 50C132 65 135 70 140 70Z" fill="currentColor"></path>
{/* Base/Sanctuary Lines (Asymmetric) */}
<path d="M20 220H160" stroke="currentColor" stroke-opacity="0.3" stroke-width="0.5"></path>
<path d="M40 230H140" stroke="currentColor" stroke-opacity="0.2" stroke-width="0.5"></path>
</svg>
{/* Soft Ambient Glow behind candles */}
<div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-150"></div>
</div>
{/* Typography */}
<div className="space-y-4">
<h1 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight text-on-surface">
          No Matches Found Yet
        </h1>
{/* Asymmetric Subtext Placement */}
<div className="md:flex md:justify-end">
<p className="text-on-surface-variant text-lg font-body max-w-[320px] leading-relaxed md:text-right md:asymmetric-offset">
            The sanctuary is quiet for now. Check back later.
          </p>
</div>
</div>
{/* Action Button (Minimalist) */}
<div className="mt-16">
<button className="monastic-gradient text-on-primary font-label px-12 py-4 rounded-full text-sm font-bold tracking-widest uppercase hover:opacity-90 transition-all shadow-[0_0_40px_rgba(245,180,26,0.15)] active:scale-95">
          Refresh Discovery
        </button>
</div>
</div>
</main>
<DashboardBottomNav active="matches" />
    </>
  );
}

export default DashboardEmptyStatePage;
