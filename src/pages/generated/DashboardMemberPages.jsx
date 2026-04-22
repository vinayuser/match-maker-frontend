import { useEffect, useState } from "react";
import DashboardBottomNav from "@/components/dashboard/DashboardBottomNav";
import DashboardTopBar from "@/components/dashboard/DashboardTopBar";
import UserSectionPage from "@/components/dashboard/UserSectionPage";
import { usePageMeta } from "@/hooks/usePageMeta";
import { fetchFavorites, fetchSentRequests } from "@/api/discovery";

function MatchCardListPage({ title, subtitle, active, loadItems }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  usePageMeta({
    title: `Kesher | ${title}`,
    bodyClass: "bg-background text-on-background min-h-screen",
    styleId: `page-style-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    styles: `
      body { background-color: #131313; font-family: 'Inter', sans-serif; }
      .asymmetric-shadow { box-shadow: 20px 20px 60px #0e0e0e, -20px -20px 60px #1c1b1b; }
      .monastic-gradient { background: linear-gradient(135deg, #F5B41A 0%, #FFD58A 100%); }
    `
  });

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await loadItems();
        setItems(data?.items || []);
      } catch (e) {
        setError(e.message || "Failed to load list.");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [loadItems]);

  return (
    <>
      <DashboardTopBar active={active} />
      <main className="pt-24 pb-28 px-6 max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface">{title}</h1>
          <p className="mt-2 text-on-surface-variant text-sm">{subtitle}</p>
        </header>
        {error ? <div className="mb-4 rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">{error}</div> : null}
        {loading ? (
          <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-low p-6 text-on-surface-variant">Loading...</div>
        ) : !items.length ? (
          <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-low p-6 text-on-surface-variant">No profiles found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {items.map((card) => (
              <article key={card.userId} className="relative h-[460px]">
                <div className="absolute -inset-1 monastic-gradient rounded-[2rem] blur opacity-10" />
                <div className="relative h-full w-full bg-surface-container-lowest rounded-[2rem] overflow-hidden asymmetric-shadow">
                  <div className="relative h-[78%] w-full overflow-hidden">
                    <img src={card.avatarUrl} alt={card.fullName} className="h-full w-full object-cover scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-primary-container/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase border border-primary/20">
                          Premium
                        </span>
                        {card.requestStatus ? (
                          <span className="bg-surface-container-high/60 backdrop-blur-md text-on-surface px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase">
                            {card.requestStatus}
                          </span>
                        ) : (
                          <span className="bg-surface-container-high/60 backdrop-blur-md text-on-surface px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase">
                            {card.matchPercent || 0}% Match
                          </span>
                        )}
                      </div>
                      <h3 className="text-3xl font-headline font-bold text-white mb-2">
                        {(card.firstName || card.fullName || "Profile").split(" ")[0]}
                        {card.age ? `, ${card.age}` : ""}
                      </h3>
                      <p className="text-[#FFD58A] text-sm leading-relaxed max-w-[260px]">Saved in your personalized matchmaking stream.</p>
                    </div>
                  </div>
                  <div className="h-[22%] p-5 bg-[#2B241B] border-t border-[#9D8F79]/25">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Location</p>
                        <p className="text-sm font-medium text-on-surface truncate">{[card.city, card.country].filter(Boolean).join(", ") || "Not set"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Education</p>
                        <p className="text-sm font-medium text-on-surface truncate">{card.educationLevel || "Not specified"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      <DashboardBottomNav active={active === "matches" ? "matches" : "profile"} />
    </>
  );
}

export function LikesReceivedPage() {
  return (
    <UserSectionPage
      title="Likes Received"
      subtitle="People who expressed interest in your profile."
      active="matches"
      cards={[
        { kicker: "Queue", title: "Pending Review", description: "Review incoming likes and choose who you want to connect with." },
        { kicker: "Priority", title: "Best Alignments", description: "Likes are ranked by your current preference filters and match score." }
      ]}
    />
  );
}

export function SentRequestsPage() {
  return <MatchCardListPage title="Sent Requests" subtitle="Profiles you already reached out to." active="matches" loadItems={fetchSentRequests} />;
}

export function FavoritesPage() {
  return <MatchCardListPage title="Favorites" subtitle="Saved profiles from your discovery flow." active="matches" loadItems={fetchFavorites} />;
}

export function RecentlyViewedPage() {
  return (
    <UserSectionPage
      title="Recently Viewed"
      subtitle="Profiles you explored in your latest sessions."
      active="discover"
      cards={[
        { kicker: "History", title: "Recent Activity", description: "See the latest profiles you opened from discovery." },
        { kicker: "Next Step", title: "Revisit Matches", description: "Add to favorites or send requests from this list." }
      ]}
    />
  );
}

export function NotificationsPage() {
  return (
    <UserSectionPage
      title="Notifications"
      subtitle="Updates about invitations, requests, and profile activity."
      active="discover"
      cards={[
        { kicker: "Alerts", title: "Real-time Updates", description: "Track responses, new likes, and important account notices." },
        { kicker: "Control", title: "Notification Preferences", description: "Fine-tune what appears in your activity stream." }
      ]}
    />
  );
}

export function PreferencesFiltersPage() {
  return (
    <UserSectionPage
      title="Preferences / Filters"
      subtitle="Manage the discovery criteria used for your matchmaking feed."
      active="discover"
      cards={[
        { kicker: "Preferences", title: "Match Inputs", description: "Gender, age range, religious level, lifestyle, and location." },
        { kicker: "Behavior", title: "Discovery Rules", description: "Passed profiles are tracked and excluded from future discovery." }
      ]}
    />
  );
}

export function HelpSupportDashboardPage() {
  return (
    <UserSectionPage
      title="Help & Support"
      subtitle="Need guidance? Reach support and onboarding assistance."
      active="counsel"
      cards={[
        { kicker: "Support", title: "Contact Team", description: "Get help for account, discovery, and invitation issues." },
        { kicker: "Resources", title: "FAQs & Guides", description: "Find practical answers to common matchmaking questions." }
      ]}
    />
  );
}

export function PrivacySafetyPage() {
  return (
    <UserSectionPage
      title="Privacy & Safety"
      subtitle="Tools and policies for secure matchmaking experience."
      active="profile"
      cards={[
        { kicker: "Privacy", title: "Profile Visibility", description: "Control what details are shown to other members." },
        { kicker: "Safety", title: "Report & Block", description: "Protect your experience with moderation and abuse reporting." }
      ]}
    />
  );
}
