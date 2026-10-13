import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register as apiRegister } from '../api/apiService';
import { getApiUrl } from '../config';
import BackendConfigBar from '../components/BackendConfigBar';

const ROLES = [
  { value: 'STUDENT',     label: 'Student'              },
  { value: 'MAINTENANCE', label: 'Maintenance Staff'    },
];

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '', password: '', confirmPassword: '', role: 'STUDENT',
  });
  const [error,   setError]   = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    try {
      const { data } = await apiRegister({
        email:    form.email.trim(),
        password: form.password,
        role:     form.role,
      });
      setSuccess(data.message || 'Registration successful!');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      if (!err.response) {
        setError(`Cannot reach backend server at ${getApiUrl()}. Please check that the backend is awake or update the backend URL above.`);
      } else {
        const resData = err.response.data;
        const msg = resData?.message || resData?.errors?.[0]?.defaultMessage || 'Registration failed.';
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1>Create account</h1>
        <p className="subtitle">Join Campus Complaint Management</p>

        <BackendConfigBar />

        {error   && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={submit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email" name="email" type="email" required
              className="form-control" placeholder="you@campus.edu"
              value={form.email} onChange={handle}
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Account type</label>
            <select id="role" name="role" className="form-control"
              value={form.role} onChange={handle}>
              {ROLES.map(r => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password (min. 8 characters)</label>
            <input
              id="password" name="password" type="password" required
              className="form-control" placeholder="At least 8 characters"
              value={form.password} onChange={handle}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword" name="confirmPassword" type="password" required
              className="form-control" placeholder="••••••••"
              value={form.confirmPassword} onChange={handle}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?&nbsp;<Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
