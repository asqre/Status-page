import Layout from "@/components/layout/Layout";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { services } from "@/data";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ServiceForm from "@/components/services/ServiceForm";

const Services = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  const openServiceDialog = (service) => {
    setCurrentService(service);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setCurrentService(null);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center gap-10 w-[100%] h-[90vh]">
        <div className="flex justify-end w-[90%]">
          <Button onClick={() => openServiceDialog(null)}>Add Services</Button>
        </div>

        <div className="w-[90%] border rounded-lg shadow-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Service Name</TableHead>
                <TableHead>Current Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell>{service.status}</TableCell>
                  <TableCell>
                    {new Date(service.updated_at).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <button
                      className="text-blue-500 hover:text-blue-700 mx-2"
                      onClick={() => openServiceDialog(service)}
                    >
                      <FaEdit />
                    </button>
                    {/* Delete Button */}
                    <button
                      className="text-red-500 hover:text-red-700 mx-2"
                      onClick={() =>
                        console.log(`Delete service: ${service.id}`)
                      }
                    >
                      <FaTrash />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
          <DialogContent className="w-auto max-w-9xl h-auto max-h-[90vh] p-6 rounded-lg overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {currentService ? "Edit Service" : "Add Service"}
              </DialogTitle>
            </DialogHeader>
            <ServiceForm service={currentService} onClose={closeDialog} />
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Services;
