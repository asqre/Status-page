import Layout from "@/components/layout/Layout";
import React from "react";

const Dashboard = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1
          className="text-xl text-[#0E3B65] mb-4 uppercase"
          style={{ fontFamily: "Mukta" }}
        >
          Dashboard
        </h1>
        <div className="mt-[10%] flex flex-col items-center justify-center">
          <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-lg">
            <h1 className="text-4xl font-extrabold text-purple-600 mb-6">
              Dashboard
            </h1>
            <p className="text-lg mb-6 font-bold text-purple-800 capitalize">
              Hello {user?.userName}!
            </p>
            <p>
              {" "}
              Welcome to Status page App, where you can manage your User status
              with ease.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
