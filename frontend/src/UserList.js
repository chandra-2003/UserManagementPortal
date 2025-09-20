import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UserList({ refresh }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, [refresh]);

  function handleDelete(id) {
    if(window.confirm('Are you sure you want to delete this user?')) {
      axios.delete(`http://localhost:5000/users/${id}`)
        .then(() => {
          setUsers(users.filter(user => user._id !== id));
        })
        .catch(() => alert('Delete failed.'));
    }
  }

  return (
    <div className="container my-4">
      <h2>User Dashboard</h2>
      <ul className="list-group">
        {users.length === 0 && <li className="list-group-item">No users available</li>}
        {users.map(user => (
          <li key={user._id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{user.name} ({user.email})</span>
            <span>
              <Link to={`/edit/${user._id}`} className="btn btn-sm btn-primary me-2">Edit</Link>
              <Link to={`/user/${user._id}`} className="btn btn-sm btn-info me-2">Details</Link>
              <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-danger">Delete</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
