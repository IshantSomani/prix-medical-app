import { Formik, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { useState } from 'react';
import axios from 'axios';

// Validation Schema
const patientSchema = Yup.object().shape({
  name: Yup.string()
    .required('Patient name is required')
    .matches(/^[a-zA-Z ]*$/, 'Invalid name format'),
  age: Yup.number()
    .required('Age is required')
    .positive('Age must be positive')
    .integer('Age must be a whole number')
    .max(120, 'Invalid age'),
  gender: Yup.string()
    .required('Gender is required'),
  mobile: Yup.string()
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Invalid mobile number'),
  email: Yup.string()
    .email('Invalid email address')
});

const PatientForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formik = useFormik({
    initialValues: {
      name: '',
      age: '',
      gender: '',
      mobile: '',
      email: ''
    },
    validationSchema: { patientSchema },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError("");
        await axios.post(`${import.meta.env.VITE_API_URI}/??`, values);
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate("/home");
      } catch (err) {
        setError(err.response?.data?.message || "Login failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          {/* Form Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#2A5C82]">New Patient Record</h1>
            <p className="text-[#5CB8B2] mt-2">Please fill all required fields (*)</p>
          </div>

          <Formik>
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-[#2A5C82] mb-2">
                    Full Name *
                  </label>
                  <Field
                    name="name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5CB8B2]"
                    placeholder="John Doe"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Age Field */}
                <div>
                  <label className="block text-sm font-medium text-[#2A5C82] mb-2">
                    Age *
                  </label>
                  <Field
                    name="age"
                    type="number"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5CB8B2]"
                    placeholder="35"
                  />
                  <ErrorMessage
                    name="age"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Gender Field */}
                <div>
                  <label className="block text-sm font-medium text-[#2A5C82] mb-2">
                    Gender *
                  </label>
                  <Field
                    as="select"
                    name="gender"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5CB8B2]"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Mobile Field */}
                <div>
                  <label className="block text-sm font-medium text-[#2A5C82] mb-2">
                    Mobile Number *
                  </label>
                  <Field
                    name="mobile"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5CB8B2]"
                    placeholder="9876543210"
                  />
                  <ErrorMessage
                    name="mobile"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Email Field */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-[#2A5C82] mb-2">
                    Email Address
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5CB8B2]"
                    placeholder="john.doe@example.com"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="mt-8 flex justify-end gap-4">
                <Link
                  to="/home"
                  className="px-6 py-2 text-[#2A5C82] border border-[#2A5C82] rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-[#2A5C82] text-white rounded-lg hover:bg-[#1E4159] disabled:opacity-50"
                >
                  {loading ? (
                    <PulseLoader color="#ffffff" size={8} />
                  ) : (
                    'Create Patient Record'
                  )}
                </button>
              </div>
            </form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default PatientForm;