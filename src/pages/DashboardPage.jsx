import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getComplaints, deleteComplaint, updateStatus,
} from '../api/apiService';
import { useAuth } from '../context/AuthContext';

const STATUS_OPTIONS = ['Pending', 'In Progress', 'Resolved'];

function statusClass(s) {
  if (s === 'Pending')     return 'status status-pending';
  if (s === 'In Progress') return 'status status-in-progress';
  if (s === 'Resolved')    return 'status status-resolved';
  return 'status';
}

export default function DashboardPage() {
  const { user } = useAuth();
  const isStudent      = user?.role === 'STUDENT';
  const isMaintenance  = user?.role === 'MAINTENANCE';

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState('');
  const [editStatus, setEditStatus] = useState({});   // { [id]: newStatus }
  const [saving, setSaving]         = useState({});   // { [id]: bool }
  const [deleting, setDeleting]     = useState({});   // { [id]: bool }

  const load = async () => {
    try {
      setLoading(true);
      const { data } = await getComplaints();
      setComplaints(data);
    } catch {
      setError('Failed to load complaints.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  // ── Delete ─────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this complaint?')) return;
    setDeleting((p) => ({ ...p, [id]: true }));
    try {
      await deleteComplaint(id);
      setComplaints((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed.');
    } finally {
      setDeleting((p) => ({ ...p, [id]: false }));
    }
  };

  // ── Update status (maintenance) ────────────────────────────────────────
  const handleStatusChange = (id, value) => {
    setEditStatus((p) => ({ ...p, [id]: value }));
  };

  const saveStatus = async (id, current) => {
    const newStatus = editStatus[id] ?? current;
    setSaving((p) => ({ ...p, [id]: true }));
    try {
      const { data } = await updateStatus(id, newStatus);
      setComplaints((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: data.status } : c))
      );
      setEditStatus((p) => { const n = { ...p }; delete n[id]; return n; });
    } catch (err) {
      alert(err.response?.data?.message || 'Status update failed.');
    } finally {
      setSaving((p) => ({ ...p, [id]: false }));
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="main">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            {isStudent ? 'My Complaints' : 'All Complaints'}
          </h1>
          <p className="page-sub">
            {isStudent
              ? 'View and manage your submitted complaints.'
              : 'Review and update complaint statuses.'}
          </p>
        </div>
        {isStudent && (
          <Link to="/new-complaint" className="btn btn-primary">
            + New Complaint
          </Link>
        )}
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="spinner" />
      ) : complaints.length === 0 ? (
        <div className="empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2
                 M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3>No complaints found</h3>
          <p>
            {isStudent ? (
              <>
                You haven&apos;t submitted any complaints yet.&nbsp;
                <Link to="/new-complaint">Submit one now</Link>.
              </>
            ) : (
              'No complaints have been submitted yet.'
            )}
          </p>
        </div>
      ) : (
        <div className="complaint-grid">
          {complaints.map((c) => {
            const currentStatus = editStatus[c.id] ?? c.status;
            return (
              <div key={c.id} className="complaint-item">
                <div className="complaint-item-header">
                  <span className="complaint-item-title">{c.title}</span>
                  <span className={statusClass(c.status)}>{c.status}</span>
                </div>

                <div className="complaint-item-meta">
                  <span>📂 {c.category}</span>
                  <span>📍 {c.location}</span>
                  {!isStudent && c.student && (
                    <span>👤 {c.student.email ?? `Student #${c.student.id}`}</span>
                  )}
                </div>

                <p className="complaint-item-desc">{c.description}</p>

                <div className="complaint-item-actions">
                  {/* Maintenance: update status */}
                  {isMaintenance && (
                    <div className="status-select-row">
                      <select
                        className="form-control"
                        value={currentStatus}
                        onChange={(e) => handleStatusChange(c.id, e.target.value)}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <button
                        className="btn btn-primary btn-sm"
                        disabled={saving[c.id] || currentStatus === c.status}
                        onClick={() => saveStatus(c.id, c.status)}
                      >
                        {saving[c.id] ? 'Saving…' : 'Save'}
                      </button>
                    </div>
                  )}

                  {/* Student: delete own complaint */}
                  {isStudent && (
                    <button
                      className="btn btn-danger btn-sm"
                      disabled={deleting[c.id]}
                      onClick={() => handleDelete(c.id)}
                    >
                      {deleting[c.id] ? 'Deleting…' : 'Delete'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
