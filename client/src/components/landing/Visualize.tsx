import { visualize } from "../../utils/constants";
import BG from "../../assets/product-bg.png";
import Visual from "../../assets/visualization.jpeg";

const Visualize = () => {
  const { heading, subHead } = visualize;
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-[28px] font-semibold w-[80%] md:text-title ">
          {heading}
        </h1>
        <p className="w-full text-base md:text-2xl text-subHead md:w-[60%]">
          {subHead}
        </p>
      </div>
      <section
        className="relative w-full bg-center bg-cover h-[260px] md:h-[540px]"
        style={{ backgroundImage: `url(${BG})` }}
      >
        <img
          src={Visual}
          alt="bg image"
          className="h-[250px] md:h-[530px] w-full"
        />
      </section>
    </div>
  );
};

export default Visualize;
