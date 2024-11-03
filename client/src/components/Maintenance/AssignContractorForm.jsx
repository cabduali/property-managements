import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AssignContractorModal = ({ show, closeModal, requestId, refreshData }) => {
  const [contractors, setContractors] = useState([]);
  const [contractorId, setContractorId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (show) {
      const fetchContractors = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/contractors');
          setContractors(response.data.data || []);
        } catch (error) {
          console.error('Error fetching contractors:', error);
        }
      };

      fetchContractors();
      setContractorId(''); // Clear contractorId when modal opens
    }
  }, [show]);

  const handleContractorChange = (e) => {
    setContractorId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.put(`http://localhost:3000/api/maintenance/${requestId}/assign`, {
        contractorId,
        assignmentDate: new Date(),
      });

      alert('Contractor assigned successfully');
      closeModal();
      refreshData(); // Refresh the data in the main table
    } catch (error) {
      console.error('Error assigning contractor:', error);
      alert('Failed to assign contractor. Please try again.');
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
        <h2 className="text-2xl font-semibold mb-4">Assign Contractor</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Select Contractor</label>
            <select
              value={contractorId}
              onChange={handleContractorChange}
              className="block w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Choose a Contractor</option>
              {contractors.map((contractor) => (
                <option key={contractor._id} value={contractor._id}>
                  {contractor.name} - {contractor.skills ? contractor.skills.join(', ') : 'No skills listed'}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-4 py-2 text-white ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} rounded`}
          >
            {isLoading ? 'Assigning...' : 'Assign Contractor'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignContractorModal;
