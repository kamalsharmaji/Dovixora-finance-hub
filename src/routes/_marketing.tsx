import { Outlet, createFileRoute } from "@tanstack/react-router";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const Route = createFileRoute("/_marketing")({
  component: MarketingLayout,
});

function MarketingLayout() {
  return (
    <div className="nexora-page min-h-screen overflow-x-clip bg-background text-foreground">
      <Navbar />
      <main className="nexora-grid">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
