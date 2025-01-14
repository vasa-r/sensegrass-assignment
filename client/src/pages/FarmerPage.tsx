import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AppBar from "../components/sharedComp/AppBar";
import SideBar from "../components/sharedComp/SideBar";
import PageLoader from "../components/Loaders/PageLoader";
import { farmerBtmMenu, farmerMenu } from "../utils/constants";

const FarmerHome = lazy(() => import("../components/farmer/FarmerHome"));
const AiSimulation = lazy(() => import("../components/farmer/AiSimulation"));
const Settings = lazy(() => import("../components/farmer/Settings"));
const PricingArea = lazy(() => import("../components/farmer/Pricing"));
const FieldDetails = lazy(() => import("../components/farmer/FieldDetails"));
const FarmerDashboard = lazy(
  () => import("../components/farmer/FarmerDashboard")
);

const FarmerPage = () => {
  return (
    <div className="w-screen h-screen">
      <AppBar menu={farmerMenu} btmMenu={farmerBtmMenu} />
      <div className="flex w-full h-btm-height">
        <SideBar menu={farmerMenu} btmMenu={farmerBtmMenu} />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<FarmerHome />} />
            <Route path="/:id" element={<FieldDetails />} />
            <Route path="/dashboard" element={<FarmerDashboard />} />
            <Route path="/ai-simulate" element={<AiSimulation />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/pricing" element={<PricingArea />} />
            <Route path="*" element={<FarmerHome />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default FarmerPage;
