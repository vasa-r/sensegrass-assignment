import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AppBar from "../components/sharedComp/AppBar";
import SideBar from "../components/sharedComp/SideBar";
import PageLoader from "../components/Loaders/PageLoader";
import { adminBtmMenu, adminMenu } from "../utils/constants";

const AdminHome = lazy(() => import("../components/admin/AdminHome"));
const AdminFields = lazy(() => import("../components/admin/AdminFields"));
const Settings = lazy(() => import("../components/farmer/Settings"));
const AdminUsers = lazy(() => import("../components/admin/AdminUsers"));
const FieldDetails = lazy(() => import("../components/farmer/FieldDetails"));
const AdminTransactions = lazy(
  () => import("../components/admin/AdminTransactions")
);

const AdminPage = () => {
  return (
    <div className="w-screen h-screen">
      <AppBar menu={adminMenu} btmMenu={adminBtmMenu} />
      <div className="flex w-full h-btm-height">
        <SideBar menu={adminMenu} btmMenu={adminBtmMenu} />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<AdminHome />} />
            <Route path="/users" element={<AdminUsers />} />
            <Route path="/fields" element={<AdminFields />} />
            <Route path="/:id" element={<FieldDetails />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/transactions" element={<AdminTransactions />} />
            <Route path="*" element={<AdminHome />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default AdminPage;
