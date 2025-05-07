import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Navbar from "../components/Navbar";
import { useAuth } from "../utils/AuthContext";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem("feedback-token");
        const res = await axios.get("https://mern-role-auth-clientfeedback-app-server-nlpqevo8i.vercel.app/api/feedback", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        setFeedbacks(res.data.feedbacks);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;

    try {
      const token = localStorage.getItem("feedback-token");
      await axios.delete(`https://mern-role-auth-clientfeedback-app-server-nlpqevo8i.vercel.app/api/feedback/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFeedbacks((prev) => prev.filter((fb) => fb._id !== id));
    } catch (error) {
      console.error("Error deleting feedback:", error);
      alert("Failed to delete feedback.");
    }
  };

  const filteredData = useMemo(() => {
    return feedbacks.filter((fb) => {
      const nameMatch = fb.user?.name
        ?.toLowerCase()
        .includes(globalFilter.toLowerCase());
      const ratingMatch = ratingFilter
        ? fb.rating === Number(ratingFilter)
        : true;
      const dateMatch = dateFilter
        ? new Date(fb.createdAt).toISOString().slice(0, 10) === dateFilter
        : true;
      return nameMatch && ratingMatch && dateMatch;
    });
  }, [feedbacks, globalFilter, ratingFilter, dateFilter]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.user?.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.user?.email,
      sortable: true,
    },
    {
      name: "Image",
      cell: (row) => {
        const imageUrl = `https://mern-role-auth-clientfeedback-app-server-nlpqevo8i.vercel.app/${row.image}`;
        return row.image ? (
          <img
            src={imageUrl}
            alt="feedback"
            className="w-16 h-16 object-cover rounded"
          />
        ) : (
          "No image"
        );
      },
    },
    {
      name: "Description",
      selector: (row) => row.desc,
    },
    {
      name: "Rating",
      selector: (row) => row.rating,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) =>
        new Date(row.createdAt).toLocaleDateString("en-IN"),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          {/* Link to View Feedback Page */}
          <Link
            to={`/feedback/${row._id}`}
            className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
          >
            View
          </Link>
          <button
            onClick={() => handleDelete(row._id)}
            className="bg-red-500 text-white px-2 py-1 rounded text-sm"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Client Feedback Table</h2>

        {/* Filters */}
        <div className="flex gap-4 mb-4 flex-wrap">
          <input
            placeholder="Filter by name"
            className="border p-2 rounded"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <input
            type="number"
            placeholder="Filter by rating"
            min="1"
            max="5"
            className="border p-2 rounded"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
          />
          <input
            type="date"
            className="border p-2 rounded"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          responsive
          noDataComponent="No feedback found."
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
