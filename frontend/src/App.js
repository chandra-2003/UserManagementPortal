import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';  
import UserList from './UserList';
import AddUser from './AddUser';
import EditUser from './EditUser';
import UserDetail from './UserDetail';
import Home from './Home';       
import 'bootstrap/dist/css/bootstrap.min.css';
import bgImage from './image.jpg';

function App() {
  const [refresh, setRefresh] = useState(false);
  const handleUserAdded = () => {
    setRefresh(prev => !prev);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        backgroundPosition: 'center',
      }}
    >
      <Router>
        <Navbar /> 
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<AddUser onUserAdded={handleUserAdded} />} />
            <Route path="/users" element={<UserList refresh={refresh} />} />
            <Route path="/edit/:id" element={<EditUser />} />
            <Route path="/user/:id" element={<UserDetail />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
