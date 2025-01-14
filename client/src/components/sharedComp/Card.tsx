import { ReactNode } from "react";

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col justify-between flex-1 p-2 rounded-md md:p-3 bg-main-bg h-[352px max-h-fit]">
      {children}
    </div>
  );
};

export default Card;
