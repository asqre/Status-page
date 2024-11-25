import Dashboard from "@/pages/admin/Dashboard";
import Incidents from "@/pages/admin/Incidents";
import Services from "@/pages/admin/Services";
import Setting from "@/pages/admin/Setting";

export const routes = [
  {
    layout: "admin",
    pages: [
      {
        name: "Dashboard",
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        name: "Services",
        path: "/products",
        element: <Services />,
      },
      {
        name: "Incidents",
        path: "/orders",
        element: <Incidents />,
      },
      {
        name: "Setting",
        path: "/accounts",
        element: <Setting />,
      },
    ],
  },
];
