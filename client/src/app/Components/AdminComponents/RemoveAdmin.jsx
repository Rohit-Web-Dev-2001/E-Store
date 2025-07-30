import React, { useState } from "react";
import axios from "axios";

const RemoveAdminModal = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (typingTimeout) clearTimeout(typingTimeout);

    setTypingTimeout(
      setTimeout(() => {
        if (value.trim()) fetchSuggestions(value);
      }, 2000)
    );
  };

  const fetchSuggestions = async (keyword) => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/admins/search?query=${keyword}`);
      setSuggestions(res.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAdmin = async (adminId) => {
    try {
      const res = await axios.get(`/admins/${adminId}`);
      setSelectedAdmin(res.data);
      setSuggestions([]);
      setQuery("");
    } catch (error) {
      console.error("Error fetching admin details:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-xl relative">
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4">Remove Admin</h2>

        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search admin by name..."
          className="w-full border rounded p-2 mb-3"
        />

        {loading && <p className="text-sm text-gray-500">Searching...</p>}

        {!loading && suggestions.length > 0 && (
          <ul className="border rounded bg-white shadow max-h-56 overflow-auto mb-3">
            {suggestions.map((admin) => (
              <li
                key={admin._id}
                onClick={() => handleSelectAdmin(admin._id)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <div className="font-medium">
                  {admin.firstName} {admin.lastName}
                </div>
                <div className="text-sm text-gray-500">{admin.email}</div>
              </li>
            ))}
          </ul>
        )}

        {selectedAdmin && (
          <div className="mt-4 p-4 border rounded bg-gray-50">
            <h3 className="font-semibold mb-2">Selected Admin</h3>
            <p>
              <strong>Name:</strong> {selectedAdmin.firstName}{" "}
              {selectedAdmin.lastName}
            </p>
            <p>
              <strong>Email:</strong> {selectedAdmin.email}
            </p>
            <p>
              <strong>ID:</strong> {selectedAdmin._id}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RemoveAdminModal;
