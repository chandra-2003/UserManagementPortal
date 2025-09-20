import React, { useState } from 'react';
import axios from 'axios';

// Commit 1: Created AddUser component and set initial state for all form fields
function AddUser({ onUserAdded }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    addressLine: '',
    address: {
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: ''
      }
    }
  });

  // Commit 2: Added handleChange function with nested state update support for address fields
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

  // Commit 3: Implemented form submission with axios POST to backend API
  // Commit 4: Added form reset after successful submit and error alert on failure
  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/users', form)
      .then(() => {
        setForm({
          name: '',
          email: '',
          phone: '',
          company: '',
          addressLine: '',
          address: {
            city: '',
            zipcode: '',
            geo: {
              lat: '',
              lng: ''
            }
          }
        });
        if (onUserAdded) onUserAdded();
      })
      .catch(() => alert('Error adding user'));
  };

  // Commit 5: Designed form using Bootstrap classes for clean layout and responsiveness
  // Commit 6: Included labels and appropriate input types for better UX and validation

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <form onSubmit={handleSubmit}>
            <h2>Add User</h2>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                id="name"
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                type="email"
                className="form-control"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input
                id="phone"
                className="form-control"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="company" className="form-label">Company</label>
              <input
                id="company"
                className="form-control"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Company"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="addressLine" className="form-label">Address</label>
              <input
                id="addressLine"
                className="form-control"
                name="addressLine"
                value={form.addressLine}
                onChange={handleChange}
                placeholder="Address"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="city" className="form-label">City</label>
              <input
                id="city"
                className="form-control"
                name="address.city"
                value={form.address?.city || ''}
                onChange={handleChange}
                placeholder="City"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="zipcode" className="form-label">Zipcode</label>
              <input
                id="zipcode"
                className="form-control"
                name="address.zipcode"
                value={form.address?.zipcode || ''}
                onChange={handleChange}
                placeholder="Zipcode"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="lat" className="form-label">Latitude</label>
              <input
                id="lat"
                className="form-control"
                name="address.geo.lat"
                value={form.address?.geo?.lat || ''}
                onChange={handleChange}
                placeholder="Latitude"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="lng" className="form-label">Longitude</label>
              <input
                id="lng"
                className="form-control"
                name="address.geo.lng"
                value={form.address?.geo?.lng || ''}
                onChange={handleChange}
                placeholder="Longitude"
              />
            </div>

            <button className="btn btn-primary w-100" type="submit">
              Add User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
