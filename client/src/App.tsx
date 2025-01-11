import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<LandingPage />} />
        <Route path={"/auth/*"} element={<AuthPage />} />
      </Routes>
    </>
  );
};

export default App;
