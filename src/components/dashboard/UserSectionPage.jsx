import DashboardBottomNav from "@/components/dashboard/DashboardBottomNav";
import DashboardTopBar from "@/components/dashboard/DashboardTopBar";
import { usePageMeta } from "@/hooks/usePageMeta";

function UserSectionPage({ title, subtitle, active = "discover", cards = [] }) {
  usePageMeta({
    title: `Kesher | ${title}`,
    bodyClass: "bg-background text-on-background min-h-screen",
    styleId: `page-style-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    styles: `body { background-color: #131313; font-family: 'Inter', sans-serif; }`
  });

  return (
    <>
      <DashboardTopBar active={active} />
      <main className="pt-24 pb-28 px-6 lg:px-10 max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-headline font-extrabold tracking-tight text-on-surface">{title}</h1>
          <p className="mt-2 text-sm text-on-surface-variant">{subtitle}</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card) => (
            <article key={card.title} className="rounded-2xl border border-outline-variant/15 bg-surface-container-low p-5">
              <p className="text-[10px] uppercase tracking-[0.18em] text-primary font-bold">{card.kicker}</p>
              <h2 className="mt-2 text-lg font-semibold text-on-surface">{card.title}</h2>
              <p className="mt-1 text-sm text-on-surface-variant">{card.description}</p>
            </article>
          ))}
        </section>
      </main>
      <DashboardBottomNav
        active={active === "matches" ? "matches" : active === "counsel" ? "messages" : active === "discover" ? "discover" : "profile"}
      />
    </>
  );
}

export default UserSectionPage;
