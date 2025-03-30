import React, { useState } from 'react';
import axios from 'axios';

const EditUserModal = ({ user, onClose, onUpdate }) => {
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);

  const handleSave = async () => {
    try {
      await axios.put(`https://reqres.in/api/users/${user.id}`, { first_name: firstName, last_name: lastName, email });
      alert('User updated successfully.');
      onUpdate();
      onClose();
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Edit User</h3>
        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" className="w-full p-2 mb-4 border rounded" />
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" className="w-full p-2 mb-4 border rounded" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 mb-4 border rounded" />
        <button onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded mr-2">Save</button>
        <button onClick={onClose} className="bg-gray-300 py-2 px-4 rounded">Cancel</button>
      </div>
    </div>
  );
};

export default EditUserModal;
