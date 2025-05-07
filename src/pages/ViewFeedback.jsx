import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const ViewFeedback = () => {
  const { id } = useParams(); // Get the feedback ID from the URL parameter
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const token = localStorage.getItem("feedback-token");
        const res = await axios.get(`http://localhost:3000/api/feedback/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        setFeedback(res.data.feedback);
      } catch (err) {
        console.error("Error fetching feedback:", err);
      }
    };

    fetchFeedback();
  }, [id]);

  // If feedback is not yet fetched, show loading
  if (!feedback) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">View Feedback</h2>
        <div className="flex gap-4 p-4 border border-gray-300 rounded-lg shadow-md">
          {/* Image */}
          <div className="w-32 h-32">
            <img
              src={`http://localhost:3000${feedback.image}`}
              alt="feedback"
              className="w-full h-full object-cover rounded"
            />
          </div>
          {/* Feedback Details */}
          <div className="flex flex-col justify-between">
            <h3 className="text-xl font-semibold">{feedback.user?.name}</h3>
            <p className="text-gray-600">{feedback.user?.email}</p>
            <p className="mt-2">{feedback.desc}</p>
            <div className="flex items-center mt-4">
              <span className="text-lg font-semibold mr-2">Rating:</span>
              <span className="text-yellow-500">{feedback.rating}</span>
            </div>
            {feedback.adminComment && (
              <div className="mt-4">
                <h4 className="font-semibold">Admin Comment:</h4>
                <p>{feedback.adminComment}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewFeedback;
