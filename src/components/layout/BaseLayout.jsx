function BaseLayout({ children, variant = "public" }) {
  return (
    <div
      className={`min-h-screen ${
        variant === "auth" ? "bg-surface text-on-surface" : "bg-background text-on-background"
      }`}
    >
      {children}
    </div>
  );
}

export default BaseLayout;
