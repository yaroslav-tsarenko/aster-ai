import Section from "./Section";
import Heading from "./Heading";
import Marquee from "./ui/Marquee";
import { testimonials } from "../constants";
import { stars } from "../assets";

const Card = ({ item }) => (
  <figure className="w-[20rem] md:w-[24rem] shrink-0 p-0.25 rounded-3xl bg-n-6 transition-colors hover:bg-conic-gradient">
    <div className="flex flex-col h-full p-6 bg-n-8 rounded-[1.4375rem]">
      <div className="flex gap-1 mb-4 text-color-2" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9L12 2.5Z" />
          </svg>
        ))}
      </div>
      <blockquote className="body-2 flex-1 mb-6 text-n-2">“{item.text}”</blockquote>
      <figcaption className="flex items-center gap-3">
        <img src={item.avatar} width={40} height={40} alt="" loading="lazy" className="w-10 h-10 rounded-full object-cover" />
        <div>
          <p className="font-semibold text-sm">{item.name}</p>
          <p className="text-xs text-n-4">{item.role}</p>
        </div>
      </figcaption>
    </div>
  </figure>
);

const Testimonials = ({ title = "Loved by creators everywhere", tag = "Wall of love" }) => {
  const half = Math.ceil(testimonials.length / 2);

  return (
    <Section className="overflow-hidden" id="testimonials">
      <div className="absolute top-0 left-1/2 w-[60rem] -translate-x-1/2 opacity-40 pointer-events-none" aria-hidden="true">
        <img src={stars} width={950} height={400} alt="" loading="lazy" className="w-full" />
      </div>
      <div className="container relative z-2">
        <Heading tag={tag} title={title} />
      </div>
      <div className="relative z-2 flex flex-col gap-5">
        <Marquee duration={55}>
          {testimonials.slice(0, half).map((t) => (
            <Card key={t.id} item={t} />
          ))}
        </Marquee>
        <Marquee duration={60} reverse>
          {testimonials.slice(half).concat(testimonials.slice(0, 1)).map((t, i) => (
            <Card key={`${t.id}-${i}`} item={t} />
          ))}
        </Marquee>
      </div>
    </Section>
  );
};

export default Testimonials;
