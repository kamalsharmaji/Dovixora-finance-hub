const levels = [
  { label: "Too short", className: "bg-error" },
  { label: "Weak", className: "bg-error" },
  { label: "Fair", className: "bg-warning" },
  { label: "Good", className: "bg-yellow-deep" },
  { label: "Strong", className: "bg-emerald" },
] as const;

function getStrength(password: string): number {
  if (password.length === 0) return -1;
  if (password.length < 6) return 0;

  let score = 1;
  if (password.length >= 10) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  return Math.min(score, 4);
}

interface PasswordStrengthProps {
  password: string;
}

function PasswordStrength({ password }: PasswordStrengthProps) {
  const strength = getStrength(password);
  if (strength < 0) return null;

  const level = levels[strength]!;

  return (
    <div className="mt-2" aria-live="polite">
      <div className="flex gap-1.5">
        {levels.map((_, index) => (
          <span
            key={index}
            className={`h-1 flex-1 rounded-full transition-colors duration-200 ${
              index <= strength ? level.className : "bg-line"
            }`}
          />
        ))}
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground">
        Password strength: <span className="font-medium text-foreground">{level.label}</span>
      </p>
    </div>
  );
}

export { PasswordStrength, getStrength };
