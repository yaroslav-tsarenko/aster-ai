import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import Section from "../components/Section";
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
    text: "The rules for using Brainwave, written as plainly as we could.",
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
      <PageHero tag={doc.tag} title={doc.title} text={doc.text} breadcrumbs={[{ label: "Home", to: "/" }, { label: doc.title }]} />
      <Section>
        <div className="container grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-20">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="tagline mb-4 text-n-4">On this page</p>
            <nav aria-label="Table of contents">
              <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1 lg:border-l lg:border-n-6">
                {doc.sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      aria-current={active === s.id ? "true" : undefined}
                      className={`block px-3 py-1.5 text-sm rounded-lg transition-colors lg:rounded-none lg:-ml-px lg:border-l lg:pl-4 ${
                        active === s.id ? "text-n-1 bg-n-7 lg:bg-transparent lg:border-color-1" : "text-n-4 hover:text-n-1 lg:border-transparent"
                      }`}
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <article className="max-w-3xl">
            <p className="mb-10 text-sm text-n-4">Last updated: {legalUpdated}</p>
            {doc.sections.map((s, i) => (
              <section key={s.id} id={s.id} className="mb-12 scroll-mt-28">
                <h2 className="h5 mb-4">
                  <span className="mr-3 font-code text-color-1">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                {s.body.map((p) => (
                  <p key={p} className="body-2 mb-4 text-n-3">
                    {p}
                  </p>
                ))}
              </section>
            ))}
            <div className="pt-8 border-t border-n-6 body-2 text-n-4">
              See also our <Link to={doc.other.to} className="text-n-1 underline hover:text-color-1">{doc.other.label}</Link>, or{" "}
              <Link to="/contact?topic=privacy" className="text-n-1 underline hover:text-color-1">contact us</Link> with questions.
            </div>
          </article>
        </div>
      </Section>
    </>
  );
};

export default Legal;
