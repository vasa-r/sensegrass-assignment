import { companyData } from "../../utils/constants";
const Companies = () => {
  const { heading, companies } = companyData;
  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-center text-subHead md:text-base">{heading}</p>
      <div className="flex flex-wrap items-center justify-center gap-16">
        {companies.map(({ logo, id, name }) => (
          <img src={logo} key={id} alt={name} className="w-auto h-10 md:h-14" />
        ))}
      </div>
    </div>
  );
};

export default Companies;
