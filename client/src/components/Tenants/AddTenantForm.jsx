import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function AddTenantForm() {
  const [name, setName] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [leaseStartDate, setLeaseStartDate] = useState('');
  const [leaseEndDate, setLeaseEndDate] = useState('');
  const [rentAmount, setRentAmount] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('Due');
  const [leaseAgreement, setLeaseAgreement] = useState('');
  const [propertyId, setPropertyId] = useState('');
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch properties when the component mounts
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/rentedProperties');
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    fetchProperties();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      console.log({
        name,
        phoneNumber,  
        email,
        address,
        property: propertyId, 
        lease: {
          startDate: leaseStartDate,
          endDate: leaseEndDate,
          monthlyRent: rentAmount,
          terms: leaseAgreement,
        },
        paymentStatus,
      });
  
      // Step 1: Create the tenant
      await axios.post('http://localhost:3000/api/tenants', {
        name,
        phoneNumber,
        email,
        address,
        property: propertyId,
        lease: {
          startDate: leaseStartDate,
          endDate: leaseEndDate,
          monthlyRent: rentAmount,
          terms: leaseAgreement,
        },
        paymentStatus,
      });
  
      // Step 2: Update the property to set isRented to true
      await axios.put(`http://localhost:3000/api/property/${propertyId}`, {
        isRented: true,
      });
  
      alert('Tenant registered and property marked as rented successfully');
      navigate('/tenants'); 
    } catch (error) {
      console.error('Error registering tenant or updating property:', error.response?.data || error.message);
      alert('There was an error processing the tenant or property update. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Add New Tenant
          </h2>
        </div>

        <div className="relative max-w-6xl mx-auto mt-8 md:mt-16">
          <div className="overflow-hidden bg-white rounded-md shadow-md">
            <div className="px-4 py-6 sm:px-8 sm:py-7">
              <form onSubmit={handleSubmit} method="POST">
                {/* Property Selection */}
                <div>
                  <label className="text-base font-medium text-gray-900">Select Property</label>
                  <select
                    value={propertyId}
                    onChange={(e) => setPropertyId(e.target.value)}
                    className="block w-full py-3 px-4 text-black bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
                    required
                  >
                    <option value="">Select a property</option>
                    {properties.map((property) => (
                      <option key={property._id} value={property._id}>
                        {property.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name */}
                <div>
                  <label className="text-base font-medium text-gray-900">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tenant name"
                    className="block w-full py-3 px-4 text-black bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                {/* Contact Number */}
                <div>
                  <label className="text-base font-medium text-gray-900">Contact Number</label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setphoneNumber(e.target.value)}
                    placeholder="Contact number"
                    className="block w-full py-3 px-4 text-black bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-base font-medium text-gray-900">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="block w-full py-3 px-4 text-black bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="text-base font-medium text-gray-900">Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Tenant address"
                    className="block w-full py-3 px-4 text-black bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                {/* Lease Start Date */}
                <div>
                  <label className="text-base font-medium text-gray-900">Lease Start Date</label>
                  <input
                    type="date"
                    value={leaseStartDate}
                    onChange={(e) => setLeaseStartDate(e.target.value)}
                    className="block w-full py-3 px-4 text-black bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                {/* Lease End Date */}
                <div>
                  <label className="text-base font-medium text-gray-900">Lease End Date</label>
                  <input
                    type="date"
                    value={leaseEndDate}
                    onChange={(e) => setLeaseEndDate(e.target.value)}
                    className="block w-full py-3 px-4 text-black bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                {/* Rent Amount */}
                <div>
                  <label className="text-base font-medium text-gray-900">Rent Amount</label>
                  <input
                    type="number"
                    value={rentAmount}
                    onChange={(e) => setRentAmount(e.target.value)}
                    placeholder="Rent amount"
                    className="block w-full py-3 px-4 text-black bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                {/* Payment Status */}
                <div>
                  <label className="text-base font-medium text-gray-900">Payment Status</label>
                  <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                    className="block w-full py-3 px-4 text-black bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
                    required
                  >
                    <option value="Paid">Paid</option>
                    <option value="Due">Due</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>

                {/* Lease Agreement */}
                <div>
                  <label className="text-base font-medium text-gray-900">Lease Agreement</label>
                  <input
                    type="text"
                    value={leaseAgreement}
                    onChange={(e) => setLeaseAgreement(e.target.value)}
                    placeholder="Lease agreement details"
                    className="block w-full py-3 px-4 text-black bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white ${isLoading ? 'bg-gray-500' : 'bg-blue-600'} border border-transparent rounded-md focus:outline-none hover:bg-blue-700`}
                  >
                    {isLoading ? 'Submitting...' : 'Submit Tenant'}
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

export default AddTenantForm;
