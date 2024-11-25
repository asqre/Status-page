import Layout from "@/components/layout/Layout";
import React from "react";

const HomePage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">
              Quick Stats
            </h2>
            <p className="text-blue-600">View your activity summary</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-green-900 mb-2">
              Recent Activity
            </h2>
            <p className="text-green-600">Check your latest updates</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-purple-900 mb-2">
              Notifications
            </h2>
            <p className="text-purple-600">Stay up to date</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
