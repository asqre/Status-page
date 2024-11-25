import React from "react";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "./AppSidebar";

const Layout = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-[90%]">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
