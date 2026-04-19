import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/routes/paths";

function VerificationPendingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const previousTitle = document.title;
    const previousBodyClass = document.body.className;

    document.title = 'Kesher';
    document.body.className = 'font-body selection:bg-primary-container selection:text-on-primary' || "bg-background text-on-background";

    const styleTagId = "page-style-verification_pending";
    let styleEl = document.getElementById(styleTagId);
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleTagId;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = ".material-symbols-outlined {\n            font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24;\n        }\n        body {\n            background-color: #0A0A0A;\n            color: #e5e2e1;\n        }";

    return () => {
      document.title = previousTitle;
      document.body.className = previousBodyClass;
      const current = document.getElementById(styleTagId);
      if (current) current.remove();
    };
  }, []);

  return (
    <>
{/* TopNavBar Suppression: Page is task-focused/transactional wait state */}
<main className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
{/* Ambient Background Aesthetic */}
<div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full"></div>
<div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-outline-variant/10 blur-[100px] rounded-full"></div>
{/* Central Content Container */}
<div className="max-w-2xl w-full text-center space-y-12 relative z-10">
{/* Branding Subtle Anchor */}
<div className="flex flex-col items-center gap-2 mb-8">
<span className="text-primary-container font-headline text-2xl font-bold tracking-[0.2em] uppercase">Kesher</span>
<div className="w-1 h-1 bg-primary rounded-full"></div>
</div>
{/* Hero Iconography */}
<div className="relative flex justify-center items-center">
{/* Golden Glow */}
<div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full scale-50"></div>
<div className="w-48 h-48 rounded-full border border-outline-variant/20 flex items-center justify-center bg-surface-container-lowest/50 backdrop-blur-md">
<span className="material-symbols-outlined text-8xl text-primary-container" style={{ fontVariationSettings: "'wght' 100" }}>
                        hourglass_empty
                    </span>
</div>
</div>
{/* Typography Cluster */}
<div className="space-y-6">
<h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight text-on-background">
                    Your Application is in <br/>
<span className="text-primary italic">the Sanctuary</span>
</h1>
<div className="flex justify-center">
<div className="h-[1px] w-12 bg-outline-variant/30"></div>
</div>
<p className="text-on-surface-variant font-body text-lg leading-relaxed max-w-md mx-auto opacity-80">
                    Our stewards are personally reviewing your lineage and intent. Please allow 24-48 hours for verification.
                </p>
</div>
{/* CTA Section */}
<div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-4">
<button
  onClick={() => navigate(ROUTE_PATHS.ABOUT_US)}
  className="group relative px-8 py-4 bg-gradient-to-br from-primary-container to-primary text-on-primary rounded-full font-label font-semibold text-sm tracking-widest uppercase transition-all hover:scale-105 active:scale-95 shadow-[0_4px_40px_rgba(245,180,26,0.15)]"
>
                    Explore Philosophy
                </button>
<button
  onClick={() => navigate(ROUTE_PATHS.FAQ)}
  className="px-8 py-4 text-primary font-label font-semibold text-sm tracking-widest uppercase hover:text-on-background transition-colors duration-300"
>
                    View FAQ
                </button>
<button
  onClick={() => navigate(ROUTE_PATHS.LANDING)}
  className="px-8 py-4 text-on-surface-variant font-label font-semibold text-sm tracking-widest uppercase hover:text-primary transition-colors duration-300"
>
                    Home
                </button>
</div>
{/* Status Badge */}
<div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-full border border-primary/5">
<span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
<span className="text-primary font-label text-[10px] font-bold tracking-[0.2em] uppercase">Status: Reviewing</span>
</div>
</div>
{/* Subtle Textural Footer */}
<div className="absolute bottom-12 left-0 w-full text-center">
<p className="text-outline-variant/40 font-label text-[10px] tracking-[0.3em] uppercase">
                Privacy • Integrity • Community
            </p>
</div>
</main>
{/* Bottom Navigation Suppressed for Focus Journey */}
{/* Ambient Texture Image */}
<div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay">
<img className="w-full h-full object-cover" data-alt="extreme close-up of dark brushed metal or charcoal paper texture with subtle grain and elegant feel" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDH3f-9SGUdB9ShON9Sx4KVute6h_UT93Wx1yPYQqY7IbTP-QZ6iS-XKP9QQrwESCwI1CjI4Wkn1o2cKHQx-1Eyj5E2EfT8wdfKgAJz9bRfXDjHNNPg3DX8xW2SwcuQA8tudDcvyUijJk4CbaZU568-bfYHw6QI2qVq6uFXgCg-yjN3BI7_wy1LaLbK_UzpqSU7u5nEVtpTKpGrKf92PyMpxFA8YjKBEQkMpzhG_8ZSi8nRoSp_d4arzubZprAivW_81m93dJvX6zY"/>
</div>
    </>
  );
}

export default VerificationPendingPage;
