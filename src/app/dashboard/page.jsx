import Dashboard from "@/components/dashboard/Dashboard";
import { getDrivers } from "@/data/drivers";

export const metadata = {
  title: "Dashboard — Quick Drivers Card",
};

// Document status depends on today's date, so render per request.
export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return <Dashboard drivers={getDrivers()} />;
}
