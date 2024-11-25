import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import HomePage from "@/pages/HomePage";
import Layout from "./components/layout/Layout";

export default function App() {
  return (
    <header>
      <SignedOut>
        <HomePage />
      </SignedOut>
      <SignedIn>
        <Layout />
        {/* <UserButton /> */}
      </SignedIn>
    </header>
  );
}
