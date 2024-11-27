import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const ServiceStatusBadge = ({ status }) => {
  const badgeClasses = {
    Operational: "bg-green-100 text-green-800",
    "Performance Issues": "bg-purple-100 text-purple-800",
    "Partial Outage": "bg-yellow-100 text-yellow-800",
    "Major Outage": "bg-red-100 text-red-800",
    Unknown: "bg-blue-100 text-blue-800",
    Reported: "bg-red-100 text-red-800",
    Investigating: "bg-blue-100 text-blue-800",
    Identified: "bg-purple-100 text-purple-800",
    Watching: "bg-yellow-100 text-yellow-800",
    Fixed: "bg-green-100 text-green-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded-lg text-xs font-medium ${
        badgeClasses[status] || "bg-gray-100"
      }`}
    >
      {status}
    </span>
  );
};

const IncidentTimeline = ({ incidents }) => {
  const [selectedIncident, setSelectedIncident] = useState(null);

  const renderTimelineItems = (incident) => {
    return incident.timeline.map((timelineEntry, index) => (
      <div key={index} className="flex items-start space-x-3 mb-3">
        <div className="w-3 h-3 bg-primary rounded-full mt-2"></div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">{timelineEntry.message}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(timelineEntry.updatedAt).toLocaleString()}
              </p>
            </div>
            <ServiceStatusBadge status={timelineEntry.status} />
          </div>
        </div>
      </div>
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Timelines</CardTitle>
      </CardHeader>
      <CardContent>
        {incidents.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No incident timelines found
          </p>
        ) : (
          <div className="space-y-4">
            {incidents.map((incident) => (
              <div key={incident._id} className="border rounded-lg p-4">
                <div
                  className="flex justify-between items-center cursor-pointer hover:bg-secondary/20 p-2 rounded"
                  onClick={() =>
                    setSelectedIncident(
                      selectedIncident === incident._id ? null : incident._id
                    )
                  }
                >
                  <div>
                    <h3 className="font-semibold">{incident.name}</h3>
                    <ServiceStatusBadge status={incident.status} />
                  </div>
                </div>
                {selectedIncident === incident._id && (
                  <div className="mt-4">{renderTimelineItems(incident)}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
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
  }, [slug]);

  if (error) {
    return (
      <div className="container mx-auto p-6 bg-secondary/10 min-h-screen">
        <Card>
          <CardHeader>
            <p className="text-destructive">{error}</p>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-secondary/10 min-h-screen">
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
                <p className="text-center text-muted-foreground">
                  No services found
                </p>
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
                <p className="text-center text-muted-foreground">
                  No incidents found
                </p>
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

      <IncidentTimeline incidents={incidents} />
    </div>
  );
};

export default OrganizationDashboard;
