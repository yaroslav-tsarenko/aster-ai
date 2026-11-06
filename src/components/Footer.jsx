import { Link } from "react-router-dom";
import { footerLinks, socials } from "../constants";
import Logo from "./brand/Logo";
import NewsletterForm from "./NewsletterForm";

const Footer = () => (
  <footer className="border-t border-line">
    <div className="container pt-16 pb-10 lg:pt-20">
      <div className="grid-12 gap-y-12 pb-14">
        <div className="col-span-4 md:col-span-8 lg:col-span-4">
          <Link to="/" className="inline-block mb-5" aria-label="Aster home">
            <Logo />
          </Link>
          <p className="t-small max-w-xs mb-6 text-fg-3">
            Research, writing and images in one calm workspace. Product notes once a month, nothing else.
          </p>
          <NewsletterForm className="max-w-sm" />
        </div>

        {footerLinks.map((group) => (
          <div key={group.title} className="col-span-2 md:col-span-2 lg:col-span-2">
            <h2 className="t-label mb-5 text-fg-3">{group.title}</h2>
            <ul className="space-y-3">
              {group.links.map((link) => (
                <li key={link.url}>
                  <Link to={link.url} className="text-sm text-fg-2 transition-colors hover:text-fg">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 pt-8 border-t border-line md:flex-row md:items-center md:justify-between">
        <p className="text-xs text-fg-3">
          © {new Date().getFullYear()} Aster. A concept product designed and built by Yaroslav Tsarenko.
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {socials.map((item) => (
            <li key={item.id}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-fg-3 transition-colors hover:text-fg"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
