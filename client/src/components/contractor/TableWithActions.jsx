import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ContractorTableWithActions = () => {
  const [contractors, setContractors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContractors = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/contractors');
        console.log('Full API response:', response);

        // Access nested data array
        const contractorData = response.data.data; // Adjusted to access nested `data` property
        if (Array.isArray(contractorData)) {
          setContractors(contractorData);
        } else {
          console.error("Data is not in expected array format:", contractorData);
          setContractors([]); // Default to an empty array
        }
      } catch (error) {
        console.error('Error fetching contractors:', error);
        if (error.response) {
          console.error('Response status:', error.response.status);
          console.error('Response data:', error.response.data);
        }
      }
    };

    fetchContractors();
  }, []);

  const handleAddNew = () => {
    navigate("/AddContractor");
  };

  const handleEditClick = (contractor) => {
    navigate(`/EditContractor/${contractor._id}`);
  };

  const handleDelete = async (id) => {
    if (!id) return;

    const isConfirmed = window.confirm("Are you sure you want to delete this contractor?");
    if (!isConfirmed) return;

    try {
      await axios.delete(`http://localhost:3000/api/contractors/${id}`);
      alert('Contractor deleted successfully');

      setContractors((prevContractors) =>
        prevContractors.filter((contractor) => contractor._id !== id)
      );
    } catch (error) {
      console.error('Error deleting contractor:', error);
      alert('Failed to delete the contractor.');
    }
  };

  // Filter contractors to show only those that are available
  const availableContractors = contractors.filter((contractor) => contractor.available);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Contractor List</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={handleAddNew}
        >
          Add New Contractor
        </button>
      </div>
      
      {availableContractors.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Skills
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Availability
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {availableContractors.map((contractor) => (
              <tr key={contractor._id}>
                <td className="px-4 py-2">{contractor.name}</td>
                <td className="px-4 py-2">{contractor.email}</td>
                <td className="px-4 py-2">{contractor.phone}</td>
                <td className="px-4 py-2">{contractor.skills.join(', ')}</td>
                <td className="px-4 py-2">{contractor.available ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                    onClick={() => handleEditClick(contractor)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                    onClick={() => handleDelete(contractor._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No available contractors to display.</p>
      )}
    </div>
  );
};

export default ContractorTableWithActions;
