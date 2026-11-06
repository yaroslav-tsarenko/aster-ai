import SegmentedControl from "./ui/SegmentedControl";

const BillingToggle = ({ value, onChange, className = "" }) => (
  <SegmentedControl
    label="Billing period"
    className={className}
    value={value}
    onChange={onChange}
    options={[
      { value: "monthly", label: "Monthly" },
      { value: "annual", label: "Annual", badge: "-17%" },
    ]}
  />
);

export default BillingToggle;
