import { Route, Routes } from "react-router-dom";
import AppBar from "../components/sharedComp/AppBar";
import SideBar from "../components/sharedComp/SideBar";
import FarmerHome from "../components/farmer/FarmerHome";

const FarmerPage = () => {
  return (
    <div className="w-screen h-screen">
      <AppBar />
      <div className="flex w-full h-btm-height">
        <SideBar />
        <Routes>
          <Route path="/" element={<FarmerHome />} />
          <Route path="*" element={<FarmerHome />} />
        </Routes>
      </div>
    </div>
  );
};

export default FarmerPage;
