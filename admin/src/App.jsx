import { SignedIn, useUser } from "@clerk/clerk-react";
import HomePage from "@/pages/HomePage";
import Dashboard from "./pages/admin/Dashboard";
import { Route, Routes } from "react-router-dom";
import Services from "./pages/admin/Services";
import Incidents from "./pages/admin/Incidents";
import Profile from "./pages/admin/Profile";
import Setting from "./pages/admin/Setting";
import OnboardingPage from "./pages/OnBoarding";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOrganizationId } from "./redux/organizations/organizationSlice";

export default function App() {
  const user = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const organization_id = user?.user?.unsafeMetadata?.organization_id;
      dispatch(setOrganizationId(organization_id));
    }
  }, [user]);

  return (
    <header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Routes>

      <SignedIn>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/services" element={<Services />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/maintainance" element={<Incidents />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </SignedIn>
    </header>

    // <header>
    //   <SignedOut>
    //     <HomePage />
    //   </SignedOut>
    //   <SignedIn>
    //     <Layout />
    //     {/* <UserButton /> */}
    //   </SignedIn>
    // </header>
  );
}
