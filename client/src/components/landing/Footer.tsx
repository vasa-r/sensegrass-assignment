import { Link } from "react-router-dom";
import Logo from "../../assets/app-logo.png";

const Footer = () => {
  return (
    <div className="flex flex-col w-full gap-6 md:flex-row md:justify-between">
      <div className="flex flex-col gap-3">
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
        <p className="text-base text-subHead">
          © 2025 Vasanth Raman. All rights reserved.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-lg">Download</h4>
        <p className="cursor-pointer text-subHead hover:text-white">
          lorem ipsum helo
        </p>
        <p className="cursor-pointer text-subHead hover:text-white">lorem</p>
        <p className="cursor-pointer text-subHead hover:text-white">lorem</p>
        <h4 className="mt-2">Analyse</h4>
        <p className="cursor-pointer text-subHead hover:text-white">
          lorem ipsum helo
        </p>
        <p className="cursor-pointer text-subHead hover:text-white">lorem</p>
        <p className="cursor-pointer text-subHead hover:text-white">
          lorem ipsum helo
        </p>
        <p className="cursor-pointer text-subHead hover:text-white">
          lorlorem ipsum heloem
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-lg">Help</h4>
        <p className="cursor-pointer text-subHead hover:text-white">
          lorem ipsum helo
        </p>
        <p className="cursor-pointer text-subHead hover:text-white">lorem</p>
        <p className="cursor-pointer text-subHead hover:text-white">lorem</p>
        <h4 className="mt-2">Product</h4>
        <p className="cursor-pointer text-subHead hover:text-white">
          lorem ipsum helo
        </p>
        <p className="cursor-pointer text-subHead hover:text-white">lorem</p>
        <p className="cursor-pointer text-subHead hover:text-white">
          lorem ipsum helo
        </p>
        <p className="cursor-pointer text-subHead hover:text-white">
          lorlorem ipsum heloem
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-lg">Manage</h4>
        <p className="cursor-pointer text-subHead hover:text-white">
          lorem ipsum helo
        </p>
        <p className="cursor-pointer text-subHead hover:text-white">lorem</p>
        <p className="cursor-pointer text-subHead hover:text-white">lorem</p>
        <h4 className="mt-2">Farmlytics</h4>
        <p className="cursor-pointer text-subHead hover:text-white">
          lorem ipsum helo
        </p>
        <p className="cursor-pointer text-subHead hover:text-white">lorem</p>
        <p className="cursor-pointer text-subHead hover:text-white">
          lorem ipsum helo
        </p>
        <p className="cursor-pointer text-subHead hover:text-white">
          lorlorem ipsum heloem
        </p>
      </div>
    </div>
  );
};

export default Footer;
