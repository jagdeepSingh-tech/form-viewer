const defaultTheme = {
  colors: {
    background: "#f6f7fb",
    surface: "#ffffff",
    surfaceMuted: "#f9fafb",
    border: "#e5e7eb",
    text: "#111827",
    muted: "#6b7280",
    subtle: "#9ca3af",
    primary: "#4f46e5",
    primarySoft: "#eef2ff",
    accent: "#10b981",
    danger: "#ef4444",
    shadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
    xxl: "28px",
  },
  radius: {
    sm: "6px",
    md: "10px",
    lg: "14px",
  },
  typography: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  },
};

export const applyTheme = (theme = defaultTheme) => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const { colors, spacing, radius, typography } = theme;

  root.style.setProperty("--color-bg", colors.background);
  root.style.setProperty("--color-surface", colors.surface);
  root.style.setProperty("--color-surface-muted", colors.surfaceMuted);
  root.style.setProperty("--color-border", colors.border);
  root.style.setProperty("--color-text", colors.text);
  root.style.setProperty("--color-muted", colors.muted);
  root.style.setProperty("--color-subtle", colors.subtle);
  root.style.setProperty("--color-primary", colors.primary);
  root.style.setProperty("--color-primary-soft", colors.primarySoft);
  root.style.setProperty("--color-accent", colors.accent);
  root.style.setProperty("--color-danger", colors.danger);
  root.style.setProperty("--shadow-elevated", colors.shadow);

  root.style.setProperty("--space-xs", spacing.xs);
  root.style.setProperty("--space-sm", spacing.sm);
  root.style.setProperty("--space-md", spacing.md);
  root.style.setProperty("--space-lg", spacing.lg);
  root.style.setProperty("--space-xl", spacing.xl);
  root.style.setProperty("--space-xxl", spacing.xxl);

  root.style.setProperty("--radius-sm", radius.sm);
  root.style.setProperty("--radius-md", radius.md);
  root.style.setProperty("--radius-lg", radius.lg);

  root.style.setProperty("--font-sans", typography.fontFamily);
};

export default defaultTheme;

