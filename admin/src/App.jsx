import { SignedIn } from "@clerk/clerk-react";
import HomePage from "@/pages/HomePage";
import Dashboard from "./pages/admin/Dashboard";
import { Route, Routes } from "react-router-dom";
import Services from "./pages/admin/Services";
import Incidents from "./pages/admin/Incidents";
import Profile from "./pages/admin/Profile";
import Setting from "./pages/admin/Setting";

export default function App() {
  return (
    <header>
      <Routes>
        <Route path="/" element={<HomePage />} />
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
