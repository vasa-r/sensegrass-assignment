import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path={"/"} element={<LandingPage />} />
        <Route path={"/auth/*"} element={<AuthPage />} />
      </Routes>
    </>
  );
};

export default App;
