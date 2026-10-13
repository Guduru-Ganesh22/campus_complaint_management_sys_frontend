import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute  from './components/PrivateRoute';
import Navbar        from './components/Navbar';
import LoginPage     from './pages/LoginPage';
import RegisterPage  from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import NewComplaintPage from './pages/NewComplaintPage';

function AppShell() {
  const { user } = useAuth();

  return (
    <div className="app-container">
      {user && <Navbar />}

      <Routes>
        {/* Public */}
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected */}
        <Route path="/dashboard" element={
          <PrivateRoute><DashboardPage /></PrivateRoute>
        } />
        <Route path="/new-complaint" element={
          <PrivateRoute role="STUDENT"><NewComplaintPage /></PrivateRoute>
        } />

        {/* Catch-all */}
        <Route path="*" element={
          <Navigate to={user ? '/dashboard' : '/login'} replace />
        } />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppShell />
      </Router>
    </AuthProvider>
  );
}
