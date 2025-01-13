import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useApp } from "./context/AppContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";
import FarmerPage from "./pages/FarmerPage";
import AdminPage from "./pages/AdminPage";

const App = () => {
  const {
    token,
    user: { role },
  } = useApp();

  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        {!token ? (
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth/*" element={<AuthPage />} />
          </>
        ) : (
          <Route
            path="/*"
            element={
              <Navigate to={role === "admin" ? "/admin" : "/farmer"} replace />
            }
          />
        )}

        {/* Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/farmer"
          element={
            <ProtectedRoute roles={["farmer"]}>
              <FarmerPage />
            </ProtectedRoute>
          }
        />

        {/* Undefined Routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
