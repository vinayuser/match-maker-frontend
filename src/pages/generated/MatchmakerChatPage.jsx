import DashboardBottomNav from "@/components/dashboard/DashboardBottomNav";
import DashboardTopBar from "@/components/dashboard/DashboardTopBar";
import { usePageMeta } from "@/hooks/usePageMeta";

function MatchmakerChatPage() {
  usePageMeta({
    title: "Kesher",
    bodyClass: "bg-background text-on-surface font-body selection:bg-primary/30 min-h-screen flex flex-col",
    styleId: "page-style-matchmaker_chat",
    styles: `.material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            display: inline-block;
            line-height: 1;
            text-transform: none;
            letter-spacing: normal;
            word-wrap: normal;
            white-space: nowrap;
            direction: ltr;
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .monastic-gradient {
            background: linear-gradient(135deg, #f5b41a 0%, #ffd58a 100%);
        }`
  });

  return (
    <>
<DashboardTopBar
active="messages"
avatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuCJstUITCv9gglZMml7qKq-vfyDrHsMkfO0CCfy10OiPCsrdjG2uGad4Pu5K9smaau1Byk4ArcRWGlAgBk2Mrepv_Ya2hrdDupG8NLbF9ot78lj9gleKTT6LyruKXuZztA_wsmzUj4DcRyY0-OBushD0FtjoX4s1FsZ1bNcR76EokQPk9-q1tkodl8kinscSDq9vLsFZ6HY-SSEuiYxGKQ_EleBweFpfswL59T2AuTZLwDZVO0mS5Wjgi2YhCR-PMizlH1-AJdSqRg"
/>
{/* Main Content Canvas */}
<main className="flex-grow pt-24 pb-32 px-4 md:px-8 max-w-6xl mx-auto w-full flex flex-col md:flex-row gap-8 overflow-hidden">
{/* Left Sidebar: Context/Match Profile Snippet */}
<aside className="w-full md:w-80 flex-shrink-0 space-y-6">
<div className="bg-surface-container-low rounded-xl p-6 space-y-4">
<div className="flex flex-col gap-4">
<h2 className="font-headline text-on-surface-variant text-xs tracking-[0.2em] uppercase font-bold">Consultation Subject</h2>
<div className="relative aspect-[3/4] rounded-xl overflow-hidden group">
<img className="w-full h-full object-cover" data-alt="Elegant portrait of a woman with sophisticated lighting, dark background, and soft warm highlights on her face" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXNIoGrz2eMOm_0acenJ-b3cXMwf6xPBGcte5MbF7XXSL1AeRnUG03NTXN2RYX4b4T_KJAD6z7qb3nrSxe4h0pdfaMVHe9NnH7QC42O0_9IV183yeo53MUv6JU5gUAJR354hB-EbDF8E_b1KUYCdNSpP1NIEZfj-mHdnesQiqSmztqDa0LbZEG7wBYLk4h_WNf-2q50YyUAMj0R6QjFmDrOyKICm6YxBETQulUrQrWzxF1gl1-CewA-sJhtEtdckGkzrixENhgmSw"/>
<div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-surface-container-lowest to-transparent">
<h3 className="font-headline text-xl text-primary font-bold">Adina, 28</h3>
<div className="flex items-center gap-2 mt-1">
<span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full uppercase tracking-tighter font-bold">Cohen</span>
<span className="text-on-surface-variant text-xs">Jerusalem</span>
</div>
</div>
</div>
<div className="bg-surface-container-high rounded-lg p-4">
<p className="text-on-surface-variant text-sm leading-relaxed italic">
                            "Looking for someone who values both modern intellectualism and deep-rooted tradition."
                        </p>
</div>
</div>
</div>
{/* Matchmaker Persona */}
<div className="bg-surface-container-low rounded-xl p-6 flex items-center gap-4 border border-outline-variant/15">
<div className="w-12 h-12 rounded-full overflow-hidden monastic-gradient p-[1px]">
<div className="w-full h-full rounded-full overflow-hidden">
<img className="w-full h-full object-cover" data-alt="Kind middle-aged woman with warm eyes and a professional demeanor, softly lit library setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJstUITCv9gglZMml7qKq-vfyDrHsMkfO0CCfy10OiPCsrdjG2uGad4Pu5K9smaau1Byk4ArcRWGlAgBk2Mrepv_Ya2hrdDupG8NLbF9ot78lj9gleKTT6LyruKXuZztA_wsmzUj4DcRyY0-OBushD0FtjoX4s1FsZ1bNcR76EokQPk9-q1tkodl8kinscSDq9vLsFZ6HY-SSEuiYxGKQ_EleBweFpfswL59T2AuTZLwDZVO0mS5Wjgi2YhCR-PMizlH1-AJdSqRg"/>
</div>
</div>
<div>
<h4 className="font-headline text-on-surface font-bold">Rivka</h4>
<p className="text-xs text-primary font-medium tracking-widest uppercase">Senior Matchmaker</p>
</div>
</div>
</aside>
{/* Chat Interface */}
<section className="flex-grow bg-surface-container-lowest rounded-xl flex flex-col relative border border-outline-variant/5">
{/* Chat Header (Mobile Only) */}
<div className="md:hidden px-6 py-4 border-b border-outline-variant/15 flex items-center gap-3">
<span className="material-symbols-outlined text-primary">chat_bubble</span>
<h1 className="font-headline font-bold uppercase tracking-widest text-sm">Consultation</h1>
</div>
{/* Messages Stream */}
<div className="flex-grow overflow-y-auto p-6 space-y-8 hide-scrollbar">
{/* Matchmaker Message */}
<div className="flex gap-4 max-w-[85%]">
<div className="flex-shrink-0 w-8 h-8 rounded-full monastic-gradient flex items-center justify-center">
<span className="material-symbols-outlined text-on-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
</div>
<div className="space-y-2">
<div className="bg-surface-container-high text-on-surface p-5 rounded-2xl rounded-tl-none leading-relaxed text-sm">
                            Good evening. I've spent the afternoon reviewing Adina's profile alongside your preferences. There's a profound alignment in your shared educational backgrounds.
                        </div>
<span className="text-[10px] text-on-surface-variant/40 uppercase tracking-widest ml-1">Rivka • 4:12 PM</span>
</div>
</div>
{/* User Message */}
<div className="flex gap-4 max-w-[85%] ml-auto flex-row-reverse">
<div className="flex-shrink-0 w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center">
<span className="material-symbols-outlined text-on-surface-variant text-sm">person</span>
</div>
<div className="space-y-2 text-right">
<div className="monastic-gradient text-on-primary p-5 rounded-2xl rounded-tr-none leading-relaxed text-sm font-medium">
                            Thank you, Rivka. I noticed she mentioned a love for classical philosophy—that’s a huge plus for me. Do you think our lifestyles are compatible in terms of daily practice?
                        </div>
<span className="text-[10px] text-on-surface-variant/40 uppercase tracking-widest mr-1">4:15 PM</span>
</div>
</div>
{/* Matchmaker Message */}
<div className="flex gap-4 max-w-[85%]">
<div className="flex-shrink-0 w-8 h-8 rounded-full monastic-gradient flex items-center justify-center">
<span className="material-symbols-outlined text-on-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
</div>
<div className="space-y-2">
<div className="bg-surface-container-high text-on-surface p-5 rounded-2xl rounded-tl-none leading-relaxed text-sm">
                            Precisely. Adina is quite intentional about her mornings—much like you described in your sanctuary vision. I believe a conversation would be very fruitful. Shall I facilitate an introduction?
                        </div>
<span className="text-[10px] text-on-surface-variant/40 uppercase tracking-widest ml-1">Rivka • 4:18 PM</span>
</div>
</div>
{/* Typing Indicator (Subtle) */}
<div className="flex gap-2 items-center text-on-surface-variant/40 ml-12">
<span className="text-[10px] uppercase tracking-[0.2em] font-medium">Rivka is reflecting...</span>
</div>
</div>
{/* Input Area */}
<div className="p-6 bg-surface-container-lowest">
<div className="bg-surface-container-high rounded-full p-2 flex items-center gap-2 border border-outline-variant/15 focus-within:border-primary transition-all duration-300">
<button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
<span className="material-symbols-outlined">add_circle</span>
</button>
<input className="flex-grow bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant/40 text-sm px-2" placeholder="Speak with your counselor..." type="text"/>
<button className="monastic-gradient w-10 h-10 rounded-full flex items-center justify-center text-on-primary shadow-lg shadow-primary/10 hover:scale-105 active:scale-95 transition-all">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
</button>
</div>
</div>
</section>
</main>
<DashboardBottomNav active="messages" />
    </>
  );
}

export default MatchmakerChatPage;
