import React, { useState, useEffect, useMemo } from "react";
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
import {
  AlertCircle,
  ClipboardList,
  BarChart,
  RefreshCw,
  TrendingUp,
  Bell,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import axios from "@/api/axios";
import { formatDate } from "@/utils.js";
import moment from "moment";
import io from "socket.io-client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import Chip from "@/components/common/Chip";

const IncidentTimeline = ({ incidents }) => {
  const renderTimelineItems = (incident) => {
    return incident.timeline.map((timelineEntry, index) => (
      <div
        key={index}
        className="bg-slate-50 border-l-4 border-primary flex items-center space-x-3 mb-2 p-3 hover:bg-slate-100 transition-colors"
      >
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-foreground">
                {timelineEntry.message}
              </p>
              <p className="text-xs text-muted-foreground">
                {moment(timelineEntry.updatedAt).fromNow()}
              </p>
            </div>
            <Chip status={timelineEntry.status} />
          </div>
        </div>
      </div>
    ));
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <AlertCircle className="mr-2" /> Incident History
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Refresh Incident Data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        {incidents.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <AlertCircle className="mx-auto mb-4 h-12 w-12 text-primary/50" />
            <p>No past incidents to display</p>
            <p className="text-sm">All systems are running smoothly</p>
          </div>
        ) : (
          <div className="space-y-4">
            {incidents.map((incident) => (
              <div
                key={incident._id}
                className="border rounded-lg overflow-hidden hover:shadow-sm transition-shadow"
              >
                <div className="bg-secondary/10 p-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">{incident.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {moment(incident.createdAt).format("MMMM DD, YYYY")} -
                      {moment(incident.updatedAt).format("MMMM DD, YYYY")}
                    </p>
                  </div>
                  <Chip status={incident.status} />
                </div>
                <div className="p-4">{renderTimelineItems(incident)}</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const OrganizationPublicPage = () => {
  const [activeTab, setActiveTab] = useState("services");
  const [services, setServices] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const slug = location.pathname.split("/")[2];
  const [socket, setSocket] = useState(null);

  const performanceMetrics = useMemo(() => {
    const totalServices = services.length;
    const operationalServices = services.filter(
      (service) => service.status === "Operational"
    ).length;
    const overallUptime =
      totalServices > 0
        ? ((operationalServices / totalServices) * 100).toFixed(2)
        : 0;

    return {
      totalServices,
      operationalServices,
      overallUptime,
    };
  }, [services]);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_API_URL);

    newSocket.on("connect", () => {
      console.log("Connected to server:", newSocket.id);
    });

    newSocket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    setSocket(newSocket);

    newSocket.on("serviceAdded", (service) => {
      setServices((prevServices) => [...prevServices, service]);
    });

    newSocket.on("serviceUpdated", (updatedService) => {
      setServices((prevServices) =>
        prevServices.map((service) =>
          service._id === updatedService._id ? updatedService : service
        )
      );
    });

    newSocket.on("serviceDeleted", (serviceId) => {
      setServices((prevServices) =>
        prevServices.filter((service) => service._id !== serviceId)
      );
    });

    newSocket.on("incidentAdded", (incident) => {
      setIncidents((prevIncidents) => [...prevIncidents, incident]);
    });

    newSocket.on("incidentUpdated", (updatedIncident) => {
      setIncidents((prevIncidents) =>
        prevIncidents.map((incident) =>
          incident._id === updatedIncident._id ? updatedIncident : incident
        )
      );
    });

    newSocket.on("incidentDeleted", (incidentId) => {
      setIncidents((prevIncidents) =>
        prevIncidents.filter((incident) => incident._id !== incidentId)
      );
    });

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    const fetchOrganizationData = async () => {
      try {
        const servicesResponse = await axios.get(`/service/${slug}/service`);
        setServices(servicesResponse.data.data);

        const incidentsResponse = await axios.get(`/incident/${slug}/incident`);
        setIncidents(incidentsResponse.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
      }
    };

    if (slug) {
      fetchOrganizationData();
    }
  }, [slug]);

  if (error) {
    return (
      <div className="container mx-auto p-6 bg-secondary/10 min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-secondary/10 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Services
            </CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {performanceMetrics.totalServices}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Operational Services
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {performanceMetrics.operationalServices}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Uptime
            </CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {performanceMetrics.overallUptime}%
            </div>
          </CardContent>
        </Card>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center flex items-center justify-center">
        <BarChart className="mr-3" /> Organizational Services Dashboard
      </h1>

      <Card className="w-full mb-10">
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
                      <TableHead>Last Updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map((service) => (
                      <TableRow key={service._id}>
                        <TableCell>{service.name}</TableCell>
                        <TableCell>
                          <Chip status={service.status} />
                        </TableCell>
                        <TableCell>{service.description || "N/A"}</TableCell>
                        <TableCell>{formatDate(service.updatedAt)}</TableCell>
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
                      <TableHead>Incident Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>created At</TableHead>
                      <TableHead>Last Updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {incidents.map((incident) => (
                      <TableRow key={incident._id}>
                        <TableCell>{incident.name}</TableCell>
                        <TableCell>
                          <Chip status={incident.status} />
                        </TableCell>
                        <TableCell>{incident.message || "N/A"}</TableCell>
                        <TableCell>{formatDate(incident.createdAt)}</TableCell>
                        <TableCell>{formatDate(incident.updatedAt)}</TableCell>
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

export default OrganizationPublicPage;
