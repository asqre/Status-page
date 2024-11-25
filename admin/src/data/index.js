import {
  ShieldCheckIcon,
  AlertTriangleIcon,
  XOctagonIcon,
  ActivityIcon,
  HelpCircleIcon,
} from "lucide-react";

export const statuses = [
  { name: "Operational", icon: ShieldCheckIcon, color: "green" },
  { name: "Performance Issues", icon: ActivityIcon, color: "purple" },
  { name: "Partial Outage", icon: AlertTriangleIcon, color: "yellow" },
  { name: "Major Outage", icon: XOctagonIcon, color: "red" },
  { name: "Unknown", icon: HelpCircleIcon, color: "blue" },
];

export const services = [
  {
    id: 1,
    tenant_id: 101,
    name: "Website",
    description: "Main company website hosting and management.",
    status: "Operational",
    updated_at: "2024-11-25T10:15:00Z",
    created_at: "2023-05-10T14:30:00Z",
  },
  {
    id: 2,
    tenant_id: 101,
    name: "API",
    description: "RESTful API for integration with third-party apps.",
    status: "Partial Outage",
    updated_at: "2024-11-25T10:00:00Z",
    created_at: "2023-06-15T09:20:00Z",
  },
  {
    id: 3,
    tenant_id: 102,
    name: "Email Service",
    description: "SMTP service for transactional and marketing emails.",
    status: "Degraded Performance",
    updated_at: "2024-11-24T18:45:00Z",
    created_at: "2023-07-01T08:00:00Z",
  },
  {
    id: 4,
    tenant_id: 103,
    name: "File Storage",
    description: "Cloud file storage and backup system.",
    status: "Operational",
    updated_at: "2024-11-23T12:00:00Z",
    created_at: "2023-08-12T16:45:00Z",
  },
  {
    id: 5,
    tenant_id: 101,
    name: "Payment Gateway",
    description: "Service for processing online payments securely.",
    status: "Maintenance",
    updated_at: "2024-11-25T02:30:00Z",
    created_at: "2023-09-20T10:00:00Z",
  },
  {
    id: 6,
    tenant_id: 104,
    name: "Analytics Dashboard",
    description: "Platform for monitoring website and app metrics.",
    status: "Operational",
    updated_at: "2024-11-22T15:00:00Z",
    created_at: "2023-10-01T13:15:00Z",
  },
];
