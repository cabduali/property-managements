import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export function EditContractorForm() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    available: true,
  });
  const navigate = useNavigate();
  const { id } = useParams(); // Get the contractor ID from the URL

  // Fetch existing contractor details
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/api/contractor/${id}`)
        .then(response => {
          const data = response.data;
          setFormState({
            name: data.name,
            email: data.email,
            phone: data.phone,
            skills: data.skills.join(', '), // Convert skills array to comma-separated string
            available: data.available,
          });
        })
        .catch(error => {
          console.error('Error fetching contractor:', error);
        });
    }
  }, [id]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: name === 'available' ? value === 'true' : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update contractor data
      await axios.put(`http://localhost:3000/api/contractor/${id}`, {
        ...formState,
        skills: formState.skills.split(',').map(skill => skill.trim()), // Convert skills string back to an array
      });
      
      alert('Contractor updated successfully');
      navigate('/contractors'); // Redirect to contractor list page
    } catch (error) {
      console.error('Error updating contractor:', error);
      alert('Failed to update contractor.');
    }
  };

  return (
    <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Edit Contractor
          </h2>
        </div>

        <div className="relative max-w-2xl mx-auto mt-8 md:mt-16">
          <div className="overflow-hidden bg-white rounded-md shadow-md">
            <div className="px-4 py-6 sm:px-8 sm:py-7">
              <form onSubmit={handleSubmit} method="POST">
                {/* Name */}
                <div className="mb-5">
                  <label className="text-base font-medium text-gray-900">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    placeholder="Contractor name"
                    className="block w-full py-3 px-4 text-black bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-5">
                  <label className="text-base font-medium text-gray-900">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    placeholder="Contractor email"
                    className="block w-full py-3 px-4 text-black bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="mb-5">
                  <label className="text-base font-medium text-gray-900">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formState.phone}
                    onChange={handleInputChange}
                    placeholder="Contractor phone number"
                    className="block w-full py-3 px-4 text-black bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                {/* Skills */}
                <div className="mb-5">
                  <label className="text-base font-medium text-gray-900">Skills</label>
                  <input
                    type="text"
                    name="skills"
                    value={formState.skills}
                    onChange={handleInputChange}
                    placeholder="Skills (comma-separated)"
                    className="block w-full py-3 px-4 text-black bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
                  />
                </div>

                {/* Availability */}
                <div className="mb-5">
                  <label className="text-base font-medium text-gray-900">Available</label>
                  <select
                    name="available"
                    value={formState.available.toString()}
                    onChange={handleInputChange}
                    className="block w-full py-3 px-4 text-black bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
                    required
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700"
                  >
                    Update Contractor
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

export default EditContractorForm;
