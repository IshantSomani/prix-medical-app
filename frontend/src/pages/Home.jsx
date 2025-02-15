import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar";
import { PulseLoader } from 'react-spinners';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Home = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();

    const fetchPatients = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/patients/getPatients`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('prixToken')}`
                }
            });
            console.log(response.data.data);
            setPatients(response.data.data);
        } catch (err) {
            setError('Failed to fetch patients. Please try again later.', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        fetchPatients();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="pt-10 md:pt-20 px-4 sm:px-6 lg:px-8 pb-8">
                <div className="mb-8 bg-white rounded-xl p-6 shadow-sm">
                    <h1 className="text-3xl font-bold text-[#2A5C82]">
                        Welcome, Dr. {user?.email?.split('@')[0]}
                    </h1>
                    <p className="text-[#5CB8B2] mt-2">
                        {new Date().toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-[#2A5C82] mb-4">
                            Quick Actions
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <Link
                                to="/patients/new"
                                className="p-4 bg-[#f0f4f7] rounded-lg hover:bg-[#e3e9ef] transition-colors"
                            >
                                <div className="text-[#2A5C82] font-medium">
                                    ➕ Add New Patient
                                </div>
                            </Link>
                            <button className="p-4 bg-[#f0f4f7] rounded-lg hover:bg-[#e3e9ef] transition-colors">
                                <div className="text-[#2A5C82] font-medium">
                                    📅 Schedule Appointment
                                </div>
                            </button>
                        </div>
                    </div>
                </div>


                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-[#2A5C82] mb-4">
                        Recent Patients
                    </h2>
                    {loading ? (
                        <div className="flex justify-center items-center h-32">
                            <PulseLoader color="#2A5C82" size={12} />
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-[#5CB8B2] border-b">
                                        <th className="pb-2">Patient Name</th>
                                        <th className="pb-2">Age</th>
                                        <th className="pb-2">Last Visit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {patients.length > 0 ? (
                                        patients.map((patient) => (
                                            <tr key={patient._id} className="border-b hover:bg-gray-50">
                                                <td className="py-3">{patient.name}</td>
                                                <td className="py-3">{patient.age}</td>
                                                <td className="py-3">
                                                    {new Date(patient.createdAt).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="py-4 text-center text-gray-500">
                                                No patients found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-[#2A5C82] mb-4">
                        Upcoming Appointments
                    </h2>
                    <div className="text-gray-600">
                        🕒 Feature coming soon - Track your daily schedule and appointments
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;