import { useEffect } from "react";

function MatchReceivedModalPage() {
  useEffect(() => {
    const previousTitle = document.title;
    const previousBodyClass = document.body.className;

    document.title = 'Kesher | Match Received';
    document.body.className = 'bg-background text-on-surface font-body antialiased' || "bg-background text-on-background";

    const styleTagId = "page-style-match_received_modal";
    let styleEl = document.getElementById(styleTagId);
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleTagId;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = ".material-symbols-outlined {\n            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;\n        }\n        .glass-panel {\n            background: rgba(53, 53, 52, 0.6);\n            backdrop-filter: blur(20px);\n        }\n        .monastic-gradient {\n            background: linear-gradient(135deg, #f5b41a 0%, #ffd58a 100%);\n        }";

    return () => {
      document.title = previousTitle;
      document.body.className = previousBodyClass;
      const current = document.getElementById(styleTagId);
      if (current) current.remove();
    };
  }, []);

  return (
    <>
{/* Discovery Dashboard Background (Blurred) */}
<main aria-hidden="true" className="min-h-screen filter blur-xl transition-all duration-700 overflow-hidden select-none">
{/* TopAppBar Placeholder */}
<div className="fixed top-0 w-full flex justify-between items-center px-8 h-20 z-10 bg-[#131313]">
<span className="text-2xl font-bold tracking-[0.2em] text-[#F5B41A] font-headline uppercase">Kesher</span>
<div className="flex gap-4">
<span className="material-symbols-outlined text-[#D4C4AC]">notifications</span>
</div>
</div>
{/* Dashboard Content Mock */}
<div className="pt-24 px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
<div className="aspect-[3/4] bg-surface-container-low rounded-[24px]"></div>
<div className="aspect-[3/4] bg-surface-container-low rounded-[24px]"></div>
<div className="aspect-[3/4] bg-surface-container-low rounded-[24px]"></div>
</div>
</main>
{/* Modal Overlay */}
<div className="fixed inset-0 z-[60] flex items-center justify-center p-6 sm:p-12">
{/* Backdrop Backdrop */}
<div className="absolute inset-0 bg-surface-container-lowest/80 backdrop-blur-md"></div>
{/* Central Match Card */}
<div className="relative z-[70] w-full max-w-md animate-in fade-in zoom-in duration-500">
<div className="bg-surface-container-low rounded-[32px] p-1 shadow-[0_-4px_40px_rgba(245,180,26,0.12)] overflow-hidden">
<div className="monastic-gradient rounded-[31px] p-[1px]">
<div className="bg-surface-container-lowest rounded-[30px] overflow-hidden p-6 flex flex-col items-center">
{/* Potential Match Image (Artistically Blurred) */}
<div className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden mb-8 border border-outline-variant/15">
<img alt="Potential match" className="w-full h-full object-cover blur-sm scale-105" data-alt="atmospheric portrait of a woman in soft golden hour light, intentionally blurred for aesthetic mystery, warm highlights, high-end editorial feel" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3jhG4XpxjdLkJaIC-38f7ZfViBD7Ktoi8b3gsQSE2RgenNvbO5TYYSZ0gFXNNZgv5TjgmH0tKIjAhGcgHi6V29UXsA9ht_c-YzjLgwf3fGGRxwH6ebkDMaC0Y8Z-1mGFCBIB64gvAyhmx5HnCHCWrHQ7Kh07airni1jLKfxm7A44_xa8TmQUfWLsWHIOi9fSbpcEOBSIi3aBKLzGGRAgbmajV6gf6o1_Ayqgf6al6uwETzcsU4iqNEgetZXXlC8A7qLV1yNJC_1I"/>
<div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
</div>
{/* Match Badge */}
<div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-container/10 border border-primary/20 mb-4">
<span className="text-primary text-[10px] font-medium tracking-[0.2em] uppercase font-label">Potential Affinity</span>
</div>
{/* Headlines */}
<h1 className="text-3xl md:text-4xl font-extrabold font-headline text-on-surface text-center mb-2 tracking-tight">
                            A Connection Awaits
                        </h1>
<p className="text-on-surface-variant text-center max-w-[240px] leading-relaxed mb-10 font-body text-sm opacity-80">
                            The algorithm has recognized a profound alignment in your spiritual and cultural values.
                        </p>
{/* Actions */}
<div className="w-full space-y-4">
<button className="w-full py-5 rounded-full monastic-gradient text-on-primary font-bold text-sm tracking-widest uppercase shadow-lg shadow-primary-container/20 active:scale-[0.98] transition-transform">
                                Review Profile
                            </button>
<button className="w-full py-3 rounded-full text-primary font-medium text-[11px] tracking-[0.2em] uppercase opacity-70 hover:opacity-100 transition-opacity">
                                Decline
                            </button>
</div>
</div>
</div>
</div>
</div>
</div>
{/* BottomNavBar (Hidden or Visible based on app state, here visible but blurred/layered below) */}
<nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-6 py-4 pb-8 bg-[#353534]/60 backdrop-blur-xl z-50 rounded-t-[32px] shadow-[0_-4px_40px_rgba(245,180,26,0.08)] pointer-events-none opacity-50">
<div className="flex flex-col items-center justify-center bg-[#F5B41A]/10 text-[#F5B41A] rounded-full px-6 py-2 transition-all">
<span className="material-symbols-outlined" data-icon="explore">explore</span>
<span className="font-inter text-[10px] font-medium tracking-widest uppercase">Discover</span>
</div>
<div className="flex flex-col items-center justify-center text-[#D4C4AC] opacity-60">
<span className="material-symbols-outlined" data-icon="favorite">favorite</span>
<span className="font-inter text-[10px] font-medium tracking-widest uppercase">Matches</span>
</div>
<div className="flex flex-col items-center justify-center text-[#D4C4AC] opacity-60">
<span className="material-symbols-outlined" data-icon="auto_awesome">auto_awesome</span>
<span className="font-inter text-[10px] font-medium tracking-widest uppercase">Counsel</span>
</div>
<div className="flex flex-col items-center justify-center text-[#D4C4AC] opacity-60">
<span className="material-symbols-outlined" data-icon="person">person</span>
<span className="font-inter text-[10px] font-medium tracking-widest uppercase">Profile</span>
</div>
</nav>
    </>
  );
}

export default MatchReceivedModalPage;
