import Layout from "@/components/layout/Layout";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import React from "react";

const Profile = () => {
  return (
    <Layout>
      <div className="w-full h-[90vh] flex items-center justify-center">
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
    </Layout>
  );
};

export default Profile;
