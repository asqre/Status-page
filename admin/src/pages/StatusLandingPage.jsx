import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Lock,
  Users,
  Globe,
  ShieldCheck,
  LogIn,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Logo from "@/components/common/Logo";
import { useNavigate } from "react-router-dom";
import { useClerk, useUser } from "@clerk/clerk-react";

const StatusPageLanding = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { signOut } = useClerk();

  useEffect(() => {
    const handleSignOut = async () => {
      if (user) {
        await signOut({ redirectUrl: "/" });
      }
    };

    handleSignOut();
  }, [user, signOut]);

  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const demoOrganizations = [
    {
      name: "Tech Startup Inc",
      publicUrl: "https://tech-startup.statuspage.com",
    },
    {
      name: "E-commerce Platform",
      publicUrl: "https://ecommerce-platform.statuspage.com",
    },
  ];

  const features = [
    {
      icon: <Users className="w-10 h-10 text-primary" />,
      title: "Multi-Tenant Architecture",
      description:
        "Securely host status pages for multiple organizations with complete data isolation.",
    },
    {
      icon: <Lock className="w-10 h-10 text-primary" />,
      title: "Enterprise-Grade Security",
      description:
        "Robust access controls, encryption, and comprehensive security measures.",
    },
    {
      icon: <Globe className="w-10 h-10 text-primary" />,
      title: "Custom Domains & Branding",
      description:
        "Create personalized status pages that reflect your organization's identity.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-primary" />,
      title: "Compliance & Reliability",
      description:
        "Meet stringent security standards with our robust infrastructure.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => navigate("/signin")}>
                <LogIn className="mr-2" />
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
          Status Pages Made Simple
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Create professional, secure status pages for your organization with
          instant setup and enterprise-grade multi-tenant architecture.
        </p>

        <div className="flex justify-center space-x-4">
          <Button size="lg" onClick={() => navigate("/setup")}>
            <CheckCircle className="mr-2" /> Get Started
          </Button>

          <Button variant="outline" onClick={() => setIsDemoModalOpen(true)}>
            View Demo
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all">
              <CardContent className="pt-6 text-center">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 bg-secondary/10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Technical Architecture</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Leveraging modern cloud infrastructure and authentication
            technologies to provide a secure, scalable multi-tenant platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Authentication</CardTitle>
              <CardDescription>Powered by Clerk</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>✓ SSO Support</li>
                <li>✓ Multi-Factor Authentication</li>
                <li>✓ User Management</li>
                <li>✓ Role-Based Access Control</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Isolation</CardTitle>
              <CardDescription>Secure Multi-Tenancy</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>✓ Separate Database Schemas</li>
                <li>✓ Tenant Context Middleware</li>
                <li>✓ Row-Level Security</li>
                <li>✓ Encryption at Rest</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scalability</CardTitle>
              <CardDescription>Cloud-Native Design</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>✓ Serverless Architecture</li>
                <li>✓ Horizontal Scaling</li>
                <li>✓ Global CDN Support</li>
                <li>✓ Performance Optimized</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Create your first status page in minutes. No credit card required.
          Join hundreds of organizations trusting our platform.
        </p>
        <Button size="lg" onClick={() => navigate("/setup")}>
          Create Free Account
        </Button>
      </div>

      <Dialog open={isDemoModalOpen} onOpenChange={setIsDemoModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Status Page Demo Organizations</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {demoOrganizations.map((org, index) => (
              <Card key={index}>
                <CardContent className="flex justify-between items-center p-4">
                  <div>
                    <h3 className="font-semibold">{org.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {org.publicUrl}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => window.open(org.publicUrl, "_blank")}
                  >
                    View Status Page
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StatusPageLanding;
