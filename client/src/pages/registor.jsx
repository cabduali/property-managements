import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          
            await axios.post('http://localhost:3000/api/register', { name, email, password });
            alert('User registered successfully');
            clearForm();
            navigate('/Home');
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
            alert(errorMessage);
        }
    };

    const clearForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setIsChecked(false);
    };

    return (
        <div>
            <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                            Create free account
                        </h2>
                        <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
                            You can create a free Celebration account in 2 minutes
                        </p>
                    </div>

                    <div className="relative max-w-md mx-auto mt-8 md:mt-16">
                        <div className="overflow-hidden bg-white rounded-md shadow-md">
                            <div className="px-4 py-6 sm:px-8 sm:py-7">
                                <form onSubmit={handleSubmit} method="POST">
                                    <div className="space-y-5">
                                        <div>
                                            <label className="text-base font-medium text-gray-900">
                                                First & Last name
                                            </label>
                                            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    placeholder="Enter your full name"
                                                    className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-base font-medium text-gray-900">
                                                Email address
                                            </label>
                                            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Enter email to get started"
                                                    className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-base font-medium text-gray-900">
                                                Password
                                            </label>
                                            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                                <input
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    placeholder="Enter your password"
                                                    className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <button
                                                type="submit"
                                                className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                                            >
                                                Create account
                                            </button>
                                        </div>

                                        <div className="text-center">
                                            <p className="text-base text-gray-600">
                                                Already have an account?{' '}
                                                <Link to="/" title="" className="font-medium text-orange-500 transition-all duration-200 hover:text-orange-600 hover:underline">
                                                    Login here
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
