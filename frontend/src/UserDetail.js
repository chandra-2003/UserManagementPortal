import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/users/${id}`)
      .then(res => setUser(res.data))
      .catch(() => alert('Error fetching user details'));
  }, [id]);

  if (!user) return <p>Loading user details...</p>;

  return (
    <div>
      <h2>User Details</h2>
      <p><strong>Name:</strong> {user.name || 'N/A'}</p>
      <p><strong>Email:</strong> {user.email || 'N/A'}</p>
      <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
      <p><strong>Company:</strong> {user.company || 'N/A'}</p>
	  <p><strong>AddressLine:</strong> {user.addressLine|| 'N/A'}</p>
      <p><strong>City:</strong> {user.address?.city || 'HYDERABAD'}</p>
      <p><strong>Zipcode:</strong> {user.address?.zipcode || 'N/A'}</p>
      <p><strong>Latitude:</strong> {user.address?.geo?.lat || '17.361431'}</p>
      <p><strong>Longitude:</strong> {user.address?.geo?.lng || '78.474533'}</p>
      <Link to="/" className="btn btn-secondary mt-3">Back to Dashboard</Link>
    </div>
  );
}

export default UserDetail;


