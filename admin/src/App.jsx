import {
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import HomePage from "@/pages/HomePage";

export default function App() {
  return (
    <header>
      <SignedOut>
        <HomePage />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
