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
import { useNavigate } from "react-router-dom";
import { SignInButton, useClerk, useUser } from "@clerk/clerk-react";
import axios from "@/api/axios";
import { toast } from "sonner";

const SignInPage = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleSignIn = async () => {
    const promise = axios.post(`/organization/user/login`, {
      userEmail: loginData.email,
      password: loginData.password,
    });

    toast.promise(promise, {
      loading: "Checking user credentials...",
      success: (response) => {
        const hasOrganization = response.data?.isMember;
        if (hasOrganization) {
          navigate("/dashboard");
        } else {
          return response.data?.message;
        }
        return "Sign in successful!";
      },
      error: (error) => {
        return (
          error.response?.data?.message || error.message || "Sign in failed"
        );
      },
    });
  };

  const checkUserOrganization = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    const promise = axios.get("/organization/user/check", {
      params: { userEmail: user.primaryEmailAddress.emailAddress },
    });

    toast.promise(promise, {
      loading: "Checking user credentials...",
      success: async (response) => {
        const hasOrganization = response.data?.isMember;
        if (hasOrganization) {
          navigate("/dashboard");
          return "Sign in successful!";
        } else {
          await signOut();
          return "No organization found. Signed out.";
        }
      },
      error: async (error) => {
        await signOut();
        return (
          error.response?.data?.message || error.message || "Sign in failed."
        );
      },
    });
  };

  useEffect(() => {
    if (user) {
      checkUserOrganization();
    }
  }, [user]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center m-auto py-10">
      <div className="flex flex-col items-center justify-center max-w-7xl h-full">
        <Logo />

        <div className="flex flex-col lg:flex-row justify-between">
          <div className="w-full lg:w-1/2 bg-secondary/10 flex flex-col justify-center items-center p-12">
            <div className="max-w-md text-center">
              <div className="mb-8 flex justify-center">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/006/912/004/non_2x/secure-login-and-sign-up-concept-illustration-vector.jpg"
                  alt="Status Page Illustration"
                  width={300}
                  height={300}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-foreground">
                Welcome Back!
              </h2>

              <p className="text-muted-foreground text-center">
                Manage your organization's status page effortlessly.
              </p>
            </div>
          </div>

          <div className="w-full flex justify-center lg:w-1/2 lg:p-12">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Sign In to StatusPage
                </CardTitle>
                <CardDescription>
                  Manage your service status and keep users informed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      value={loginData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      required
                      value={loginData.password}
                      onChange={handleChange}
                    />
                  </div>

                  {/* <div className="text-right">
                    <Button variant="link" size="sm" className="text-sm">
                      Forgot Password?
                    </Button>
                  </div> */}

                  <Button
                    type="submit"
                    className="w-full"
                    onClick={handleSignIn}
                  >
                    Sign In
                  </Button>

                  <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-muted-foreground/30"></div>
                    <span className="mx-4 text-muted-foreground text-sm">
                      or
                    </span>
                    <div className="flex-grow border-t border-muted-foreground/30"></div>
                  </div>

                  <SignInButton mode="modal">
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center"
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
                        alt="Google Logo"
                        width={24}
                        height={24}
                        className="mr-2"
                      />
                      Sign in with Google
                    </Button>
                  </SignInButton>

                  <div className="text-center mt-4">
                    <span className="text-muted-foreground text-sm">
                      Don't have an account?{" "}
                      <Button
                        variant="link"
                        size="sm"
                        className="text-primary"
                        onClick={() => navigate("/setup")}
                      >
                        Sign Up
                      </Button>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
