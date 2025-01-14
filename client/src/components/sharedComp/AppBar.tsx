import { Link } from "react-router-dom";
import Logo from "../../assets/app-logo.png";
import Menu from "../../assets/menu.svg";
import Arrow from "../../assets/arrow.svg";
import { useApp } from "../../context/AppContext";
import { useState } from "react";
import { MenuItem } from "../../utils/constants";

export interface MenuProp {
  menu: MenuItem[];
  btmMenu: MenuItem[];
}

const AppBar = ({ menu, btmMenu }: MenuProp) => {
  const { user } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <div className="flex items-center justify-between px-6 py-4 md:px-10 md:py-4 backdrop-saturate-custom backdrop-blur-custom bg-[rgba(0,0,0,0.867)] w-full border-b-border border-b">
      <div className="flex items-center">
        <img
          src={Menu}
          alt="menu"
          className="size-8 md:hidden"
          onClick={() => setIsMenuOpen(true)}
        />
        <Link to={"/"} className="flex items-center gap-2">
          <img
            src={Logo}
            alt="app logo"
            style={{ width: "40px" }}
            className="animate-spin"
          />
          <p className="text-lg font-semibold md:font-bold md:text-xl">
            Farmlytics
          </p>
        </Link>
      </div>

      {/* Mobile */}
      <div
        className={`text-white h-screen fixed inset-0 bg-black z-50 md:hidden transition-all duration-300 ease-in-out transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="relative flex flex-col items-center w-full h-full p-8 overflow-y-auto rounded-l-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={Menu}
            alt="close menu"
            className="absolute left-5 top-5 size-8"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="flex flex-col w-full gap-4 mt-16 text-sm font-medium font-menu">
            {menu.map(({ name, to }) => (
              <div
                key={name}
                className="flex items-center justify-between w-full hover-menu"
              >
                <Link
                  to={to}
                  className="text-lg font-medium text-white hover-menu"
                >
                  {name}
                </Link>
                <img src={Arrow} alt="navigate" width={20} height={20} />
              </div>
            ))}
            {btmMenu.map(({ name, to }) => (
              <div
                key={name}
                className="flex items-center justify-between w-full hover-menu"
              >
                <Link
                  to={to}
                  className="text-lg font-medium text-white hover-menu"
                >
                  {name}
                </Link>
                <img src={Arrow} alt="navigate" width={20} height={20} />
              </div>
            ))}
            <div className="flex items-center justify-between w-full hover-menu">
              <div className="text-lg font-medium text-white hover-menu">
                Logout
              </div>
              <img src={Arrow} alt="navigate" width={20} height={20} />
            </div>
          </div>
        </div>
      </div>

      <div className="px-2 py-1 text-lg font-medium bg-black border border-[#1E201E] rounded-md cursor-pointer hover:bg-[#1E201E]">
        {user.userName.slice(0, 2).toLocaleUpperCase()}
      </div>
    </div>
  );
};

export default AppBar;
