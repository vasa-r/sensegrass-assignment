import { Link } from "react-router-dom";
import Logo from "../../assets/app-logo.png";
import Menu from "../../assets/menu.svg";
import Arrow from "../../assets/arrow.svg";
import { navLinks } from "../../utils/constants";
import { useState } from "react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <nav className="flex items-center sticky top-0 z-50 min-h-[70px] backdrop-saturate-[180] backdrop-blur-[20] bg-[rgba(0,0,0,0.867)] w-full">
      <div className="box-border flex items-center justify-between w-full">
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

        {/* Mobile */}
        <div
          className={`fixed inset-0 bg-black z-50 md:hidden transition-all duration-300 ease-in-out transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div
            className="relative flex flex-col items-center w-full h-full p-8 overflow-y-auto rounded-l-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={Menu}
              alt="close menu"
              className="absolute right-5 top-5 w-7"
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="flex flex-col w-full gap-4 mt-16 text-sm font-medium font-menu">
              {navLinks.map(({ id, name, to }) => (
                <div
                  key={id}
                  className="flex items-center justify-between w-full hover-menu"
                >
                  <Link to={to} className="text-lg font-medium hover-menu">
                    {name}
                  </Link>
                  <img src={Arrow} alt="navigate" width={20} height={20} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop */}
        <ul className="items-center hidden gap-12 md:flex">
          {navLinks.map((link) => (
            <li key={link.name} className="hover-menu">
              <Link className="text-base" to={link.to}>
                {link.name}
              </Link>
            </li>
          ))}
          <Link
            to={"/auth/login"}
            className="text-center rounded-md bg-btnClr h-[38px] border border-transparent btn center cursor-pointer "
          >
            Sign In
          </Link>
        </ul>
        <div className="md:hidden">
          <img
            src={Menu}
            alt="menu"
            className="w-7"
            onClick={() => setIsMenuOpen(true)}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
