import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AssignContractorModal from './AssignContractorForm';
import EditMaintenanceModal from './Editmaintenance';

const MaintenanceTableWithActions = () => {
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchMaintenanceRequests();
  }, []);

  const fetchMaintenanceRequests = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/maintenance');
      const requestData = Array.isArray(response.data) ? response.data : response.data.data;
      setMaintenanceRequests(requestData);
    } catch (error) {
      console.error('Error fetching maintenance requests:', error);
    }
  };

  const openAssignModal = (requestId) => {
    setSelectedRequestId(requestId);
    setShowAssignModal(true);
  };

  const openEditModal = (requestId) => {
    setSelectedRequestId(requestId);
    setShowEditModal(true);
  };

  const openAddModal = () => {
    navigate('/AddMaintenance'); 
  };

  const closeModals = () => {
    setShowAssignModal(false);
    setShowEditModal(false);
    setSelectedRequestId(null);
  };

  const handleDeleteRequest = async (requestId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this maintenance request?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/api/maintenance/${requestId}`);
        alert("Maintenance request deleted successfully");
        fetchMaintenanceRequests();
      } catch (error) {
        console.error("Error deleting maintenance request:", error);
        alert("Failed to delete the maintenance request.");
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Maintenance Requests</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={openAddModal}
        >
          Add Maintenance Request
        </button>
      </div>

      {maintenanceRequests.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tenant</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contractor</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {maintenanceRequests.map((request) => (
              <tr key={request._id}>
                <td className="px-4 py-2">{request.tenantId?.name || 'N/A'}</td>
                <td className="px-4 py-2">{request.propertyId?.name || 'N/A'}</td>
                <td className="px-4 py-2">{request.description}</td>
                <td className="px-4 py-2">{request.priority}</td>
                <td className="px-4 py-2">{request.status}</td>
                <td className="px-4 py-2">{request.contractorId?.name || 'Unassigned'}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
                    onClick={() => openAssignModal(request._id)}
                  >
                    Assign 
                  </button>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                    onClick={() => openEditModal(request._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                    onClick={() => handleDeleteRequest(request._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No maintenance requests to display.</p>
      )}

      {/* Modals */}
      <AssignContractorModal
        show={showAssignModal}
        closeModal={closeModals}
        requestId={selectedRequestId}
        refreshData={fetchMaintenanceRequests}
      />

      <EditMaintenanceModal
        show={showEditModal}
        closeModal={closeModals}
        requestId={selectedRequestId}
        refreshData={fetchMaintenanceRequests}
      />
    </div>
  );
};

export default MaintenanceTableWithActions;
