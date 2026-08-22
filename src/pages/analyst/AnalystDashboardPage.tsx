import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/dashboard/shared/RangeTabs";
import { FeasibilityTool } from "@/components/dashboard/analyst/FeasibilityTool";
import { RootCauseDonut } from "@/components/charts/RootCauseDonut";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { rootCauseForRegion } from "@/data/rootCause";
import { DEFAULT_REGION } from "@/data/regions";
import { useAuth } from "@/context/AuthContext";

export default function AnalystDashboardPage() {
  const { user } = useAuth();
  const rootCause = rootCauseForRegion(DEFAULT_REGION.id);

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow={user?.organization}
        title="Analyst Workspace"
        description="Location intelligence for construction, planning, and site selection."
      />

      <FeasibilityTool />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Root Cause Snapshot</CardTitle>
              <CardDescription>{DEFAULT_REGION.name}</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/analyst/root-cause">
                Full analysis <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <RootCauseDonut data={rootCause} height={180} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Zone Finder</CardTitle>
              <CardDescription>Discover low-AQI areas for development.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/analyst/zones">
                Explore <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-ink-400">
              6 recommended zones currently identified nationwide, ranked by ambient air quality and growth potential.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
