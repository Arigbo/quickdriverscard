import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";
import Reveal from "@/components/Reveal";
import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import Steps from "@/components/landing/Steps";
import Deck from "@/components/landing/Deck";
import Phone from "@/components/landing/Phone";
import Marquee from "@/components/motion/Marquee";
import ScrubText from "@/components/motion/ScrubText";
import ScrollProgress from "@/components/motion/ScrollProgress";
import Magnetic from "@/components/motion/Magnetic";
import Spotlight from "@/components/motion/Spotlight";
import SplitReveal from "@/components/motion/SplitReveal";
import { driverStatus, getDriver, getDrivers, STATUS_LABEL } from "@/data/drivers";
import { SITE } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: `${SITE.url}/`,
      name: SITE.name,
      description: SITE.description,
      inLanguage: "en",
    },
    {
      "@type": "WebApplication",
      "@id": `${SITE.url}/#app`,
      name: SITE.name,
      url: `${SITE.url}/`,
      description: SITE.description,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any (web browser)",
      browserRequirements: "Requires JavaScript",
      isAccessibleForFree: true,
      image: `${SITE.url}/opengraph-image`,
      featureList: [
        "Print-ready CR80 driver ID cards as PDF",
        "QR code verification from any phone camera",
        "Live document status: valid, expiring, expired",
        "Full version history for every document",
        "Upload scans and renewals of driver documents",
        "Emergency contact on every record",
      ],
    },
  ],
};

export const dynamic = "force-dynamic";

const steps = [
  {
    n: "01",
    title: "Register",
    body: "Capture a driver's identity, vehicle and documents once — in a single, structured record.",
  },
  {
    n: "02",
    title: "Issue",
    body: "Generate a print-ready card with a unique QR code. Export it as a true-size PDF in one click.",
  },
  {
    n: "03",
    title: "Verify",
    body: "Anyone with a phone camera can scan the card and see the driver's live document status.",
  },
];

const features = [
  {
    title: "Print-ready PDF",
    body: "Cards export at true CR80 size, ready for any desktop card printer.",
  },
  {
    title: "Live document status",
    body: "Valid, expiring and expired states are computed the moment a card is scanned.",
  },
  {
    title: "No app required",
    body: "Verification opens in the phone's browser. Nothing to install, nothing to sign into.",
  },
  {
    title: "Emergency contact",
    body: "Responders see who to call — and can call them — straight from the scan.",
  },
];

export default function Landing() {
  const drivers = getDrivers();
  const sample = getDriver(1);

  return (
    <>
      <script
        type="application/ld+json"
        // Static, trusted content; escaping "<" keeps it inert inside <script>.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ScrollProgress />
      <Nav />

      <main>
        <Hero driver={sample} />

        <Marquee>
          {drivers.map((d) => {
            const s = driverStatus(d);
            return (
              <span className="marquee-item" key={d.id}>
                <span className="mono">{d.plate_number}</span>
                <span className={`dot dot--${s}`} />
                <span className="marquee-status">{STATUS_LABEL[s]}</span>
                <span className="marquee-sep">✦</span>
              </span>
            );
          })}
        </Marquee>

        <section id="how" className="section container">
          <div className="section-head">
            <Reveal as="p" className="section-label">How it works</Reveal>
            <Reveal as="h2" delay={0.05} className="section-title">
              Three steps from paperwork to a card that speaks for itself.
            </Reveal>
          </div>
          <Steps steps={steps} />
        </section>

        <Deck drivers={drivers.slice(1, 6)} />

        <section className="statement container">
          <ScrubText text="No apps to install. No accounts to create. _Just _a _camera." />
        </section>

        <section id="features" className="section container features">
          <div className="features-copy">
            <Reveal as="p" className="section-label">What a scan reveals</Reveal>
            <Reveal as="h2" delay={0.05} className="section-title">
              The essentials, at a glance. Nothing more.
            </Reveal>
            <ul className="feature-list">
              {features.map((f, i) => (
                <Reveal as="li" key={f.title} delay={0.1 + i * 0.08}>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
          <Phone />
        </section>

        <Spotlight className="cta container">
          <SplitReveal as="h2" className="display display--sm" lines={[["Ready", "when", "you", "_are."]]} inView />
          <Reveal delay={0.3}>
            <Magnetic strength={0.5}>
              <Link href="/dashboard" className="btn btn--primary btn--lg">
                Open the dashboard <ArrowRight size={18} strokeWidth={1.75} />
              </Link>
            </Magnetic>
          </Reveal>
        </Spotlight>
      </main>

      <footer className="site-footer container">
        <Logo />
        <p>Built with Next.js as a portfolio project. Demo data only.</p>
      </footer>
    </>
  );
}
