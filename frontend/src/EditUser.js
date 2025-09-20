import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditUser() {
  const { id } = useParams();  // Get user ID from URL params
  const navigate = useNavigate();  // Navigation function

  // State for form inputs
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    addressLine: '',  // For address line input
    address: {
      city: '',
      zipcode: '',
      geo: { lat: '', lng: '' },
    },
  });

  const [error, setError] = useState('');  // Error state

  // Fetch user data when component mounts
  useEffect(() => {
    axios.get(`http://localhost:5000/users/${id}`)
      .then(res => setForm(res.data))
      .catch(() => setError('Error fetching user data'));
  }, [id]);

  // Show error if fetch fails
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  // Handle form input change with nested support
  const handleChange = e => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const keys = name.split('.');
      setForm(prev => {
        const copy = { ...prev };
        let cur = copy;
        for (let i = 0; i < keys.length - 1; i++) {
          if (!cur[keys[i]]) cur[keys[i]] = {};
          cur = cur[keys[i]];
        }
        cur[keys[keys.length - 1]] = value;
        return copy;
      });
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  // Submit updated user data
  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:5000/users/${id}`, form)
      .then(() => navigate('/'))  // Redirect to home
      .catch(() => alert('Error updating user'));
  };

  return (
    <form className="container my-4" onSubmit={handleSubmit}>
      <h2>Edit User</h2>
      {/* Input fields with labels and proper bindings */}
      {/* ... (rest of form inputs) */}
    </form>
  );
}

export default EditUser;
