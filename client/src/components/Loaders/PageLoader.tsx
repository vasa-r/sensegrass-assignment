import Logo from "../../assets/app-logo.png";

const PageLoader = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <img src={Logo} alt="logo" className="animate-bounce" />
    </div>
  );
};

export default PageLoader;
