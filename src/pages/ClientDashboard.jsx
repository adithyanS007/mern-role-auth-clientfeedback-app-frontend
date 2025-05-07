import React, { useState } from 'react';
import axios from 'axios';
import Star from '../components/Star';
import Navbar from '../components/Navbar';
import { useAuth } from '../utils/AuthContext';

const ClientDashboard = () => {
  const [formData, setFormData] = useState({ desc: '', rating: '' });
  const [imageFile, setImageFile] = useState(null); // 👈 for file upload
  const { user } = useAuth();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('feedback-token');
      const data = new FormData();

      data.append("desc", formData.desc);
      data.append("rating", formData.rating);
      data.append("user", user?._id);
      if (imageFile) {
        data.append("image", imageFile);
      }

      await axios.post("https://mern-role-auth-clientfeedback-app-server.vercel.app/api/feedback/add", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });

      alert("Feedback submitted!");
      setFormData({ desc: '', rating: '' });
      setImageFile(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit feedback');
    }
  };

  return (
    <>
      <Navbar />

      <div className='max-w-md mx-auto p-4 bg-white shadow-md mt-6 rounded'>
        <h2 className='text-xl font-semibold mb-4'>Submit Feedback</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <textarea
            name="desc"
            placeholder="Your feedback"
            className='w-full p-2 border rounded mb-3'
            value={formData.desc}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating (1-5)"
            className='w-full p-2 border rounded mb-1'
            value={formData.rating}
            onChange={handleChange}
            required
            min="0"
            max="5"
            step="0.5"
          />

          <div className='mb-3 text-yellow-400 text-lg'>
            <Star stars={parseFloat(formData.rating) || 0} />
          </div>

          <input
            type="file"
            name="image"
            accept="image/*"
            className='w-full mb-4'
            onChange={handleFileChange}
          />

          <button type="submit" className='bg-green-500 text-white w-full py-2 rounded'>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ClientDashboard;
