import Section from "./Section";
import Button from "./Button";
import Reveal from "./ui/Reveal";

const CtaBanner = ({
  title = "Start with one project.",
  text = "Add a handful of sources, ask the question you are working on and check the citations. Free, no card required.",
  primary = { label: "Start free", url: "/signup" },
  secondary = { label: "Talk to sales", url: "/contact?topic=sales" },
}) => (
  <Section>
    <div className="container">
      <Reveal className="relative overflow-hidden border border-line rounded-xl bg-surface">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-dotgrid [mask-image:linear-gradient(90deg,transparent,#000)] pointer-events-none" aria-hidden="true" />
        <div className="relative grid-12 gap-y-8 px-6 py-12 md:px-10 md:py-16 lg:px-14 lg:py-20">
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <h2 className="t-h2 mb-4">{title}</h2>
            <p className="t-lead max-w-xl">{text}</p>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-5 flex flex-col gap-3 sm:flex-row lg:items-end lg:justify-end">
            <Button href={primary.url} variant="primary" size="lg">
              {primary.label}
            </Button>
            {secondary && (
              <Button href={secondary.url} variant="secondary" size="lg">
                {secondary.label}
              </Button>
            )}
          </div>
        </div>
      </Reveal>
    </div>
  </Section>
);

export default CtaBanner;
