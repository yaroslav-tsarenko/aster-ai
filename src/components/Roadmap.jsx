import Button from "./Button";
import Heading from "./Heading";
import Section from "./Section";
import RoadmapCard from "./RoadmapCard";
import { roadmap } from "../constants";
import { Gradient } from "./design/Roadmap";

const Roadmap = () => (
  <Section className="overflow-hidden" id="roadmap">
    <div className="container md:pb-10">
      <Heading tag="Ready to get started" title="What we’re working on" />

      <div className="relative grid gap-6 md:grid-cols-2 md:gap-4 md:pb-[7rem]">
        {roadmap.slice(0, 4).map((item) => (
          <RoadmapCard key={item.id} item={item} className="even:md:translate-y-[7rem] even:md:hover:translate-y-[6.75rem]" />
        ))}

        <Gradient />
      </div>

      <div className="flex justify-center mt-12 md:mt-15 xl:mt-20">
        <Button href="/roadmap">Our roadmap</Button>
      </div>
    </div>
  </Section>
);

export default Roadmap;
