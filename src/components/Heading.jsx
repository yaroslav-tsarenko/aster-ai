import TagLine from "./Tagline";
import Reveal from "./ui/Reveal";

const Heading = ({ className, title, text, tag, as: Title = "h2", children }) => {
  return (
    <Reveal
      className={`${className || ""} max-w-[50rem] mx-auto mb-12 lg:mb-20 md:text-center`}
    >
      {tag && <TagLine className="mb-4 md:justify-center">{tag}</TagLine>}
      {title && <Title className="h2">{title}</Title>}
      {text && <p className="body-2 mt-4 text-n-4">{text}</p>}
      {children}
    </Reveal>
  );
};

export default Heading;
