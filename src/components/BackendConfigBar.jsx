import { useState } from 'react';
import { getApiUrl, setApiUrl } from '../config';

const DEFAULT_RENDER_BACKEND = 'https://campus-complaint-management-sys-backend.onrender.com';

export default function BackendConfigBar() {
  const current = getApiUrl();
  const isDefaultLocal = current.includes('localhost') && typeof window !== 'undefined' && window.location.hostname !== 'localhost';
  const [open, setOpen] = useState(isDefaultLocal);
  const [url, setUrl] = useState(isDefaultLocal ? DEFAULT_RENDER_BACKEND : current);

  const save = (e) => {
    e.preventDefault();
    if (url.trim()) {
      setApiUrl(url.trim());
      window.location.reload();
    }
  };

  const useDefault = () => {
    setApiUrl(DEFAULT_RENDER_BACKEND);
    window.location.reload();
  };

  return (
    <div style={{
      background: isDefaultLocal ? '#fef3c7' : '#f8fafc',
      border: isDefaultLocal ? '1px solid #f59e0b' : '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '10px 14px',
      marginBottom: '16px',
      fontSize: '0.85rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>
          <strong>Backend API:</strong>{' '}
          <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>{current}</code>
        </span>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontSize: '0.85rem' }}
        >
          {open ? 'Hide' : 'Change'}
        </button>
      </div>

      {isDefaultLocal && (
        <div style={{ marginTop: '8px' }}>
          <button
            type="button"
            onClick={useDefault}
            className="btn btn-primary btn-sm"
            style={{ width: '100%', marginBottom: '8px' }}
          >
            Connect to Live Render Backend
          </button>
        </div>
      )}

      {open && (
        <form onSubmit={save} style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://campus-complaint-management-sys-backend.onrender.com"
            required
            className="form-control"
            style={{ fontSize: '0.85rem', padding: '4px 8px' }}
          />
          <button type="submit" className="btn btn-primary btn-sm" style={{ whiteSpace: 'nowrap' }}>
            Save URL
          </button>
        </form>
      )}
    </div>
  );
}
