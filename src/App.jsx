import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Root from "./utils/Root.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ClientDashboard from "./pages/ClientDashboard.jsx";
import ViewFeedback from "./pages/ViewFeedback.jsx";
import PrivateRoutes from "./utils/privateRoute.jsx";
import RoleBasedRoutes from "./utils/roleBasedRoute.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Route */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        />

        {/* Client Route */}
        <Route
          path="/client-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin", "client"]}>
                <ClientDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        />

        {/* Feedback (Accessible by admin and client) */}
        <Route
          path="/feedback/:id"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin", "client"]}>
                <ViewFeedback />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
