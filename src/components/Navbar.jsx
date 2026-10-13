import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="navbar-brand">
        {/* Building / campus icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none"
          viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M3 21h18M3 10h18M5 21V10l7-7 7 7v11M10 21V14h4v7" />
        </svg>
        Campus Complaint
      </Link>

      <div className="navbar-user">
        {user && (
          <>
            <span style={{ fontSize: '.85rem', color: '#64748b' }}>
              {user.email}
            </span>
            <span className={`badge badge-${user.role.toLowerCase()}`}>
              {user.role}
            </span>
            <button className="btn btn-ghost btn-sm" onClick={signOut}>
              Sign out
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
