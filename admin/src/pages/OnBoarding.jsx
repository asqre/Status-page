import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "@/components/common/LoadingOverlay";
import axios from "@/api/axios";

const OnboardingPage = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("User not authenticated");
      return;
    }

    if (!companyName.trim() || !subdomain.trim()) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("/organization", {
        userId: user.id,
        name: companyName,
        slug: subdomain,
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Onboarding error:", error);
      setError(error?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Set up your account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="companyName"
              className="block text-sm font-medium text-gray-700"
            >
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor="subdomain"
              className="block text-sm font-medium text-gray-700"
            >
              Subdomain
            </label>
            <input
              type="text"
              id="subdomain"
              value={subdomain}
              onChange={(e) => setSubdomain(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Complete Onboarding
          </Button>
        </form>
      </div>
      <LoadingOverlay isLoading={!isLoaded} />
    </div>
  );
};

export default OnboardingPage;