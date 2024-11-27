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
import { formatDate } from "@/utils.js";
import moment from "moment";
import io from "socket.io-client";

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
  const renderTimelineItems = (incident) => {
    return incident.timeline.map((timelineEntry, index) => (
      <div
        key={index}
        className="bg-slate-100 flex items-center space-x-3 mb-1 h-[80px] px-3"
      >
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
        <CardTitle>Past Incidents</CardTitle>
      </CardHeader>
      <CardContent>
        {incidents.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No incident timelines found
          </p>
        ) : (
          <div className="space-y-8">
            {incidents.map((incident) => (
              <div key={incident._id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center cursor-pointer hover:bg-secondary/20 p-2 rounded">
                  <div className="w-full">
                    <h3 className="text-[20px] font-semibold">
                      {incident.name}
                    </h3>
                    <div className="flex flex-row justify-between">
                      <p className="text-[12px] text-gray-500">
                        {moment(incident.createdAt).format(
                          "MMM DD, YYYY, h:mm:ss A"
                        )}{" "}
                        -{" "}
                        {moment(incident.updatedAt).format(
                          "MMM DD, YYYY, h:mm:ss A"
                        )}
                      </p>
                      <ServiceStatusBadge status={incident.status} />
                    </div>
                  </div>
                </div>
                <div className="mt-4">{renderTimelineItems(incident)}</div>
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

  useEffect(() => {
    const newSocket = io("http://localhost:8000");

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
                          <ServiceStatusBadge status={service.status} />
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
                          <ServiceStatusBadge status={incident.status} />
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
