import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: {
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: ''
      }
    }
  });

  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/users/${id}`)
      .then(res => setForm(res.data))
      .catch(() => setError('Error fetching user data'));
  }, [id]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  const handleChange = e => {
    const { name, value } = e.target;
    
    // Handle nested fields like address.city or address.geo.lat
    if (name.includes('.')) {
      const keys = name.split('.');
      setForm(prevForm => {
        let updatedForm = { ...prevForm };
        let currentLevel = updatedForm;
        for (let i = 0; i < keys.length - 1; i++) {
          if (!currentLevel[keys[i]]) currentLevel[keys[i]] = {};
          currentLevel = currentLevel[keys[i]];
        }
        currentLevel[keys[keys.length - 1]] = value;
        return updatedForm;
      });
    } else {
      setForm(prevForm => ({ ...prevForm, [name]: value }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:5000/users/${id}`, form)
      .then(() => navigate('/'))
      .catch(err => alert('Error updating user'));
  };

  return (
    <form className="container my-4" onSubmit={handleSubmit}>
      <h2>Edit User</h2>
      <div className="mb-3">
        <input
          className="form-control"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          required
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company"
        />
      </div>
      {/* Address Fields */}
      <div className="mb-3">
        <input
          className="form-control"
          name="address.city"
          value={form.address?.city || ''}
          onChange={handleChange}
          placeholder="City"
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          name="address.zipcode"
          value={form.address?.zipcode || ''}
          onChange={handleChange}
          placeholder="Zipcode"
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          name="address.geo.lat"
          value={form.address?.geo?.lat || ''}
          onChange={handleChange}
          placeholder="Latitude"
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          name="address.geo.lng"
          value={form.address?.geo?.lng || ''}
          onChange={handleChange}
          placeholder="Longitude"
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Update
      </button>
    </form>
  );
}

export default EditUser;
