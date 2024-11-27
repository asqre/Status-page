import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  AlertCircle,
  CheckCircle,
  ClipboardList,
  BarChart,
} from "lucide-react";

const ServiceStatusBadge = ({ status }) => {
  const badgeClasses = {
    Operational: "bg-green-100 text-green-800",
    Degraded: "bg-yellow-100 text-yellow-800",
    Incident: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        badgeClasses[status] || "bg-gray-100"
      }`}
    >
      {status}
    </span>
  );
};

const OrganizationDashboard = () => {
  const [activeTab, setActiveTab] = useState("services");

  const services = [
    {
      name: "Cloud Infrastructure",
      status: "Operational",
      uptime: "99.99%",
      lastUpdated: "2024-11-27 10:30 EST",
    },
    {
      name: "Authentication Service",
      status: "Degraded",
      uptime: "99.85%",
      lastUpdated: "2024-11-27 09:15 EST",
    },
    {
      name: "Customer Database",
      status: "Operational",
      uptime: "100%",
      lastUpdated: "2024-11-27 11:45 EST",
    },
  ];

  const incidents = [
    {
      id: "INC-2024-001",
      service: "Authentication Service",
      impact: "Partial Service Disruption",
      status: "In Progress",
      reported: "2024-11-27 08:45 EST",
    },
    {
      id: "INC-2024-002",
      service: "Network Infrastructure",
      impact: "Minor Latency",
      status: "Resolved",
      reported: "2024-11-26 22:15 EST",
    },
  ];

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center flex items-center justify-center">
        <BarChart className="mr-3" /> Organizational Services Dashboard
      </h1>

      <Card className="w-full">
        <Tabs
          defaultValue="services"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <CardHeader>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="services">
                <ClipboardList className="mr-2" /> Services
              </TabsTrigger>
              <TabsTrigger value="incidents">
                <AlertCircle className="mr-2" /> Incidents
              </TabsTrigger>
            </TabsList>
          </CardHeader>

          <CardContent>
            <TabsContent value="services">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Uptime</TableHead>
                    <TableHead>Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service, index) => (
                    <TableRow key={index}>
                      <TableCell>{service.name}</TableCell>
                      <TableCell>
                        <ServiceStatusBadge status={service.status} />
                      </TableCell>
                      <TableCell>{service.uptime}</TableCell>
                      <TableCell>{service.lastUpdated}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="incidents">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Incident ID</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Impact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reported</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incidents.map((incident, index) => (
                    <TableRow key={index}>
                      <TableCell>{incident.id}</TableCell>
                      <TableCell>{incident.service}</TableCell>
                      <TableCell>{incident.impact}</TableCell>
                      <TableCell>
                        <ServiceStatusBadge
                          status={
                            incident.status === "Resolved"
                              ? "Operational"
                              : "Incident"
                          }
                        />
                      </TableCell>
                      <TableCell>{incident.reported}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default OrganizationDashboard;
