import axios from "@/api/axios";
import LoadingOverlay from "@/components/common/LoadingOverlay";
import { Button } from "@/components/ui/button";
import {
  setOrganizationDetails,
  setOrganizationId,
} from "@/redux/organizations/organizationSlice";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUserStatus = async () => {
      if (user) {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `/organization/check/user/?userEmail=${user.primaryEmailAddress.emailAddress}`
          );

          const hasOrganization = response.data?.isMember;

          if (!hasOrganization) {
            navigate("/onboarding");
          } else {
            const organizationDetails = response.data.organization;

            dispatch(setOrganizationDetails(organizationDetails));
            dispatch(setOrganizationId(organizationDetails.id));

            sessionStorage.setItem(
              "organization",
              JSON.stringify(organizationDetails)
            );

            navigate("/dashboard");
          }
        } catch (error) {
          console.error("Error checking user status:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    checkUserStatus();
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-gray-900">
                Status Page
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
            A better way to monitor your services.
          </h1>
          <p className="text-gray-600 mb-8">
            Monitor your API and website globally, identify performance issues,
            downtime and receive alerts before your users are affected.
          </p>
          <SignUpButton mode="modal">
            <Button>Get Started</Button>
          </SignUpButton>
        </div>
      </main>

      <LoadingOverlay isLoading={isLoading || !isLoaded} />
    </div>
  );
};

export default HomePage;
