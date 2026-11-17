import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Logo from "@/components/Logo";
import IdCard from "@/components/IdCard";
import Reveal, { MotionRoot } from "@/components/Reveal";
import { getDriver } from "@/data/drivers";

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

const previewDocs = [
  { doc: "Driver's Licence", note: "Until Jun 2028", status: "valid" },
  { doc: "Vehicle Registration", note: "Until Jun 2027", status: "valid" },
  { doc: "Insurance Certificate", note: "In 41 days", status: "expiring" },
];

export default function Landing() {
  const sample = getDriver(1);

  return (
    <MotionRoot>
      <header className="site-nav">
        <div className="container site-nav-inner">
          <Logo />
          <nav className="site-nav-links" aria-label="Primary">
            <a href="#how">How it works</a>
            <a href="#features">Features</a>
            <Link href="/dashboard" className="btn btn--ghost btn--sm">
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero container">
          <div className="hero-copy">
            <Reveal as="p" className="eyebrow">
              <span className="eyebrow-dot" /> Driver identity, simplified
            </Reveal>
            <Reveal as="h1" delay={0.05} className="display">
              Every driver,
              <br />
              verified in <em>one&nbsp;scan.</em>
            </Reveal>
            <Reveal as="p" delay={0.12} className="lede">
              Quick Drivers Card turns driver and vehicle records into a
              printable ID with a QR code. Scan it to confirm who&rsquo;s behind
              the wheel&nbsp;— and whether their papers are in order.
            </Reveal>
            <Reveal delay={0.18} className="hero-actions">
              <Link href="/dashboard" className="btn btn--primary">
                Open dashboard <ArrowRight size={16} strokeWidth={1.75} />
              </Link>
              <Link href="/driver/1" className="link-arrow">
                View a sample record <ArrowUpRight size={16} strokeWidth={1.75} />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.25} className="hero-figure">
            <div className="idcard-frame idcard-frame--tilt">
              <IdCard driver={sample} />
            </div>
            <p className="caption">Fig. 1 — Card issued to driver QDC-0001</p>
          </Reveal>
        </section>

        <section id="how" className="section container">
          <div className="section-head">
            <p className="section-label">How it works</p>
            <h2 className="section-title">
              Three steps from paperwork to a card that speaks for itself.
            </h2>
          </div>
          <ol className="steps">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 0.08} className="step">
                <span className="step-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        <section className="statement container">
          <Reveal as="p">
            No apps to install. No accounts to create.
            <br />
            <em>Just a camera.</em>
          </Reveal>
        </section>

        <section id="features" className="section container features">
          <div className="features-copy">
            <p className="section-label">What a scan reveals</p>
            <h2 className="section-title">
              The essentials, at a glance. Nothing more.
            </h2>
            <ul className="feature-list">
              {features.map((f) => (
                <li key={f.title}>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </li>
              ))}
            </ul>
          </div>

          <Reveal className="phone" delay={0.1}>
            <div className="phone-screen" aria-label="Preview of a verification page">
              <div className="phone-bar">
                <span className="mono">quickdriverscard.app</span>
              </div>
              <div className="phone-body">
                <p className="phone-label">Plate</p>
                <p className="phone-plate mono">LAG 456 BB</p>
                <p className="phone-name">James Akin Adeleke</p>
                <div className="phone-status">
                  <span className="badge badge--expiring">
                    <span className="badge-dot" /> 1 document expiring soon
                  </span>
                </div>
                <ul className="phone-docs">
                  {previewDocs.map((d) => (
                    <li key={d.doc}>
                      <span>
                        {d.doc}
                        <small>{d.note}</small>
                      </span>
                      <span className={`dot dot--${d.status}`} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="cta container">
          <Reveal as="h2" className="display display--sm">
            Ready when you are.
          </Reveal>
          <Reveal delay={0.08}>
            <Link href="/dashboard" className="btn btn--primary">
              Open the dashboard <ArrowRight size={16} strokeWidth={1.75} />
            </Link>
          </Reveal>
        </section>
      </main>

      <footer className="site-footer container">
        <Logo />
        <p>Built with Next.js as a portfolio project. Demo data only.</p>
      </footer>
    </MotionRoot>
  );
}
