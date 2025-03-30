import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './utils/auth';
import Login from './Components/Login';
import UserList from './Components/UserList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={isAuthenticated() ? <UserList /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
