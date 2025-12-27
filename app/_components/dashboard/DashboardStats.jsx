import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getDashboardStats } from "@/service/statsService";

const dashboardStats = [
  {
    key: "users",
    label: "Users",
    footer: "Registered platform users",
  },
  {
    key: "internships",
    label: "Internships",
    footer: "Active internship opportunities",
  },
  {
    key: "memberships",
    label: "Memberships",
    footer: "Active paid memberships",
  },
  {
    key: "webinars",
    label: "Webinars",
    footer: "Upcoming & completed sessions",
  },
];

export default async function DashboardStats() {
  const data = await getDashboardStats();
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {dashboardStats.map((stat) => (
        <Card key={stat.key} className="@container/card">
          <CardHeader>
            <CardDescription>{stat.label}</CardDescription>
            <CardTitle className="text-4xl font-semibold md:text-3xl">
              {data?.[stat.key] ?? "0"}
            </CardTitle>
          </CardHeader>

          <CardFooter className="text-sm text-muted-foreground">
            {stat.footer}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
