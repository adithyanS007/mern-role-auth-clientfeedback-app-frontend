import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../utils/AuthContext'; // adjust path if needed
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth(); // use login function from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password,
      });

      console.log("API Response:", response.data); // Log API response

      if (response.data.success) {
        // Store the user and token in AuthContext
        login(response.data.user, response.data.token);

        // You can also store the token in localStorage if needed
        localStorage.setItem('feedback-token', response.data.token);

        // Redirect based on user role
        if (response.data.user.role === "admin") {
          navigate('/admin-dashboard');
        } else {
          navigate("/client-dashboard");
        }
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message); // Set error from server
      } else {
        setError('An unexpected error occurred'); // Catch unexpected errors
      }

      // Clear any previous session to prevent faulty state
      localStorage.removeItem('feedback-user');
      localStorage.removeItem('feedback-token');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center bg-blue-300 h-[100vh]'>
      <div className='bg-white p-3 rounded-lg shadow-lg w-[400px] mx-auto'>
        <h2 className='text-center text-3xl text-green-400 font-medium'>Login</h2>
        {error && (
          <div className='bg-red-300 text-red-600 p-2 my-4 rounded'>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="max-w-md p-4">
          <div className='mb-3'>
            <input
              type="text"
              name='email'
              placeholder='Enter Email'
              required
              className='rounded-md w-full mb-2 p-2 border border-gray-400'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <input
              type="password"
              name='password'
              placeholder='Enter Password'
              required
              className='rounded-md w-full mb-2 p-2 border border-gray-400'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='flex justify-center items-center pt-3'>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded w-full"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
        <div className='flex justify-around items-center py-3'>
          <p className='text-gray-500'>Don't have an account?</p>
          <Link to={"/signup"} className='text-blue-600'>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
