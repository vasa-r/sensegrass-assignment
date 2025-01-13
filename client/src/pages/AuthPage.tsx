import { Link, Navigate, Route, Routes } from "react-router-dom";
import SignUp from "../components/auth/SignUp";
import Login from "../components/auth/Login";
import Logo from "../assets/app-logo.png";

const AuthPage = () => {
  return (
    <div className="flex flex-col w-screen h-screen overflow-y-auto">
      <Link to={"/"} className="flex items-center gap-2 px-8 py-4">
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
      <Routes>
        <Route path={"/signup"} element={<SignUp />} />
        <Route path={"/login"} element={<Login />} />
        <Route path="*" element={<Navigate to="/auth/signup" replace />} />
      </Routes>
    </div>
  );
};

export default AuthPage;
