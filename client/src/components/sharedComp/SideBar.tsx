import { Link } from "react-router-dom";
import LogOut from "../../assets/logout.png";
import { useApp } from "../../context/AppContext";
import { MenuProp } from "./AppBar";

const Sidebar = ({ menu, btmMenu }: MenuProp) => {
  const isActive = (path: string) => {
    const currentPath = location.pathname;
    return currentPath === path;
  };

  const { logoutContext } = useApp();

  return (
    <div className="hidden border-r-[1px] md:py-6 md:pl-4 border-border h-full  md:flex flex-col justify-between">
      <div className="flex flex-col gap-4">
        {menu.map(({ image, name, to }) => (
          <Link
            to={to}
            key={name}
            className={`flex items-center gap-3 cursor-pointer rounded-l-xl hover:bg-[#7A61F7] md:py-2 md:px-6 md:pr-10 ${
              isActive(to) ? "bg-btnClr" : ""
            }`}
          >
            <img src={image} alt={name} className="size-5" />
            <p className="text-base font-medium">{name}</p>
          </Link>
        ))}
      </div>
      <div>
        <hr className="w-full pb-4 border-t-2 border-border" />
        <div className="flex flex-col gap-4">
          {btmMenu.map(({ image, name, to }) => (
            <Link
              to={to}
              key={name}
              className={`flex items-center gap-3 cursor-pointer rounded-l-xl md:py-2 md:px-6 md:pr-10 hover:bg-[#7A61F7]  ${
                isActive(to) ? "bg-btnClr" : ""
              }`}
            >
              <img src={image} alt={name} className="size-5" />
              <p className="text-base font-medium">{name}</p>
            </Link>
          ))}
          <div
            onClick={() => logoutContext()}
            className="flex items-center gap-3 cursor-pointer rounded-l-xl md:py-2 md:px-6 md:pr-10 hover:bg-[#7A61F7]"
          >
            <img src={LogOut} alt={"Logout"} className="size-5" />
            <p className="text-base font-medium">Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
