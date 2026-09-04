interface UsageBarChartProps {
  values: readonly number[];
  caption: string;
}

/** Height-only bar chart built from the site's existing `.chart-grid`/`.dashboard-bar` primitives. */
function UsageBarChart({ values, caption }: UsageBarChartProps) {
  const max = Math.max(...values, 1);

  return (
    <div>
      <div className="chart-grid">
        {values.map((value, index) => (
          <div
            key={index}
            className="dashboard-bar"
            style={{ height: `${Math.max(8, (value / max) * 100)}%`, animationDelay: `${index * 30}ms` }}
          />
        ))}
        <span className="chart-line chart-line-one" />
        <span className="chart-line chart-line-two" />
      </div>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">{caption}</p>
    </div>
  );
}

export { UsageBarChart };
