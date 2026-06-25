interface PageWrapperProps {
  children: React.ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* ─── DARK MODE: Blue radial glow — centered ─── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 hidden dark:block"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle 700px at 50% 10%, rgba(59,130,246,0.18), transparent)`,
        }}
      />

      {/* ─── LIGHT MODE: Purple radial glow — top left, blurred ─── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 block dark:hidden"
        aria-hidden="true"
        style={{
          background: `radial-gradient(circle at 50% 0%, rgba(173,109,244,0.22) 0%, transparent 60%)`,
          filter: "blur(60px)",
        }}
      />

      {/* Content — always above glow layers */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
