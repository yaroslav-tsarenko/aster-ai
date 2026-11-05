import { useId, useState } from "react";
import Icon from "./Icon";

const AccordionItem = ({ item, open, onToggle, id }) => (
  <div className="border-b border-n-6">
    <h3>
      <button
        type="button"
        id={`${id}-btn`}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={onToggle}
        className="flex items-center justify-between w-full gap-6 py-6 text-left transition-colors hover:text-color-1"
      >
        <span className="h6 !font-normal">{item.q}</span>
        <span
          className={`flex items-center justify-center w-8 h-8 shrink-0 rounded-full border transition-all duration-300 ${
            open ? "rotate-45 border-color-1 text-color-1" : "border-n-6 text-n-3"
          }`}
        >
          <Icon name="plus" size={16} />
        </span>
      </button>
    </h3>
    <div
      id={`${id}-panel`}
      role="region"
      aria-labelledby={`${id}-btn`}
      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
    >
      <div className="overflow-hidden">
        <p className="body-2 pb-6 pr-12 text-n-3">{item.a}</p>
      </div>
    </div>
  </div>
);

const Accordion = ({ items, defaultOpen = 0, className = "" }) => {
  const [openIndex, setOpenIndex] = useState(defaultOpen);
  const baseId = useId();

  return (
    <div className={`border-t border-n-6 ${className}`}>
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
