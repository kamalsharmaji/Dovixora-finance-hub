function BlogHeroVisual() {
  return (
    <div
      className="hero-network nexora-grid relative hidden overflow-hidden rounded-3xl border border-line bg-panel/40 lg:block"
      aria-hidden="true"
    >
      <div className="ambient-light ambient-cyan" />

      <div className="hero-core-panel">
        <div className="flex items-center justify-between">
          <span className="card-label text-muted-foreground">Live request</span>
          <span className="status-dot">
            <span /> Connected
          </span>
        </div>
        <p className="mt-3 font-mono text-xs text-foreground">POST /v1/verify/aadhaar</p>
        <p className="mt-1 font-mono text-[11px] text-muted-foreground">Authorization: Bearer sk_live_***</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="metric-chip">
            <span>Status</span>
            <strong>200 OK</strong>
          </div>
          <div className="metric-chip">
            <span>Latency</span>
            <strong>42ms</strong>
          </div>
          <div className="metric-chip">
            <span>Match</span>
            <strong>true</strong>
          </div>
        </div>
      </div>

      <div className="float-card float-card-payment">
        <span className="card-label text-muted-foreground">API Performance</span>
        <strong className="mt-2 block font-display text-2xl font-bold text-foreground">99.99%</strong>
        <span className="mt-1 block text-[11px] text-muted-foreground">Uptime this quarter</span>
      </div>

      <div className="float-card float-card-identity">
        <span className="card-label text-muted-foreground">Global Requests</span>
        <strong className="mt-2 block font-display text-2xl font-bold text-foreground">12.8M+</strong>
        <span className="mt-1 block text-[11px] text-muted-foreground">This month</span>
      </div>

      <div className="api-packet">
        <span>Webhook delivered</span>
        <strong>verification.completed</strong>
      </div>
    </div>
  );
}

export { BlogHeroVisual };
