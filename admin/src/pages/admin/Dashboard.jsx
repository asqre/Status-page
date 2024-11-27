import Layout from "@/components/layout/Layout";
import { useUser } from "@clerk/clerk-react";
import React from "react";

const Dashboard = () => {
  const user = useUser();
  console.log(user.user.unsafeMetadata?.organization_id);

  return (
    <Layout>
      <div className="min-h-screen bg-purple-50 flex flex-col items-center justify-center">
        <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-lg">
          <h1 className="text-4xl font-extrabold text-purple-600 mb-6">
            Dashboard
          </h1>
          <p className="text-lg mb-6 font-bold text-purple-800 capitalize">
            Hello {user ? user.username : user.fisrtName}!
          </p>
          <p>
            {" "}
            Welcome to Status page App, where you can manage your User status
            with ease.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
