// src/App.js
import React, { useState, useEffect } from 'react';
import './index.css';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users from the API
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  // Handle add or update user
  const handleFormSubmit = (user) => {
    if (selectedUser) {
      // Update user
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } else {
      // Add user
      setUsers([...users, user]);
    }
  };

  // Edit user
  const handleEditUser = (user) => {
    setSelectedUser(user);
  };

  // Delete user
  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="App">
      <h1>User Management</h1>
      <UserForm
        selectedUser={selectedUser}
        onSubmit={handleFormSubmit}
        resetSelection={() => setSelectedUser(null)}
      />
      <UserTable
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />
    </div>
  );
};

export default App;
