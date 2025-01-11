import { pricingData } from "../../utils/constants";
import PriceCard from "./PriceCard";

const Pricing = () => {
  const { heading, subHead, plans } = pricingData;
  return (
    <div className="flex flex-col items-center w-full gap-4">
      {" "}
      <div className="flex flex-col items-center">
        <h1 className="text-[32px] font-medium md:text-hero md:font-semibold text-center">
          {heading}
        </h1>
        <p className="text-center md:text-2xl text-subHead">{subHead}</p>
      </div>
      <div className="grid w-full grid-cols-1 gap-6 pt-4 md:grid-cols-2 md:max-w-[920px]">
        {plans.map(
          ({ heading, subHead, price, priceDesc, features, renewal }, id) => (
            <PriceCard
              key={id}
              heading={heading}
              subHead={subHead}
              price={price}
              priceDesc={priceDesc}
              features={features}
              renewal={renewal}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Pricing;
