import Layout from "@/components/layout/Layout";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import React from "react";

const Profile = () => {
  return (
    <Layout>
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "w-10 h-10",
            },
          }}
        />
      </SignedIn>
    </Layout>
  );
};

export default Profile;
