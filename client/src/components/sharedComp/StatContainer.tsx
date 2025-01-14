interface StatProps {
  first: number;
  second: number;
  third: number;
}

const StatContainer = ({ first, second, third }: StatProps) => {
  return (
    <div className="w-full flex flex-col gap-3 md:grid md:grid-cols-3 md:gap-[50px]">
      <div className="flex items-center justify-center h-32 rounded-md shadow-card hover:bg-main-bg">
        <h1 className="text-2xl font-medium text-center">
          <span className="text-3xl">{first} </span>
          <br /> Fields Added
        </h1>
      </div>
      <div className="flex items-center justify-center h-32 rounded-md shadow-card hover:bg-main-bg">
        <h1 className="text-2xl font-medium text-center">
          <span className="text-3xl">{second} </span>
          <br />
          Unique Crop
        </h1>
      </div>
      <div className="flex items-center justify-center h-32 rounded-md shadow-card hover:bg-main-bg">
        <h1 className="text-2xl font-medium text-center">
          <span className="text-3xl">₹ {third} </span> <br /> Estimated Revenue
        </h1>
      </div>
    </div>
  );
};

export default StatContainer;
