import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TableWithActions = () => {
  const [tenants, setTenants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/tenants');
        setTenants(response.data);
      } catch (error) {
        console.error('Error fetching tenants:', error);
      }
    };

    fetchTenants();
  }, []);

  const handleAddNew = () => {
    navigate("/AddTenant");
  };

  const handleEditClick = (tenant) => {
    navigate(`/EditTenantForm/${tenant._id}`);
  };

  const handleDelete = async (id) => {
    if (!id) return;

    const isConfirmed = window.confirm("Are you sure you want to delete this tenant?");
    if (!isConfirmed) return;

    try {
      await axios.delete(`http://localhost:3000/api/tenants/${id}`);
      alert('Tenant deleted successfully');

      setTenants((prevTenants) =>
        prevTenants.filter((tenant) => tenant._id !== id)
      );
    } catch (error) {
      console.error('Error deleting tenant:', error);
      alert('Failed to delete the tenant.');
    }
  };

  // Filter tenants to show only those who don’t have a rented property
  const availableTenants = tenants.filter((tenant) => !tenant.property || !tenant.property.isRented);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Tenant List</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={handleAddNew}
        >
          Add New Tenant
        </button>
      </div>
      
      {/* Check if there are any available tenants to show */}
      {availableTenants.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Number</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>      
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rent Amount</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {availableTenants.map((tenant) => (
              <tr key={tenant._id}>
                <td className="px-4 py-2">{tenant.name}</td>
                <td className="px-4 py-2">{tenant.property?.name || 'N/A'}</td>
                <td className="px-4 py-2">{tenant.phoneNumber}</td>
                <td className="px-4 py-2">{tenant.email}</td>
                <td className="px-4 py-2">{tenant.address}</td>
                <td className="px-4 py-2">${tenant.lease?.monthlyRent || 'N/A'}</td>
                <td className="px-4 py-2">{tenant.paymentStatus}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                    onClick={() => handleEditClick(tenant)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                    onClick={() => handleDelete(tenant._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No available tenants to display.</p>
      )}
    </div>
  );
};

export default TableWithActions;
