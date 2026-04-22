import { useCallback, useMemo, useRef, useState } from "react";
import DashboardBottomNav from "@/components/dashboard/DashboardBottomNav";
import DashboardTopBar from "@/components/dashboard/DashboardTopBar";
import { RELIGIOUS_LEVEL_OPTIONS, SHABBAT_OPTIONS } from "@/features/onboarding/preferenceOptions";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useEffect } from "react";
import {
  fetchDiscoveryCards,
  markFavoriteRequest,
  markNotInterestedRequest,
  sendInterestRequest,
  unmarkFavoriteRequest
} from "@/api/discovery";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80";

const DEFAULT_FILTERS = {
  preferredGender: "auto",
  religiousLevel: "",
  lifestyle: "",
  location: "",
  minAge: "22",
  maxAge: "40",
  minMatchPercent: 65,
  vesselTags: []
};

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
        .asymmetric-shadow {
            box-shadow: 20px 20px 60px #0e0e0e, -20px -20px 60px #1c1b1b;
        }
        .monastic-gradient {
            background: linear-gradient(135deg, #F5B41A 0%, #FFD58A 100%);
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
  const [appliedFilters, setAppliedFilters] = useState(DEFAULT_FILTERS);
  const [draftFilters, setDraftFilters] = useState(DEFAULT_FILTERS);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);
  const [toast, setToast] = useState(null);
  const pointerStartX = useRef(0);
  const activePointerId = useRef(null);
  const cardRef = useRef(null);

  const loadDiscoveryCards = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const parsedMinAge = Number.parseInt(String(appliedFilters.minAge || "0"), 10);
      const parsedMaxAge = Number.parseInt(String(appliedFilters.maxAge || "0"), 10);
      const minAgeVal = Number.isFinite(parsedMinAge) ? Math.max(18, Math.min(70, parsedMinAge)) : 18;
      const maxAgeVal = Number.isFinite(parsedMaxAge) ? Math.max(18, Math.min(70, parsedMaxAge)) : 70;
      const safeMinAge = Math.min(minAgeVal, maxAgeVal);
      const safeMaxAge = Math.max(minAgeVal, maxAgeVal);
      const data = await fetchDiscoveryCards({
        limit: 30,
        minMatchPercent: appliedFilters.minMatchPercent,
        preferredGender: appliedFilters.preferredGender === "auto" ? "" : appliedFilters.preferredGender,
        religiousLevel: appliedFilters.religiousLevel,
        lifestyle: appliedFilters.lifestyle,
        location: appliedFilters.location,
        minAge: safeMinAge,
        maxAge: safeMaxAge
      });
      setCards(data?.cards || []);
      setIndex(0);
    } catch (e) {
      setError(e.message || "Failed to load discovery cards.");
    } finally {
      setLoading(false);
    }
  }, [appliedFilters]);

  useEffect(() => {
    loadDiscoveryCards();
  }, [loadDiscoveryCards]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const religiousOptions = RELIGIOUS_LEVEL_OPTIONS;
  const lifestyleOptions = SHABBAT_OPTIONS;

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
      const vesselTags = vesselTagsByCard.get(card.userId) || [];
      const vesselOk = appliedFilters.vesselTags.length === 0 || appliedFilters.vesselTags.some((tag) => vesselTags.includes(tag));
      return vesselOk;
    });
  }, [appliedFilters.vesselTags, cards, vesselTagsByCard]);

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

  const onPass = async () => {
    if (!current || isSwiping) return;
    const targetUserId = current.userId;
    shiftCard("left");
    try {
      await markNotInterestedRequest(targetUserId);
    } catch (e) {
      setError(e.message || "Failed to save not interested preference.");
    }
  };

  const onConnect = async () => {
    if (!current || connecting || isSwiping) return;
    const targetUserId = current.userId;
    try {
      setConnecting(true);
      await sendInterestRequest(targetUserId);
      setToast({ type: "success", message: "Interest sent successfully." });
      shiftCard("right");
    } catch (e) {
      const message = e.message || "Failed to send interest.";
      setError(message);
      setToast({ type: "error", message });
    } finally {
      setConnecting(false);
    }
  };

  const onToggleFavorite = async () => {
    if (!current) return;
    try {
      const nextFavorite = !current.isFavorite;
      if (nextFavorite) {
        await markFavoriteRequest(current.userId);
      } else {
        await unmarkFavoriteRequest(current.userId);
      }
      setCards((prev) => prev.map((card) => (card.userId === current.userId ? { ...card, isFavorite: nextFavorite } : card)));
      setToast({ type: "success", message: nextFavorite ? "Added to favorites." : "Removed from favorites." });
    } catch (e) {
      const message = e.message || "Failed to update favorite.";
      setToast({ type: "error", message });
      setError(message);
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
    setDraftFilters((prev) => ({
      ...prev,
      vesselTags: prev.vesselTags.includes(tag) ? prev.vesselTags.filter((x) => x !== tag) : [...prev.vesselTags, tag]
    }));
  };

  const applyFilters = () => {
    const normalizedMin = /^\d+$/.test(String(draftFilters.minAge)) ? String(Math.max(18, Math.min(70, Number(draftFilters.minAge)))) : "18";
    const normalizedMax = /^\d+$/.test(String(draftFilters.maxAge)) ? String(Math.max(18, Math.min(70, Number(draftFilters.maxAge)))) : "70";
    const minAgeVal = Number(normalizedMin);
    const maxAgeVal = Number(normalizedMax);
    const nextApplied = {
      ...draftFilters,
      minAge: String(Math.min(minAgeVal, maxAgeVal)),
      maxAge: String(Math.max(minAgeVal, maxAgeVal))
    };
    setDraftFilters(nextApplied);
    setAppliedFilters(nextApplied);
    setIndex(0);
  };

  const clearFilters = () => {
    setDraftFilters(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
    setIndex(0);
  };

  const renderCardContent = (card, { nameClass = "text-3xl", showDetails = true } = {}) => {
    const displayName = (card.firstName || card.fullName || "Profile").split(" ")[0];
    const locationText = [card.city, card.country].filter(Boolean).join(", ") || "Location not set";
    const vesselTags = (vesselTagsByCard.get(card.userId) || []).slice(0, 2);

    return (
      <div className="relative h-full w-full">
        {showDetails ? <div className="absolute -inset-1 monastic-gradient rounded-[2rem] blur opacity-10" /> : null}
        <div className="relative h-full w-full bg-surface-container-lowest rounded-[2rem] overflow-hidden asymmetric-shadow">
          <div className={`relative w-full overflow-hidden ${showDetails ? "h-[79%]" : "h-full"}`}>
            <img
              alt={`${card.fullName} profile`}
              className="w-full h-full object-cover scale-105"
              src={card.avatarUrl || FALLBACK_IMG}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/22 to-transparent" />

            {showDetails ? (
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-primary-container/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase border border-primary/20">
                    Premium
                  </span>
                  <span className="bg-surface-container-high/60 backdrop-blur-md text-on-surface px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase">
                    {card.matchPercent || 0}% Match
                  </span>
                </div>
                <h3 className={`${nameClass} font-headline font-bold text-white mb-2`}>
                  {displayName}
                  {card.age ? `, ${card.age}` : ""}
                </h3>
                <p className="text-[#FFD58A] text-sm leading-relaxed max-w-[280px]">
                  This connection is one step away. Review details before accepting.
                </p>
              </div>
            ) : null}
          </div>

          {showDetails ? (
            <div className="h-[21%] p-6 bg-[#2B241B] border-t border-[#9D8F79]/25">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Location</p>
                  <p className="text-sm font-medium text-on-surface truncate">{locationText}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Education</p>
                  <p className="text-sm font-medium text-on-surface truncate">{card.educationLevel || "Not specified"}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {[card.religiousLevel || "Observant", ...vesselTags].slice(0, 3).map((tag) => (
                  <span
                    key={`${card.userId}-${tag}`}
                    className="px-2.5 py-1 rounded-full bg-surface-container-high text-[10px] font-semibold text-on-surface-variant border border-outline-variant/15"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <>
      <DashboardTopBar active="discover" />
      <div className="flex flex-1 mt-20 h-[calc(100vh-5rem)] overflow-hidden">
        <main className="flex-1 relative flex flex-col items-center justify-center overflow-hidden px-4 md:px-6">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
          {toast ? (
            <div
              className={`absolute top-4 right-4 z-[70] rounded-lg px-4 py-2 text-sm border ${
                toast.type === "success" ? "bg-primary/15 border-primary/30 text-[#FFD58A]" : "bg-error/15 border-error/30 text-[#FFB4AB]"
              }`}
            >
              {toast.message}
            </div>
          ) : null}
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
            <div className="w-full max-w-[410px] h-full flex flex-col items-center justify-center">
              <div className="relative w-full h-[504px] flex items-center justify-center">
                {upcomingCards.map((previewCard, idx) => {
                  const offset = 34 + idx * 14;
                  const opacity = Math.max(0.36, 0.68 - idx * 0.12);
                  return (
                    <article
                      key={`preview-${previewCard.userId}`}
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        transform: `translate(${offset}px, ${offset}px) scale(${0.965 - idx * 0.01})`,
                        opacity,
                        zIndex: 14 - idx
                      }}
                    >
                      {renderCardContent(previewCard, { showDetails: true, nameClass: "text-2xl" })}
                    </article>
                  );
                })}

                {nextCard ? (
                  <article
                    key={`next-${nextCard.userId}`}
                    className="absolute inset-0 pointer-events-none transition-transform duration-260 ease-out"
                    style={{
                      zIndex: 20,
                      transform: `translate(${18 * (1 - stackProgress)}px, ${18 * (1 - stackProgress)}px) scale(${0.965 + 0.035 * stackProgress})`,
                      opacity: 0.8 + 0.2 * stackProgress
                    }}
                  >
                    {renderCardContent(nextCard, { showDetails: true, nameClass: "text-2xl" })}
                  </article>
                ) : null}

                <article
                  key={`active-${current.userId}`}
                  ref={cardRef}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  className="absolute inset-0 transition-transform duration-240 ease-out cursor-grab active:cursor-grabbing touch-none select-none will-change-transform"
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
                <button
                  onClick={onToggleFavorite}
                  className="w-11 h-11 md:w-[48px] md:h-[48px] rounded-lg flex items-center justify-center border border-transparent bg-surface-container-low hover:bg-surface-bright transition-all active:scale-95 group shadow-md"
                >
                  <span
                    className={`material-symbols-outlined text-[24px] md:text-[26px] transition-colors ${
                      current?.isFavorite ? "text-[#FFD58A]" : "text-outline group-hover:text-tertiary"
                    }`}
                    style={current?.isFavorite ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    star
                  </span>
                </button>
              </div>
            </div>
          )}
        </main>

        <aside className="onboarding-flow hidden lg:flex w-[400px] h-full bg-[#0E0E0E] border-l border-[#9D8F79]/20 flex-col p-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xl font-bold text-[#FFD58A] font-headline">Discovery Filters</h2>
            <span className="material-symbols-outlined text-[#9D8F79]">tune</span>
          </div>
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest font-bold text-[#9D8F79]">Preferred Location</label>
              <input
                type="text"
                value={draftFilters.location}
                onChange={(e) => setDraftFilters((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="City or country"
                className="obi-input"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest font-bold text-[#9D8F79]">Match Gender</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "auto", label: "Auto" },
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" }
                ].map((option) => {
                  const active = draftFilters.preferredGender === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setDraftFilters((prev) => ({ ...prev, preferredGender: option.value }))}
                      className={active ? "onboarding-choice-pill onboarding-choice-pill--selected" : "onboarding-choice-pill"}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest font-bold text-[#9D8F79]">Preferred Age Range</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  min={18}
                  max={70}
                  value={draftFilters.minAge}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^\d+$/.test(value)) {
                      setDraftFilters((prev) => ({ ...prev, minAge: value }));
                    }
                  }}
                  className="obi-input"
                />
                <input
                  type="text"
                  inputMode="numeric"
                  min={18}
                  max={70}
                  value={draftFilters.maxAge}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^\d+$/.test(value)) {
                      setDraftFilters((prev) => ({ ...prev, maxAge: value }));
                    }
                  }}
                  className="obi-input"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest font-bold text-[#9D8F79]">Minimum Match Score</label>
              <input
                type="range"
                min={60}
                max={90}
                step={5}
                value={draftFilters.minMatchPercent}
                onChange={(e) => setDraftFilters((prev) => ({ ...prev, minMatchPercent: Number(e.target.value) }))}
                className="w-full accent-[#F5B41A]"
              />
              <div className="flex justify-between text-xs text-on-surface-variant font-medium">
                <span>Strict</span>
                <span className="text-primary">{draftFilters.minMatchPercent}% and above</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest font-bold text-[#9D8F79]">Religious Observance</label>
              <div className="flex flex-wrap gap-2">
                {religiousOptions.map((option) => {
                  const active = draftFilters.religiousLevel === option;
                  return (
                    <button
                      key={option}
                      onClick={() => {
                        setDraftFilters((prev) => ({ ...prev, religiousLevel: active ? "" : option }));
                      }}
                      className={`${active ? "onboarding-choice-pill onboarding-choice-pill--selected" : "onboarding-choice-pill"} text-[11px] px-3 py-2`}
                    >
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest font-bold text-[#9D8F79]">Lifestyle Preference</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setDraftFilters((prev) => ({ ...prev, lifestyle: "" }))}
                  className={`${!draftFilters.lifestyle ? "onboarding-choice-pill onboarding-choice-pill--selected" : "onboarding-choice-pill"} text-[11px] px-3 py-2`}
                >
                  <span>Any Lifestyle</span>
                </button>
                {lifestyleOptions.map((option) => {
                  const active = draftFilters.lifestyle === option;
                  return (
                    <button
                      key={option}
                      onClick={() => setDraftFilters((prev) => ({ ...prev, lifestyle: active ? "" : option }))}
                      className={`${active ? "onboarding-choice-pill onboarding-choice-pill--selected" : "onboarding-choice-pill"} text-[11px] px-3 py-2`}
                    >
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest font-bold text-[#9D8F79]">Vessel Type</label>
              <div className="flex flex-wrap gap-2">
                {["ACADEMIC", "CREATIVE", "LEADERSHIP"].map((tag) => {
                  const active = draftFilters.vesselTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleVesselTag(tag)}
                      className={active ? "onboarding-chip onboarding-chip--selected" : "onboarding-chip"}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={applyFilters}
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
