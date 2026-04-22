import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import DashboardBottomNav from "@/components/dashboard/DashboardBottomNav";
import DashboardTopBar from "@/components/dashboard/DashboardTopBar";
import { usePageMeta } from "@/hooks/usePageMeta";
import { getOnboardingRequest } from "@/api/onboarding";

const PROFILE_FIELD_LABELS = {
  firstName: "First Name",
  lastName: "Last Name",
  gender: "Gender",
  dateOfBirth: "Date of Birth",
  phone: "Phone",
  city: "City",
  country: "Country",
  location: "Current Location",
  religiousLevel: "Religious Level",
  shabbatObservance: "Shabbat Observance",
  kashrutLevel: "Kashrut Level",
  lifestyleDescription: "Lifestyle Description",
  personalityTraits: "Personality Traits",
  hobbies: "Hobbies",
  aboutMe: "About Me",
  lookingFor: "Looking For",
  siblingsCount: "Siblings Count",
  birthOrder: "Birth Order",
  familyStyle: "Family Style",
  motherHeritage: "Mother Heritage",
  fatherHeritage: "Father Heritage",
  familyNarrative: "Family Narrative",
  siblingNotes: "Sibling Notes",
  relationshipStatus: "Relationship Status",
  hasChildren: "Has Children",
  childrenCount: "Children Count",
  custodyArrangement: "Custody Arrangement",
  preferredAgeMin: "Preferred Age Min",
  preferredAgeMax: "Preferred Age Max",
  matchReligiousPreference: "Match Religious Preference",
  dealBreakerSmoker: "Deal Breaker: Smoker",
  dealBreakerDifferentReligiousLevel: "Deal Breaker: Religious Level",
  dealBreakerHasChildren: "Deal Breaker: Has Children",
  agreementAccepted: "Agreement Accepted",
  profileStatus: "Profile Status",
  verificationStatus: "Verification Status",
  lastOnboardingStep: "Last Onboarding Step",
  isCohen: "Is Cohen",
  lineageNotes: "Lineage Notes"
};

function formatFieldValue(value) {
  if (value === null || value === undefined || value === "") return "";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function AccountSettingsPage() {
  const { user } = useSelector((state) => state.auth);
  const [bundle, setBundle] = useState({ profile: {}, photos: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  usePageMeta({
    title: "Account Settings | Kesher",
    bodyClass: "bg-background text-on-background min-h-screen pb-32",
    styleId: "page-style-account_settings",
    styles: `.material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        }
        body {
            font-family: 'Inter', sans-serif;
            background-color: #131313;
        }`
  });

  useEffect(() => {
    const loadProfileBundle = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getOnboardingRequest();
        setBundle({
          profile: data?.profile || {},
          photos: data?.photos || []
        });
      } catch (e) {
        setError(e.message || "Failed to load profile details.");
      } finally {
        setLoading(false);
      }
    };
    loadProfileBundle();
  }, []);

  const profileEntries = useMemo(() => {
    return Object.entries(bundle.profile || {})
      .filter(([key, value]) => !["accountEmail", "accountPassword", "isLocked"].includes(key) && value !== null && value !== "")
      .map(([key, value]) => ({
        key,
        label: PROFILE_FIELD_LABELS[key] || key,
        value: formatFieldValue(value)
      }));
  }, [bundle.profile]);

  return (
    <>
      <DashboardTopBar active="profile" avatarUrl={user?.avatarUrl || ""} />
      <main className="max-w-6xl mx-auto pt-28 px-6 lg:px-10 pb-20">
        <section className="mb-10">
          <h1 className="text-4xl font-headline font-extrabold tracking-tight text-on-surface mb-2">Profile Settings</h1>
          <p className="text-on-surface-variant text-sm">All onboarding details you submitted are visible below.</p>
        </section>

        {error ? <div className="mb-6 rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">{error}</div> : null}

        {loading ? (
          <div className="rounded-xl border border-outline-variant/20 bg-surface-container-low p-8 text-on-surface-variant">
            Loading profile details...
          </div>
        ) : (
          <>
            <section className="mb-8 rounded-2xl border border-outline-variant/20 bg-surface-container-low p-6">
              <h2 className="mb-4 text-sm uppercase tracking-[0.2em] text-primary font-bold">Account Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl bg-surface-container-high p-4">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-on-surface-variant">Email</p>
                  <p className="mt-1 text-sm font-medium text-on-surface">{user?.email || "Not available"}</p>
                </div>
                <div className="rounded-xl bg-surface-container-high p-4">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-on-surface-variant">Profile Status</p>
                  <p className="mt-1 text-sm font-medium text-on-surface">{bundle.profile?.profileStatus || "draft"}</p>
                </div>
                <div className="rounded-xl bg-surface-container-high p-4">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-on-surface-variant">Verification</p>
                  <p className="mt-1 text-sm font-medium text-on-surface">{bundle.profile?.verificationStatus || "pending"}</p>
                </div>
              </div>
            </section>

            <section className="mb-8 rounded-2xl border border-outline-variant/20 bg-surface-container-low p-6">
              <h2 className="mb-4 text-sm uppercase tracking-[0.2em] text-primary font-bold">Submitted Photos</h2>
              {bundle.photos?.length ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {bundle.photos.map((photo) => (
                    <div key={photo.id} className="rounded-xl overflow-hidden border border-outline-variant/20 bg-surface-container-high">
                      <img src={photo.image_url} alt="Profile submission" className="h-40 w-full object-cover" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-on-surface-variant">No photos submitted yet.</p>
              )}
            </section>

            <section className="rounded-2xl border border-outline-variant/20 bg-surface-container-low p-6">
              <h2 className="mb-4 text-sm uppercase tracking-[0.2em] text-primary font-bold">Onboarding Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profileEntries.map((entry) => (
                  <div key={entry.key} className="rounded-xl border border-outline-variant/15 bg-surface-container-high p-4">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-on-surface-variant">{entry.label}</p>
                    <p className="mt-1 text-sm text-on-surface break-words">{entry.value}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
      <DashboardBottomNav active="profile" />
    </>
  );
}

export default AccountSettingsPage;
