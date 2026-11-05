import { Link } from "react-router-dom";
import Section from "./Section";
import { brainwave } from "../assets";
import { footerLinks, socials } from "../constants";
import NewsletterForm from "./NewsletterForm";

const Footer = () => {
  return (
    <Section as="footer" crosses customPaddings className="pt-16 pb-10 lg:pt-20">
      <div className="container">
        <div className="grid gap-12 pb-12 border-b border-n-6 lg:grid-cols-[1.2fr_2fr] lg:gap-20">
          <div className="max-w-sm">
            <Link to="/" className="inline-block mb-6" aria-label="Brainwave home">
              <img src={brainwave} width={190} height={40} alt="Brainwave" loading="lazy" />
            </Link>
            <p className="body-2 mb-6 text-n-4">
              The AI chat app for curious minds. Get product news and prompt tips once a month.
            </p>
            <NewsletterForm />
          </div>

          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h2 className="tagline mb-5 text-n-1/50">{group.title}</h2>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.url}>
                      <Link
                        to={link.url}
                        className="body-2 text-n-3 transition-colors hover:text-color-1"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex sm:justify-between justify-center items-center gap-8 pt-10 max-sm:flex-col">
          <p className="caption text-n-4">
            © {new Date().getFullYear()} Brainwave. All rights reserved.
          </p>

          <ul className="flex gap-5 flex-wrap justify-center">
            {socials.map((item) => (
              <li key={item.id}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Brainwave on ${item.title}`}
                  className="flex items-center justify-center w-10 h-10 bg-n-7 rounded-full transition-colors hover:bg-n-6"
                >
                  <img src={item.iconUrl} width={16} height={16} alt="" loading="lazy" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
};

export default Footer;
