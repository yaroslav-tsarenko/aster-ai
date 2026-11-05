import { Link } from "react-router-dom";
import { benefits } from "../constants";
import Heading from "./Heading";
import Section from "./Section";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../assets/svg/ClipPath";
import Reveal from "./ui/Reveal";

export const BenefitCard = ({ item, index = 0 }) => (
  <Reveal delay={(index % 3) * 100} className="md:max-w-[24rem] w-full">
    <Link
      to={`/features/${item.slug}`}
      className="group block relative h-full p-0.5 bg-no-repeat bg-[length:100%_100%] transition-transform duration-300 hover:-translate-y-1"
      style={{ backgroundImage: `url(${item.backgroundUrl})` }}
      aria-label={`${item.title}: explore feature`}
    >
      <div className="relative z-2 flex flex-col min-h-[22rem] h-full p-[2.4rem] pointer-events-none">
        <h3 className="h5 mb-5">{item.title}</h3>
        <p className="body-2 mb-6 text-n-3">{item.text}</p>
        <div className="flex items-center mt-auto">
          <img src={item.iconUrl} width={48} height={48} alt="" loading="lazy" />
          <p className="ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider">
            Explore more
          </p>
          <Arrow className="ml-5 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>

      {item.light && <GradientLight />}

      <div className="absolute inset-0.5 bg-n-8" style={{ clipPath: "url(#benefits)" }}>
        <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-10">
          {item.imageUrl && (
            <img
              src={item.imageUrl}
              width={380}
              height={362}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    </Link>
  </Reveal>
);

const Benefits = ({ items = benefits, title = "Chat Smarter, Not Harder with Brainwave", tag, text, showAllLink = true }) => {
  return (
    <Section id="features">
      <div className="container relative z-2">
        <Heading className="md:max-w-md lg:max-w-2xl" title={title} tag={tag} text={text} />

        <div className="flex flex-wrap justify-center gap-10 mb-10">
          {items.map((item, index) => (
            <BenefitCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {showAllLink && (
          <div className="flex justify-center">
            <Link
              to="/features"
              className="text-xs font-code font-bold tracking-wider uppercase border-b transition-colors hover:text-color-1 hover:border-color-1"
            >
              See all features
            </Link>
          </div>
        )}
        <ClipPath />
      </div>
    </Section>
  );
};

export default Benefits;
