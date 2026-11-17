import Link from "next/link";
import Logo from "@/components/Logo";

export const metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="verify">
      <div className="verify-top">
        <Logo />
      </div>
      <div className="verify-missing">
        <p className="eyebrow eyebrow--plain">404</p>
        <h1 className="display display--sm">This page took a wrong turn.</h1>
        <p className="lede">The link may be broken, or the page may have moved.</p>
        <Link href="/" className="btn btn--primary">Back to homepage</Link>
      </div>
    </main>
  );
}
