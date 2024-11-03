import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditMaintenanceModal = ({ show, closeModal, requestId, refreshData }) => {
  const [formData, setFormData] = useState({
    description: '',
    priority: 'Medium',
    status: 'Pending',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (show && requestId) {
      const fetchRequestDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/maintenance/${requestId}`);
          console.log("API Response:", response.data); // Log the entire response to inspect its structure
  
          const data = response.data.data;
          if (data) {
            setFormData({
              description: data.description || '',
              priority: data.priority || 'Medium',
              status: data.status || 'Pending',
            });
          } else {
            console.error("Unexpected data structure:", response.data);
          }
        } catch (error) {
          console.error('Error fetching request details:', error);
        }
      };
  
      fetchRequestDetails();
    }
  }, [show, requestId]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.put(`http://localhost:3000/api/maintenance/${requestId}`, formData);
      alert('Maintenance request updated successfully');
      closeModal();
      refreshData(); // Refresh the data after editing
    } catch (error) {
      console.error('Error updating maintenance request:', error);
      alert('Failed to update the maintenance request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto relative">
        <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4">Edit Maintenance Request</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              required
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-4 py-2 text-white ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} rounded`}
          >
            {isLoading ? 'Updating...' : 'Update Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditMaintenanceModal;
