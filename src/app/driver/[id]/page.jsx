import VerifyView from "@/components/verify/VerifyView";
import { cardNumber, getDriver, getSeedVerifications, getSeedVersions } from "@/data/drivers";

// Document status depends on today's date, so render per request.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const driver = getDriver(id);
  const title = driver ? `${driver.plate_number} · Verification` : "Driver verification";
  // Kept free of personal details: these show up in link previews.
  const description = driver
    ? `Verification record ${cardNumber(driver)} — live document status and history.`
    : "Verify a driver and the status of their vehicle documents.";
  return {
    title,
    description,
    // Records contain personal data: keep them out of search engines.
    robots: { index: false, follow: false, nocache: true },
    alternates: { canonical: `/driver/${id}` },
    openGraph: { title, description, url: `/driver/${id}` },
    twitter: { title, description },
  };
}

export default async function VerifyPage({ params }) {
  const { id } = await params;
  const driver = getDriver(id);
  const { documents, ...record } = driver ?? {};
  const versions = driver ? getSeedVersions().filter((v) => String(v.driverId) === String(id)) : [];
  const checks = driver ? getSeedVerifications().filter((c) => String(c.driverId) === String(id)) : [];
  return <VerifyView id={id} seedRecord={driver ? record : null} seedVersions={versions} seedVerifications={checks} />;
}
