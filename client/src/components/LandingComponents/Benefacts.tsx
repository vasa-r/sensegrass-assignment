import { benefacts } from "../../utils/constants";

const Benefacts = () => {
  return (
    <div className="flex flex-col w-full gap-6 px-10 py-8 md:flex-row md:justify-around">
      {benefacts.map(({ id, img, name, count }) => (
        <div key={id} className="flex flex-col items-center gap-4">
          <img src={img} alt={name} className="size-20" />
          <h3 className="text-xl">{name}</h3>
          <h3 className="text-lg">{count}</h3>
        </div>
      ))}
    </div>
  );
};

export default Benefacts;
