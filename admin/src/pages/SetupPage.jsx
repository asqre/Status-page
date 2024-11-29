import React, { useState } from "react";
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

const SetUpPage = () => {
  const [organizationName, setOrganizationName] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();

  const handleSubdomainGeneration = () => {
    const sanitizedName = organizationName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 30);
    setSubdomain(sanitizedName);
  };

  const SignUpContent = () => {
    return (
      <div className="min-h-screen w-full flex items-center justify-center m-auto py-10">
        <div className="flex flex-col items-center justify-center max-w-7xl h-full">
          <Logo />
          <div className="text-center mt-8">
            <h2 className="text-3xl font-bold mb-4">Create Your Account</h2>
            <p className="text-muted-foreground mb-6">
              Sign up to create your status page
            </p>
            <SignUpButton mode="modal">
              <Button size="lg">Sign Up</Button>
            </SignUpButton>
          </div>
        </div>
      </div>
    );
  };

  const SetUpContent = () => {
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
                  <form className="space-y-4">
                    <div>
                      <Label htmlFor="orgName">Organization Name</Label>
                      <Input
                        id="orgName"
                        placeholder="Enter your organization name"
                        value={organizationName}
                        onChange={(e) => {
                          setOrganizationName(e.target.value);
                          handleSubdomainGeneration();
                        }}
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
                          value={subdomain}
                          readOnly
                          className="mr-2"
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
                        Your status page will be available at: https://
                        {subdomain || "your-org"}.statusmonitor.com
                      </p>
                    </div>
                    <Button className="w-full">Continue</Button>
                  </form>
                  <Button
                    onClick={() => signOut()}
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
    <>
      <SignedOut>
        <SignUpContent />
      </SignedOut>
      <SignedIn>
        <SetUpContent />
      </SignedIn>
    </>
  );
};

export default SetUpPage;
