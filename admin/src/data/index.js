import {
  ShieldCheckIcon,
  AlertTriangleIcon,
  XOctagonIcon,
  ActivityIcon,
  HelpCircleIcon,
  AlertTriangle,
  Search,
  CheckCircle,
  Eye,
  Wrench,
} from "lucide-react";

export const serviceStatus = [
  { name: "Operational", icon: ShieldCheckIcon, color: "green" },
  { name: "Performance Issues", icon: ActivityIcon, color: "purple" },
  { name: "Partial Outage", icon: AlertTriangleIcon, color: "yellow" },
  { name: "Major Outage", icon: XOctagonIcon, color: "red" },
  { name: "Unknown", icon: HelpCircleIcon, color: "blue" },
];

export const incidentStatus = [
  { name: "Reported", icon: AlertTriangle, color: "red" },
  { name: "Investigating", icon: Search, color: "blue" },
  { name: "Identified", icon: Wrench, color: "purple" },
  { name: "Watching", icon: Eye, color: "yellow" },
  { name: "Fixed", icon: CheckCircle, color: "green" },
];
