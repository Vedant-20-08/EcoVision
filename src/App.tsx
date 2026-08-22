import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { AppShell } from "@/components/layout/AppShell";
import { RoleRoute } from "@/components/layout/RoleRoute";

import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import SettingsPage from "@/pages/SettingsPage";

import PublicDashboardPage from "@/pages/public/PublicDashboardPage";
import PublicAnalyticsPage from "@/pages/public/PublicAnalyticsPage";
import PublicMapPage from "@/pages/public/PublicMapPage";
import PublicAlertsPage from "@/pages/public/PublicAlertsPage";
import PublicReportsPage from "@/pages/public/PublicReportsPage";

import GovernmentDashboardPage from "@/pages/government/GovernmentDashboardPage";
import GovernmentMapPage from "@/pages/government/GovernmentMapPage";
import GovernmentAlertsPage from "@/pages/government/GovernmentAlertsPage";
import GovernmentEmailPage from "@/pages/government/GovernmentEmailPage";
import GovernmentSuitabilityPage from "@/pages/government/GovernmentSuitabilityPage";
import GovernmentReportsPage from "@/pages/government/GovernmentReportsPage";

import AnalystDashboardPage from "@/pages/analyst/AnalystDashboardPage";
import AnalystFeasibilityPage from "@/pages/analyst/AnalystFeasibilityPage";
import AnalystRootCausePage from "@/pages/analyst/AnalystRootCausePage";
import AnalystZonesPage from "@/pages/analyst/AnalystZonesPage";
import AnalystAdvisorPage from "@/pages/analyst/AnalystAdvisorPage";
import AnalystReportsPage from "@/pages/analyst/AnalystReportsPage";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider delayDuration={150}>
          <BrowserRouter>
            <Routes>
              {/* Public marketing + auth */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              {/* Authenticated app shell */}
              <Route element={<AppShell />}>
                {/* Group A — Public. Guarded: only role === "public" may render these. */}
                <Route element={<RoleRoute allow="public" />}>
                  <Route path="/public" element={<PublicDashboardPage />} />
                  <Route path="/public/analytics" element={<PublicAnalyticsPage />} />
                  <Route path="/public/map" element={<PublicMapPage />} />
                  <Route path="/public/alerts" element={<PublicAlertsPage />} />
                  <Route path="/public/reports" element={<PublicReportsPage />} />
                  <Route path="/public/settings" element={<SettingsPage />} />
                </Route>

                {/* Group B — Government. Guarded: only role === "government" may render these. */}
                <Route element={<RoleRoute allow="government" />}>
                  <Route path="/government" element={<GovernmentDashboardPage />} />
                  <Route path="/government/map" element={<GovernmentMapPage />} />
                  <Route path="/government/alerts" element={<GovernmentAlertsPage />} />
                  <Route path="/government/email" element={<GovernmentEmailPage />} />
                  <Route path="/government/suitability" element={<GovernmentSuitabilityPage />} />
                  <Route path="/government/reports" element={<GovernmentReportsPage />} />
                  <Route path="/government/settings" element={<SettingsPage />} />
                </Route>

                {/* Group C — Analyst / Builder. Guarded: only role === "analyst" may render these. */}
                <Route element={<RoleRoute allow="analyst" />}>
                  <Route path="/analyst" element={<AnalystDashboardPage />} />
                  <Route path="/analyst/feasibility" element={<AnalystFeasibilityPage />} />
                  <Route path="/analyst/root-cause" element={<AnalystRootCausePage />} />
                  <Route path="/analyst/zones" element={<AnalystZonesPage />} />
                  <Route path="/analyst/advisor" element={<AnalystAdvisorPage />} />
                  <Route path="/analyst/reports" element={<AnalystReportsPage />} />
                  <Route path="/analyst/settings" element={<SettingsPage />} />
                </Route>
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
