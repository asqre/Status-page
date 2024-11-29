import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/common/Logo";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CheckCircle } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignUpButton,
  useUser,
  useClerk,
} from "@clerk/clerk-react";
import { Separator } from "@/components/ui/separator";
import axios from "@/api/axios";
import { toast } from "sonner";

const SetUpPage = () => {
  const [userSignedUp, setUserSignedUp] = useState(false);
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (user) {
      setUserEmail(user?.primaryEmailAddress?.emailAddress);
      setUserName(user?.fullName);
    }
  }, [user]);

  const SignUpContent = () => {
    const [userData, setUserData] = useState({
      name: "",
      email: "",
      password: "",
    });

    const handleChange = (e) => {
      setUserData({ ...userData, [e.target.id]: e.target.value });
    };

    const handleEmailSignup = async (e) => {
      e.preventDefault();

      const promise = axios.post(`/organization/user/signup`, {
        userName: userData.name,
        userEmail: userData.email,
        password: userData.password,
      });

      toast.promise(promise, {
        loading: "please wait...",
        success: (response) => {
          setUserSignedUp(true);
          setUserEmail(userData.email);
          setUserName(userData.name);
          return response.data?.message;
        },
        error: (error) => {
          return (
            error.response?.data?.message || error.message || "Sign in failed"
          );
        },
      });
    };

    return (
      <div className="min-h-screen w-full flex items-center justify-center m-auto py-10">
        <div className="flex flex-col items-center justify-center max-w-7xl h-full">
          <Logo />

          <div className="flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:min-w-[50%] lg:w-1/2 bg-secondary/10 flex flex-col justify-center items-center p-12">
              <div className="max-w-md text-center">
                <div className="mb-8 flex justify-center">
                  <img
                    src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7875.jpg?t=st=1732896511~exp=1732900111~hmac=4920b386c5e5d0484ebd9bf1971f36437eb1104015fd297f6f6288d569eafb08&w=826"
                    alt="Status Page Illustration"
                    width={500}
                    height={300}
                    className="object-contain"
                  />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-foreground">
                  Let's Get Started
                </h2>

                <p className="text-muted-foreground text-center">
                  Sign up to create your status page
                </p>
              </div>
            </div>

            <div className="w-full flex items-center justify-center p-4">
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle className="text-center">
                    Create Your Account
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <SignUpButton mode="modal" signInForceRedirectUrl="/setup">
                      <Button variant="outline" className="w-full">
                        Sign Up with Clerk
                      </Button>
                    </SignUpButton>

                    <div className="flex items-center">
                      <Separator className="flex-1" />
                      <span className="px-2 text-muted-foreground">or</span>
                      <Separator className="flex-1" />
                    </div>

                    <form onSubmit={handleEmailSignup} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          type="name"
                          value={userData.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={userData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          value={userData.password}
                          onChange={handleChange}
                          placeholder="Create a password"
                        />
                      </div>

                      <Button type="submit" className="w-full">
                        Sign Up with Email
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SetUpContent = () => {
    const [organizationDetails, setOrganizationDetails] = useState({
      orgName: "",
      subdomain: "",
    });

    const generateSubdomain = (name) => {
      return name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 30)
        .replace(/^-+|-+$/g, "");
    };

    const handleChange = (e) => {
      const { id, value } = e.target;

      if (id === "orgName") {
        const sanitizedSubdomain = generateSubdomain(value);

        setOrganizationDetails({
          orgName: value,
          subdomain: sanitizedSubdomain,
        });
      } else if (id === "subdomain") {
        const sanitizedSubdomain = generateSubdomain(value);

        setOrganizationDetails({
          ...organizationDetails,
          subdomain: sanitizedSubdomain,
        });
      }
    };

    const handleCreateOrganization = (e) => {
      e.preventDefault();

      const promise = axios.post(`/organization/`, {
        companyName: organizationDetails.orgName,
        slug: organizationDetails.subdomain,
        userEmail: userEmail,
        userName: userName,
      });

      toast.promise(promise, {
        loading: "please wait...",
        success: (response) => {
          return response.data?.message;
        },
        error: (error) => {
          return (
            error.response?.data?.message || error.message || "Sign in failed"
          );
        },
      });
    };

    return (
      <div className="min-h-screen w-full flex items-center justify-center m-auto py-10">
        <div className="flex flex-col items-center justify-center max-w-7xl h-full">
          <Logo />
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 bg-secondary/10 flex flex-col justify-center items-center p-12">
              <div className="max-w-md text-center">
                <div className="mb-8 flex justify-center">
                  <img
                    src="https://www.shutterstock.com/image-vector/modern-flat-system-update-illustration-600nw-1789285841.jpg"
                    alt="Status Page Illustration"
                    width={300}
                    height={300}
                    className="rounded-lg shadow-lg"
                  />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-foreground">
                  Let's Get Started
                </h2>

                <p className="text-muted-foreground text-center">
                  Statuspage helps you communicate with your users during
                  incidents. To get started, you will add the services you care
                  about, customize your page, invite your team.
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col items-center lg:w-1/2 lg:p-12">
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Create Your Status Page
                  </CardTitle>
                  <CardDescription>
                    Set up a professional status page for your organization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={handleCreateOrganization}
                    className="space-y-4"
                  >
                    <div>
                      <Label htmlFor="orgName">Organization Name</Label>
                      <Input
                        id="orgName"
                        placeholder="Enter your organization name"
                        value={organizationDetails.orgName}
                        onChange={handleChange}
                        aria-describedby="orgName-help"
                      />
                      <p
                        id="orgName-help"
                        className="text-sm text-muted-foreground mt-1"
                      >
                        This will be used to generate your unique status page
                        URL
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="subdomain">Status Page URL</Label>
                      <div className="flex items-center">
                        <Input
                          id="subdomain"
                          value={organizationDetails.subdomain}
                          // readOnly
                          className="mr-2"
                          onChange={handleChange}
                        />
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="icon">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>URL is automatically generated</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your status page will be available at:
                        {import.meta.env.VITE_BASE_URL}/
                        {organizationDetails.subdomain}
                      </p>
                    </div>
                    <Button type="submit" className="w-full">
                      Continue
                    </Button>
                  </form>
                  <Button
                    onClick={() => {
                      setUserSignedUp(false);
                      signOut({ redirectUrl: "/setup" });
                    }}
                    className="w-full mt-4"
                    variant="secondary"
                  >
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>{isSignedIn || userSignedUp ? <SetUpContent /> : <SignUpContent />}</>
  );
};

export default SetUpPage;
