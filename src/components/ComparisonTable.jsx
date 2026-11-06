import { pricing, pricingComparison } from "../constants";
import Icon from "./ui/Icon";

const Cell = ({ value }) => {
  if (value === true)
    return (
      <span className="inline-flex text-fg" aria-label="Included">
        <Icon name="check" size={16} />
      </span>
    );
  if (value === false)
    return (
      <span className="text-fg-4" aria-label="Not included">
        <Icon name="minus" size={16} className="inline" />
      </span>
    );
  return <span className="text-sm text-fg-2">{value}</span>;
};

const ComparisonTable = ({ billing }) => (
  <>
    <p className="mb-4 text-xs text-fg-3 md:hidden">Scroll sideways to compare all plans.</p>
    <div className="overflow-x-auto scrollbar-thin -mx-5 px-5 md:mx-0 md:px-0">
      <table className="w-full min-w-[40rem] border-collapse text-left">
        <caption className="sr-only">Plan comparison</caption>
        <thead>
          <tr className="border-b border-line-strong">
            <th scope="col" className="w-2/5 py-5 pr-4 align-bottom t-label text-fg-4">Features</th>
            {pricing.map((p) => {
              const price = billing === "annual" ? p.annual : p.monthly;
              return (
                <th key={p.id} scope="col" className={`py-5 px-4 align-bottom ${p.popular ? "bg-surface" : ""}`}>
                  <span className="block t-h4">{p.title}</span>
                  <span className="block font-mono text-xs text-fg-3 tabular">
                    {price === 0 ? "Free" : `$${price} ${p.perSeat ? "/ seat / mo" : "/ mo"}`}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        {pricingComparison.map((group) => (
          <tbody key={group.group}>
            <tr>
              <th colSpan={4} scope="colgroup" className="pt-10 pb-3 t-label text-fg-3">
                {group.group}
              </th>
            </tr>
            {group.rows.map((row) => (
              <tr key={row.label} className="border-t border-line">
                <th scope="row" className="py-3.5 pr-4 font-normal text-sm text-fg-2">
                  {row.label}
                </th>
                {row.values.map((v, i) => (
                  <td key={i} className={`py-3.5 px-4 ${pricing[i]?.popular ? "bg-surface" : ""}`}>
                    <Cell value={v} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  </>
);

export default ComparisonTable;
