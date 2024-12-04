import { Home, UserRound, Settings, Component, InfoIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Services",
    url: "/services",
    icon: Component,
  },
  {
    title: "Incidents",
    url: "/incidents",
    icon: InfoIcon,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: UserRound,
  },
];

export function AppSidebar() {
  const organizationDetails = JSON.parse(
    sessionStorage.getItem("organization")
  );
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <div className="flex items-center p-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="bg-primary w-10 h-10 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">
                {organizationDetails?.companyName?.[0] || "O"}
              </span>
            </div>
            <span className="font-semibold text-lg text-black">
              {organizationDetails?.companyName || "Organization"}
            </span>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <Link
                  to={item.url}
                  key={item.title}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all
                    ${
                      location.pathname === item.url
                        ? "bg-primary text-white font-bold"
                        : "hover:bg-gray-300 text-black"
                    }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className="absolute bottom-16 flex items-center justify-center w-full p-4 ">
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "w-10 h-10",
            },
          }}
        />
      </div>
      <div className="absolute bottom-0 w-full p-4 text-center text-xs border-t border-gray-700">
        <span>&copy; {new Date().getFullYear()} Organization</span>
      </div>
    </Sidebar>
  );
}
