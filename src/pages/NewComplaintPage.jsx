import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createComplaint } from '../api/apiService';

const CATEGORIES = [
  'Electrical', 'Plumbing', 'Cleaning', 'Internet / WiFi',
  'Furniture', 'Security', 'Cafeteria', 'Other',
];

export default function NewComplaintPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '', category: CATEGORIES[0], location: '', description: '',
  });
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createComplaint(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit complaint.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main" style={{ maxWidth: 640 }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Submit a Complaint</h1>
          <p className="page-sub">Describe the issue and we&apos;ll get it resolved.</p>
        </div>
        <Link to="/dashboard" className="btn btn-outline btn-sm">← Back</Link>
      </div>

      <div className="card">
        <div className="card-body">
          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={submit}>
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                id="title" name="title" required
                className="form-control"
                placeholder="Brief description of the issue"
                value={form.title} onChange={handle}
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select id="category" name="category" className="form-control"
                value={form.category} onChange={handle}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <input
                id="location" name="location" required
                className="form-control"
                placeholder="e.g. Block A, Room 203"
                value={form.location} onChange={handle}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description" name="description" required
                className="form-control"
                placeholder="Provide detailed information about the issue…"
                value={form.description} onChange={handle}
              />
            </div>

            <div style={{ display: 'flex', gap: '.75rem', justifyContent: 'flex-end' }}>
              <Link to="/dashboard" className="btn btn-ghost">Cancel</Link>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Submitting…' : 'Submit Complaint'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
