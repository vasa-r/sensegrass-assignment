import { PricingPlan } from "../../utils/constants";
import Tick from "../../assets/tick.svg";

const PriceCard = ({
  heading,
  subHead,
  price,
  priceDesc,
  features,
  renewal,
}: PricingPlan) => {
  return (
    <div className="flex flex-col gap-5 p-8 md:p-12 rounded-xl bg-reviewCard">
      <div className="flex flex-col gap-[-1px]">
        <h2 className="text-[36px] font-semibold">{heading}</h2>
        <p className="text-base text-subHead">{subHead}</p>
      </div>
      <div className="flex flex-col gap-[2px]">
        <h2 className="text-5xl font-semibold">
          {price} <span className="text-lg text-subHead">/ month</span>
        </h2>
        <p className="text-sm text-subHead"> {priceDesc}</p>
      </div>
      <button className="w-full mt-8 text-xl rounded-lg btn bg-btnClr">
        Get Started
      </button>
      <hr className="w-full my-4 border-t-2 border-subHead" />
      <div className="flex flex-col gap-3">
        {features.map((feat, id) => (
          <div className="flex items-center gap-2 " key={id}>
            <div className="rounded-full size-8 center bg-[#2D3240]">
              <img src={Tick} alt="tick mark" className="size-4" />
            </div>
            <p className="cursor-pointer text-subHead hover:text-white">
              {feat}
            </p>
          </div>
        ))}
      </div>
      <hr className="w-full my-4 border-t-2 border-subHead" />
      <p className="text-sm text-subHead">{renewal}</p>
    </div>
  );
};

export default PriceCard;
