import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { AlertCircle, ClipboardList, BarChart } from "lucide-react";
import { useLocation } from "react-router-dom";
import axios from "@/api/axios";
import LoadingOverlay from "@/components/common/LoadingOverlay";

const ServiceStatusBadge = ({ status }) => {
  const badgeClasses = {
    "Operational": "bg-green-100 text-green-800",
    "Performance Issues": "bg-purple-100 text-purple-800",
    "Partial Outage": "bg-yellow-100 text-yellow-800",
    "Major Outage": "bg-red-100 text-red-800",
    "Unknown": "bg-blue-100 text-blue-800",
    "Reported":  "bg-red-100 text-red-800" ,
    "Investigating": "bg-blue-100 text-blue-800",
    "Identified": "bg-purple-100 text-purple-800",
    "Watching": "bg-yellow-100 text-yellow-800" ,
    "Fixed": "bg-green-100 text-green-800" ,
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
  const [services, setServices] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  const slug = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchOrganizationData = async () => {
      try {
        setLoading(true);
        const servicesResponse = await axios.get(`/service/${slug}/service`);

        setServices(servicesResponse.data.data);

        const incidentsResponse = await axios.get(`/incident/${slug}/incident`);
        setIncidents(incidentsResponse.data.data);

        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
        setLoading(false);
      }
    };

    if (slug) {
      fetchOrganizationData();
    }
  }, []);

  if (error) {
    return (
      <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
        <Card className="w-full">
          <CardHeader>
            <p className="text-red-500">{error}</p>
          </CardHeader>
        </Card>
      </div>
    );
  }

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
              {services.length === 0 ? (
                <p className="text-center text-gray-500">No services found</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Created At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map((service) => (
                      <TableRow key={service._id}>
                        <TableCell>{service.name}</TableCell>
                        <TableCell>
                          <ServiceStatusBadge status={service.status} />
                        </TableCell>
                        <TableCell>{service.description || "N/A"}</TableCell>
                        <TableCell>
                          {new Date(service.createdAt).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TabsContent>

            <TabsContent value="incidents">
              {incidents.length === 0 ? (
                <p className="text-center text-gray-500">No incidents found</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Incident ID</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {incidents.map((incident) => (
                      <TableRow key={incident._id}>
                        <TableCell>{incident._id}</TableCell>
                        <TableCell>{incident.service?.name || "N/A"}</TableCell>
                        <TableCell>{incident.description}</TableCell>
                        <TableCell>
                          <ServiceStatusBadge status={incident.status} />
                        </TableCell>
                        <TableCell>
                          {new Date(incident.createdAt).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
      <LoadingOverlay isLoading={loading} />
    </div>
  );
};

export default OrganizationDashboard;
