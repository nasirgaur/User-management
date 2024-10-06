// src/components/UserForm.js
import React, { useState, useEffect } from 'react';

const UserForm = ({ selectedUser, onSubmit, resetSelection }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name);
      setEmail(selectedUser.email);
    }
  }, [selectedUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    onSubmit({ id: selectedUser ? selectedUser.id : Date.now(), name, email });
    setName('');
    setEmail('');
    resetSelection();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">
        {selectedUser ? 'Update User' : 'Add User'}
      </button>
    </form>
  );
};

export default UserForm;
