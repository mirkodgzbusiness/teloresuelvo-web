import Link from "next/link";
import NavMultilevel from "@/components/NavMultilevel";
import Footer from "@/components/Footer";

interface LegalSection {
  title: string;
  paragraphs: string[];
}

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  intro?: string;
  sections: LegalSection[];
}

export default function LegalPageLayout({
  title,
  lastUpdated,
  intro,
  sections,
}: LegalPageLayoutProps) {
  return (
    <>
      <NavMultilevel />
      <div data-main="" className="relative z-[2] bg-page">
        <article className="legal-page">
          <header className="legal-page__header">
            <p className="legal-page__eyebrow">Legal</p>
            <h1 className="legal-page__title font-display">{title}</h1>
            <p className="legal-page__updated">
              Última actualización: {lastUpdated}
            </p>
            {intro && <p className="legal-page__intro">{intro}</p>}
            <nav className="legal-page__nav" aria-label="Enlaces legales">
              <Link href="/privacidad" className="legal-page__nav-link">
                Privacidad
              </Link>
              <Link href="/cookies" className="legal-page__nav-link">
                Cookies
              </Link>
            </nav>
          </header>

          <div className="legal-page__sections">
            {sections.map((section) => (
              <section key={section.title} className="legal-page__section">
                <h2 className="legal-page__section-title font-display">
                  {section.title}
                </h2>
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)} className="legal-page__paragraph">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </article>
      </div>
      <Footer />
    </>
  );
}
