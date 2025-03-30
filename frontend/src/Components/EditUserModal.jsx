import React, { useState } from 'react';
import axios from 'axios';

const EditUserModal = ({ user, onClose, onUpdate }) => {
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);

  const handleSave = async () => {
    try {
      await axios.put(`https://reqres.in/api/users/${user.id}`, {
        first_name: firstName,
        last_name: lastName,
        email,
      });
      alert('User updated successfully.');
      onUpdate();
      onClose();
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 transform transition-all duration-300 ease-in-out">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Edit User</h3>
        <div className="space-y-4">
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
