import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import { legalUpdated, privacySections, termsSections } from "../constants";
import usePageMeta from "../hooks/usePageMeta";

const docs = {
  privacy: {
    title: "Privacy policy",
    tag: "Legal",
    text: "How we collect, use and protect your information.",
    sections: privacySections,
    other: { label: "Terms of service", to: "/terms" },
  },
  terms: {
    title: "Terms of service",
    tag: "Legal",
    text: "The rules for using Aster, written as plainly as we could.",
    sections: termsSections,
    other: { label: "Privacy policy", to: "/privacy" },
  },
};

const Legal = ({ type }) => {
  const doc = docs[type];
  usePageMeta(doc.title, doc.text);
  const [active, setActive] = useState(doc.sections[0].id);

  useEffect(() => {
    const els = doc.sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [doc]);

  return (
    <>
      <PageHero label={doc.tag} title={doc.title} text={doc.text} breadcrumbs={[{ label: "Home", to: "/" }, { label: doc.title }]} />
      <section className="pb-20 md:pb-24 lg:pb-32">
        <div className="container grid-12 gap-y-10">
          <aside className="col-span-4 md:col-span-8 lg:col-span-3 lg:sticky lg:top-24 lg:self-start">
            <p className="t-label mb-4 text-fg-4">On this page</p>
            <nav aria-label="Table of contents">
              <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1 lg:border-l lg:border-line">
                {doc.sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      aria-current={active === s.id ? "true" : undefined}
                      className={`block px-2.5 py-1.5 text-sm rounded-md transition-colors lg:rounded-none lg:-ml-px lg:border-l lg:pl-4 ${
                        active === s.id ? "text-fg bg-surface lg:bg-transparent lg:border-accent" : "text-fg-3 hover:text-fg lg:border-transparent"
                      }`}
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <article className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-5">
            <p className="mb-10 font-mono text-xs text-fg-3">Last updated {legalUpdated}</p>
            {doc.sections.map((s, i) => (
              <section key={s.id} id={s.id} className="mb-12 scroll-mt-24">
                <h2 className="t-h3 mb-4">
                  <span className="mr-3 font-mono text-base text-fg-4">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                {s.body.map((p) => (
                  <p key={p} className="t-body mb-4 text-fg-2">
                    {p}
                  </p>
                ))}
              </section>
            ))}
            <div className="pt-8 border-t border-line t-small text-fg-3">
              See also the <Link to={doc.other.to} className="text-fg underline underline-offset-4 decoration-line-strong hover:decoration-fg">{doc.other.label}</Link>, or{" "}
              <Link to="/contact?topic=privacy" className="text-fg underline underline-offset-4 decoration-line-strong hover:decoration-fg">contact us</Link> with questions.
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default Legal;
