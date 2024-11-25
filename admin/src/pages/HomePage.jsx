import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  if (user) {
    navigate("/dashboard");
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-gray-900">
                Your Logo
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <Button>Sign in</Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-10 h-10",
                    },
                  }}
                />
              </SignedIn>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Our Platform
          </h1>
          <p className="text-gray-600 mb-8">
            Please sign in to access your dashboard
          </p>
          <SignUpButton mode="modal">
            <Button>Get Started</Button>
          </SignUpButton>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
