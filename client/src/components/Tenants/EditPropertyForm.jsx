import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export function EditTenantForm() {
  const [formState, setFormState] = useState({
    name: '',
    contact_number: '',
    email: '',
    address: '',
    lease_start_date: '',
    lease_end_date: '',
    rent_amount: 0,
    payment_status: 'Due',
    lease_agreement: '',
  });
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch existing tenant details if editing
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/api/tenants/${id}`)
        .then(response => {
          const data = response.data;
          setFormState({
            name: data.name,
            contact_number: data.contact_number,
            email: data.email,
            address: data.address,
            lease_start_date: data.lease_start_date.split("T")[0],
            lease_end_date: data.lease_end_date.split("T")[0],
            rent_amount: data.rent_amount,
            payment_status: data.payment_status,
            lease_agreement: data.lease_agreement,
          });
        })
        .catch(error => {
          console.error('Error fetching tenant:', error);
        });
    }
  }, [id]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3000/api/tenants/${id}`, formState);
      alert('Tenant updated successfully');
      navigate('/tenants');
    } catch (error) {
      console.error('Error updating tenant:', error);
    }
  };

  return (
    <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Edit Tenant
          </h2>
        </div>

        <div className="relative max-w-6xl mx-auto mt-8 md:mt-16">
          <div className="overflow-hidden bg-white rounded-md shadow-md">
            <div className="px-4 py-6 sm:px-8 sm:py-7">
              <form onSubmit={handleSubmit} method="POST">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {[
                    { label: 'Name', name: 'name', type: 'text', placeholder: 'Tenant name' },
                    { label: 'Contact Number', name: 'contact_number', type: 'text', placeholder: 'Contact number' },
                    { label: 'Email', name: 'email', type: 'email', placeholder: 'Email address' },
                    { label: 'Address', name: 'address', type: 'text', placeholder: 'Tenant address' },
                    { label: 'Lease Start Date', name: 'lease_start_date', type: 'date' },
                    { label: 'Lease End Date', name: 'lease_end_date', type: 'date' },
                    { label: 'Rent Amount', name: 'rent_amount', type: 'number', placeholder: 'Rent amount' },
                    { label: 'Lease Agreement', name: 'lease_agreement', type: 'text', placeholder: 'Agreement details or URL' },
                  ].map(({ label, name, type, placeholder }) => (
                    <div key={name}>
                      <label className="text-base font-medium text-gray-900">{label}</label>
                      <input
                        type={type}
                        name={name}
                        value={formState[name]}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                        className="block w-full py-3 px-4 text-black bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
                        required
                      />
                    </div>
                  ))}

                  {/* Payment Status Dropdown */}
                  <div>
                    <label className="text-base font-medium text-gray-900">Payment Status</label>
                    <select
                      name="payment_status"
                      value={formState.payment_status}
                      onChange={handleInputChange}
                      className="block w-full py-3 px-4 text-black bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
                      required
                    >
                      <option value="Paid">Paid</option>
                      <option value="Due">Due</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700"
                  >
                    Update Tenant
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

export default EditTenantForm;
