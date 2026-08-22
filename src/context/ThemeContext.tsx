import * as React from "react";

export type ThemeMode = "nightwatch" | "eclipse";

interface ThemeContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
  accent: string;
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);
const STORAGE_KEY = "nightswatch.theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<ThemeMode>(() => {
    return (localStorage.getItem(STORAGE_KEY) as ThemeMode) || "nightwatch";
  });

  React.useEffect(() => {
    document.documentElement.classList.toggle("theme-eclipse", theme === "eclipse");
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = React.useCallback(() => {
    setTheme((t) => (t === "nightwatch" ? "eclipse" : "nightwatch"));
  }, []);

  const value = React.useMemo(
    () => ({ theme, toggleTheme, accent: theme === "nightwatch" ? "#0B7D70" : "#4F46E5" }),
    [theme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
