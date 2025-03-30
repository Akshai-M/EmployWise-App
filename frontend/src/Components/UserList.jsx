import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditUserModal from './EditUserModal';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async (page) => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      alert('User deleted successfully.');
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold mb-6">User List</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.id} className="bg-white p-4 rounded shadow-lg flex flex-col items-center">
            <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="rounded-full mb-4" />
            <p>{`${user.first_name} ${user.last_name}`}</p>
            <button onClick={() => setEditingUser(user)} className="bg-green-500 text-white py-1 px-3 rounded mt-2">Edit</button>
            <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white py-1 px-3 rounded mt-2">Delete</button>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button onClick={() => handlePageChange(page - 1)} className="py-1 px-3 mx-1 bg-gray-300">Prev</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`py-1 px-3 mx-1 ${page === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(page + 1)} className="py-1 px-3 mx-1 bg-gray-300">Next</button>
      </div>
      {editingUser && (
        <EditUserModal user={editingUser} onClose={() => setEditingUser(null)} onUpdate={() => fetchUsers(page)} />
      )}
    </div>
  );
};

export default UserList;
