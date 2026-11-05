import { check } from "../assets";
import { pricing, pricingComparison } from "../constants";

const Cell = ({ value }) => {
  if (value === true) return <img src={check} width={24} height={24} alt="Included" className="mx-auto" />;
  if (value === false) return <span className="text-n-5" aria-label="Not included">—</span>;
  return <span className="text-sm text-n-2">{value}</span>;
};

const ComparisonTable = ({ billing }) => (
  <>
  <p className="mb-4 text-xs text-n-4 md:hidden">Swipe sideways to compare all plans →</p>
  <div className="overflow-x-auto scrollbar-thin -mx-5 px-5 md:mx-0 md:px-0">
    <table className="w-full min-w-[40rem] border-collapse text-left">
      <caption className="sr-only">Plan comparison</caption>
      <thead>
        <tr>
          <th scope="col" className="w-2/5 py-6 pr-4 align-bottom tagline text-n-4">Features</th>
          {pricing.map((p, i) => {
            const price = billing === "annual" ? p.annual : p.monthly;
            return (
              <th key={p.id} scope="col" className="py-6 px-4 text-center align-bottom">
                <span className={`block h5 ${["text-color-2", "text-color-1", "text-color-3"][i]}`}>{p.title}</span>
                <span className="block text-xs text-n-4 tabular-nums">
                  {price === null ? "Custom" : price === 0 ? "Free" : `$${price}/mo`}
                </span>
              </th>
            );
          })}
        </tr>
      </thead>
      {pricingComparison.map((group) => (
        <tbody key={group.group}>
          <tr>
            <th colSpan={4} scope="colgroup" className="pt-8 pb-3 tagline text-color-1">
              {group.group}
            </th>
          </tr>
          {group.rows.map((row) => (
            <tr key={row.label} className="border-t border-n-6 transition-colors hover:bg-n-7/50">
              <th scope="row" className="py-4 pr-4 font-normal body-2 text-n-3">
                {row.label}
              </th>
              {row.values.map((v, i) => (
                <td key={i} className="py-4 px-4 text-center">
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
