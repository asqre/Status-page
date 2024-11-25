import Layout from "@/components/layout/Layout";
import React from "react";
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

const Services = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center gap-10 w-[100%] h-[90vh]">
        <div className="flex justify-end w-[90%]">
          <Button>Add Services</Button>
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
                      onClick={() => console.log(`Edit service: ${service.id}`)}
                    >
                      <FaEdit />
                    </button>
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
      </div>
    </Layout>
  );
};

export default Services;
