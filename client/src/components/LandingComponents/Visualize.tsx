import { visualize } from "../../utils/constants";

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
    </div>
  );
};

export default Visualize;
