import Section from "./Section";
import Button from "./Button";
import Reveal from "./ui/Reveal";
import { BackgroundCircles } from "./design/Header";
import { brainwaveSymbol } from "../assets";

const CtaBanner = ({
  title = "Ready to think faster?",
  text = "Join 2.4 million people who use Brainwave to write, learn and create every day. Free forever, no credit card required.",
  primary = { label: "Get started free", url: "/signup" },
  secondary = { label: "Talk to sales", url: "/contact?topic=sales" },
}) => (
  <Section crosses>
    <div className="container">
      <Reveal className="relative p-0.5 rounded-[2.5rem] bg-conic-gradient">
        <div className="relative px-6 py-14 bg-n-8 rounded-[2.4rem] overflow-hidden text-center md:px-16 md:py-20">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-1/2 left-1/2 w-[46rem] aspect-square -translate-x-1/2 -translate-y-1/2 bg-radial-gradient from-[#28206C] to-[#28206C]/0 to-70%" />
            <div className="absolute top-1/2 left-1/2 w-[36rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute top-1/2 left-1/2 w-[24rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <BackgroundCircles />
          </div>
          <div className="relative z-1">
            <div className="flex justify-center mb-6">
              <img src={brainwaveSymbol} width={48} height={48} alt="" loading="lazy" />
            </div>
            <h2 className="h2 mb-4">{title}</h2>
            <p className="body-1 max-w-2xl mx-auto mb-10 text-n-3">{text}</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href={primary.url} white>
                {primary.label}
              </Button>
              {secondary && <Button href={secondary.url}>{secondary.label}</Button>}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </Section>
);

export default CtaBanner;
