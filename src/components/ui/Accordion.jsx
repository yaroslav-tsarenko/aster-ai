import { useId, useState } from "react";
import Icon from "./Icon";

const AccordionItem = ({ item, open, onToggle, id }) => (
  <div className="border-b border-line">
    <h3>
      <button
        type="button"
        id={`${id}-btn`}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={onToggle}
        className="flex items-start justify-between w-full gap-6 py-5 text-left transition-colors hover:text-fg"
      >
        <span className={`t-h4 ${open ? "text-fg" : "text-fg-2"}`}>{item.q}</span>
        <Icon
          name="plus"
          size={18}
          className={`mt-1 text-fg-3 transition-transform duration-200 ${open ? "rotate-45" : ""}`}
        />
      </button>
    </h3>
    <div
      id={`${id}-panel`}
      role="region"
      aria-labelledby={`${id}-btn`}
      className={`grid transition-[grid-template-rows] duration-200 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
    >
      <div className="overflow-hidden">
        <p className="t-body pb-6 pr-10 text-fg-3">{item.a}</p>
      </div>
    </div>
  </div>
);

const Accordion = ({ items, defaultOpen = 0, className = "" }) => {
  const [openIndex, setOpenIndex] = useState(defaultOpen);
  const baseId = useId();

  return (
    <div className={`border-t border-line ${className}`}>
      {items.map((item, index) => (
        <AccordionItem
          key={item.q}
          id={`${baseId}-${index}`}
          item={item}
          open={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
