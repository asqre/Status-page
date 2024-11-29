import Dashboard from "./pages/admin/Dashboard";
import { Route, Routes } from "react-router-dom";
import Services from "./pages/admin/Services";
import Incidents from "./pages/admin/Incidents";
import Profile from "./pages/admin/Profile";
import Setting from "./pages/admin/Setting";
import OrganizationPublicPage from "./pages/OrganizationPublicPage";
import StatusLandingPage from "./pages/StatusLandingPage";
import SignInPage from "./pages/SignInPage";
import SetUpPage from "./pages/SetupPage";

export default function App() {
  return (
    <header>
      <Routes>
        <Route path="/" element={<StatusLandingPage />} />
        <Route
          path="/organization/:slug"
          element={<OrganizationPublicPage />}
        />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/setup" element={<SetUpPage />} />
      </Routes>

      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/services" element={<Services />} />
        <Route path="/incidents" element={<Incidents />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </header>
  );
}
