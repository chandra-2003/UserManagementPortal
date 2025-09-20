import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: '#add8e6' }}  // Light blue
    >
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold fs-4">
          Welcome
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/form" className="nav-link">
                Form
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/users" className="nav-link">
                User Details
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
