import { companyLogos } from "../constants";

const CompanyLogos = ({ className }) => {
  return (
    <div className={className}>
      <h2 className="tagline mb-6 text-center text-n-1/50">
        Helping people create beautiful content at
      </h2>
      <ul className="flex">
        {companyLogos.map((logo, index) => (
          <li
            className="flex items-center justify-center flex-1 h-[8.5rem] opacity-70 transition-opacity hover:opacity-100"
            key={index}
          >
            <img src={logo} width={134} height={28} alt={`Customer logo ${index + 1}`} loading="lazy" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyLogos;
