import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useClerk, useUser } from "@clerk/clerk-react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProfilePage = () => {
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const organizationDetails = JSON.parse(
    sessionStorage.getItem("organization")
  );

  const handleLogout = async () => {
    if (isSignedIn) {
      await signOut();
    } else {
      navigate("/");
    }
    sessionStorage.clear();
    toast.success("logged out successfully");
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1
          className="text-xl text-[#0E3B65] mb-4 uppercase"
          style={{ fontFamily: "Mukta" }}
        >
          Profile
        </h1>
        <div className="flex flex-col items-center gap-10 w-[100%]">
          <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
            <div className="flex items-center justify-between border-b pb-4">
              <h1 className="text-2xl font-semibold text-gray-700">
                My Profile
              </h1>
              <Button onClick={handleLogout}>Logout</Button>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  Full Name
                </label>

                <p className="mt-1 text-gray-700 capitalize">
                  {user?.userName}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400">
                  Email Address
                </label>
                <p className="mt-1 text-gray-700">{user?.userEmail}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400">
                  Company Name
                </label>

                <p className="mt-1 text-gray-700">
                  {organizationDetails?.companyName}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400">
                  Role
                </label>

                <p className="mt-1 text-gray-700">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
