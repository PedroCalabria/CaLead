import { AppNav } from "@/components/app/AppNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--app-page)] text-[var(--app-ink)]">
      <AppNav />
      {children}
    </div>
  );
}
