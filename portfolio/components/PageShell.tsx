// Shared page shell wrapper — used by all category pages.
// Handles: topbar clearance, max-width container, consistent horizontal padding.

interface PageShellProps {
  children: React.ReactNode;
}

export default function PageShell({ children }: PageShellProps) {
  return (
    <div
      style={{
        paddingTop: '48px',        // exact topbar height — no guessing
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  );
}
