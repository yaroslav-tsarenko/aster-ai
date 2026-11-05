const Spinner = ({ className = "w-4 h-4" }) => (
  <span
    className={`inline-block border-2 border-current border-r-transparent rounded-full animate-spin ${className}`}
    aria-hidden="true"
  />
);

export default Spinner;
