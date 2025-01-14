import { Link } from "react-router-dom";
import { heroSection } from "../../utils/constants";
const HeroSection = () => {
  const { logo, title, subTitle, shortTitle } = heroSection;
  return (
    <div className="flex flex-col items-center gap-4 pt-8 md:gap-4 md:pt-[60px] md:max-w-[960px]">
      <img
        src={logo}
        alt="logo"
        style={{
          width: "120px",
          height: "120px",
          minHeight: "120px",
          minWidth: "120px",
          maxWidth: "120px",
          maxHeight: "120px",
        }}
        className="animate-spin"
      />
      <h1 className="font-semibold leading-normal text-center text-[32px] md:text-hero md:font-bold md:px-5">
        {title}
      </h1>
      <h2 className="text-center text-base md:text-subtitle md:px-5 md:max-w-[750px] text-subHead">
        {subTitle}
        <span className="underline text-lightPur decoration-lightPur hover:capitalize underline-offset-8">
          {" "}
          {shortTitle}
        </span>
      </h2>
      <Link
        to="/auth/signup"
        className="px-8 py-3 mt-4 font-medium rounded-md bg-btnClr text-largecopy"
      >
        Try Farmlytics for free
      </Link>
      <p className="relative text-sm text-subHead -top-4">Powered by AI</p>
    </div>
  );
};

export default HeroSection;
