import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../utils/AuthContext"; // adjust the path
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { login } = useAuth(); // use login from context
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://mern-role-auth-clientfeedback-app-server.vercel.app/api/auth/register",
        formData
      );
      login(res.data); // auto-login after successful signup
      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup error");
    }
  };

  return (
    <div className="flex justify-center items-center bg-blue-300 h-[100vh]">
      <div className="bg-white p-3 rounded-lg shadow-lg w-[400px] mx-auto">
        <h2 className="text-center text-3xl text-green-400 font-medium">
          Register
        </h2>
        <form action="#" onSubmit={handleSubmit} className="max-w-md p-4">
          <div className="mb-3 pt-5">
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              required
              className="rounded-md w-full mb-2 p-2 border border-gray-400"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="email"
              placeholder="Enter Email"
              required
              className="rounded-md w-full mb-2 p-2 border border-gray-400"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              required
              className="rounded-md w-full mb-2 p-2 border border-gray-400"
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center items-center pt-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Register
            </button>
          </div>
        </form>
        <div className="flex justify-around items-center py-3">
          <p className="text-gray-500">Have an account?</p>
          <Link to={"/login"} className="text-blue-600">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
