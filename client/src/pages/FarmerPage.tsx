import { Route, Routes } from "react-router-dom";
import AppBar from "../components/sharedComp/AppBar";
import SideBar from "../components/sharedComp/SideBar";
import FarmerHome from "../components/farmer/FarmerHome";
import FarmerDashboard from "../components/farmer/FarmerDashboard";
import AiSimulation from "../components/farmer/AiSimulation";
import Settings from "../components/farmer/Settings";
import PricingArea from "../components/farmer/Pricing";

const FarmerPage = () => {
  return (
    <div className="w-screen h-screen">
      <AppBar />
      <div className="flex w-full h-btm-height">
        <SideBar />
        <Routes>
          <Route path="/" element={<FarmerHome />} />
          <Route path="/dashboard" element={<FarmerDashboard />} />
          <Route path="/ai-simulate" element={<AiSimulation />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/pricing" element={<PricingArea />} />
          <Route path="*" element={<FarmerHome />} />
        </Routes>
      </div>
    </div>
  );
};

export default FarmerPage;
