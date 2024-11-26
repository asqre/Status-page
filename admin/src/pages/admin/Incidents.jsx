import Layout from "@/components/layout/Layout";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import IncidentForm from "@/components/incidents/IncidentForm";
import Chip from "@/components/common/Chip";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteIncident,
  fetchIncidents,
} from "@/redux/incidents/incidentSlice";
import { formatDate } from "@/utils.js";

const Incidents = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const { incidents, isLoading, error } = useSelector(
    (state) => state.incidents
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIncidents());
  }, [dispatch]);

  const openIncidentDialog = (incident) => {
    setSelectedIncident(incident);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedIncident(null);
  };

  const openDeleteConfirmation = (incident) => {
    setSelectedIncident(incident);
    setIsConfirmDialogOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setSelectedIncident(null);
    setIsConfirmDialogOpen(false);
  };

  const handleDeleteIncident = (id) => {
    dispatch(deleteIncident(id));
    closeDeleteConfirmation();
  };

  return (
    <Layout>
      <div className="flex flex-col items-center gap-10 w-[100%] h-[90vh]">
        <div className="flex justify-end w-[90%]">
          <Button onClick={() => openIncidentDialog(null)}>
            Report new Incident
          </Button>
        </div>

        <div className="w-[90%] border rounded-lg shadow-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Incident Name</TableHead>
                <TableHead>Current Status</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>View Incident</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incidents.map((incident) => (
                <TableRow key={incident._id}>
                  <TableCell className="font-medium">{incident.name}</TableCell>
                  <TableCell>
                    <Chip status={incident.status} />
                  </TableCell>
                  <TableCell>{formatDate(incident.updatedAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openIncidentDialog(incident)}
                      >
                        <FaEdit className="mr-2" /> Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => openDeleteConfirmation(incident)}
                      >
                        <FaTrash className="mr-2" /> Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Incident Form Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
          <DialogContent className="w-[90vw] sm:w-[600px] h-auto max-h-[90vh] p-6 rounded-lg overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedIncident ? "Edit Incident" : "Report new Incident"}
              </DialogTitle>
            </DialogHeader>
            <IncidentForm incident={selectedIncident} onClose={closeDialog} />
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={isConfirmDialogOpen}
          onOpenChange={closeDeleteConfirmation}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <p>
              Are you sure you want to delete the incident{" "}
              <strong>{selectedIncident?.name}</strong>?
            </p>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={closeDeleteConfirmation}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDeleteIncident(selectedIncident._id)}
              >
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Incidents;
