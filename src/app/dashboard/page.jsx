import Dashboard from "@/components/dashboard/Dashboard";
import { getSeedRecords, getSeedVersions } from "@/data/drivers";

export const metadata = {
  title: "Dashboard",
  description:
    "Register drivers, upload their documents and renewals, track expiry dates and issue print-ready ID cards with QR codes.",
  alternates: { canonical: "/dashboard" },
  openGraph: { url: "/dashboard", title: "Dashboard · Quick Drivers Card" },
  twitter: { title: "Dashboard · Quick Drivers Card" },
};

// Document status depends on today's date, so render per request.
export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return <Dashboard seedRecords={getSeedRecords()} seedVersions={getSeedVersions()} />;
}
