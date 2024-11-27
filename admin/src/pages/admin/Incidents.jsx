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
import { Eye } from "lucide-react";
import IncidentTimeLine from "@/components/incidents/IncidentTimeLine";
import RecordUpdate from "@/components/incidents/RecordUpdate";
import LoadingOverlay from "@/components/common/LoadingOverlay";

const Incidents = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [isTimelineDialogOpen, setIsTimelineDialogOpen] = useState(false);
  const [isRecordDialogOpen, setIsRecordDialogOpen] = useState(false);

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

  const openTimelineDialog = (incident) => {
    setSelectedIncident(incident);
    setIsTimelineDialogOpen(true);
  };

  const closeTimelineDialog = () => {
    setSelectedIncident(null);
    setIsTimelineDialogOpen(false);
  };

  const openRecordDialog = (incident) => {
    setSelectedIncident(incident);
    setIsRecordDialogOpen(true);
  };

  const closeRecordDialog = () => {
    setSelectedIncident(null);
    setIsRecordDialogOpen(false);
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
      <div className="container mx-auto p-6">
        <h1
          className="text-xl text-[#0E3B65] mb-4 uppercase"
          style={{ fontFamily: "Mukta" }}
        >
          Incidents
        </h1>
        <div className="flex flex-col items-center gap-10 w-[100%]">
          <div className="flex justify-end w-[100%]">
            <Button onClick={() => openIncidentDialog(null)}>
              Report new Incident
            </Button>
          </div>

          {error && (
            <div className="w-[100%] bg-red-200 text-red-500 p-4 rounded-lg mt-4 text-center">
              <strong>Error:</strong> {error || "An error occurred"}
            </div>
          )}

          <div className="w-[100%] border rounded-lg shadow-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Incident Name</TableHead>
                  <TableHead>Current Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Record</TableHead>
                  <TableHead>View Incident</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incidents.map((incident) => (
                  <TableRow key={incident._id}>
                    <TableCell className="font-medium">
                      {incident.name}
                    </TableCell>
                    <TableCell>
                      <Chip status={incident.status} />
                    </TableCell>
                    <TableCell>{formatDate(incident.createdAt)}</TableCell>
                    <TableCell>{formatDate(incident.updatedAt)}</TableCell>
                    <TableCell>
                      <button
                        className="flex items-center gap-2 text-blue-600 font-semibold hover:underline"
                        onClick={() => openRecordDialog(incident)}
                      >
                        Record Update
                      </button>
                    </TableCell>
                    <TableCell>
                      <button
                        className="flex items-center gap-2 text-green-600 font-semibold hover:underline"
                        onClick={() => openTimelineDialog(incident)}
                      >
                        <Eye size={16} />
                        <span className="">View Incident</span>
                      </button>
                    </TableCell>
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

          {/* Timeline Dialog */}
          <Dialog
            open={isTimelineDialogOpen}
            onOpenChange={closeTimelineDialog}
          >
            <DialogContent className="max-w-[95vw] w-auto min-w-[300px] max-h-[80vh] overflow-y-auto p-6">
              <DialogHeader>
                <DialogTitle>Incident Timeline</DialogTitle>
              </DialogHeader>
              <IncidentTimeLine incident={selectedIncident} />
            </DialogContent>
          </Dialog>

          {/* Record Update Dialog */}
          <Dialog open={isRecordDialogOpen} onOpenChange={closeRecordDialog}>
            <DialogContent className="w-[90vw] sm:w-[600px] h-auto max-h-[80vh] p-6 rounded-lg overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Record Update</DialogTitle>
              </DialogHeader>
              <RecordUpdate
                incident={selectedIncident}
                onClose={closeRecordDialog}
              />
            </DialogContent>
          </Dialog>

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
            <DialogContent className="max-w-[90vw] w-auto">
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
      </div>
      <LoadingOverlay isLoading={isLoading} />
    </Layout>
  );
};

export default Incidents;
