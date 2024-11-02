import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export function EditMaintenanceRequestForm() {
  const [formState, setFormState] = useState({
    tenantId: '',
    propertyId: '',
    description: '',
    requestDate: '',
    status: 'Pending',
    priority: 'Medium',
    contractorId: '',
    assignmentDate: '',
  });
  const [tenants, setTenants] = useState([]);
  const [properties, setProperties] = useState([]);
  const [contractors, setContractors] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch existing maintenance request details if editing
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the specific maintenance request
        const requestResponse = await axios.get(`http://localhost:3000/api/maintenance-requests/${id}`);
        const data = requestResponse.data.data || requestResponse.data;

        // Set form state with existing maintenance request details
        setFormState({
          tenantId: data.tenantId,
          propertyId: data.propertyId,
          description: data.description,
          requestDate: data.requestDate,
          status: data.status,
          priority: data.priority,
          contractorId: data.contractorId || '',
          assignmentDate: data.assignmentDate || '',
        });

        // Fetch tenants, properties, and contractors for dropdown options
        const tenantResponse = await axios.get('http://localhost:3000/api/tenants');
        const propertyResponse = await axios.get('http://localhost:3000/api/properties');
        const contractorResponse = await axios.get('http://localhost:3000/api/contractors');

        setTenants(tenantResponse.data.data || []);
        setProperties(propertyResponse.data.data || []);
        setContractors(contractorResponse.data.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3000/api/maintenance-requests/${id}`, {
        ...formState,
      });

      alert('Maintenance request updated successfully');
      navigate('/maintenance');
    } catch (error) {
      console.error('Error updating maintenance request:', error);
      alert('There was an error updating the maintenance request. Please try again.');
    }
  };

  return (
    <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Edit Maintenance Request
          </h2>
        </div>

        <div className="relative max-w-2xl mx-auto mt-8">
          <div className="overflow-hidden bg-white rounded-md shadow-md">
            <div className="px-4 py-6 sm:px-8 sm:py-7">
              <form onSubmit={handleSubmit} method="POST">
                {/* Tenant and Property - Disabled Fields */}
                <div className="mb-5">
                  <label className="text-base font-medium text-gray-900">Tenant</label>
                  <select
                    name="tenantId"
                    value={formState.tenantId}
                    onChange={handleInputChange}
                    className="block w-full py-3 px-4 text-black bg-white border border-gray-200 rounded-md"
                    disabled
                  >
                    <option value="">Select Tenant</option>
                    {tenants.map((tenant) => (
                      <option key={tenant._id} value={tenant._id}>
                        {tenant.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-5">
                  <label className="text-base font-medium text-gray-900">Property</label>
                  <select
                    name="propertyId"
                    value={formState.propertyId}
                    onChange={handleInputChange}
                    className="block w-full py-3 px-4 text-black bg-white border border-gray-200 rounded-md"
                    disabled
                  >
                    <option value="">Select Property</option>
                    {properties.map((property) => (
                      <option key={property._id} value={property._id}>
                        {property.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="mb-5">
                  <label className="text-base font-medium text-gray-900">Description</label>
                  <textarea
                    name="description"
                    value={formState.description}
                    onChange={handleInputChange}
                    placeholder="Describe the maintenance issue"
                    className="block w-full py-3 px-4 text-black bg-white border border-gray-200 rounded-md"
                    required
                  />
                </div>

                {/* Priority Selection */}
                <div className="mb-5">
                  <label className="text-base font-medium text-gray-900">Priority</label>
                  <select
                    name="priority"
                    value={formState.priority}
                    onChange={handleInputChange}
                    className="block w-full py-3 px-4 text-black bg-white border border-gray-200 rounded-md"
                    required
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                {/* Status Selection */}
                <div className="mb-5">
                  <label className="text-base font-medium text-gray-900">Status</label>
                  <select
                    name="status"
                    value={formState.status}
                    onChange={handleInputChange}
                    className="block w-full py-3 px-4 text-black bg-white border border-gray-200 rounded-md"
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                {/* Contractor Selection */}
                <div className="mb-5">
                  <label className="text-base font-medium text-gray-900">Contractor</label>
                  <select
                    name="contractorId"
                    value={formState.contractorId}
                    onChange={handleInputChange}
                    className="block w-full py-3 px-4 text-black bg-white border border-gray-200 rounded-md"
                  >
                    <option value="">Select Contractor (optional)</option>
                    {contractors.map((contractor) => (
                      <option key={contractor._id} value={contractor._id}>
                        {contractor.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700"
                  >
                    Update Maintenance Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditMaintenanceRequestForm;
