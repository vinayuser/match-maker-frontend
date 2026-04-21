import { useCallback, useMemo, useRef, useState } from "react";
import DashboardBottomNav from "@/components/dashboard/DashboardBottomNav";
import DashboardTopBar from "@/components/dashboard/DashboardTopBar";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useEffect } from "react";
import { fetchDiscoveryCards, sendInterestRequest } from "@/api/discovery";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80";

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
            overflow: hidden;
        }
        .glass-card {
            background: rgba(32, 31, 31, 0.8);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
        }
        .gold-gradient-btn {
            background: linear-gradient(135deg, #FFD58A 0%, #F5B41A 100%);
        }`
  });

  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [connecting, setConnecting] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [distanceKm, setDistanceKm] = useState(100);
  const [selectedReligious, setSelectedReligious] = useState("");
  const [selectedVesselTags, setSelectedVesselTags] = useState([]);
  const [selectedGender, setSelectedGender] = useState("auto");
  const [minMatchPercent, setMinMatchPercent] = useState(65);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);
  const pointerStartX = useRef(0);
  const activePointerId = useRef(null);
  const cardRef = useRef(null);

  const loadDiscoveryCards = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchDiscoveryCards({
        limit: 30,
        minMatchPercent,
        preferredGender: selectedGender === "auto" ? "" : selectedGender
      });
      setCards(data?.cards || []);
      setIndex(0);
    } catch (e) {
      setError(e.message || "Failed to load discovery cards.");
    } finally {
      setLoading(false);
    }
  }, [minMatchPercent, selectedGender]);

  useEffect(() => {
    loadDiscoveryCards();
  }, [loadDiscoveryCards]);

  const religiousOptions = useMemo(() => [...new Set(cards.map((card) => card.religiousLevel).filter(Boolean))], [cards]);

  const vesselTagsByCard = useMemo(() => {
    const map = new Map();
    cards.forEach((card) => {
      const tags = [];
      const occupation = (card.occupation || "").toLowerCase();
      const education = (card.educationLevel || "").toLowerCase();
      if (education.includes("master") || education.includes("phd") || education.includes("bachelor")) tags.push("ACADEMIC");
      if (occupation.includes("designer") || occupation.includes("artist") || occupation.includes("architect")) tags.push("CREATIVE");
      if (occupation.includes("manager") || occupation.includes("lead") || occupation.includes("director")) tags.push("LEADERSHIP");
      if (tags.length === 0) tags.push("GENERAL");
      map.set(card.userId, tags);
    });
    return map;
  }, [cards]);

  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const religiousOk = !selectedReligious || card.religiousLevel === selectedReligious;
      const vesselTags = vesselTagsByCard.get(card.userId) || [];
      const vesselOk = selectedVesselTags.length === 0 || selectedVesselTags.some((tag) => vesselTags.includes(tag));
      return religiousOk && vesselOk;
    });
  }, [cards, selectedReligious, selectedVesselTags, vesselTagsByCard]);

  const current = filteredCards[index] || null;
  const nextCard = filteredCards[index + 1] || null;
  const upcomingCards = useMemo(() => filteredCards.slice(index + 2, index + 5), [filteredCards, index]);
  const dragProgress = Math.min(1, Math.abs(dragX) / 120);
  const stackProgress = swipeDirection ? 1 : dragging ? dragProgress : 0;

  const shiftCard = (direction) => {
    if (!current || isSwiping) return;
    setIsSwiping(true);
    setSwipeDirection(direction);
    window.setTimeout(() => {
      setIndex((prev) => prev + 1);
      setSwipeDirection(null);
      setDragX(0);
      setDragging(false);
      setIsSwiping(false);
    }, 240);
  };

  const onPass = () => shiftCard("left");

  const onConnect = async () => {
    if (!current || connecting || isSwiping) return;
    const targetUserId = current.userId;
    shiftCard("right");
    try {
      setConnecting(true);
      await sendInterestRequest(targetUserId);
    } catch (e) {
      setError(e.message || "Failed to send interest.");
    } finally {
      setConnecting(false);
    }
  };

  const handlePointerDown = (event) => {
    if (!current || isSwiping || swipeDirection) return;
    if (activePointerId.current !== null) return;
    activePointerId.current = event.pointerId;
    pointerStartX.current = event.clientX;
    setDragging(true);
    if (cardRef.current?.setPointerCapture) {
      cardRef.current.setPointerCapture(event.pointerId);
    }
  };

  const handlePointerMove = (event) => {
    if (!dragging || isSwiping || activePointerId.current !== event.pointerId) return;
    const delta = event.clientX - pointerStartX.current;
    setDragX(delta);
  };

  const handlePointerUp = (event) => {
    if (!dragging || activePointerId.current !== event.pointerId) return;
    const delta = dragX;
    activePointerId.current = null;
    pointerStartX.current = null;
    if (Math.abs(delta) > 80) {
      if (delta > 0) onConnect();
      else onPass();
      return;
    }
    setDragX(0);
    setDragging(false);
  };

  const toggleVesselTag = (tag) => {
    setSelectedVesselTags((prev) => (prev.includes(tag) ? prev.filter((x) => x !== tag) : [...prev, tag]));
    setIndex(0);
  };

  const clearFilters = () => {
    setDistanceKm(100);
    setSelectedReligious("");
    setSelectedVesselTags([]);
    setSelectedGender("auto");
    setMinMatchPercent(65);
    setIndex(0);
  };

  const renderCardContent = (card, { nameClass = "text-4xl" } = {}) => (
    <div className="relative h-full w-full overflow-hidden">
      <img alt={`${card.fullName} profile`} className="w-full h-full object-cover" src={card.avatarUrl || FALLBACK_IMG} />
      <div className="absolute top-0 left-0 w-full p-5 bg-gradient-to-b from-black/65 to-transparent">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 backdrop-blur-md rounded-full border border-primary/30">
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          <span className="text-[10px] text-primary font-bold tracking-widest uppercase">Verified Sanctuary Member</span>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[56%] bg-gradient-to-t from-[#131313] via-[#131313]/75 to-transparent" />

      <div className="absolute bottom-0 left-0 w-full p-5 md:p-6">
        <div className="flex items-end justify-between mb-3">
          <div>
            <h3 className={`${nameClass} font-headline font-extrabold tracking-tight leading-none text-on-surface`}>
              {(card.firstName || card.fullName || "Profile").split(" ")[0]}
              {card.age ? `, ` : ""}
              <span className="text-primary/80 font-medium">{card.age || ""}</span>
            </h3>
            <div className="flex items-center gap-2 mt-1 text-outline font-medium">
              <span className="material-symbols-outlined text-sm">location_on</span>
              <span className="text-sm">{[card.city, card.country].filter(Boolean).join(", ") || "Location not set"}</span>
            </div>
          </div>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-black/35 hover:bg-black/50 transition-colors">
            <span className="material-symbols-outlined text-primary/95">info</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {[
            card.religiousLevel || "Observant",
            ...((vesselTagsByCard.get(card.userId) || []).length ? vesselTagsByCard.get(card.userId) : ["GENERAL"]),
            card.occupation || "Professional"
          ]
            .slice(0, 3)
            .map((tag) => (
              <span
                key={`${card.userId}-${tag}`}
                className="px-3 py-1.5 rounded-full bg-surface-container-highest/95 border border-outline-variant/20 text-[11px] font-semibold text-on-surface-variant"
              >
                {tag}
              </span>
            ))}
        </div>

        <button className="w-full py-3 rounded-lg bg-surface-container-high/90 border border-primary/10 hover:bg-surface-bright transition-all flex items-center justify-center gap-2">
          <span className="text-sm font-headline font-bold uppercase tracking-widest text-primary">View Full Profile</span>
          <span className="material-symbols-outlined text-primary">arrow_forward</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <DashboardTopBar active="discover" />
      <div className="flex flex-1 mt-20 h-[calc(100vh-5rem)] overflow-hidden">
        <main className="flex-1 relative flex flex-col items-center justify-center overflow-hidden px-4 md:px-6">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
          {error ? <div className="mb-4 border border-error/30 bg-error/10 text-error rounded-lg px-4 py-3 text-sm">{error}</div> : null}
          {loading ? (
            <div className="glass-card rounded-xl p-10 text-center text-on-surface-variant border border-outline-variant/10">
              Loading your curated matches...
            </div>
          ) : !current ? (
            <div className="glass-card rounded-xl p-10 text-center text-on-surface-variant border border-outline-variant/10">
              No more profiles for now. Check back soon for new matches.
            </div>
          ) : (
            <div className="w-full max-w-[430px] h-full flex flex-col items-center justify-center">
              <div className="relative w-full h-[min(55vh,560px)] min-h-[420px] flex items-center justify-center">
                {upcomingCards.map((previewCard, idx) => {
                  const translateY = 28 + idx * 12;
                  const width = 91 - idx * 4;
                  const previewName = (previewCard.firstName || previewCard.fullName || "Profile").split(" ")[0];
                  return (
                    <div
                      key={`deck-layer-${previewCard.userId}`}
                      className="absolute left-1/2 top-0 h-[92px] rounded-t-[14px] rounded-b-[10px] border border-[#9D8F79]/25 shadow-[0_8px_20px_rgba(0,0,0,0.28)] pointer-events-none overflow-hidden"
                      style={{
                        width: `${width}%`,
                        transform: `translateX(-50%) translateY(${translateY}px)`,
                        zIndex: 8 - idx
                      }}
                    >
                      <img
                        src={previewCard.avatarUrl || FALLBACK_IMG}
                        alt={`${previewCard.fullName} preview`}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                      <div className="absolute left-3 top-2 text-[11px] font-semibold text-[#F5E7C2] tracking-wide">
                        {previewName}
                        {previewCard.age ? `, ${previewCard.age}` : ""}
                      </div>
                    </div>
                  );
                })}

                {nextCard ? (
                  <article
                    key={`next-${nextCard.userId}`}
                    className="absolute inset-x-0 bottom-0 top-10 bg-[#1A1A1A] rounded-xl border border-[#9D8F79]/16 shadow-[0_16px_36px_rgba(0,0,0,0.4)] overflow-hidden pointer-events-none transition-transform duration-240 ease-out"
                    style={{
                      zIndex: 20,
                      transform: `translateY(${18 * (1 - stackProgress)}px) scale(${0.96 + 0.04 * stackProgress})`,
                      opacity: 0.86 + 0.14 * stackProgress
                    }}
                  >
                    {renderCardContent(nextCard)}
                  </article>
                ) : null}

                <article
                  key={`active-${current.userId}`}
                  ref={cardRef}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  className="absolute inset-x-0 bottom-0 top-10 bg-[#1A1A1A] rounded-xl border border-[#9D8F79]/18 shadow-[0_20px_50px_rgba(0,0,0,0.55)] overflow-hidden transition-transform duration-240 ease-out cursor-grab active:cursor-grabbing touch-none select-none will-change-transform"
                  style={{
                    zIndex: 30,
                    transform:
                      swipeDirection === "left"
                        ? "translateX(-130%) rotate(-12deg)"
                        : swipeDirection === "right"
                          ? "translateX(130%) rotate(12deg)"
                          : dragging
                            ? `translateX(${dragX}px) rotate(${Math.max(-12, Math.min(12, dragX / 18))}deg)`
                            : "translateY(0) scale(1)"
                  }}
                >
                  {renderCardContent(current)}
                </article>
              </div>

              <div className="mt-3 md:mt-4 flex items-center justify-center gap-2.5 md:gap-3 z-50">
                <button
                  onClick={onPass}
                  className="w-11 h-11 md:w-[48px] md:h-[48px] rounded-lg flex items-center justify-center border border-transparent bg-surface-container-low hover:bg-surface-bright transition-all active:scale-95 group shadow-md"
                >
                  <span className="material-symbols-outlined text-[24px] md:text-[26px] text-outline group-hover:text-error transition-colors">close</span>
                </button>
                <button
                  onClick={onConnect}
                  disabled={connecting}
                  className="w-[56px] h-[56px] md:w-[62px] md:h-[62px] rounded-xl flex items-center justify-center gold-gradient-btn shadow-[0_0_22px_rgba(245,180,26,0.18)] hover:shadow-[0_0_36px_rgba(245,180,26,0.28)] transition-all active:scale-95 disabled:opacity-60"
                >
                  <span className="material-symbols-outlined text-[30px] md:text-[34px] text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    favorite
                  </span>
                </button>
                <button className="w-11 h-11 md:w-[48px] md:h-[48px] rounded-lg flex items-center justify-center border border-transparent bg-surface-container-low hover:bg-surface-bright transition-all active:scale-95 group shadow-md">
                  <span className="material-symbols-outlined text-[24px] md:text-[26px] text-outline group-hover:text-tertiary transition-colors">star</span>
                </button>
              </div>
            </div>
          )}
        </main>

        <aside className="hidden lg:flex w-80 h-full bg-[#0E0E0E] border-l border-[#9D8F79]/20 flex-col p-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xl font-bold text-[#FFD58A] font-headline">Discovery Filters</h2>
            <span className="material-symbols-outlined text-[#9D8F79]">tune</span>
          </div>
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest font-bold text-[#9D8F79]">Location Reach</label>
              <input
                type="range"
                min={10}
                max={250}
                step={5}
                value={distanceKm}
                onChange={(e) => setDistanceKm(Number(e.target.value))}
                className="w-full accent-[#F5B41A]"
              />
              <div className="flex justify-between text-xs text-on-surface-variant font-medium">
                <span>Local</span>
                <span className="text-primary">Up to {distanceKm}km</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest font-bold text-[#9D8F79]">Match Gender</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "auto", label: "Auto" },
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" }
                ].map((option) => {
                  const active = selectedGender === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setSelectedGender(option.value)}
                      className={`px-3 py-2 rounded border text-[11px] font-semibold transition-colors ${
                        active
                          ? "bg-surface-container border-primary/30 text-primary"
                          : "bg-surface-container-low border-outline-variant/10 text-on-surface-variant hover:border-outline-variant/30"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest font-bold text-[#9D8F79]">Minimum Match Score</label>
              <input
                type="range"
                min={60}
                max={90}
                step={5}
                value={minMatchPercent}
                onChange={(e) => setMinMatchPercent(Number(e.target.value))}
                className="w-full accent-[#F5B41A]"
              />
              <div className="flex justify-between text-xs text-on-surface-variant font-medium">
                <span>Strict</span>
                <span className="text-primary">{minMatchPercent}% and above</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest font-bold text-[#9D8F79]">Religious Observance</label>
              <div className="grid grid-cols-1 gap-2">
                {religiousOptions.slice(0, 6).map((option) => {
                  const active = selectedReligious === option;
                  return (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedReligious(active ? "" : option);
                        setIndex(0);
                      }}
                      className={`flex items-center justify-between px-4 py-3 rounded border text-xs font-semibold ${
                        active
                          ? "bg-surface-container border-primary/30 text-primary"
                          : "bg-surface-container-low border-outline-variant/10 text-on-surface-variant hover:border-outline-variant/30"
                      }`}
                    >
                      <span>{option}</span>
                      {active ? (
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                          check_circle
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest font-bold text-[#9D8F79]">Vessel Type</label>
              <div className="flex flex-wrap gap-2">
                {["ACADEMIC", "CREATIVE", "LEADERSHIP"].map((tag) => {
                  const active = selectedVesselTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleVesselTag(tag)}
                      className={`px-3 py-1.5 rounded text-[10px] font-bold ${
                        active
                          ? "bg-primary/10 border border-primary/20 text-primary"
                          : "bg-surface-container-high border border-outline-variant/10 text-on-surface-variant"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={loadDiscoveryCards}
                className="w-full py-4 gold-gradient-btn rounded text-on-primary font-headline font-bold text-sm"
              >
                REFINE SANCTUARY
              </button>
              <button onClick={clearFilters} className="w-full mt-4 text-[#9D8F79] text-[10px] font-bold uppercase tracking-widest hover:text-[#E5E2E1]">
                Clear All Filters
              </button>
            </div>
          </div>
        </aside>
      </div>
      <DashboardBottomNav active="discover" />
    </>
  );
}

export default DashboardDiscoveryPage;
