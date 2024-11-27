import { SignedIn } from "@clerk/clerk-react";
import HomePage from "@/pages/HomePage";
import Dashboard from "./pages/admin/Dashboard";
import { Route, Routes } from "react-router-dom";
import Services from "./pages/admin/Services";
import Incidents from "./pages/admin/Incidents";
import Profile from "./pages/admin/Profile";
import Setting from "./pages/admin/Setting";
import OnboardingPage from "./pages/OnBoarding";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setOrganizationDetails,
  setOrganizationId,
} from "./redux/organizations/organizationSlice";
import OrganizationPublicPage from "./pages/OrganizationPublicPage";
import LoadingOverlay from "./components/common/LoadingOverlay";

export default function App() {
  const dispatch = useDispatch();
  const [isSessionLoaded, setIsSessionLoaded] = useState(false);

  useEffect(() => {
    const storedOrganization = sessionStorage.getItem("organization");

    if (storedOrganization) {
      const organizationDetails = JSON.parse(storedOrganization);
      dispatch(setOrganizationDetails(organizationDetails));
      dispatch(setOrganizationId(organizationDetails.id));
    }

    setIsSessionLoaded(true);
  }, [dispatch]);

  if (!isSessionLoaded) {
    return <LoadingOverlay isLoading={!isSessionLoaded} />;
  }

  return (
    <header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route
          path="/organization/:slug"
          element={<OrganizationPublicPage />}
        />
      </Routes>

      <SignedIn>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/services" element={<Services />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </SignedIn>
    </header>
  );
}
