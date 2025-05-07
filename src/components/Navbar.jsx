import React from 'react';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom'; 

const Navbar = () => {
  const { user, logout } = useAuth();  
  const navigate = useNavigate(); // To redirect after logout

  const handleLogout = () => {
    logout(); // Clear user data from context and localStorage
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">Client Feedback</h1>
      {user ? (
        <div className="flex gap-4 items-center">
          <span>Welcome, {user.name}</span>
          <button 
            onClick={handleLogout} 
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <span>Please log in</span>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
