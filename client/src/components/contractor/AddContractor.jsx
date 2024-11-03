import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function AddContractor() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [skills, setSkills] = useState('');
  const [available, setAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post('http://localhost:3000/api/contractors', {
        name,
        email,
        phone,
        skills: skills.split(',').map(skill => skill.trim()), // Convert skills to an array
        available,
      });

      alert('Contractor added successfully');
      navigate('/Contractor'); // Redirect to contractors list or dashboard after adding
    } catch (error) {
      console.error('Error adding contractor:', error);
      alert('There was an error adding the contractor. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Add New Contractor
          </h2>
        </div>

        <div className="relative max-w-2xl mx-auto mt-8 md:mt-16">
          <div className="overflow-hidden bg-white rounded-md shadow-md">
            <div className="px-4 py-6 sm:px-8 sm:py-7">
              <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="mb-5">
                  <label className="text-base font-medium text-gray-900">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="Skills (comma-separated)"
                    className="block w-full py-3 px-4 text-black bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600"
                  />
                </div>

                {/* Availability */}
                <div className="mb-5">
                  <label className="text-base font-medium text-gray-900">Available</label>
                  <select
                    value={available}
                    onChange={(e) => setAvailable(e.target.value === 'true')}
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
                    disabled={isLoading}
                    className={`inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white ${isLoading ? 'bg-gray-500' : 'bg-blue-600'} border border-transparent rounded-md focus:outline-none hover:bg-blue-700`}
                  >
                    {isLoading ? 'Submitting...' : 'Add Contractor'}
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

export default AddContractor;
